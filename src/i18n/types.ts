// 国际化类型定义

export const locales = ['zh', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'zh'

// 消息 schema：与 messages/zh.json、messages/en.json 一一对应
export type Messages = typeof import('@/messages/zh.json')
