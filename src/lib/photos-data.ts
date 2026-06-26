import type { Photo, GearItem, SocialLink } from './types'

// 示例作品数据
// 图片源使用 Unsplash 公开 CDN，next.config.ts 已配置 remotePatterns
export const photos: Photo[] = [
  // ===== Portrait 人像 =====
  {
    slug: 'portrait-misty-gaze',
    title: { zh: '雾中凝视', en: 'Misty Gaze' },
    description: {
      zh: '清晨的薄雾中，模特透过窗棂望向远方，眼神里有一种说不清的疏离与温柔。',
      en: 'Through the morning mist, the model gazes beyond the window with an indescribable blend of distance and tenderness.',
    },
    story: {
      zh: '那是一个深秋的清晨，我们临时改了拍摄计划。雾气在窗外翻涌，她没有化妆，只是安静地坐在那里。我按下快门的那一刻，仿佛时间都慢了下来——这才是我想捕捉的真实。',
      en: 'A late autumn morning, our shoot plan changed last minute. Mist was rolling outside the window, she wore no makeup, just sat there quietly. The moment I pressed the shutter, time seemed to slow—this was the authenticity I wanted to capture.',
    },
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=85',
    width: 1600,
    height: 2400,
    exif: {
      camera: 'Sony A7R V',
      lens: '85mm f/1.4 GM',
      aperture: 'f/1.8',
      shutter: '1/200s',
      iso: '400',
      focalLength: '85mm',
      date: '2024-10-15',
    },
    featured: true,
    order: 1,
  },
  {
    slug: 'portrait-silent-afternoon',
    title: { zh: '沉默的午后', en: 'Silent Afternoon' },
    description: {
      zh: '老式公寓的午后阳光斜斜地洒在地板上，她背对镜头，发丝被光照得发亮。',
      en: 'Afternoon sun slants across the floor of an old apartment, her back to the camera, hair luminous in the light.',
    },
    story: {
      zh: '这是 2017 年我首次个展的同名作品。那时候我刚开始系统性地拍摄人像，想用光线代替语言，让画面自己说话。',
      en: 'The titular work from my 2017 solo exhibition. I was just starting to shoot portraits systematically, wanting light to speak where words could not.',
    },
    category: 'portrait',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1600&q=85',
    width: 1600,
    height: 1067,
    exif: {
      camera: 'Leica M11',
      lens: '50mm Summilux ASPH',
      aperture: 'f/2.0',
      shutter: '1/125s',
      iso: '200',
      focalLength: '50mm',
      date: '2017-04-22',
    },
    featured: true,
    order: 2,
  },

  // ===== Landscape 风光 =====
  {
    slug: 'landscape-homeward-mist',
    title: { zh: '雾中归途', en: 'Homeward in the Mist' },
    description: {
      zh: '川西高原的清晨，云海翻腾如墨，一条小路蜿蜒伸向远方的村庄。',
      en: 'A morning in western Sichuan, clouds churn like ink, a small road winds toward a distant village.',
    },
    story: {
      zh: '这是被《国家地理》中文版收录的那张照片。我们凌晨四点出发，在海拔 4500 米的山口等了三个小时，直到第一缕阳光刺破云海。手指冻得几乎按不动快门，但一切都值得。',
      en: 'The photograph featured in National Geographic China. We left at 4 AM, waited three hours at a 4,500-meter pass until the first sunlight pierced the sea of clouds. Fingers nearly too numb to press the shutter, but it was all worth it.',
    },
    category: 'landscape',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85',
    width: 1600,
    height: 1067,
    exif: {
      camera: 'Fujifilm GFX 100S',
      lens: '23-63mm f/4',
      aperture: 'f/11',
      shutter: '1/60s',
      iso: '100',
      focalLength: '32mm',
      date: '2019-08-03',
    },
    featured: true,
    order: 3,
  },
  {
    slug: 'landscape-northern-lights',
    title: { zh: '极光之夜', en: 'Aurora Night' },
    description: {
      zh: '冰岛南部的黑沙滩上空，绿色极光如丝带般舞动，与远处的灯塔遥相呼应。',
      en: 'Above the black sand beaches of southern Iceland, green aurora dances like ribbons, echoing a distant lighthouse.',
    },
    story: {
      zh: '零下 15 度的夜晚，我们等了整整 6 个小时。当极光真正爆发的那一刻，整个天空都在燃烧，那是一种让人忘记呼吸的壮丽。',
      en: 'A −15°C night, we waited six full hours. When the aurora finally erupted, the entire sky seemed to burn—a magnificence that makes you forget to breathe.',
    },
    category: 'landscape',
    image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1600&q=85',
    width: 1600,
    height: 1067,
    exif: {
      camera: 'Sony A7S III',
      lens: '14mm f/1.8 GM',
      aperture: 'f/1.8',
      shutter: '8s',
      iso: '3200',
      focalLength: '14mm',
      date: '2023-02-18',
    },
    featured: false,
    order: 8,
  },

  // ===== Street 街拍 =====
  {
    slug: 'street-tokyo-rain',
    title: { zh: '东京雨夜', en: 'Tokyo Rainy Night' },
    description: {
      zh: '新宿的霓虹灯倒映在湿漉漉的路面上，路人撑伞匆匆走过，构成一幅流动的城市肖像。',
      en: 'Shinjuku neon reflects on wet pavement, pedestrians hurry by with umbrellas, forming a flowing portrait of the city.',
    },
    story: {
      zh: '我喜欢雨天。雨水会把一座城市变成它的镜像，所有光影都被复制一次，世界的密度瞬间加倍。这张照片在京都国际写真节上展出过。',
      en: 'I love rainy days. Water turns a city into its own mirror, every light and shadow duplicated, the density of the world instantly doubled. This piece was shown at Kyotographie.',
    },
    category: 'street',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=85',
    width: 1600,
    height: 2400,
    exif: {
      camera: 'Ricoh GR IIIx',
      lens: '28mm f/2.8 (fixed)',
      aperture: 'f/2.8',
      shutter: '1/60s',
      iso: '1600',
      focalLength: '28mm',
      date: '2022-11-09',
    },
    featured: true,
    order: 4,
  },
  {
    slug: 'street-shanghai-morning',
    title: { zh: '上海清晨', en: 'Shanghai Morning' },
    description: {
      zh: '老弄堂里，一位老人推着自行车缓缓走过，墙壁上的斑驳诉说着时光的故事。',
      en: 'In an old lane, an elder walks slowly with a bicycle, mottled walls telling stories of passing time.',
    },
    story: {
      zh: '我家附近的一条弄堂，几年前已经拆了。这种平凡的市井画面，回头看才是真正的城市记忆。',
      en: 'A lane near my home, demolished a few years ago. These ordinary everyday scenes, in hindsight, are the true memory of a city.',
    },
    category: 'street',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=85',
    width: 1600,
    height: 1067,
    exif: {
      camera: 'Leica Q2',
      lens: '28mm Summilux (fixed)',
      aperture: 'f/4',
      shutter: '1/250s',
      iso: '200',
      focalLength: '28mm',
      date: '2021-05-17',
    },
    featured: false,
    order: 7,
  },

  // ===== Commercial 商业 =====
  {
    slug: 'commercial-muji-still-life',
    title: { zh: '器物之美', en: 'Beauty of Objects' },
    description: {
      zh: '一组为生活方式品牌拍摄的产品静物，木质、麻布与金属在自然光下相互呼应。',
      en: 'A still life series for a lifestyle brand, wood, linen and metal converse under natural light.',
    },
    story: {
      zh: '商业摄影的难点在于：既要呈现产品本身的质感，又不能让画面变成产品目录。我倾向于用环境光和真实材质的搭配，让产品"活在"画面里。',
      en: 'The challenge of commercial photography: show the product\'s true texture without reducing the image to a catalog. I lean on ambient light and real materials to make products "live" within the frame.',
    },
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=85',
    width: 1600,
    height: 1067,
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: '90mm f/2.5 V',
      aperture: 'f/8',
      shutter: '1/125s',
      iso: '100',
      focalLength: '90mm',
      date: '2024-06-12',
    },
    featured: true,
    order: 5,
  },
  {
    slug: 'commercial-nike-motion',
    title: { zh: '运动之诗', en: 'Poetry of Motion' },
    description: {
      zh: '为运动品牌拍摄的系列广告，用高速快门凝固运动员的爆发瞬间。',
      en: 'A campaign series for a sportswear brand, freezing explosive athletic moments with high-speed shutter.',
    },
    story: {
      zh: '商业广告往往追求"完美"，但我偏爱在完美中保留一点粗粝——汗水、飞尘、轻微的失焦，这些"瑕疵"反而让画面有生命。',
      en: 'Commercial ads often chase "perfection", but I prefer to leave a touch of grit—sweat, dust, slight defocus. These "imperfections" give the image life.',
    },
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=85',
    width: 1600,
    height: 2400,
    exif: {
      camera: 'Sony A1',
      lens: '70-200mm f/2.8 GM II',
      aperture: 'f/2.8',
      shutter: '1/2000s',
      iso: '800',
      focalLength: '135mm',
      date: '2023-09-28',
    },
    featured: false,
    order: 6,
  },
]

