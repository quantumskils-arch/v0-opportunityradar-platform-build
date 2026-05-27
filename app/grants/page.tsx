import { Suspense } from 'react'
import { Metadata } from 'next'
import { GraduationCap, Filter, Award } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'
import { Pagination } from '@/components/pagination'
import { EmailSignup } from '@/components/email-signup'
import { fetchOpportunities, COUNTRIES } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Grants & Scholarships - Uganda, Kenya, Tanzania, Rwanda, Ethiopia',
  description: 'Find scholarships, grants, and fellowships for East African students and professionals. Rhodes, Mastercard Foundation, DAAD, Chevening and more.',
  keywords: ['scholarships Uganda', 'grants East Africa', 'Mastercard Foundation scholarship', 'Chevening scholarship', 'DAAD scholarship'],
}

interface PageProps {
  searchParams: Promise<{
    page?: string
    country?: string
  }>
}

const featuredScholarships = [
  { name: 'Rhodes Scholarship', color: 'bg-amber' },
  { name: 'Mastercard Foundation', color: 'bg-red-500' },
  { name: 'DAAD', color: 'bg-blue-500' },
  { name: 'Chevening', color: 'bg-accent-green' },
  { name: 'Fulbright', color: 'bg-navy' },
]

async function GrantsGrid({ page, country }: { page: number; country?: string }) {
  const limit = 15
  
  try {
    const data = await fetchOpportunities({ 
      page, 
      limit, 
      category: 'Grant/Scholarship',
      country 
    })
    const totalPages = Math.ceil(data.total / limit)

    return (
      <>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-text">
            <span className="font-semibold text-navy">{data.total}</span> grants & scholarships available
          </p>
        </div>

        {data.results.length === 0 ? (
          <div className="rounded-card bg-white p-12 text-center shadow-card">
            <p className="font-display text-xl font-semibold text-navy">No grants or scholarships found</p>
            <p className="mt-2 text-muted-text">Try adjusting your filters or check back tomorrow.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.results.map((opportunity, index) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination currentPage={page} totalPages={totalPages} basePath="/grants" />
            </div>
          </>
        )}
      </>
    )
  } catch {
    return (
      <div className="rounded-card bg-white p-12 text-center shadow-card">
        <p className="font-display text-xl font-semibold text-navy">Unable to load grants & scholarships</p>
        <p className="mt-2 text-muted-text">Please try again later.</p>
      </div>
    )
  }
}

function GrantsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <OpportunityCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function GrantsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const country = params.country

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-amber/20">
              <GraduationCap className="h-7 w-7 text-amber" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Grants & Scholarships
              </h1>
              <p className="mt-1 text-white/70">
                Funding opportunities for education and research
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="border-b border-border-color bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-center text-sm text-muted-text">Featured Programs</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {featuredScholarships.map((scholarship) => (
              <div
                key={scholarship.name}
                className={`flex items-center gap-2 rounded-full px-4 py-2 ${scholarship.color}/10`}
              >
                <Award className={`h-4 w-4 ${scholarship.color.replace('bg-', 'text-')}`} />
                <span className="text-sm font-medium text-navy">{scholarship.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border-color bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-text">
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/grants"
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !country ? 'bg-navy text-white' : 'bg-background text-muted-text hover:bg-border-color'
                }`}
              >
                All Countries
              </a>
              {COUNTRIES.map((c) => (
                <a
                  key={c}
                  href={`/grants?country=${encodeURIComponent(c)}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    country === c ? 'bg-navy text-white' : 'bg-background text-muted-text hover:bg-border-color'
                  }`}
                >
                  {c}
                </a>
              ))}
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

      {/* Grants Grid */}
      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<GrantsGridSkeleton />}>
            <GrantsGrid page={page} country={country} />
          </Suspense>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Never Miss a Scholarship
          </h2>
          <p className="mt-3 text-white/70">
            Get notified when new grants and scholarships are posted.
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
