import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Cloudflare Pages 要求 API 路由运行在 Edge Runtime
export const runtime = 'edge'

// 邮件内容 schema
const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { name, email, subject, message } = parsed.data

    // 没配置 API Key 时返回"开发模式"提示，避免本地崩溃
    if (!process.env.RESEND_API_KEY) {
      console.warn('[contact] RESEND_API_KEY not set, simulating success')
      console.info('[contact] Form data:', { name, email, subject, message })
      return NextResponse.json({
        ok: true,
        simulated: true,
        message: 'Simulated success (no RESEND_API_KEY configured)',
      })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Lumen Studio <onboarding@resend.dev>'
    const toEmail = process.env.CONTACT_EMAIL || 'hello@example.com'

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #d4a574; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 80px;">Name:</td>
              <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #d4a574;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888;">Subject:</td>
              <td style="padding: 8px 0; font-weight: 600;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <h3 style="color: #333; margin-bottom: 12px;">Message</h3>
          <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${escapeHtml(message)}</p>
          <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999;">— Sent from Lumen Studio website</p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { ok: false, error: 'Failed to send email' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
