'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getPhotosByCategory, getCategoryCounts } from '@/lib/photos'
import { useI18n } from '@/i18n/provider'
import type { Photo, Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/reveal'

interface GalleryProps {
  onSelectPhoto: (photo: Photo) => void
}

type Filter = Category | 'all'

export function Gallery({ onSelectPhoto }: GalleryProps) {
  const t = useTranslations('gallery')
  const tCat = useTranslations('categories')
  const { locale } = useI18n()
  const [filter, setFilter] = React.useState<Filter>('all')

  const counts = React.useMemo(() => getCategoryCounts(), [])
  const photos = React.useMemo(() => getPhotosByCategory(filter), [filter])

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: t('filterAll'), count: counts[0].count },
    { key: 'portrait', label: t('filterPortrait'), count: counts[1].count },
    { key: 'landscape', label: t('filterLandscape'), count: counts[2].count },
    { key: 'street', label: t('filterStreet'), count: counts[3].count },
    { key: 'commercial', label: t('filterCommercial'), count: counts[4].count },
  ]

  return (
    <section id="gallery" className="py-24 md:py-40 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* 标题 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-20">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-index text-accent mb-3">— 04 / Portfolio</p>
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

        {/* 分类筛选 */}
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-cursor="hover"
                className={cn(
                  'group relative px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors',
                  filter === f.key
                    ? 'text-background'
                    : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="gallery-filter-bg"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                  />
                )}
                <span className="relative z-10">
                  {f.label}
                  <span className="ml-2 opacity-50 text-xs">{f.count}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* 瀑布流网格 */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 [column-fill:_balance]"
        >
          <AnimatePresence mode="popLayout">
            {photos.map((photo, idx) => (
              <motion.button
                key={photo.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectPhoto(photo)}
                data-cursor="view"
                className="group relative w-full mb-4 md:mb-6 break-inside-avoid overflow-hidden bg-muted block"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <Image
                  src={photo.image}
                  alt={photo.title[locale]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover img-grayscale group-hover:scale-105"
                />
                {/* 顶部序号 */}
                <div className="absolute top-3 left-3 text-index text-background/80 mix-blend-difference">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                {/* 底部信息层 */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-index text-background/70 mb-1">
                      {tCat(photo.category)}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-background">
                      {photo.title[locale]}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
