'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, MapPin, Send, Instagram, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getSocialLinks } from '@/lib/photos'
import { useI18n } from '@/i18n/provider'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const socialIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  email: Mail,
}

// 用 zod 定义校验 schema（错误信息多语言）
const useSchema = (locale: 'zh' | 'en') => {
  const msg = locale === 'zh'
    ? {
        name: '请输入姓名',
        email: '请输入有效邮箱',
        emailInvalid: '邮箱格式不正确',
        subject: '请输入主题',
        message: '请输入留言（至少 10 字）',
        messageMin: '留言至少 10 个字符',
      }
    : {
        name: 'Please enter your name',
        email: 'Please enter your email',
        emailInvalid: 'Invalid email format',
        subject: 'Please enter a subject',
        message: 'Please enter a message (min 10 chars)',
        messageMin: 'Message must be at least 10 characters',
      }

  return z.object({
    name: z.string().min(1, msg.name),
    email: z.string().min(1, msg.email).email(msg.emailInvalid),
    subject: z.string().min(1, msg.subject),
    message: z.string().min(10, msg.messageMin),
  })
}

type ContactFormValues = z.infer<ReturnType<typeof useSchema>>

export function Contact() {
  const t = useTranslations('contact')
  const { locale } = useI18n()
  const schema = useSchema(locale)
  const socials = getSocialLinks()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `HTTP ${res.status}`)
      }
      toast.success(t('form.success'))
      form.reset()
    } catch (err) {
      console.error('[contact] submit error:', err)
      toast.error(t('form.error'))
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30 scroll-mt-16">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-2">
            {t('subtitle')}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-foreground/70">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* 表单 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.name')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.namePlaceholder')}
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.subject')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('form.subjectPlaceholder')}
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.message')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('form.messagePlaceholder')}
                        rows={6}
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('form.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t('form.submit')}
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* 联系信息侧栏 */}
          <aside className="space-y-6">
            <div className="p-6 rounded-lg bg-background border border-border">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {t('social')}
              </h3>
              <div className="flex flex-col gap-3">
                {socials.map((social) => {
                  const Icon = socialIcons[social.platform] ?? Mail
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target={social.platform === 'email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/60 transition-colors group"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:text-accent transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    {t('email')}
                  </p>
                  <a
                    href="mailto:hello@lumenstudio.com"
                    className="text-sm font-medium hover:text-accent transition-colors"
                  >
                    hello@lumenstudio.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    {t('location')}
                  </p>
                  <p className="text-sm font-medium">{t('locationValue')}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
