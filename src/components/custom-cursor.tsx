'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 350, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 350, mass: 0.4 })

  const [variant, setVariant] = React.useState<'default' | 'hover' | 'view'>('default')
  const [hidden, setHidden] = React.useState(true)
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    // 仅在桌面启用
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return
    setEnabled(true)
    document.body.classList.add('cursor-hidden')

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setHidden(false)

      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="view"]')) {
        setVariant('view')
      } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setVariant('hover')
      } else {
        setVariant('default')
      }
    }
    const onLeave = () => setHidden(true)

    window.addEventListener('mousemove', onMove)
    document.body.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('cursor-hidden')
    }
  }, [cursorX, cursorY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        opacity: hidden ? 0 : 1,
      }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center"
        animate={{
          width: variant === 'view' ? 88 : variant === 'hover' ? 56 : 14,
          height: variant === 'view' ? 88 : variant === 'hover' ? 56 : 14,
          marginLeft: variant === 'view' ? -44 : variant === 'hover' ? -28 : -7,
          marginTop: variant === 'view' ? -44 : variant === 'hover' ? -28 : -7,
          backgroundColor: variant === 'view' ? '#d4a574' : '#ffffff',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      >
        {variant === 'view' && (
          <span className="text-[10px] uppercase tracking-widest text-black font-medium">
            View
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
