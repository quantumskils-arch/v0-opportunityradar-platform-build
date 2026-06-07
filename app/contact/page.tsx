import { Metadata } from 'next'
import { Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with OpportunityRadar',
  description: 'Contact OpportunityRadar by email at alerts@opportunityradar.africa or on WhatsApp at +256 748 556140. Operated by MARISEN PAGES.',
  keywords: ['contact OpportunityRadar', 'OpportunityRadar email', 'OpportunityRadar WhatsApp', 'MARISEN PAGES'],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <MessageCircle className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Contact Us</h1>
              <p className="mt-1 text-white/70">We&apos;d love to hear from you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-muted-text leading-relaxed">
            Have a question, a suggestion, or want to list an opportunity? Reach out to the OpportunityRadar
            team using any of the channels below — we typically respond within one business day.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Email */}
            <a
              href="mailto:alerts@opportunityradar.africa"
              className="group rounded-card bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-card bg-gray-100">
                <Mail className="h-6 w-6 text-accent-green" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-accent-green">
                Email
              </h2>
              <p className="mt-2 text-sm text-muted-text">Send us a message any time</p>
              <p className="mt-3 font-medium text-navy break-all">alerts@opportunityradar.africa</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-green">
                Send an email <ArrowRight className="h-4 w-4" />
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/256748556140"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-card bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-card bg-gray-100">
                <MessageCircle className="h-6 w-6 text-accent-green" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-accent-green">
                WhatsApp
              </h2>
              <p className="mt-2 text-sm text-muted-text">Chat with us and get free alerts</p>
              <p className="mt-3 font-medium text-navy">+256 748 556140</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-green">
                Message on WhatsApp <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>

          {/* Operator */}
          <div className="mt-8 rounded-card bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-lg font-semibold text-navy">About the Operator</h2>
            <p className="mt-3 text-muted-text leading-relaxed">
              OpportunityRadar is operated by <span className="font-semibold text-navy">MARISEN PAGES</span>,
              a registered business. For all enquiries, please use the email or WhatsApp contact details above.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
