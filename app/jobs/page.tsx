import { Suspense } from 'react'
import { Metadata } from 'next'
import { Briefcase, Filter, Building2 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'
import { Pagination } from '@/components/pagination'
import { EmailSignup } from '@/components/email-signup'
import { Opportunity, COUNTRIES } from '@/lib/api'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NGO Jobs - Uganda, Kenya, Tanzania, Rwanda, Ethiopia',
  description: 'Find the latest NGO and development sector jobs across East Africa. Updated daily.',
}

interface PageProps {
  searchParams: Promise<{ page?: string; country?: string }>
}

const featuredEmployers = [
  { name: 'UNHCR', logo: 'U' },
  { name: 'UNICEF', logo: 'U' },
  { name: 'World Bank', logo: 'W' },
  { name: 'IRC', logo: 'I' },
  { name: 'Mercy Corps', logo: 'M' },
  { name: 'USAID', logo: 'U' },
]

async function JobsGrid({ page, country }: { page: number; country?: string }) {
  const limit = 15
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      category: 'Job',
    })
    if (country) params.set('country', country)

    const res = await fetch(
      `https://api.opportunityradar.africa/api/opportunities?${params}`,
      { cache: 'no-store' }
    )

    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const totalPages = Math.ceil(data.total / limit)

    return (
      <>
        <div className="mb-6">
          <p className="text-sm text-muted-text">
            <span className="font-semibold text-navy">{data.total}</span> jobs available
          </p>
        </div>
        {data.results.length === 0 ? (
          <div className="rounded-card bg-white p-12 text-center shadow-card">
            <p className="font-display text-xl font-semibold text-navy">No jobs found</p>
            <p className="mt-2 text-muted-text">Check back tomorrow for new listings.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.results.map((opportunity: Opportunity, index: number) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination currentPage={page} totalPages={totalPages} basePath="/jobs" />
            </div>
          </>
        )}
      </>
    )
  } catch {
    return (
      <div className="rounded-card bg-white p-12 text-center shadow-card">
        <p className="font-display text-xl font-semibold text-navy">Unable to load jobs</p>
        <p className="mt-2 text-muted-text">Please try again later.</p>
      </div>
    )
  }
}

function JobsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <OpportunityCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const country = params.country

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
                <Briefcase className="h-7 w-7 text-accent-green" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  NGO & Development Jobs
                </h1>
                <p className="mt-1 text-white/70">Careers in international development across East Africa</p>
              </div>
            </div>
            <Link href="https://wa.me/256748556140?text=I%20want%20to%20post%20a%20job%20on%20OpportunityRadar" target="_blank">
              <Button className="bg-accent-green text-white hover:bg-accent-green/90">
                <Building2 className="mr-2 h-4 w-4" />
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border-color bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-center text-sm text-muted-text">Featured Employers</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {featuredEmployers.map((employer) => (
              <div key={employer.name}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background font-display text-lg font-bold text-navy"
                title={employer.name}>
                {employer.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-color bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-text">
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/jobs" className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!country ? 'bg-navy text-white' : 'bg-background text-muted-text hover:bg-border-color'}`}>
                All Countries
              </a>
              {COUNTRIES.filter(c => c !== 'International' && c !== 'East Africa').map((c) => (
                <a key={c} href={`/jobs?country=${encodeURIComponent(c)}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${country === c ? 'bg-navy text-white' : 'bg-background text-muted-text hover:bg-border-color'}`}>
                  {c}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<JobsGridSkeleton />}>
            <JobsGrid page={page} country={country} />
          </Suspense>
        </div>
      </section>

      <section className="bg-navy py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Never Miss a Job</h2>
          <p className="mt-3 text-white/70">Get the latest NGO jobs delivered to your inbox daily.</p>
          <div className="mt-6"><EmailSignup /></div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
