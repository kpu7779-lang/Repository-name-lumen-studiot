'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera, Aperture, Clock, Gauge, Calendar, Focus } from 'lucide-react'
import { useI18n } from '@/i18n/provider'
import type { Photo } from '@/lib/types'
import { getAllPhotos } from '@/lib/photos'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { VisuallyHidden } from '@/components/ui/visually-hidden'

interface LightboxProps {
  photo: Photo | null
  onClose: () => void
  onSelect: (photo: Photo) => void
}

export function Lightbox({ photo, onClose, onSelect }: LightboxProps) {
  const t = useTranslations('gallery')
  const tCat = useTranslations('categories')
  const { locale } = useI18n()

  const photos = React.useMemo(() => getAllPhotos(), [])
  const currentIndex = photo ? photos.findIndex((p) => p.slug === photo.slug) : -1

  const goPrev = React.useCallback(() => {
    if (currentIndex > 0) onSelect(photos[currentIndex - 1])
  }, [currentIndex, photos, onSelect])

  const goNext = React.useCallback(() => {
    if (currentIndex >= 0 && currentIndex < photos.length - 1) onSelect(photos[currentIndex + 1])
  }, [currentIndex, photos, onSelect])

  // 键盘导航
  React.useEffect(() => {
    if (!photo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    // 锁定滚动
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [photo, onClose, goPrev, goNext])

  if (!photo) return null

  const exifItems = [
    { icon: Camera, label: t('camera'), value: photo.exif.camera },
    { icon: Focus, label: t('lens'), value: `${photo.exif.focalLength} · ${photo.exif.lens}` },
    { icon: Aperture, label: t('aperture'), value: photo.exif.aperture },
    { icon: Clock, label: t('shutter'), value: photo.exif.shutter },
    { icon: Gauge, label: t('iso'), value: photo.exif.iso },
    { icon: Calendar, label: t('date'), value: photo.exif.date },
  ]

  return (
    <Dialog open={!!photo} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[95vw] md:max-w-[1200px] max-h-[95vh] md:max-h-[90vh] p-0 gap-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>{photo.title[locale]}</DialogTitle>
          <DialogDescription>{photo.description[locale]}</DialogDescription>
        </VisuallyHidden>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[95vh] md:h-[90vh]">
          {/* 左侧：图片 */}
          <div className="relative bg-foreground/5 flex items-center justify-center p-2 md:p-4">
            <motion.div
              key={photo.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
              style={{
                maxWidth: `calc((100%) * ${photo.width / photo.height})`,
                aspectRatio: `${photo.width} / ${photo.height}`,
              }}
            >
              <Image
                src={photo.image}
                alt={photo.title[locale]}
                fill
                sizes="(max-width: 1024px) 95vw, 60vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* 上一张/下一张按钮 */}
            {currentIndex > 0 && (
              <button
                onClick={goPrev}
                aria-label={t('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 backdrop-blur hover:bg-background flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {currentIndex >= 0 && currentIndex < photos.length - 1 && (
              <button
                onClick={goNext}
                aria-label={t('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 backdrop-blur hover:bg-background flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              aria-label={t('close')}
              className="absolute top-3 right-3 h-11 w-11 rounded-full bg-background/80 backdrop-blur hover:bg-background flex items-center justify-center shadow-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 右侧：信息面板 */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-6 border-l border-border/50">
            <div>
              <Badge variant="secondary" className="mb-3">
                {tCat(photo.category)}
              </Badge>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                {photo.title[locale]}
              </h2>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {photo.description[locale]}
            </p>

            {/* 作品故事 */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-accent">
                {t('story')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{photo.story[locale]}"
              </p>
            </div>

            {/* EXIF 信息 */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t('exif')}
              </h3>
              <dl className="space-y-2">
                {exifItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <item.icon className="h-3.5 w-3.5" />
                      {item.label}
                    </dt>
                    <dd className="font-mono text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* 导航提示 */}
            <div className="flex justify-between pt-4 border-t border-border text-xs text-muted-foreground">
              <span>
                {currentIndex + 1} / {photos.length}
              </span>
              <span className="hidden md:inline">
                ← → {t('prev')}/{t('next')} · ESC {t('close')}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
