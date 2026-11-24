import { requireAdmin } from '~/server/utils/admin-session'
import { getDb } from '~/server/utils/db'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
    try {
        await requireAdmin(event)
        const db = getDb()

        if (!db) {
            // Return default settings if database is not available
            return {
                success: true,
                settings: {
                    companyName: 'VanTrans82',
                    contactEmail: 'office@vantrans82.ro',
                    phoneNumber: '0743981279',
                    address: 'Str Doamna Stanca nr 39\nSelimbar jud Sibiu',
                    smtpHost: '',
                    smtpPort: '587',
                    smtpUsername: '',
                    smtpPassword: '',
                    smtpSecure: false,
                    showLanguageSwitch: true
                }
            }
        }

        // Check if settings table exists, if not create it
        await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

        // Load settings from database
        const result = await db.query('SELECT key, value FROM settings')

        const settings: Record<string, any> = {}
        result.rows.forEach((row: any) => {
            try {
                settings[row.key] = JSON.parse(row.value)
            } catch {
                settings[row.key] = row.value
            }
        })

        // Merge with defaults
        const defaultSettings = {
            companyName: 'VanTrans82',
            contactEmail: 'office@vantrans82.ro',
            phoneNumber: '0743981279',
            address: 'Str Doamna Stanca nr 39\nSelimbar jud Sibiu',
            smtpHost: '',
            smtpPort: '587',
            smtpUsername: '',
            smtpPassword: '',
            smtpSecure: false,
            showLanguageSwitch: true
        }

        return {
            success: true,
            settings: { ...defaultSettings, ...settings }
        }
    } catch (error: unknown) {
        publicServerError(error, 'Failed to load settings')
    }
})

