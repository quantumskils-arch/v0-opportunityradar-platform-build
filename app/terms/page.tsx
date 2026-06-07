import { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'Terms of Service - OpportunityRadar',
  description: 'Terms of Service for OpportunityRadar, operated by MARISEN PAGES. Understand how our opportunity listings and free tools are provided.',
  keywords: ['OpportunityRadar terms of service', 'terms and conditions', 'MARISEN PAGES'],
}

const LAST_UPDATED = '7 June 2026'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <FileText className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Terms of Service</h1>
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
                These Terms of Service govern your use of OpportunityRadar, operated by{' '}
                <span className="font-semibold text-navy">MARISEN PAGES</span> (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;). By accessing or using our website and services, you
                agree to these terms.
              </p>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Our Service</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  OpportunityRadar aggregates publicly available opportunity listings — including government
                  tenders, NGO jobs, grants and scholarships — from across East Africa and presents them in
                  one place for your convenience.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">No Guarantees</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  We make no guarantee that any listing is current, complete, accurate or still open, and we
                  do not guarantee that you will be shortlisted, selected, awarded or hired for any
                  opportunity featured on our site. Listings may change or close without notice on the
                  original source.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Verify With the Source</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  You should always verify the full details, requirements and deadlines of any opportunity
                  directly with the original source or issuing organisation before applying or taking any
                  action. OpportunityRadar is not responsible for decisions you make based on information
                  found on our site.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Free Tools</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  Our free tools — including the CV builder, CV templates, document generators and
                  calculators — are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
                  warranties of any kind. You are responsible for reviewing any document or output you
                  generate before relying on it.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Limitation of Liability</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  To the fullest extent permitted by law, MARISEN PAGES shall not be liable for any loss or
                  damage arising from your use of, or reliance on, OpportunityRadar, its listings or its
                  tools.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Changes to These Terms</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  We may update these Terms of Service from time to time. Continued use of the site after
                  changes are posted constitutes your acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy">Contact Us</h2>
                <p className="mt-4 text-muted-text leading-relaxed">
                  Questions about these terms? Email us at{' '}
                  <a
                    href="mailto:alerts@opportunityradar.africa"
                    className="font-medium text-accent-green hover:underline"
                  >
                    alerts@opportunityradar.africa
                  </a>{' '}
                  or visit our{' '}
                  <Link href="/contact" className="font-medium text-accent-green hover:underline">
                    Contact page
                  </Link>
                  . OpportunityRadar is operated by{' '}
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
