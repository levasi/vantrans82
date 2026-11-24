import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { put } from '@vercel/blob'
import { requireAdmin } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'

const MAX_SIZE_BYTES = 8 * 1024 * 1024

type DetectedImage = {
  extension: string
  contentType: string
}

function detectImage(data: Buffer): DetectedImage | null {
  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return { extension: '.jpg', contentType: 'image/jpeg' }
  }

  if (
    data.length >= 8 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47 &&
    data[4] === 0x0d &&
    data[5] === 0x0a &&
    data[6] === 0x1a &&
    data[7] === 0x0a
  ) {
    return { extension: '.png', contentType: 'image/png' }
  }

  const gifHeader = data.subarray(0, 6).toString('ascii')
  if (data.length >= 6 && (gifHeader === 'GIF87a' || gifHeader === 'GIF89a')) {
    return { extension: '.gif', contentType: 'image/gif' }
  }

  if (
    data.length >= 12 &&
    data.subarray(0, 4).toString('ascii') === 'RIFF' &&
    data.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { extension: '.webp', contentType: 'image/webp' }
  }

  return null
}

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)

    const form = await readMultipartFormData(event)
    const filePart = form?.find((part) => part.name === 'file' && part.data)

    if (!filePart || !filePart.data) {
      throw createError({
        statusCode: 400,
        message: 'No image file provided'
      })
    }

    if (filePart.data.byteLength > MAX_SIZE_BYTES) {
      throw createError({
        statusCode: 400,
        message: 'Image must be 8MB or smaller'
      })
    }

    const detected = detectImage(filePart.data)
    if (!detected) {
      throw createError({
        statusCode: 400,
        message: 'Only JPEG, PNG, WebP, and GIF images are allowed'
      })
    }

    const filename = `vantrans82-${randomUUID()}${detected.extension}`

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${filename}`, filePart.data, {
        access: 'public',
        contentType: detected.contentType,
        token: process.env.BLOB_READ_WRITE_TOKEN
      })

      return {
        success: true,
        url: blob.url,
        pathname: blob.pathname,
        storage: 'blob'
      }
    }

    if (process.env.VERCEL) {
      throw createError({
        statusCode: 503,
        message: 'Image storage is not configured'
      })
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    await writeFile(join(uploadsDir, filename), filePart.data)

    return {
      success: true,
      url: `/uploads/${filename}`,
      pathname: `uploads/${filename}`,
      storage: 'local'
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to upload image')
  }
})
