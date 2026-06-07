import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Target, Bell, Wrench, Database, ArrowRight, TrendingUp, Globe, Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'About Us - East Africa\'s Opportunity Intelligence Platform',
  description: 'OpportunityRadar aggregates tenders, NGO jobs, grants and scholarships across Uganda, Kenya, Tanzania, Rwanda and Ethiopia, updated daily. Operated by MARISEN PAGES.',
  keywords: ['about OpportunityRadar', 'MARISEN PAGES', 'East Africa opportunities', 'tenders jobs grants scholarships'],
}

const highlights = [
  {
    icon: Bell,
    title: 'Free Daily Alerts',
    description: 'New jobs, tenders, grants and scholarships delivered straight to you via WhatsApp and email — never miss a deadline.',
  },
  {
    icon: Database,
    title: 'Daily-Updated Database',
    description: 'Our opportunity database is refreshed every day, aggregating listings from across the region into one trusted place.',
  },
  {
    icon: Wrench,
    title: 'Free Tools',
    description: 'A CV builder, professional CV templates, legal document generators and calculators — all free to use.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <Building2 className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">About Us</h1>
              <p className="mt-1 text-white/70">East Africa&apos;s opportunity intelligence platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-white/80 backdrop-blur-sm border-y border-border-color">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: TrendingUp, label: 'Opportunities', value: '587+' },
              { icon: Globe, label: 'Countries', value: '5' },
              { icon: Clock, label: 'Updates', value: 'Daily' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green/10">
                  <stat.icon className="h-5 w-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-lg font-bold text-navy">{stat.value}</p>
                  <p className="text-xs text-muted-text">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
              Who We Are
            </h2>
            <p className="mt-4 text-muted-text leading-relaxed">
              OpportunityRadar is East Africa&apos;s opportunity intelligence platform. We aggregate
              government tenders, NGO jobs, grants and scholarships from across Uganda, Kenya, Tanzania,
              Rwanda and Ethiopia into one place, updated daily — so you always know what&apos;s open and
              what&apos;s closing soon.
            </p>
            <p className="mt-4 text-muted-text leading-relaxed">
              OpportunityRadar is operated by <span className="font-semibold text-navy">MARISEN PAGES</span>,
              a registered business committed to making economic opportunity accessible to everyone across
              the region.
            </p>
          </div>

          {/* Mission */}
          <div className="mt-8 rounded-card bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-card bg-gray-100">
                <Target className="h-6 w-6 text-accent-green" />
              </div>
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">Our Mission</h2>
            </div>
            <p className="mt-4 text-muted-text leading-relaxed">
              Our mission is simple: to help East Africans never miss a job, tender, grant or scholarship.
              We deliver free daily alerts via WhatsApp and email, putting every relevant opportunity within
              reach — no matter where you are or what you can afford.
            </p>
          </div>

          {/* What we offer */}
          <div className="mt-8">
            <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">What We Offer</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-card bg-white p-6 shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-card bg-gray-100">
                    <item.icon className="h-6 w-6 text-accent-green" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-text leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-card bg-navy p-6 text-center shadow-card sm:p-8">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Start receiving free opportunity alerts
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Browse the latest opportunities or get in touch — we&apos;re here to help you find your next
              job, tender, grant or scholarship.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-card bg-accent-green px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-green/90"
              >
                Browse Opportunities <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-card border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
