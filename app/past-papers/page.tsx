'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, TrendingUp, Users, Zap } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { PaymentModal } from '@/components/payment-modal'
import { Button } from '@/components/ui/button'

const pastPapers = [
  {
    id: 1,
    title: 'URA Aptitude Test Pack',
    description: 'Complete collection of URA aptitude tests from 2020-2025. Includes numerical reasoning, verbal reasoning, and situational judgment tests.',
    price: 8000,
    years: '2020-2025',
    downloads: 1250,
    trending: true,
  },
  {
    id: 2,
    title: 'UNRA Graduate Trainee Papers',
    description: 'Past papers and sample questions for UNRA Graduate Trainee Programme. Engineering, Administration, and Finance tracks included.',
    price: 6000,
    years: '2021-2025',
    downloads: 890,
    trending: true,
  },
  {
    id: 3,
    title: 'Uganda Public Service Commission Prep',
    description: 'Comprehensive preparation pack for UPSC examinations. General paper, essay writing, and interview questions.',
    price: 5000,
    years: '2019-2025',
    downloads: 2100,
    trending: false,
  },
  {
    id: 4,
    title: 'NGO Interview Question Bank',
    description: '500+ real interview questions from UNHCR, UNICEF, WFP, IRC, and other major NGOs. With model answers.',
    price: 10000,
    years: '2022-2025',
    downloads: 750,
    trending: true,
  },
  {
    id: 5,
    title: 'Bank of Uganda Trainee Test',
    description: 'Past examination papers for Bank of Uganda graduate trainee program. Economics, Finance, and General Knowledge.',
    price: 7000,
    years: '2020-2025',
    downloads: 680,
    trending: false,
  },
  {
    id: 6,
    title: 'KCCA Officer Test Papers',
    description: 'Kampala Capital City Authority recruitment test papers. Administrative and Technical officer positions.',
    price: 5000,
    years: '2021-2025',
    downloads: 920,
    trending: false,
  },
]

export default function PastPapersPage() {
  const [selectedPaper, setSelectedPaper] = useState<typeof pastPapers[0] | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const handleBuy = (paper: typeof pastPapers[0]) => {
    setSelectedPaper(paper)
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    alert(`${selectedPaper?.title} downloaded successfully!`)
    setSelectedPaper(null)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG').format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-amber/20">
              <FileText className="h-7 w-7 text-amber" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Past Papers Shop
              </h1>
              <p className="mt-1 text-white/70">
                Exam preparation materials for top employers in East Africa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-border-color bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-text">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent-green" />
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent-green" />
              <span>6,500+ Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent-green" />
              <span>Updated 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense */}
      <div id="adsense-top" className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-text">
          Advertisement
        </div>
      </div>

      {/* Papers Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover"
              >
                {paper.trending && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-card bg-amber/10">
                    <FileText className="h-6 w-6 text-amber" />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {paper.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-text line-clamp-2">
                    {paper.description}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-text">
                    <span className="rounded-full bg-background px-2 py-1">
                      {paper.years}
                    </span>
                    <span>{paper.downloads}+ downloads</span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xl font-bold text-accent-green">
                      UGX {formatPrice(paper.price)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => alert('Preview coming soon!')}
                      >
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1 bg-accent-green text-white hover:bg-accent-green/90"
                        onClick={() => handleBuy(paper)}
                      >
                        <Download className="h-4 w-4" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white">
            Need Custom Preparation?
          </h2>
          <p className="mt-3 text-white/70">
            Our experts can create personalized study guides and mock tests for any exam.
          </p>
          <a
            href="https://wa.me/256778030847?text=I%20need%20custom%20exam%20preparation%20materials"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-card bg-accent-green px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-green/90"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </section>

      {selectedPaper && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => {
            setShowPayment(false)
            setSelectedPaper(null)
          }}
          title={selectedPaper.title}
          amount={selectedPaper.price}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
