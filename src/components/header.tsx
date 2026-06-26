'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Menu, Sun, Moon, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useI18n } from '@/i18n/provider'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { key: 'home', href: '#home', num: '01' },
  { key: 'gallery', href: '#gallery', num: '02' },
  { key: 'about', href: '#about', num: '05' },
  { key: 'contact', href: '#contact', num: '07' },
] as const

export function Header() {
  const t = useTranslations('nav')
  const { locale, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border/60 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex h-10 items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            data-cursor="hover"
            className="flex items-center gap-2 group"
          >
            <span className="font-display text-xl font-bold tracking-tightest">
              Lumen
              <span className="text-accent">·</span>Studio
            </span>
          </Link>

          {/* 桌面导航：序号 + 文字 */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-cursor="hover"
                className="group flex items-baseline gap-1.5 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                <span className="text-[10px] text-accent font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.num}
                </span>
                <span>{t(item.key)}</span>
              </a>
            ))}
          </div>

          {/* 右侧工具栏 */}
          <div className="flex items-center gap-1">
            {/* 语言切换 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" data-cursor="hover">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">{t('language')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLocale('zh')}
                  className={cn(locale === 'zh' && 'bg-accent/20')}
                >
                  中文
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLocale('en')}
                  className={cn(locale === 'en' && 'bg-accent/20')}
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 主题切换 */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              data-cursor="hover"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="sr-only">{t('theme')}</span>
            </Button>

            {/* 移动端汉堡菜单 */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="font-display text-left">
                    Lumen<span className="text-accent">·</span>Studio
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 mt-8">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-baseline gap-3 px-4 py-4 hover:bg-accent/10 rounded-md transition-colors"
                    >
                      <span className="text-[10px] text-accent font-mono">{item.num}</span>
                      <span className="text-base font-medium">{t(item.key)}</span>
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
