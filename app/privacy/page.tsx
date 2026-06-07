import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'Privacy Policy - How OpportunityRadar Handles Your Data',
  description: 'Privacy Policy for OpportunityRadar, operated by MARISEN PAGES. Learn what data we collect, how we use cookies and Google AdSense, and your choices.',
  keywords: ['OpportunityRadar privacy policy', 'data protection', 'cookies', 'Google AdSense privacy'],
}

const LAST_UPDATED = '7 June 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <ShieldCheck className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Privacy Policy</h1>
              <p className="mt-1 text-white/70">Last updated: {LAST_UPDATED}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
            <div className="space-y-8">
              <p className="text-muted-text leading-relaxed">
                This Privacy Policy explains how OpportunityRadar, operated by{' '}
                <span className="font-semibold text-navy">MARISEN PAGES</span> (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;), collects, uses and protects information when you use
                our website and services. By using OpportunityRadar, you agree to this policy.
              </p>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Information We Collect</h2>
                <ul className="mt-4 space-y-3 text-muted-text leading-relaxed">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-green" />
                    <span>
                      <span className="font-semibold text-navy">Email addresses</span> — when you sign up
                      to receive our free opportunity alerts by email.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-green" />
                    <span>
                      <span className="font-semibold text-navy">WhatsApp numbers</span> — when you
                      subscribe to receive alerts via WhatsApp.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-green" />
                    <span>
                      <span className="font-semibold text-navy">Basic usage data</span> — standard
                      analytics such as pages visited and approximate region, collected automatically (see
                      &ldquo;Analytics&rdquo; below).
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">How We Use Your Information</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  We use the information we collect to deliver the free job, tender, grant and scholarship
                  alerts you have requested via email and WhatsApp, to respond to your enquiries, and to
                  understand and improve how our website is used.
                </p>
                <p className="mt-4 text-muted-text leading-relaxed">
                  <span className="font-semibold text-navy">We do not sell your personal data</span> to any
                  third party.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Cookies &amp; Google AdSense</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  We use Google AdSense to display advertisements on our site. Google, as a third-party
                  vendor, uses cookies to serve ads based on your prior visits to this and other websites.
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads to you
                  based on your visit to our site and/or other sites on the Internet.
                </p>
                <p className="mt-4 text-muted-text leading-relaxed">
                  You can opt out of personalised advertising by visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-green hover:underline"
                  >
                    Google Ads Settings
                  </a>
                  . You can also learn more about how Google uses information from sites that use its
                  services at{' '}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-green hover:underline"
                  >
                    Google&apos;s Privacy &amp; Terms
                  </a>
                  . For more on Google&apos;s practices, see the{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent-green hover:underline"
                  >
                    Google Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Analytics</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  We use Vercel Analytics to collect basic, privacy-friendly site analytics (such as page
                  views and aggregate traffic patterns) to help us improve the website. This data is used
                  in aggregate and is not used to personally identify you.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Unsubscribing</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  You can stop receiving alerts at any time. To unsubscribe from email alerts, use the
                  unsubscribe link included in our emails or email us at the address below. To stop WhatsApp
                  alerts, reply <span className="font-semibold text-navy">STOP</span> to any of our WhatsApp
                  messages or contact us. We will remove your details promptly on request.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Contact Us</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  If you have any questions about this Privacy Policy or wish to have your data removed,
                  please contact us at{' '}
                  <a
                    href="mailto:alerts@opportunityradar.africa"
                    className="font-medium text-accent-green hover:underline"
                  >
                    alerts@opportunityradar.africa
                  </a>{' '}
                  or via our{' '}
                  <Link href="/contact" className="font-medium text-accent-green hover:underline">
                    Contact page
                  </Link>
                  .
                </p>
                <p className="mt-4 text-muted-text leading-relaxed">
                  OpportunityRadar is operated by{' '}
                  <span className="font-semibold text-navy">MARISEN PAGES</span>, a registered business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
