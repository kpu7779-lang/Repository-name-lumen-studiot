'use client'

import { useTranslations } from 'next-intl'
import { Reveal } from '@/components/reveal'

// 客户/媒体 Logo（用文字代替，可替换为 SVG）
const CLIENTS = [
  'National Geographic',
  'SONY',
  'MUJI',
  'NIKE',
  'VOGUE',
  'Apple',
  'Toyota',
  'Uniqlo',
  'Leica',
  'Kyotographie',
]

export function Marquee() {
  // 复制两份以无缝循环
  const items = [...CLIENTS, ...CLIENTS]

  return (
    <section className="py-16 md:py-20 border-y border-border/60 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-10">
        <Reveal>
          <p className="text-index text-muted-foreground text-center">
            — {('Trusted by editors & brands worldwide')} —
          </p>
        </Reveal>
      </div>
      <div className="marquee-pause relative">
        <div className="flex gap-12 md:gap-20 animate-marquee whitespace-nowrap will-change-transform">
          {items.map((name, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-4xl font-medium text-muted-foreground/40 hover:text-foreground transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
