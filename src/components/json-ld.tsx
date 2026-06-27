// JSON-LD 结构化数据：让搜索引擎理解站点是关于"一位摄影师"的
// 同时支持 Person（作者）+ WebSite（站点本体）+ ImageGallery（作品集）

const baseUrl = 'https://lumen-studio-3b3.pages.dev'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lumen',
  alternateName: 'Lumen Studio',
  jobTitle: 'Photographer',
  url: baseUrl,
  image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  email: 'mailto:hello@lumenstudio.com',
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Shanghai',
      addressCountry: 'CN',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
  ],
  knowsAbout: ['Portrait Photography', 'Landscape Photography', 'Street Photography', 'Commercial Photography'],
  sameAs: [
    'https://instagram.com/',
    'https://behance.net/',
    'https://weibo.com/',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lumen Studio — 摄影作品集',
  alternateName: 'Lumen Studio Photography Portfolio',
  url: baseUrl,
  author: { '@type': 'Person', name: 'Lumen' },
  inLanguage: ['zh-CN', 'en'],
  publisher: { '@type': 'Person', name: 'Lumen' },
}

const imageGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Lumen Studio Selected Works',
  url: `${baseUrl}/#gallery`,
  author: { '@type': 'Person', name: 'Lumen' },
  image: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200',
  ],
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
    </>
  )
}
