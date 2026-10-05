'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface MediaItem {
  _id: string
  title: string
  coverImage?: any
  image?: any
  gallery?: any[]
  videoUrl?: string
  categoryTitle: string
  tags?: string[]
  description?: string
  date?: string
}

interface ExperienceItem {
  _id: string
  company: string
  role: string
  period: string
  description: string
}

export default function HomePage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [experiences, setExperiences] = useState<ExperienceItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<MediaItem | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const mediaQuery = `*[_type == "mediaItem"] | order(date desc, _createdAt desc) {
        _id,
        title,
        coverImage,
        image,
        gallery,
        videoUrl,
        "categoryTitle": category->title,
        tags,
        description,
        date
      }`

      const expQuery = `*[_type == "experience"] | order(order asc, _createdAt desc) {
        _id,
        company,
        role,
        period,
        description
      }`

      try {
        const [mediaData, expData] = await Promise.all([
          client.fetch(mediaQuery, {}, { cache: 'no-store' }),
          client.fetch(expQuery, {}, { cache: 'no-store' }),
        ])
        setMediaItems(mediaData)
        setExperiences(expData)
      } catch (error) {
        console.error('Error fetching data from Sanity:', error)
      }
    }
    fetchData()
  }, [])

  const phoneNumber = '6281312811549'
  const defaultMessage = encodeURIComponent(
    'Halo Arya, saya lihat portofolio kamu dan tertarik untuk berdiskusi/kerjasama.'
  )
  const waLink = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    try {
      const dateObj = new Date(dateString)
      return dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const getYouTubeId = (url?: string) => {
    if (!url) return null
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[1].length === 11 ? match[1] : null
  }

  const getYouTubeEmbedUrl = (url?: string) => {
    const videoId = getYouTubeId(url)
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null
  }

  const getYouTubeThumbnail = (url?: string) => {
    const videoId = getYouTubeId(url)
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null
  }

  const defaultExperiences: ExperienceItem[] = [
    {
      _id: 'exp-1',
      company: 'Cube Studio',
      role: 'Internship — Editor / Videographer / Photographer',
      period: '2026 - Present',
      description:
        'Managing social media content creation and visual production for Lighting Kungfu, a lighting design software project under Mindlabs Hong Kong Limited. Responsible for shooting, editing, and crafting high-engaging visual assets.',
    },
    {
      _id: 'exp-2',
      company: 'LimaPagi Studio',
      role: 'Co-Founder & Art Director',
      period: '2026 - Present',
      description:
        'Overseeing visual branding, leading on-field photo-video production, and managing post-production editing workflow for corporate and commercial clients.',
    },
    {
      _id: 'exp-3',
      company: 'HIMATREDIA Telkom University',
      role: 'Deputy Head of Media Department',
      period: '2025',
      description:
        'Directed the "Karsa Karya 2025" video profile and managed multi-platform organization content strategies, photoshoot technicalities, and media execution.',
    },
    {
      _id: 'exp-4',
      company: 'GLG Webinar HIMATREDIA',
      role: 'Head of Publication & Documentation',
      period: '2025',
      description:
        'Supervised event visual identity, social media promo assets, and operated the live webinar broadcasting production system.',
    },
  ]

  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        mediaItems
          .map((item) => item.categoryTitle)
          .filter((cat): cat is string => Boolean(cat))
      )
    )
    return ['All', ...uniqueCategories]
  }, [mediaItems])

  const filteredMediaItems = useMemo(() => {
    if (selectedCategory === 'All') return mediaItems
    return mediaItems.filter((item) => item.categoryTitle === selectedCategory)
  }, [mediaItems, selectedCategory])

  const getProjectImages = (project: MediaItem) => {
    const images: any[] = []
    const mainImg = project.coverImage || project.image
    if (mainImg) images.push(mainImg)
    if (project.gallery && Array.isArray(project.gallery)) {
      project.gallery.forEach((img) => {
        if (img) images.push(img)
      })
    }
    return images
  }

  const currentImages = selectedProject ? getProjectImages(selectedProject) : []
  const embedVideoUrl = selectedProject ? getYouTubeEmbedUrl(selectedProject.videoUrl) : null

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 select-none relative overflow-hidden">
      
      {/* SOFT SLOW BREATHING / REDUP-NYALA AMBIENT BLOBS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Breathing Orb 1 - Top Center */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] md:w-[850px] h-[450px] bg-gradient-to-b from-orange-500/25 via-amber-600/15 to-transparent rounded-full blur-[140px] animate-pulse duration-[7000ms]" />
        
        {/* Breathing Orb 2 - Left Mid */}
        <div className="absolute top-[35%] -left-32 w-[500px] md:w-[600px] h-[500px] bg-gradient-to-tr from-orange-600/20 via-amber-500/10 to-transparent rounded-full blur-[150px] animate-pulse duration-[9000ms]" />
        
        {/* Breathing Orb 3 - Right Mid */}
        <div className="absolute top-[60%] -right-32 w-[550px] md:w-[650px] h-[550px] bg-gradient-to-bl from-amber-500/20 via-orange-500/15 to-transparent rounded-full blur-[150px] animate-pulse duration-[8000ms]" />

        {/* Breathing Orb 4 - Bottom Accent */}
        <div className="absolute top-[85%] left-1/3 w-[600px] h-[400px] bg-gradient-to-t from-orange-500/15 via-amber-600/10 to-transparent rounded-full blur-[160px] animate-pulse duration-[10000ms]" />
      </div>

      <div className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="min-h-screen w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 relative py-8 md:py-0">
          <div className="flex-1 space-y-6 text-center md:text-left z-10 flex flex-col items-center md:items-start justify-center my-auto">
            
            {/* AVATAR MOBILE */}
            <div className="md:hidden relative w-24 h-24 rounded-full p-1 bg-gradient-to-b from-orange-500/40 to-amber-500/10 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.2)] mb-1">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900">
                <Image
                  src="/profile.png"
                  alt="Adlan Aryasatya"
                  fill
                  className="object-cover object-top scale-125 pt-2"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Glassmorphism Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-widest uppercase backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              Art Director & Visual Creator
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Hello There!<br />
              <span className="text-neutral-400 font-normal text-xl sm:text-2xl md:text-5xl">
                General Kenobi? No, it&apos;s Arya!
              </span>
            </h1>

            <p className="text-neutral-300/80 text-sm md:text-lg max-w-xl leading-relaxed">
              I don&apos;t just stay in one place. From drafting concepts, stepping onto the field as camera operator, to post-production editing suite.
            </p>

            <div className="pt-2 flex justify-center md:justify-start items-center w-full sm:w-auto">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-9 py-4 rounded-full transition duration-300 text-sm sm:text-base shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
              >
                <span>Mari Berdiskusi</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* FOTO PROFIL UTAMA (DESKTOP & TABLET) */}
          <div className="hidden md:flex relative w-80 h-[480px] lg:w-[420px] lg:h-[520px] shrink-0 items-center justify-center z-10">
            <div className="absolute inset-4 bg-orange-500/15 rounded-full blur-3xl -z-10 animate-pulse duration-[6000ms]" />
            <Image
              src="/profile.png"
              alt="Adlan Aryasatya"
              fill
              className="object-contain pointer-events-none drop-shadow-2xl"
              priority
              unoptimized
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest text-orange-400/90 font-semibold">Scroll</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* 2. ABOUT, SKILLS & EDUCATION SECTION */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase">About Me</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Arya&apos;s Archives</h2>
              <p className="text-neutral-300/80 text-sm md:text-base leading-relaxed">
                To me, a great visual piece is not just about camera specs or design aesthetics. It is about how all those elements come together to deliver a powerful story.
              </p>
            </div>

            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* FROSTED GLASS CARD - Education */}
              <div className="bg-white/[0.03] border border-white/15 hover:border-orange-500/40 rounded-2xl p-5 backdrop-blur-2xl backdrop-saturate-150 space-y-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition duration-500">
                <h3 className="text-xs font-semibold tracking-wider text-orange-400 uppercase border-b border-white/10 pb-2">Education</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white font-medium">Telkom University</p>
                    <p className="text-neutral-400 text-xs">Teknologi Rekayasa Multimedia (2023 - Present)</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">SMA Labschool UPI Bandung</p>
                    <p className="text-neutral-400 text-xs">(2020 - 2023)</p>
                  </div>
                </div>
              </div>

              {/* FROSTED GLASS CARD - Skills */}
              <div className="bg-white/[0.03] border border-white/15 hover:border-orange-500/40 rounded-2xl p-5 backdrop-blur-2xl backdrop-saturate-150 space-y-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition duration-500">
                <h3 className="text-xs font-semibold tracking-wider text-orange-400 uppercase border-b border-white/10 pb-2">Skills & Software</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Art Direction', 'Photography', 'Cinematography', 'Graphic Design', 'Video Editing', 'Premiere Pro', 'Photoshop', 'Illustrator', 'Figma', 'Canva'].map((skill, i) => (
                    <span key={i} className="text-[10px] bg-orange-500/10 border border-orange-500/25 text-neutral-200 px-2.5 py-1 rounded-full backdrop-blur-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. EXPERIENCES SECTION */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 border-t border-white/10">
          <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase">Track Record</span>
          <h2 className="text-2xl font-bold mb-10 text-white tracking-tight">Experience & Roles</h2>

          <div className="space-y-6">
            {displayExperiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white/[0.03] border border-white/15 hover:border-orange-500/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 backdrop-blur-2xl backdrop-saturate-150 transition duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(249,115,22,0.15)]"
              >
                <div className="md:w-1/3">
                  <span className="text-xs text-orange-400 font-mono font-semibold">{exp.period}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{exp.company}</h3>
                  <p className="text-xs text-neutral-400">{exp.role}</p>
                </div>
                <div className="md:w-2/3 text-sm text-neutral-300/80 leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SELECTED WORKS GRID */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase">Portfolio</span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Selected Works
              </h2>
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs px-4 py-2 rounded-full border transition duration-300 backdrop-blur-md ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent font-semibold shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                        : 'bg-white/5 text-neutral-400 border-white/10 hover:border-orange-500/30 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredMediaItems.length === 0 ? (
            <p className="text-neutral-500">Belum ada karya untuk kategori ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMediaItems.map((item) => {
                const displayImg = item.coverImage || item.image
                const ytThumbnail = getYouTubeThumbnail(item.videoUrl)
                const hasVideo = Boolean(item.videoUrl)

                const imageSrc = displayImg
                  ? urlFor(displayImg).width(800).format('webp').quality(80).url()
                  : ytThumbnail

                return (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedProject(item)
                      setActiveImageIndex(0)
                    }}
                    className="group relative flex flex-col bg-white/[0.03] border border-white/15 hover:border-orange-500/50 rounded-2xl overflow-hidden backdrop-blur-2xl backdrop-saturate-150 transition duration-500 cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_8px_32px_0_rgba(249,115,22,0.2)]"
                  >
                    {imageSrc ? (
                      <div 
                        className="relative w-full aspect-[4/5] bg-neutral-900/60 overflow-hidden"
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src={imageSrc}
                          alt={item.title || 'Project Image'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition duration-700 ease-out pointer-events-none"
                          unoptimized={Boolean(!displayImg && ytThumbnail)}
                        />

                        {/* SUBTLE MINIMALIST WATERMARK OVERLAY */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                          <span className="text-white/20 text-[9px] font-medium uppercase tracking-[0.3em] drop-shadow-sm">
                            Property of Arya
                          </span>
                        </div>

                        {hasVideo ? (
                          <span className="absolute top-3 right-3 bg-red-600 text-white text-[11px] px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md z-20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            Play Video
                          </span>
                        ) : (
                          item.gallery && item.gallery.length > 0 && (
                            <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-neutral-200 text-[11px] px-2.5 py-1 rounded-full border border-white/10 z-20">
                              +{item.gallery.length} Photos
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/5] bg-neutral-900 flex items-center justify-center text-xs text-neutral-500">
                        No Image / Video Link
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                          <span className="uppercase tracking-wider font-semibold text-orange-400">
                            {item.categoryTitle || 'Uncategorized'}
                          </span>
                          {item.date && <span>{formatDate(item.date)}</span>}
                        </div>

                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-orange-200 transition">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white/5 text-neutral-300 px-2.5 py-0.5 rounded-full border border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* FOOTER & SOSMED */}
        <footer className="border-t border-white/10 py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <p>© 2026 Adlan Aryasatya. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/adlanaryst" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              LinkedIn
            </a>
            <a href="https://instagram.com/adlanaryst" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              Instagram
            </a>
            <a href="mailto:adlanaryasatya19@gmail.com" className="hover:text-orange-400 transition">
              Email
            </a>
          </div>
        </footer>

        {/* LIGHTBOX MODAL */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white bg-white/10 p-2.5 rounded-full transition z-50 backdrop-blur-md"
            >
              ✕
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center gap-4">
              {embedVideoUrl ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                  <iframe
                    src={embedVideoUrl}
                    title={selectedProject.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                currentImages.length > 0 && (
                  <div 
                    className="relative w-full aspect-[4/5] md:aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden bg-black/60 border border-white/10 backdrop-blur-md shadow-2xl"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    {currentImages[activeImageIndex] && (
                      <Image
                        src={urlFor(currentImages[activeImageIndex]).width(1600).format('webp').quality(85).url()}
                        alt={selectedProject.title}
                        fill
                        className="object-contain pointer-events-none"
                      />
                    )}

                    {/* SUBTLE MODAL WATERMARK */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <span className="text-white/20 text-xs md:text-sm font-medium uppercase tracking-[0.3em] drop-shadow-sm">
                        Property of Arya
                      </span>
                    </div>
                  </div>
                )
              )}

              <div className="text-center max-w-xl">
                <h3 className="text-2xl font-bold text-white mb-1">{selectedProject.title}</h3>
                {selectedProject.description && (
                  <p className="text-sm text-neutral-300/80">{selectedProject.description}</p>
                )}
              </div>

              {!embedVideoUrl && currentImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-2 max-w-full">
                  {currentImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        activeImageIndex === idx ? 'border-orange-500 scale-105 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'border-transparent opacity-50'
                      }`}
                    >
                      <Image
                        src={urlFor(img).width(200).format('webp').quality(75).url()}
                        alt="thumbnail"
                        fill
                        className="object-cover pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}