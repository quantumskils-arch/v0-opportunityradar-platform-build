import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'OpportunityRadar - East Africa\'s Opportunity Intelligence Platform',
    template: '%s | OpportunityRadar'
  },
  description: 'Discover tenders, NGO jobs, grants and scholarships across Uganda, Kenya, Tanzania, Rwanda and Ethiopia. Updated daily with the latest opportunities.',
  keywords: ['Uganda tenders', 'NGO jobs Uganda', 'government tenders East Africa', 'scholarships Uganda 2025', 'grants East Africa', 'Kenya jobs', 'Tanzania opportunities'],
  authors: [{ name: 'OpportunityRadar' }],
  creator: 'OpportunityRadar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opportunityradar.africa',
    siteName: 'OpportunityRadar',
    title: 'OpportunityRadar - East Africa\'s Opportunity Intelligence Platform',
    description: 'Discover tenders, NGO jobs, grants and scholarships across Uganda, Kenya, Tanzania, Rwanda and Ethiopia.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpportunityRadar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpportunityRadar - East Africa\'s Opportunity Intelligence Platform',
    description: 'Discover tenders, NGO jobs, grants and scholarships across East Africa.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5416769098775933" crossOrigin="anonymous" strategy="afterInteractive"/>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
