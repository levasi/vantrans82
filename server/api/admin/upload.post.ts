import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
])

const MAX_SIZE_BYTES = 8 * 1024 * 1024

function extensionFor(file: File) {
  const fromName = extname(file.name || '').toLowerCase()
  if (fromName) return fromName

  switch (file.type) {
    case 'image/jpeg':
    case 'image/jpg':
      return '.jpg'
    case 'image/png':
      return '.png'
    case 'image/webp':
      return '.webp'
    case 'image/gif':
      return '.gif'
    case 'image/svg+xml':
      return '.svg'
    default:
      return '.bin'
  }
}

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event)
    const filePart = form?.find((part) => part.name === 'file' && part.data)

    if (!filePart || !filePart.data) {
      throw createError({
        statusCode: 400,
        message: 'No image file provided'
      })
    }

    const type = filePart.type || 'application/octet-stream'
    if (!ALLOWED_TYPES.has(type)) {
      throw createError({
        statusCode: 400,
        message: 'Only JPEG, PNG, WebP, GIF, and SVG images are allowed'
      })
    }

    if (filePart.data.byteLength > MAX_SIZE_BYTES) {
      throw createError({
        statusCode: 400,
        message: 'Image must be 8MB or smaller'
      })
    }

    const filename = `vantrans82-${randomUUID()}${extensionFor({
      name: filePart.filename || '',
      type
    } as File)}`

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${filename}`, filePart.data, {
        access: 'public',
        contentType: type,
        token: process.env.BLOB_READ_WRITE_TOKEN
      })

      return {
        success: true,
        url: blob.url,
        pathname: blob.pathname,
        storage: 'blob'
      }
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
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Image upload failed:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to upload image'
    })
  }
})
