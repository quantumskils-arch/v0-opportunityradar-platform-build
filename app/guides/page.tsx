import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { EmailSignup } from '@/components/email-signup'
import { fetchOpportunities } from '@/lib/api'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'

export const metadata: Metadata = {
  title: 'How-To Guides & Blog - Career Tips for East Africa',
  description: 'Expert guides on how to apply for jobs, win tenders, and get scholarships in Uganda, Kenya, Tanzania, Rwanda and Ethiopia.',
  keywords: ['URA jobs guide', 'UNRA application', 'Uganda tender guide', 'NGO jobs tips', 'scholarship application'],
}

const guides = [
  {
    slug: 'how-to-apply-for-ura-jobs',
    title: 'How to Apply for URA Jobs in Uganda (2025 Guide)',
    excerpt: 'Complete step-by-step guide to applying for Uganda Revenue Authority positions, including required documents and interview tips.',
    category: 'Jobs',
    readTime: 8,
  },
  {
    slug: 'unra-graduate-trainee-guide',
    title: 'How to Apply for UNRA Graduate Trainee Program',
    excerpt: 'Everything you need to know about the Uganda National Roads Authority graduate trainee scheme.',
    category: 'Jobs',
    readTime: 6,
  },
  {
    slug: 'win-government-tenders-uganda',
    title: 'How to Win Government Tenders in Uganda',
    excerpt: 'Expert strategies for preparing winning bids for government procurement opportunities.',
    category: 'Tenders',
    readTime: 12,
  },
  {
    slug: 'top-10-ngo-jobs-uganda',
    title: 'Top 10 NGO Jobs Uganda - How to Get Hired',
    excerpt: 'Insider tips on landing jobs with UNHCR, UNICEF, WFP, and other major NGOs in Uganda.',
    category: 'Jobs',
    readTime: 10,
  },
  {
    slug: 'kcca-jobs-application-guide',
    title: 'KCCA Jobs: Complete Application Guide',
    excerpt: 'How to navigate the Kampala Capital City Authority recruitment process successfully.',
    category: 'Jobs',
    readTime: 7,
  },
  {
    slug: 'bid-writing-uganda-tenders',
    title: 'How to Write a Winning Bid for Uganda Government Tenders',
    excerpt: 'Technical and financial proposal writing tips from procurement experts.',
    category: 'Tenders',
    readTime: 15,
  },
  {
    slug: 'mastercard-foundation-scholarship',
    title: 'Mastercard Foundation Scholarship: Complete Guide',
    excerpt: 'Application process, eligibility, and tips for the prestigious Mastercard Foundation Scholars Program.',
    category: 'Scholarships',
    readTime: 9,
  },
  {
    slug: 'uganda-public-service-commission',
    title: 'Uganda Public Service Commission: How It Works',
    excerpt: 'Understanding the UPSC recruitment process and how to maximize your chances.',
    category: 'Jobs',
    readTime: 8,
  },
]

async function RelatedOpportunities() {
  try {
    const data = await fetchOpportunities({ limit: 3 })
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {data.results.map((opp, index) => (
          <OpportunityCard key={opp.id} opportunity={opp} index={index} />
        ))}
      </div>
    )
  } catch {
    return null
  }
}

function RelatedOpportunitiesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <OpportunityCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function GuidesPage() {
  const categoryColors: Record<string, string> = {
    Jobs: 'bg-accent-green/10 text-accent-green',
    Tenders: 'bg-blue-100 text-blue-700',
    Scholarships: 'bg-amber/10 text-amber-700',
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <BookOpen className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                How-To Guides & Blog
              </h1>
              <p className="mt-1 text-white/70">
                Expert career advice for East African professionals
              </p>
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

      {/* Guides Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-card bg-white p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[guide.category]}`}>
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-text">
                    <Clock className="h-4 w-4" />
                    <span>{guide.readTime} min</span>
                  </div>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-accent-green">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-muted-text line-clamp-2">
                  {guide.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-green">
                  Read Guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Middle */}
      <div id="adsense-mid" className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-text">
          Advertisement
        </div>
      </div>

      {/* Related Opportunities */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-navy">Related Opportunities</h2>
          <p className="mt-1 text-muted-text">Latest openings you might be interested in</p>
          <div className="mt-6">
            <Suspense fallback={<RelatedOpportunitiesSkeleton />}>
              <RelatedOpportunities />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Get Career Tips in Your Inbox
          </h2>
          <p className="mt-3 text-white/70">
            Join thousands of professionals receiving our weekly career insights.
          </p>
          <div className="mt-6">
            <EmailSignup />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
