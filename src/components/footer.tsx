'use client'

import { useTranslations } from 'next-intl'
import { getSocialLinks } from '@/lib/photos'
import { Instagram, Mail, ArrowUp } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/i18n/provider'

const socialIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  email: Mail,
}

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tContact = useTranslations('contact')
  const { locale } = useI18n()
  const socials = getSocialLinks()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-foreground text-background">
      {/* 大字 CTA */}
      <div className="border-b border-background/15">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-20 md:py-32">
          <Reveal>
            <p className="text-index text-background/50 mb-6">
              — {locale === 'zh' ? '有项目想聊？' : 'Got a project in mind?'}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              onClick={scrollToContact}
              data-cursor="hover"
              className="group inline-flex items-baseline gap-4"
            >
              <h2 className="font-display font-bold tracking-tightest text-display-2 text-background text-left">
                {locale === 'zh' ? '让我们\n聊聊' : "Let's\nTalk"}
              </h2>
              <ArrowUp className="h-8 w-8 md:h-12 md:w-12 text-accent rotate-45 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </Reveal>
        </div>
      </div>

      {/* 多列链接 */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* 品牌 */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl font-bold mb-4">
              Lumen<span className="text-accent">·</span>Studio
            </div>
            <p className="text-sm text-background/60 max-w-xs leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* 导航 */}
          <div>
            <h3 className="text-index text-background/50 mb-4">Navigate</h3>
            <nav className="flex flex-col gap-3">
              {[
                { key: 'gallery', href: '#gallery' },
                { key: 'about', href: '#about' },
                { key: 'contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm text-background/80 hover:text-accent transition-colors w-fit"
                >
                  {tNav(item.key)}
                </a>
              ))}
            </nav>
          </div>

          {/* 联系 */}
          <div>
            <h3 className="text-index text-background/50 mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:hello@lumenstudio.com"
                className="text-background/80 hover:text-accent transition-colors w-fit"
              >
                hello@lumenstudio.com
              </a>
              <span className="text-background/60">{tContact('locationValue')}</span>
            </div>
          </div>

          {/* 社交 */}
          <div>
            <h3 className="text-index text-background/50 mb-4">{t('links.contact')}</h3>
            <div className="flex flex-col gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.platform] ?? Mail
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target={social.platform === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-background/80 hover:text-accent transition-colors w-fit"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {social.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* 底栏 */}
        <div className="pt-8 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} Lumen Studio. {t('rights')}.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-background/50 font-display italic">
              Made with light & shadow.
            </span>
            <button
              onClick={scrollToTop}
              data-cursor="hover"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 hover:border-accent hover:text-accent transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
