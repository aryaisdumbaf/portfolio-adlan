'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
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

interface PortfolioGridProps {
  mediaItems: MediaItem[]
}

export default function PortfolioGrid({ mediaItems = [] }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<MediaItem | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

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
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
  }

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
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-semibold tracking-widest text-neutral-400 uppercase">// PORTFOLIO</span>
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
                  className={`text-xs px-4 py-2 rounded-full border transition duration-300 font-mono ${
                    selectedCategory === category
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-900/90 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredMediaItems.length === 0 ? (
          <p className="text-neutral-500 text-sm">Belum ada karya.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMediaItems.map((item) => {
              const displayImg = item.coverImage || item.image
              const ytThumbnail = getYouTubeThumbnail(item.videoUrl)
              const hasVideo = Boolean(item.videoUrl)

              const imageSrc = displayImg
                ? urlFor(displayImg).width(450).format('webp').quality(65).url()
                : ytThumbnail

              return (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedProject(item)
                    setActiveImageIndex(0)
                  }}
                  className="group relative flex flex-col bg-neutral-900/90 border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden transition duration-500 cursor-pointer shadow-xl"
                >
                  {imageSrc ? (
                    <div className="relative w-full aspect-[4/5] bg-neutral-900/60 overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={item.title || 'Project Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition duration-700 ease-out pointer-events-none"
                      />

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <span className="text-white/20 text-[9px] font-mono uppercase tracking-[0.3em] drop-shadow-sm">
                          Property of Arya
                        </span>
                      </div>

                      {hasVideo && (
                        <span className="absolute top-3 right-3 bg-red-600 text-white text-[11px] px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-lg z-20">
                          Play Video
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/5] bg-neutral-900 flex items-center justify-center text-xs text-neutral-500 font-mono">
                      No Image / Video Link
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                        <span className="uppercase tracking-wider font-semibold text-neutral-300">
                          {item.categoryTitle || 'Uncategorized'}
                        </span>
                        {item.date && <span>{formatDate(item.date)}</span>}
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-neutral-300 transition">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5 font-mono">
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

      {/* LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-neutral-400 hover:text-white bg-white/10 p-2.5 rounded-full transition z-50"
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
                  className="relative w-full aspect-[4/5] md:aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {currentImages[activeImageIndex] && (
                    <Image
                      src={urlFor(currentImages[activeImageIndex]).width(900).format('webp').quality(70).url()}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 1200px) 100vw, 900px"
                      className="object-contain pointer-events-none"
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <span className="text-white/20 text-xs md:text-sm font-mono uppercase tracking-[0.3em] drop-shadow-sm">
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
                      activeImageIndex === idx ? 'border-white scale-105' : 'border-transparent opacity-50'
                    }`}
                  >
                    <Image
                      src={urlFor(img).width(150).format('webp').quality(65).url()}
                      alt="thumbnail"
                      fill
                      sizes="64px"
                      className="object-cover pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}