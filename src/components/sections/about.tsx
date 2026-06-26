'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Camera, Award, MapPin, Calendar } from 'lucide-react'
import { getGearList, getStats } from '@/lib/photos'
import { useI18n } from '@/i18n/provider'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/reveal'

export function About() {
  const t = useTranslations('about')
  const { locale } = useI18n()
  const gear = getGearList()
  const stats = getStats()

  const timelineItems = t.raw('timelineItems') as Array<{ year: string; title: string; desc: string }>

  const statItems = [
    { key: 'years', value: stats.years, icon: Calendar },
    { key: 'countries', value: stats.countries, icon: MapPin },
    { key: 'projects', value: stats.projects, icon: Camera },
    { key: 'awards', value: stats.awards, icon: Award },
  ] as const

  return (
    <section id="about" className="py-24 md:py-40 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* 标题 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-index text-accent mb-3">— 05 / About</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold tracking-tightest text-display-3 mb-6">
                {t('title')}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* 简介：大图 + 大字段落 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 md:mb-32 items-start">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted sticky top-24">
              <Image
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=85"
                alt="Lumen at work"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover img-grayscale"
              />
              <div className="absolute bottom-4 left-4 text-index text-background/90 mix-blend-difference">
                — Lumen / Photographer
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.15}>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                {t('intro')}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('bio2')}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 统计 */}
        <StaggerGroup
          stagger={0.08}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 md:mb-32 p-8 md:p-12 border-y border-border"
        >
          {statItems.map((item) => (
            <StaggerItem key={item.key} className="text-center">
              <item.icon className="h-5 w-5 mx-auto text-accent mb-4" />
              <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tightest">
                {item.value}
                {item.key === 'years' && <span className="text-accent">+</span>}
              </div>
              <div className="text-index text-muted-foreground mt-3">
                {t(`stats.${item.key}`)}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* 设备清单 */}
        <div className="mb-24 md:mb-32">
          <Reveal>
            <div className="flex items-baseline justify-between mb-12">
              <h3 className="font-display text-2xl md:text-3xl font-bold">
                {t('gear')}
              </h3>
              <span className="text-index text-muted-foreground">— {gear.length} items</span>
            </div>
          </Reveal>
          <StaggerGroup
            stagger={0.06}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border"
          >
            {gear.map((item) => (
              <StaggerItem key={item.model}>
                <div className="p-6 md:p-8 h-full bg-background hover:bg-secondary/40 transition-colors">
                  <p className="text-index text-accent mb-2">{item.type[locale]}</p>
                  <h4 className="font-display text-lg md:text-xl font-semibold mb-3">{item.model}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.note[locale]}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* 时间线 */}
        <div>
          <Reveal>
            <div className="flex items-baseline justify-between mb-12">
              <h3 className="font-display text-2xl md:text-3xl font-bold">
                {t('timeline')}
              </h3>
              <span className="text-index text-muted-foreground">— 2014 / 2025</span>
            </div>
          </Reveal>
          <div className="space-y-px">
            {timelineItems.map((item, idx) => (
              <Reveal key={item.year} delay={idx * 0.05}>
                <div className="group grid grid-cols-12 gap-4 py-8 border-t border-border hover:bg-secondary/30 transition-colors -mx-4 px-4">
                  <div className="col-span-3 md:col-span-2">
                    <span className="font-display text-3xl md:text-4xl font-bold text-accent group-hover:translate-x-2 transition-transform inline-block">
                      {item.year}
                    </span>
                  </div>
                  <div className="col-span-9 md:col-span-10">
                    <h4 className="font-display text-xl md:text-2xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
