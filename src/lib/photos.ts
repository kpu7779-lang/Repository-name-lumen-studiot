import { photos, gearList, socialLinks } from './photos-data'
import type { Photo, Category, GearItem, SocialLink } from './types'

// 获取所有作品（按 order 排序）
export function getAllPhotos(): Photo[] {
  return [...photos].sort((a, b) => a.order - b.order)
}

// 获取精选作品
export function getFeaturedPhotos(limit?: number): Photo[] {
  const featured = photos.filter((p) => p.featured).sort((a, b) => a.order - b.order)
  return limit ? featured.slice(0, limit) : featured
}

// 按分类获取作品
export function getPhotosByCategory(category: Category | 'all'): Photo[] {
  const sorted = [...photos].sort((a, b) => a.order - b.order)
  if (category === 'all') return sorted
  return sorted.filter((p) => p.category === category)
}

// 按 slug 查询单个作品
export function getPhotoBySlug(slug: string): Photo | undefined {
  return photos.find((p) => p.slug === slug)
}

// 获取相邻作品（用于详情页上一张/下一张导航）
export function getAdjacentPhotos(slug: string): {
  prev: Photo | null
  next: Photo | null
} {
  const sorted = getAllPhotos()
  const index = sorted.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  }
}

// 获取所有分类及每类数量
export function getCategoryCounts(): { category: Category | 'all'; count: number }[] {
  const counts = [
    { category: 'all' as const, count: photos.length },
    { category: 'portrait' as const, count: photos.filter((p) => p.category === 'portrait').length },
    { category: 'landscape' as const, count: photos.filter((p) => p.category === 'landscape').length },
    { category: 'street' as const, count: photos.filter((p) => p.category === 'street').length },
    { category: 'commercial' as const, count: photos.filter((p) => p.category === 'commercial').length },
  ]
  return counts
}

// 获取设备清单
export function getGearList(): GearItem[] {
  return gearList
}

// 获取社交链接
export function getSocialLinks(): SocialLink[] {
  return socialLinks
}

// 摄影师统计
export function getStats() {
  return {
    years: 10,
    countries: 23,
    projects: 156,
    awards: 7,
  }
}
