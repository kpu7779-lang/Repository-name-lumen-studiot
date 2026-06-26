// 摄影作品数据 Schema 定义

export type Category = 'portrait' | 'landscape' | 'street' | 'commercial'

export const CATEGORIES: Category[] = ['portrait', 'landscape', 'street', 'commercial']

// 双语文本结构
export interface Bilingual {
  zh: string
  en: string
}

// EXIF 拍摄信息
export interface ExifData {
  camera: string
  lens: string
  aperture: string
  shutter: string
  iso: string
  focalLength: string
  date: string // ISO 8601
}

// 作品完整结构
export interface Photo {
  slug: string
  title: Bilingual
  description: Bilingual
  story: Bilingual
  category: Category
  image: string // 主图 URL
  thumbnail?: string // 缩略图（可选，默认用主图）
  width: number
  height: number
  exif: ExifData
  featured: boolean
  order: number // 排序权重
}

// 摄影师设备清单
export interface GearItem {
  type: Bilingual
  model: string
  note: Bilingual
}

// 社交媒体链接
export interface SocialLink {
  platform: string
  label: string
  href: string
}
