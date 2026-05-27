import { Suspense } from 'react'
import { Metadata } from 'next'
import { FileText, Filter } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'
import { Pagination } from '@/components/pagination'
import { fetchOpportunities, COUNTRIES } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Government Tenders - Uganda, Kenya, Tanzania, Rwanda, Ethiopia',
  description: 'Browse active government tenders across East Africa. Find procurement opportunities from Uganda, Kenya, Tanzania, Rwanda and Ethiopia. Updated daily.',
  keywords: ['Uganda tenders', 'Kenya tenders', 'government procurement', 'East Africa tenders', 'KCCA tenders', 'UNRA tenders'],
}

interface PageProps {
  searchParams: Promise<{
    page?: string
    country?: string
    sort?: string
  }>
}

async function TendersGrid({ page, country }: { page: number; country?: string }) {
  const limit = 15
  
  try {
    const data = await fetchOpportunities({ 
      page, 
      limit, 
      category: 'Government Tender',
      country 
    })
    const totalPages = Math.ceil(data.total / limit)

    return (
      <>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-text">
            <span className="font-semibold text-navy">{data.total}</span> active tenders found
          </p>
        </div>

        {data.results.length === 0 ? (
          <div className="rounded-card bg-white p-12 text-center shadow-card">
            <p className="font-display text-xl font-semibold text-navy">No tenders found</p>
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
              <Pagination currentPage={page} totalPages={totalPages} basePath="/tenders" />
            </div>
          </>
        )}
      </>
    )
  } catch {
    return (
      <div className="rounded-card bg-white p-12 text-center shadow-card">
        <p className="font-display text-xl font-semibold text-navy">Unable to load tenders</p>
        <p className="mt-2 text-muted-text">Please try again later.</p>
      </div>
    )
  }
}

function TendersGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <OpportunityCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function TendersPage({ searchParams }: PageProps) {
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
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-blue-500/20">
              <FileText className="h-7 w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Government Tenders
              </h1>
              <p className="mt-1 text-white/70">
                Procurement opportunities from across East Africa
              </p>
            </div>
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
                href="/tenders"
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !country ? 'bg-navy text-white' : 'bg-background text-muted-text hover:bg-border-color'
                }`}
              >
                All Countries
              </a>
              {COUNTRIES.filter(c => c !== 'International' && c !== 'East Africa').map((c) => (
                <a
                  key={c}
                  href={`/tenders?country=${encodeURIComponent(c)}`}
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

      {/* Tenders Grid */}
      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<TendersGridSkeleton />}>
            <TendersGrid page={page} country={country} />
          </Suspense>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
