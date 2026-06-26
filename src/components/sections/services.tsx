'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useI18n } from '@/i18n/provider'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    id: 'essential',
    name: { zh: '基础拍摄', en: 'Essential' },
    price: { zh: '¥3,800', en: '¥3,800' },
    unit: { zh: '/ 半天', en: '/ half day' },
    description: {
      zh: '适合个人形象、小型品牌内容需求的轻量级拍摄方案。',
      en: 'A lightweight package for personal branding and small brand content needs.',
    },
    features: {
      zh: ['3 小时拍摄', '30 张精修图', '在线选片平台', '商业使用权', '7 个工作日交付'],
      en: ['3-hour shoot', '30 retouched photos', 'Online proofing gallery', 'Commercial usage rights', '7-day delivery'],
    },
    highlighted: false,
  },
  {
    id: 'professional',
    name: { zh: '专业项目', en: 'Professional' },
    price: { zh: '¥12,800', en: '¥12,800' },
    unit: { zh: '/ 全天', en: '/ full day' },
    description: {
      zh: '为品牌 campaign、商业广告、编辑专题设计的全日拍摄方案。',
      en: 'A full-day package designed for brand campaigns, commercials, and editorial features.',
    },
    features: {
      zh: ['8 小时拍摄', '80 张精修图', '专业助理团队', '场地与道具统筹', '5 天交付', '一年版权使用'],
      en: ['8-hour shoot', '80 retouched photos', 'Assistant team', 'Location & props coordination', '5-day delivery', '1-year usage rights'],
    },
    highlighted: true,
  },
  {
    id: 'campaign',
    name: { zh: '品牌 Campaign', en: 'Brand Campaign' },
    price: { zh: '定制报价', en: 'Custom' },
    unit: { zh: '/ 项目', en: '/ project' },
    description: {
      zh: '跨国品牌 campaign、年度视觉系统、长期合作的艺术指导服务。',
      en: 'Cross-border campaigns, annual visual systems, and long-term art direction partnerships.',
    },
    features: {
      zh: ['多日多地拍摄', '完整视觉系统', '艺术指导服务', '视频与平面双轨', '专属制作团队', '优先档期'],
      en: ['Multi-day, multi-location', 'Complete visual system', 'Art direction', 'Photo + video dual track', 'Dedicated production team', 'Priority booking'],
    },
    highlighted: false,
  },
]

export function Services() {
  const { locale } = useI18n()

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-24 md:py-40 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* 标题 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-index text-accent mb-3">— 03 / Services</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold tracking-tightest text-display-3 mb-6">
                {locale === 'zh' ? '服务与报价' : 'Services & Pricing'}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {locale === 'zh'
                  ? '从个人创作到品牌 Campaign，提供完整的视觉解决方案。所有方案均可定制。'
                  : 'From individual commissions to brand campaigns — complete visual solutions. All packages are customizable.'}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 三档报价 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'relative h-full p-8 md:p-10 flex flex-col border',
                  service.highlighted
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-background text-foreground border-border hover:border-accent/50',
                )}
              >
                {service.highlighted && (
                  <span className="absolute top-6 right-6 text-index text-accent uppercase">
                    {locale === 'zh' ? '推荐' : 'Popular'}
                  </span>
                )}

                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {service.name[locale]}
                </h3>
                <p className={cn(
                  'text-sm leading-relaxed mb-8',
                  service.highlighted ? 'text-background/70' : 'text-muted-foreground',
                )}>
                  {service.description[locale]}
                </p>

                <div className="mb-8 pb-8 border-b border-current/15">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl md:text-5xl font-bold">
                      {service.price[locale]}
                    </span>
                    <span className={cn(
                      'text-sm',
                      service.highlighted ? 'text-background/60' : 'text-muted-foreground',
                    )}>
                      {service.unit[locale]}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {service.features[locale].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className={cn(
                        'h-4 w-4 mt-0.5 shrink-0',
                        service.highlighted ? 'text-accent' : 'text-accent',
                      )} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  data-cursor="hover"
                  className={cn(
                    'group flex items-center justify-between gap-2 pt-6 border-t border-current/15 text-sm font-medium uppercase tracking-widest',
                  )}
                >
                  <span>{locale === 'zh' ? '咨询预约' : 'Inquire'}</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
