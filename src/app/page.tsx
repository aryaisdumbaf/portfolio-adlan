import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import PortfolioGrid from '@/components/PortfolioGrid'

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

export const revalidate = 60

export default async function HomePage() {
  const mediaQuery = `*[_type == "mediaItem"] | order(date desc, _createdAt desc) {
    _id,
    title,
    coverImage { asset },
    image { asset },
    gallery[] { asset },
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

  const [mediaItems, experiences]: [MediaItem[], ExperienceItem[]] = await Promise.all([
    client.fetch(mediaQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(expQuery, {}, { next: { revalidate: 60 } }),
  ])

  const phoneNumber = '6281312811549'
  const defaultMessage = encodeURIComponent(
    'Halo Arya, saya lihat portofolio kamu dan tertarik untuk berdiskusi/kerjasama.'
  )
  const waLink = `https://wa.me/${phoneNumber}?text=${defaultMessage}`

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 select-none relative overflow-hidden">
      
      {/* PURE CSS REEDED GLASS BACKGROUND (0 KB, No Image Needed, Responsive Portrait & Landscape) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.08) 0px,
            rgba(255, 255, 255, 0.08) 2px,
            transparent 2px,
            transparent 8px
          ), radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 relative py-8 md:py-0">
          <div className="flex-1 space-y-6 text-center md:text-left z-10 flex flex-col items-center md:items-start justify-center my-auto">
            
            {/* AVATAR MOBILE */}
            <div className="md:hidden relative w-24 h-24 rounded-full p-1 bg-neutral-800 border border-white/20 shadow-xl mb-1">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900">
                <Image
                  src="/profile.webp"
                  alt="Adlan Aryasatya"
                  fill
                  sizes="96px"
                  className="object-cover object-top scale-125 pt-2"
                  priority
                />
              </div>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-neutral-300 text-xs font-semibold tracking-widest uppercase">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 font-semibold px-9 py-4 rounded-full transition duration-300 text-sm sm:text-base shadow-lg"
              >
                <span>Mari Berdiskusi</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* FOTO PROFIL DESKTOP */}
          <div className="hidden md:flex relative w-80 h-[480px] lg:w-[420px] lg:h-[520px] shrink-0 items-center justify-center z-10">
            <Image
              src="/profile.webp"
              alt="Adlan Aryasatya"
              fill
              sizes="(max-width: 1200px) 320px, 420px"
              className="object-contain pointer-events-none drop-shadow-2xl"
              priority
            />
          </div>
        </section>

        {/* ABOUT & SKILLS */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">About Me</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Arya&apos;s Archives</h2>
              <p className="text-neutral-300/80 text-sm md:text-base leading-relaxed">
                To me, a great visual piece is not just about camera specs or design aesthetics. It is about how all those elements come together to deliver a powerful story.
              </p>
            </div>

            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-neutral-300 uppercase border-b border-white/10 pb-2">Education</h3>
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

              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-neutral-300 uppercase border-b border-white/10 pb-2">Skills & Software</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Art Direction', 'Photography', 'Cinematography', 'Graphic Design', 'Video Editing', 'Premiere Pro', 'Photoshop', 'Illustrator', 'Figma', 'Canva'].map((skill, i) => (
                    <span key={i} className="text-[10px] bg-white/5 border border-white/10 text-neutral-300 px-2.5 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCES */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-white/10">
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Track Record</span>
          <h2 className="text-2xl font-bold mb-10 text-white tracking-tight">Experience & Roles</h2>

          {experiences.length === 0 ? (
            <p className="text-neutral-500 text-sm">Belum ada pengalaman yang dimasukkan di Sanity Studio.</p>
          ) : (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="md:w-1/3">
                    <span className="text-xs text-neutral-400 font-mono font-semibold">{exp.period}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{exp.company}</h3>
                    <p className="text-xs text-neutral-400">{exp.role}</p>
                  </div>
                  <div className="md:w-2/3 text-sm text-neutral-300/80 leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PORTFOLIO GRID */}
        <PortfolioGrid mediaItems={mediaItems} />

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <p>© 2026 Adlan Aryasatya. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/in/adlanaryst" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              LinkedIn
            </a>
            <a href="https://instagram.com/adlanaryst" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Instagram
            </a>
            <a href="mailto:adlanaryasatya19@gmail.com" className="hover:text-white transition">
              Email
            </a>
          </div>
        </footer>

      </div>
    </main>
  )
}