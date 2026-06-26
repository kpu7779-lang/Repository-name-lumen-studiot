'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getStats } from '@/lib/photos'
import { useI18n } from '@/i18n/provider'
import { Reveal } from '@/components/reveal'

export function AboutPreview() {
  const t = useTranslations('about')
  const { locale } = useI18n()
  const stats = getStats()

  const scrollToAbout = () => {
    const el = document.querySelector('#about')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const statItems = [
    { key: 'years', value: stats.years },
    { key: 'countries', value: stats.countries },
    { key: 'projects', value: stats.projects },
    { key: 'awards', value: stats.awards },
  ] as const

  return (
    <section className="py-24 md:py-40 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* 左侧大图 */}
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&q=85"
                alt="Lumen"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover img-grayscale"
              />
              <div className="absolute bottom-4 left-4 text-index text-background/90 mix-blend-difference">
                — Lumen / 2024
              </div>
            </div>
          </Reveal>

          {/* 右侧大字简介 */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <p className="text-index text-accent mb-3">— {t('subtitle')}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold tracking-tightest text-display-3">
                {t('title')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display text-xl md:text-2xl leading-snug text-foreground/90 max-w-2xl">
                {t('intro')}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                {t('bio2')}
              </p>
            </Reveal>

            {/* 统计数据 */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
                {statItems.map((item) => (
                  <div key={item.key}>
                    <div className="font-display text-4xl md:text-5xl font-bold tracking-tightest">
                      {item.value}
                      {item.key === 'years' && <span className="text-accent">+</span>}
                    </div>
                    <div className="text-index text-muted-foreground mt-2">
                      {t(`stats.${item.key}`)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <button
                onClick={scrollToAbout}
                data-cursor="hover"
                className="group inline-flex items-center gap-3 pt-4 text-sm font-medium uppercase tracking-widest"
              >
                <span className="relative">
                  {locale === 'zh' ? '了解更多' : 'Learn More'}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground group-hover:bg-accent transition-colors" />
                </span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
