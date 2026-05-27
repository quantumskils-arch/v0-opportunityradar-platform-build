import { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Share2, Twitter, Facebook, MessageCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { EmailSignup } from '@/components/email-signup'
import { fetchOpportunities } from '@/lib/api'
import { OpportunityCard, OpportunityCardSkeleton } from '@/components/opportunity-card'

const guides: Record<string, {
  title: string
  category: string
  readTime: number
  content: string
}> = {
  'how-to-apply-for-ura-jobs': {
    title: 'How to Apply for URA Jobs in Uganda (2025 Guide)',
    category: 'Jobs',
    readTime: 8,
    content: `
## Introduction

The Uganda Revenue Authority (URA) is one of the most sought-after employers in Uganda. With competitive salaries, excellent benefits, and job security, URA positions attract thousands of applicants every year.

## Step 1: Check Eligibility Requirements

Before applying, ensure you meet the basic requirements:
- Ugandan citizenship
- Relevant academic qualifications (usually Bachelor's degree minimum)
- Clean criminal record
- Willingness to work anywhere in Uganda

## Step 2: Monitor URA Careers Portal

URA posts all job openings on their official careers portal. Check regularly and set up job alerts to be notified of new positions.

## Step 3: Prepare Your Documents

Gather all required documents:
- Updated CV/Resume
- Academic transcripts and certificates
- National ID
- Passport photos
- Reference letters

## Step 4: Complete the Online Application

Fill out the application form carefully. Double-check all information before submitting.

## Step 5: Prepare for Aptitude Tests

URA uses aptitude tests to screen candidates. Practice numerical reasoning, verbal reasoning, and situational judgment tests.

## Step 6: Ace the Interview

If shortlisted, prepare for panel interviews. Research URA's mission, values, and recent initiatives.

## Tips for Success

1. **Tailor your CV** - Highlight relevant experience
2. **Practice aptitude tests** - Use our Past Papers section
3. **Network** - Connect with current URA employees
4. **Stay informed** - Follow URA news and updates
5. **Be patient** - The process can take several months
    `,
  },
  'win-government-tenders-uganda': {
    title: 'How to Win Government Tenders in Uganda',
    category: 'Tenders',
    readTime: 12,
    content: `
## Introduction

Government tenders in Uganda represent billions of shillings in opportunities. Understanding the procurement process is key to winning contracts.

## Understanding the Procurement Framework

Uganda's public procurement is governed by the PPDA (Public Procurement and Disposal of Public Assets Authority). All procuring entities must follow these guidelines.

## Step 1: Register Your Business

Ensure your business is:
- Registered with URSB
- Tax compliant (URA TIN)
- VAT registered (if applicable)

## Step 2: Get PPDA Provider Registration

Register on the PPDA provider database. This is often a prerequisite for government tenders.

## Step 3: Monitor Tender Portals

Check these sources regularly:
- GPP (Government Procurement Portal)
- Individual ministry websites
- New Vision and Daily Monitor newspapers
- OpportunityRadar (for aggregated listings)

## Step 4: Evaluate Bid Worthiness

Before bidding, assess:
- Your capacity to deliver
- Competition level
- Profit margins
- Payment terms and risks

## Step 5: Prepare Your Bid

A winning bid includes:
- Technical proposal demonstrating capability
- Financial proposal with competitive pricing
- All required compliance documents
- Bid security (if required)

## Common Mistakes to Avoid

1. Missing submission deadlines
2. Incomplete documentation
3. Unrealistic pricing
4. Ignoring evaluation criteria
5. Poor proposal formatting
    `,
  },
  'mastercard-foundation-scholarship': {
    title: 'Mastercard Foundation Scholarship: Complete Guide',
    category: 'Scholarships',
    readTime: 9,
    content: `
## About the Program

The Mastercard Foundation Scholars Program is one of the most prestigious scholarship programs for African students. It provides full funding for undergraduate and graduate studies at top universities worldwide.

## Eligibility Criteria

- African citizen
- Demonstrated academic excellence
- Financial need
- Leadership potential
- Commitment to giving back to Africa

## Partner Universities

The program partners with universities including:
- University of Cape Town
- USIU-Africa
- Makerere University
- University of Edinburgh
- Duke University
- And many more

## Application Process

### Step 1: Choose Your University
Select a partner university that offers your desired program.

### Step 2: Apply to the University
Submit your university application through their standard process.

### Step 3: Apply for the Scholarship
Complete the Mastercard Foundation scholarship application (usually separate from university application).

### Step 4: Submit Supporting Documents
- Academic transcripts
- Letters of recommendation
- Personal statement
- Proof of financial need

## Tips for a Strong Application

1. **Show leadership** - Highlight community involvement
2. **Demonstrate impact** - Share how you've made a difference
3. **Be authentic** - Tell your genuine story
4. **Plan ahead** - Applications open months in advance
5. **Proofread** - Have multiple people review your essays
    `,
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = guides[slug]
  
  if (!guide) {
    return { title: 'Guide Not Found' }
  }

  return {
    title: guide.title,
    description: `Read our complete guide on ${guide.title.toLowerCase()}. Expert advice for East African professionals.`,
  }
}

async function RelatedOpportunities({ category }: { category: string }) {
  try {
    const categoryMap: Record<string, string> = {
      Jobs: 'Job',
      Tenders: 'Government Tender',
      Scholarships: 'Grant/Scholarship',
    }
    const data = await fetchOpportunities({ limit: 3, category: categoryMap[category] })
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

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = guides[slug]

  if (!guide) {
    notFound()
  }

  const categoryColors: Record<string, string> = {
    Jobs: 'bg-accent-green/10 text-accent-green',
    Tenders: 'bg-blue-100 text-blue-700',
    Scholarships: 'bg-amber/10 text-amber-700',
  }

  const shareUrl = `https://opportunityradar.africa/guides/${slug}`

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-sm text-muted-text hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Guides
          </Link>

          {/* Header */}
          <header className="mt-6">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[guide.category]}`}>
              {guide.category}
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
              {guide.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-text">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{guide.readTime} min read</span>
              </div>
            </div>
          </header>

          {/* AdSense Top */}
          <div id="adsense-top" className="my-6 rounded-card bg-white p-4 text-center text-sm text-muted-text shadow-card">
            Advertisement
          </div>

          <div className="mt-8 flex gap-8">
            {/* Table of Contents - Desktop */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-card bg-white p-4 shadow-card">
                <h3 className="font-semibold text-navy">Table of Contents</h3>
                <nav className="mt-3 space-y-2 text-sm">
                  {guide.content.match(/^## .+$/gm)?.map((heading, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="block text-muted-text hover:text-navy"
                    >
                      {heading.replace('## ', '')}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
                <div className="prose prose-navy max-w-none">
                  {guide.content.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} id={`section-${index}`} className="mt-8 font-display text-xl font-bold text-navy first:mt-0">
                          {line.replace('## ', '')}
                        </h2>
                      )
                    }
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={index} className="mt-6 font-display text-lg font-semibold text-navy">
                          {line.replace('### ', '')}
                        </h3>
                      )
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="ml-4 text-muted-text">
                          {line.replace('- ', '')}
                        </li>
                      )
                    }
                    if (line.match(/^\d+\. /)) {
                      return (
                        <li key={index} className="ml-4 text-muted-text">
                          {line.replace(/^\d+\. /, '')}
                        </li>
                      )
                    }
                    if (line.trim()) {
                      return (
                        <p key={index} className="mt-4 text-muted-text">
                          {line}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-6 flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-muted-text">
                  <Share2 className="h-4 w-4" />
                  Share:
                </span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(guide.title + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] p-2 text-white hover:bg-[#25D366]/90"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-navy p-2 text-white hover:bg-navy/90"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* AdSense Bottom */}
          <div id="adsense-bottom" className="my-6 rounded-card bg-white p-4 text-center text-sm text-muted-text shadow-card">
            Advertisement
          </div>
        </div>
      </article>

      {/* Related Opportunities */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-navy">Related Opportunities</h2>
          <div className="mt-6">
            <Suspense fallback={<RelatedOpportunitiesSkeleton />}>
              <RelatedOpportunities category={guide.category} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Get More Career Tips
          </h2>
          <p className="mt-3 text-white/70">
            Subscribe to receive expert guides and opportunity alerts.
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

export async function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }))
}