// 摄影师设备清单
export const gearList: GearItem[] = [
  {
    type: { zh: '主力机身', en: 'Primary Body' },
    model: 'Sony A7R V',
    note: { zh: '日常与商业拍摄主力，6100 万像素够用且后制空间大。', en: 'Daily and commercial workhorse, 61MP with generous post-processing room.' },
  },
  {
    type: { zh: '中画幅', en: 'Medium Format' },
    model: 'Fujifilm GFX 100S',
    note: { zh: '风光与艺术项目专用，1 亿像素的细节无可替代。', en: 'For landscape and art projects, 100MP detail is irreplaceable.' },
  },
  {
    type: { zh: '街拍相机', en: 'Street Camera' },
    model: 'Ricoh GR IIIx',
    note: { zh: '口袋机，永远随身携带，28mm 焦段最自然。', en: 'Pocket camera, always with me, 28mm is the most natural focal length.' },
  },
  {
    type: { zh: '人像镜头', en: 'Portrait Lens' },
    model: 'Sony 85mm f/1.4 GM',
    note: { zh: '人像黄金焦段，散景如奶油般化开。', en: 'The golden portrait focal length, bokeh melts like butter.' },
  },
  {
    type: { zh: '广角镜头', en: 'Wide Lens' },
    model: 'Sony 14mm f/1.8 GM',
    note: { zh: '极光与星空摄影利器，f/1.8 大光圈是关键。', en: 'Essential for aurora and astrophotography, f/1.8 is the key.' },
  },
  {
    type: { zh: '胶片机', en: 'Film Camera' },
    model: 'Pentax K1000',
    note: { zh: '一切开始的地方，每年都会拿出来拍一卷。', en: 'Where everything began, I shoot a roll every year.' },
  },
]

// 社交媒体链接
export const socialLinks: SocialLink[] = [
  { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
  { platform: 'behance', label: 'Behance', href: 'https://behance.net/' },
  { platform: 'weibo', label: '微博', href: 'https://weibo.com/' },
  { platform: 'email', label: 'Email', href: 'mailto:hello@lumenstudio.com' },
]
