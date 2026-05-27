import { Metadata } from 'next'
import { Bell, Mail, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { EmailSignup } from '@/components/email-signup'

export const metadata: Metadata = {
  title: 'Free Email Alerts - Never Miss an Opportunity',
  description: 'Get daily email alerts for tenders, jobs, grants and scholarships across East Africa. Free and instant delivery.',
}

const benefits = [
  'Daily digest of new opportunities',
  'Filter by country and category',
  'Never miss a deadline',
  'Unsubscribe anytime',
  'No spam, ever',
  '100% free',
]

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-green/20">
            <Bell className="h-10 w-10 text-accent-green" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Get Free Daily Alerts
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Receive the latest tenders, jobs, grants and scholarships directly in your inbox every morning. Never miss an opportunity again.
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section className="relative -mt-8 pb-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-card bg-white p-8 shadow-card-hover">
            <div className="mb-6 flex items-center gap-3">
              <Mail className="h-6 w-6 text-accent-green" />
              <h2 className="font-display text-xl font-semibold text-navy">
                Subscribe to Alerts
              </h2>
            </div>
            <EmailSignup />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-navy">
            Why Subscribe?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-card bg-white p-4 shadow-card"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-green" />
                <span className="text-navy">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Alternative */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy">
            Prefer WhatsApp?
          </h2>
          <p className="mt-3 text-muted-text">
            Join our WhatsApp channel for instant notifications
          </p>
          <a
            href="https://wa.me/256778030847?text=Hi%20OpportunityRadar%2C%20I%20want%20daily%20alerts"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-card bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#25D366]/90"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join WhatsApp Channel
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
