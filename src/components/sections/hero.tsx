'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const t = useTranslations('hero')
  const containerRef = React.useRef<HTMLElement>(null)

  // 视差滚动
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -150])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const titleLines = t('title').split('\n')

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-background pt-16"
    >
      {/* 顶部序号 + 元信息 */}
      <div className="absolute top-20 left-0 right-0 z-20 px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-start text-eyebrow text-muted-foreground">
          <div className="space-y-1">
            <p className="text-accent">— Lumen Studio</p>
            <p>{t('subtitle')}</p>
          </div>
          <div className="text-right space-y-1 hidden sm:block">
            <p>Portfolio · 2014 — 2025</p>
            <p>Shanghai / Tokyo</p>
          </div>
        </div>
      </div>

      {/* 中间巨型标题 */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4"
      >
        <h1 className="font-display font-bold tracking-tightest text-center text-display-1 leading-[0.9]">
          {titleLines.map((line, i) => (
            <React.Fragment key={i}>
              <span className="line-mask">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0' }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
              {i < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 max-w-xl text-center text-base md:text-lg text-foreground/70 leading-relaxed"
        >
          {t('description')}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-6"
        >
          <button
            onClick={() => scrollTo('#gallery')}
            data-cursor="hover"
            className="group relative text-sm font-medium uppercase tracking-widest"
          >
            <span className="relative z-10">{t('cta')}</span>
            <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground group-hover:bg-accent transition-colors" />
          </button>
          <span className="text-muted-foreground/40">·</span>
          <button
            onClick={() => scrollTo('#about')}
            data-cursor="hover"
            className="group relative text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('ctaSecondary')}
          </button>
        </motion.div>
      </motion.div>

      {/* 左下角小图（视差） */}
      <motion.div
        style={{ y: yLeft }}
        className="absolute bottom-12 left-4 sm:left-8 lg:left-12 w-32 sm:w-48 lg:w-64 z-10 hidden md:block"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
            alt="Portrait work"
            fill
            priority
            sizes="256px"
            className="object-cover img-grayscale"
          />
        </div>
        <p className="mt-2 text-index text-muted-foreground">
          001 / Portrait
        </p>
      </motion.div>

      {/* 右下角小图（视差反向） */}
      <motion.div
        style={{ y: yRight }}
        className="absolute bottom-12 right-4 sm:right-8 lg:right-12 w-32 sm:w-48 lg:w-64 z-10 hidden md:block"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
            alt="Landscape work"
            fill
            priority
            sizes="256px"
            className="object-cover img-grayscale"
          />
        </div>
        <p className="mt-2 text-index text-muted-foreground text-right">
          002 / Landscape
        </p>
      </motion.div>

      {/* 滚动提示 */}
      <motion.button
        onClick={() => scrollTo('#gallery')}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-index">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}
