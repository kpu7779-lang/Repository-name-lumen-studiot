'use client'

import { useTranslations } from 'next-intl'

// 便捷 hook：默认无 namespace，调用方传入 namespace 即可
export function useT(namespace?: string) {
  return useTranslations(namespace)
}
