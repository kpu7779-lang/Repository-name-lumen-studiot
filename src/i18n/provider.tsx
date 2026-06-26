'use client'

import * as React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { type Locale, defaultLocale, type Messages } from './types'
import zhMessages from '@/messages/zh.json'
import enMessages from '@/messages/en.json'

const messageMap: Record<Locale, Messages> = {
  zh: zhMessages as unknown as Messages,
  en: enMessages as unknown as Messages,
}

const STORAGE_KEY = 'lumen-locale'

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // SSR 初始值统一用 defaultLocale，避免 hydration mismatch
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale)
  const [mounted, setMounted] = React.useState(false)

  // 客户端挂载后从 localStorage 读取偏好
  React.useEffect(() => {
    const stored = (typeof window !== 'undefined'
      ? (window.localStorage.getItem(STORAGE_KEY) as Locale | null)
      : null)
    if (stored === 'zh' || stored === 'en') {
      setLocaleState(stored)
    } else if (typeof navigator !== 'undefined') {
      // 没有显式偏好时，根据浏览器语言推断
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('en')) {
        setLocaleState('en')
      }
    }
    setMounted(true)
  }, [])

  // 同步 <html lang> 属性，对 SEO 与无障碍都很重要
  React.useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    }
  }, [locale, mounted])

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === 'zh' ? 'en' : 'zh')
  }, [locale, setLocale])

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  )

  return (
    <I18nContext.Provider value={value}>
      <NextIntlClientProvider
        locale={locale}
        messages={messageMap[locale]}
        timeZone={locale === 'zh' ? 'Asia/Shanghai' : 'UTC'}
      >
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}
