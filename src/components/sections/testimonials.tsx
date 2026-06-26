'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/i18n/provider'

const TESTIMONIALS = [
  {
    quote: {
      zh: 'Lumen 的镜头不仅记录了产品，更记录了品牌想要传达的呼吸感。每一帧都超出了我们的预期。',
      en: 'Lumen\'s lens captured not just the product, but the very breath our brand wanted to convey. Every frame exceeded our expectations.',
    },
    author: 'Yuki Tanaka',
    role: { zh: 'MUJI 视觉总监', en: 'Creative Director, MUJI' },
  },
  {
    quote: {
      zh: '与 Lumen 合作是我们做过最正确的决定。他能用一张照片讲完我们想用十页 PPT 讲的故事。',
      en: 'Working with Lumen was the best decision we made. He tells with one photo what we\'d need ten slides to convey.',
    },
    author: 'Sarah Chen',
    role: { zh: 'Nike 大中华区品牌总监', en: 'Brand Director Greater China, Nike' },
  },
  {
    quote: {
      zh: '在《国家地理》发表过的摄影师很多，但能像 Lumen 这样把人文与地理结合得如此自然的，屈指可数。',
      en: 'Many photographers have been featured in National Geographic, but few integrate humanity and geography as naturally as Lumen.',
    },
    author: '李明',
    role: { zh: '《国家地理》中文版 主编', en: 'Editor-in-Chief, National Geographic China' },
  },
]

export function Testimonials() {
  const { locale } = useI18n()
  const [active, setActive] = React.useState(0)

  // 自动轮播
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = TESTIMONIALS[active]

  return (
    <section className="py-24 md:py-40 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">
        {/* 标题 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-index text-accent mb-3">— 02 / Words</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold tracking-tightest text-display-3">
                {locale === 'zh' ? '来自合作者的声音' : 'Words from Collaborators'}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* 引言 */}
        <div className="relative min-h-[280px] md:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <Quote className="h-10 w-10 mx-auto text-accent mb-8" />
              <p className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight max-w-4xl mx-auto">
                "{current.quote[locale]}"
              </p>
              <footer className="mt-10">
                <p className="font-semibold text-base">{current.author}</p>
                <p className="text-sm text-muted-foreground mt-1">{current.role[locale]}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* 索引指示器 */}
        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1 transition-all duration-500 ${
                i === active
                  ? 'w-12 bg-accent'
                  : 'w-6 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
