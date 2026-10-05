import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adlan Aryasatya — Art Director & Visual Creator',
  description:
    'Personal portfolio of Adlan Aryasatya. Art Director at LimaPagi Studio, Photographer, Videographer, and Video Editor based in Indonesia.',
  keywords: [
    'Adlan Aryasatya',
    'Art Director',
    'Visual Creator',
    'Photographer',
    'Videographer',
    'Video Editor',
    'LimaPagi Studio',
    'Telkom University',
    'Portfolio',
  ],
  authors: [{ name: 'Adlan Aryasatya' }],
  creator: 'Adlan Aryasatya',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://adlanaryasatya.com', // Nanti bisa diganti dengan domain/link Vercel kamu
    title: 'Adlan Aryasatya — Art Director & Visual Creator',
    description:
      'Personal portfolio of Adlan Aryasatya. Specializing in Art Direction, Commercial Photography, Videography, and Post-Production Editing.',
    siteName: 'Adlan Aryasatya Portfolio',
    images: [
      {
        url: '/profile.png', // Gambar preview saat link dikirim ke WA/LinkedIn
        width: 800,
        height: 800,
        alt: 'Adlan Aryasatya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adlan Aryasatya — Art Director & Visual Creator',
    description:
      'Personal portfolio of Adlan Aryasatya. Art Director at LimaPagi Studio, Photographer, Videographer, and Video Editor.',
    images: ['/profile.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}