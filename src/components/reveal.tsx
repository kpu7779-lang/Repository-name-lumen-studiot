'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

// 滚动进入视口时的淡入上移动画
export function Reveal({ children, className, delay = 0, y = 30, once = true }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// 文字行 masking 动画：每行从下方滑入
export function RevealText({
  children,
  className,
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  const lines = children.split('\n')

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: '0' } : { y: '110%' }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Stagger：子元素依次淡入
export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  y = 30,
}: {
  children: React.ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
