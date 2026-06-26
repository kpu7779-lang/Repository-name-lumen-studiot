'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { getFeaturedPhotos } from '@/lib/photos'
import { useI18n } from '@/i18n/provider'
import type { Photo } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

interface FeaturedGalleryProps {
  onSelectPhoto: (photo: Photo) => void
}

export function FeaturedGallery({ onSelectPhoto }: FeaturedGalleryProps) {
  const t = useTranslations('gallery')
  const tCat = useTranslations('categories')
  const { locale } = useI18n()
  const photos = React.useMemo(() => getFeaturedPhotos(4), [])

  const scrollToGallery = () => {
    const el = document.querySelector('#gallery')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // 杂志式不规则布局：4 张图分别用不同的尺寸与位置
  const layoutClasses = [
    'md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-[4/5]',
    'md:col-span-5 aspect-[4/3]',
    'md:col-span-5 aspect-[4/3]',
    'md:col-span-7 aspect-[16/10]',
  ]

  return (
    <section className="py-24 md:py-40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* 标题区：序号 + 巨标题 + 描述 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-index text-accent mb-3">— 01 / Featured</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold tracking-tightest text-display-3 mb-6">
                {t('title')}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t('subtitle')} — {locale === 'zh' ? '从十年作品中精选，每一张都是一个完整的故事。' : 'A curated selection from a decade of work — each frame, a complete story.'}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 杂志式不对称网格 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {photos.map((photo, idx) => (
            <Reveal
              key={photo.slug}
              delay={idx * 0.1}
              className={cn('group', layoutClasses[idx])}
            >
              <button
                onClick={() => onSelectPhoto(photo)}
                data-cursor="view"
                className="relative w-full h-full overflow-hidden bg-muted block"
              >
                <Image
                  src={photo.image}
                  alt={photo.title[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover img-grayscale group-hover:scale-105"
                />
                {/* 顶部序号 */}
                <div className="absolute top-4 left-4 text-index text-background/80 mix-blend-difference">
                  0{idx + 1}
                </div>
                {/* 右上角箭头 */}
                <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/0 group-hover:bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight className="h-4 w-4 text-foreground" />
                </div>
                {/* 底部信息层 */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div>
                      <p className="text-index text-background/70 mb-1">
                        {tCat(photo.category)}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-background">
                        {photo.title[locale]}
                      </h3>
                    </div>
                    <span className="text-index text-background/60 hidden sm:block">
                      {photo.exif.date}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* 底部 CTA */}
        <Reveal delay={0.2}>
          <div className="mt-16 md:mt-24 flex justify-center">
            <button
              onClick={scrollToGallery}
              data-cursor="hover"
              className="group flex items-center gap-3 text-sm font-medium uppercase tracking-widest"
            >
              <span className="relative">
                {locale === 'zh' ? '查看全部作品' : 'View All Works'}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground group-hover:bg-accent transition-colors" />
              </span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
