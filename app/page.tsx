import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Globe, Clock, Zap } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'
import { SearchBar } from '@/components/search-bar'
import { CategoryFilter } from '@/components/category-filter'
import { Pagination } from '@/components/pagination'
import { EmailSignup } from '@/components/email-signup'
import { fetchOpportunities, fetchStats } from '@/lib/api'
import { Button } from '@/components/ui/button'

interface PageProps {
  searchParams: Promise<{
    page?: string
    category?: string
    country?: string
    search?: string
  }>
}

async function StatsBar() {
  const stats = await fetchStats()
  
  const statItems = [
    { icon: TrendingUp, label: 'Total Opportunities', value: stats.total || '75+' },
    { icon: Zap, label: 'Added Today', value: (stats as any).addedToday || '12' },
    { icon: Globe, label: 'Countries', value: (stats as any).countries || 5 },
    { icon: Clock, label: 'Updates', value: 'Daily' },
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm border-y border-border-color">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statItems.map((stat) => (
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
  )
}

async function OpportunitiesGrid({ 
  page, 
  category, 
  country, 
  search 
}: { 
  page: number
  category?: string
  country?: string
  search?: string
}) {
  const limit = 15
  
  try {
    const data = await fetchOpportunities({ page, limit, category, country, search })
    const totalPages = Math.ceil(data.total / limit)

    if (data.results.length === 0) {
      return (
        <div className="rounded-card bg-white p-12 text-center shadow-card">
          <p className="font-display text-xl font-semibold text-navy">No opportunities found</p>
          <p className="mt-2 text-muted-text">Try adjusting your filters or check back tomorrow for new listings.</p>
        </div>
      )
    }

    return (
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.results.map((opportunity, index) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
          ))}
        </div>
        <div className="mt-8">
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </>
    )
  } catch {
    return (
      <div className="rounded-card bg-white p-12 text-center shadow-card">
        <p className="font-display text-xl font-semibold text-navy">Unable to load opportunities</p>
        <p className="mt-2 text-muted-text">Please try again later.</p>
      </div>
    )
  }
}

function OpportunitiesGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <OpportunityCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const category = params.category
  const country = params.country
  const search = params.search

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy/90" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-4 top-1/4 h-72 w-72 rounded-full bg-accent-green/20 blur-3xl" />
          <div className="absolute -right-4 bottom-1/4 h-72 w-72 rounded-full bg-amber/20 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">East Africa&apos;s</span>
              <span className="block text-accent-green">Opportunity Intelligence Platform</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Tenders, NGO jobs, grants and scholarships across Uganda, Kenya, Tanzania, Rwanda and Ethiopia — delivered daily.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#opportunities">
                <Button size="lg" className="bg-accent-green text-white hover:bg-accent-green/90">
                  Browse Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/alerts">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                  Get Free Alerts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <Suspense fallback={<div className="h-20 animate-pulse bg-white" />}>
        <StatsBar />
      </Suspense>

      {/* AdSense Top */}
      <div id="adsense-top" className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-text">
          Advertisement
        </div>
      </div>

      {/* Search & Filters */}
      <section className="bg-background py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-12 animate-pulse rounded-card bg-white" />}>
            <SearchBar />
          </Suspense>
          <div className="mt-6">
            <Suspense fallback={<div className="h-10 w-64 animate-pulse rounded-full bg-white" />}>
              <CategoryFilter />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section id="opportunities" className="bg-background pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<OpportunitiesGridSkeleton />}>
            <OpportunitiesGrid page={page} category={category} country={country} search={search} />
          </Suspense>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Get Daily Alerts Free
          </h2>
          <p className="mt-4 text-white/70">
            Never miss an opportunity. Get the latest tenders, jobs, and grants delivered to your inbox every morning.
          </p>
          <div className="mt-8">
            <EmailSignup />
          </div>
        </div>
      </section>

      {/* AdSense Bottom */}
      <div id="adsense-bottom" className="bg-background py-4">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-text">
          Advertisement
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
