'use client'

import * as React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ScrollProgress } from '@/components/scroll-progress'
import { CustomCursor } from '@/components/custom-cursor'
import { Hero } from '@/components/sections/hero'
import { Marquee } from '@/components/sections/marquee'
import { FeaturedGallery } from '@/components/sections/featured-gallery'
import { AboutPreview } from '@/components/sections/about-preview'
import { Gallery } from '@/components/sections/gallery'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Lightbox } from '@/components/lightbox'
import type { Photo } from '@/lib/types'

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <FeaturedGallery onSelectPhoto={setSelectedPhoto} />
        <AboutPreview />
        <Gallery onSelectPhoto={setSelectedPhoto} />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Lightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onSelect={setSelectedPhoto}
      />
    </div>
  )
}
