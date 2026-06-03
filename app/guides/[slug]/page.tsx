export const dynamic = 'force-dynamic'
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

  'unra-graduate-trainee-guide': {
    title: 'How to Apply for UNRA Graduate Trainee Program',
    category: 'Jobs',
    readTime: 6,
    content: `
## Introduction

The Uganda National Roads Authority (UNRA) Graduate Trainee Program is one of the most competitive and rewarding entry-level opportunities for fresh graduates in Uganda. It offers hands-on experience in infrastructure development and a clear path to permanent employment.

## Eligibility Requirements

To qualify for the UNRA Graduate Trainee Program you must:
- Hold a Bachelor's degree (Second Class Upper or First Class) from a recognized university
- Have graduated within the last two years
- Be a Ugandan citizen aged 25 years or below
- Have no prior formal employment experience

## Popular Disciplines Recruited

UNRA typically recruits graduates in:
- Civil Engineering
- Electrical Engineering
- Procurement and Supply Chain Management
- Finance and Accounting
- Information Technology
- Human Resource Management
- Environmental Science

## Step 1: Monitor the UNRA Website

UNRA advertises trainee positions on their official website and in national newspapers. Subscribe to OpportunityRadar to get instant alerts when UNRA posts new opportunities.

## Step 2: Prepare Your Application Package

Gather these documents before the deadline:
- Certified copies of academic transcripts
- Certified copy of your degree certificate
- National ID copy
- Passport photo
- Updated CV (maximum 3 pages)
- Cover letter addressed to the Executive Director

## Step 3: Write a Strong Cover Letter

Your cover letter should:
- State the specific discipline you are applying for
- Highlight your most relevant academic achievements
- Show knowledge of UNRA's mandate and projects
- Demonstrate enthusiasm for infrastructure development

## Step 4: Submit Your Application

Applications are typically submitted online through the UNRA recruitment portal or via email. Follow instructions exactly — late or incomplete applications are automatically disqualified.

## Step 5: Prepare for the Selection Process

The selection process usually includes:
- Written aptitude test
- Technical interview
- HR interview
- Medical examination

## Tips for Success

1. **Academic excellence matters** — A strong GPA significantly improves your chances
2. **Know UNRA's projects** — Research current road projects like the Kampala-Jinja Expressway
3. **Practice aptitude tests** — Numerical and verbal reasoning are commonly tested
4. **Dress professionally** — First impressions count at interviews
5. **Follow up** — A polite follow-up email after interview shows initiative
    `,
  },
  'top-10-ngo-jobs-uganda': {
    title: 'Top 10 NGO Jobs Uganda - How to Get Hired',
    category: 'Jobs',
    readTime: 10,
    content: `
## Introduction

Uganda hosts hundreds of international NGOs making it one of East Africa's most active humanitarian job markets. Landing an NGO job can transform your career — offering competitive salaries, international exposure, and meaningful work.

## The Top NGOs Hiring in Uganda

### 1. UNHCR (UN Refugee Agency)
Focuses on refugee protection and assistance. Uganda hosts over 1.5 million refugees making UNHCR one of the largest employers.

### 2. UNICEF Uganda
Works on child protection, education, nutrition, and WASH programs. Regularly hires programme officers, supply specialists, and communication staff.

### 3. World Food Programme (WFP)
Manages food assistance and logistics for vulnerable populations. Strong demand for supply chain, logistics, and nutrition professionals.

### 4. International Rescue Committee (IRC)
Implements health, protection, and economic recovery programs. Hires heavily in northern Uganda and refugee-hosting districts.

### 5. Save the Children
Focuses on child rights, education, and health. One of the most active NGOs in Uganda with regular recruitment.

### 6. Mercy Corps
Works on resilience, food security, and market systems. Strong presence in Karamoja and northern regions.

### 7. Médecins Sans Frontières (MSF)
Hires medical professionals, logisticians, and finance staff for emergency health programs.

### 8. Catholic Relief Services (CRS)
Implements agriculture, WASH, and emergency response programs across Uganda.

### 9. Plan International
Focuses on girls' rights, education, and child protection. Headquartered in Kampala with field offices nationwide.

### 10. Action Against Hunger (ACF)
Specializes in nutrition and WASH programs. Actively recruits field-level staff.

## How to Get Hired

### Build the Right Skills
Most NGOs look for:
- Programme management experience
- Monitoring and Evaluation (M&E) skills
- Report writing ability
- Community mobilization experience
- Proficiency in MS Office and data tools

### Where to Find NGO Jobs
- ReliefWeb (reliefweb.int) — the global standard
- NGO Jobs in Africa (ngojobsinafrica.com)
- OpportunityRadar — aggregates all East African NGO jobs
- Individual NGO websites
- LinkedIn

### Craft an NGO-Specific CV
Your CV should highlight:
- Impact metrics ("trained 200 farmers", "reached 5,000 beneficiaries")
- Donor experience (USAID, DFID, EU, UN agencies)
- Field experience in challenging environments
- Language skills (especially French for francophone coverage)

### Network Actively
- Attend NGO coordination meetings (Kampala has active clusters)
- Join professional groups on LinkedIn
- Connect with HR managers at NGO forums

## Common Interview Questions

1. Why do you want to work for this NGO specifically?
2. Describe a time you worked in a challenging field environment
3. How do you handle community resistance?
4. What is your experience with donor reporting?
5. How do you prioritize competing deadlines?

## Salary Ranges in Uganda NGO Sector

- Entry level (Programme Assistant): UGX 2M–4M/month
- Mid-level (Programme Officer): UGX 4M–8M/month
- Senior level (Programme Manager): UGX 8M–15M/month
- Country Director level: UGX 20M+/month
    `,
  },
  'kcca-jobs-application-guide': {
    title: 'KCCA Jobs: Complete Application Guide',
    category: 'Jobs',
    readTime: 7,
    content: `
## Introduction

The Kampala Capital City Authority (KCCA) is one of Uganda's largest public employers. Managing Uganda's capital city, KCCA offers stable employment, good benefits, and opportunities to directly improve Kampala's urban development.

## About KCCA

KCCA was established in 2011 under the KCCA Act to manage Kampala City. It employs thousands of staff across departments including:
- Engineering and Technical Services
- Public Health and Environment
- Revenue Collection
- Education and Social Services
- Urban Planning
- Information and Communication Technology

## Types of KCCA Jobs

### Permanent and Pensionable Posts
Core government positions with full benefits, pension, and job security. Competitive and highly sought after.

### Contract Posts
Fixed-term positions typically ranging from 1-3 years. Often renewable based on performance.

### Consultancy Opportunities
Short-term technical assignments for specialized skills.

## How to Apply for KCCA Jobs

### Step 1: Find the Vacancy
KCCA advertises vacancies through:
- The KCCA official website (kcca.go.ug)
- New Vision newspaper
- Daily Monitor newspaper
- OpportunityRadar daily digest

### Step 2: Check Minimum Qualifications
Each post has specific requirements. Common requirements include:
- Relevant university degree
- Professional qualifications where applicable
- Years of relevant experience
- Computer literacy

### Step 3: Prepare Your Application

Your application must include:
- Filled application form (download from KCCA website)
- Detailed CV
- Certified copies of academic certificates
- Certified copy of National ID
- Two passport photos
- Contact details of three referees

### Step 4: Submit Before the Deadline

Applications can be submitted:
- Online through the KCCA recruitment portal
- Physical delivery to KCCA headquarters, City Hall, Kampala

### Step 5: The Selection Process

KCCA's recruitment process typically involves:
- Application screening
- Written examination
- Oral interview
- Medical examination
- Background verification

## Tips for Success

1. **Submit complete applications** — Missing documents cause automatic disqualification
2. **Use the official form** — KCCA requires their specific application form
3. **Certify all documents** — Photocopies must be certified by a Commissioner for Oaths
4. **Meet deadlines strictly** — Late applications are never accepted
5. **Research KCCA's strategic plan** — Show you understand their urban development agenda

## Key Departments to Target

If you have an engineering background, target the Directorate of Engineering and Technical Services. Finance professionals should look at the Directorate of Revenue Collection. Urban planners fit well in the Physical Planning department.
    `,
  },
  'bid-writing-uganda-tenders': {
    title: 'How to Write a Winning Bid for Uganda Government Tenders',
    category: 'Tenders',
    readTime: 15,
    content: `
## Introduction

Winning government tenders in Uganda requires more than just competitive pricing. Evaluators look for technically sound, well-structured bids that demonstrate capacity, compliance, and value for money. This guide covers everything you need to write bids that win.

## Understanding How Bids Are Evaluated

Uganda's PPDA framework uses a scoring system that typically combines:
- Technical score (60-80% weight)
- Financial score (20-40% weight)

Understanding this split is critical — many bidders lose by focusing only on price.

## The Two Main Components of a Bid

### 1. Technical Proposal
Demonstrates your capability to deliver the contract. This is where most contracts are won or lost.

### 2. Financial Proposal
Your price for delivering the goods or services. Must be competitive but also realistic.

## Writing a Winning Technical Proposal

### Company Profile Section
- Company registration and history
- Core business areas
- Key personnel and their qualifications
- Previous similar contracts (with values and client contacts)
- Equipment and facilities

### Understanding of the Assignment
Show you have read the Terms of Reference (ToR) carefully:
- Restate the objectives in your own words
- Identify key challenges and how you will address them
- Show local knowledge and context

### Methodology
This is the most important section:
- Describe your approach step by step
- Include a detailed work plan with timeline
- Assign specific team members to specific tasks
- Show how you will ensure quality

### Team Qualifications
For each key person include:
- Detailed CV highlighting relevant experience
- Academic and professional certificates
- Specific role in this assignment

## Writing a Competitive Financial Proposal

### Price Your Bid Carefully
- Research market rates for similar contracts
- Include all costs (staff, equipment, transport, overheads, profit)
- Never submit a price you cannot deliver on

### Common Financial Proposal Sections
- Personnel costs (daily rates x days)
- Travel and transport
- Equipment and materials
- Overhead and administration (typically 10-15%)
- Contingency (typically 5%)
- VAT (18% in Uganda)

## Compliance Checklist

Before submitting verify you have:
- Valid URSB registration certificate
- Valid URA tax clearance certificate
- Valid NSSF clearance
- Bid security (if required)
- All forms signed and stamped
- Correct number of copies

## Common Reasons Bids Are Rejected

1. Missing or expired compliance documents
2. Bid submitted after deadline
3. Wrong format or missing sections
4. Unrealistic pricing (too low or too high)
5. Insufficient evidence of past experience
6. Poor quality writing and presentation

## Professional Bid Writing Tips

1. **Start early** — Give yourself at least 2 weeks for complex bids
2. **Read the ToR three times** — Understand exactly what is required
3. **Use the evaluation criteria** — Structure your bid around scoring criteria
4. **Quantify everything** — Numbers are more convincing than words
5. **Proofread carefully** — Spelling errors undermine credibility
6. **Use professional formatting** — Clear headings, consistent fonts, page numbers

## Getting Help with Bid Writing

OpportunityRadar offers professional bid writing services starting at UGX 500,000 per bid. Our team has helped clients win contracts worth billions of shillings. Contact us at opportunityradar.africa to discuss your needs.
    `,
  },
  'uganda-public-service-commission': {
    title: 'Uganda Public Service Commission: How It Works',
    category: 'Jobs',
    readTime: 8,
    content: `
## Introduction

The Uganda Public Service Commission (UPSC) is the constitutional body responsible for recruiting, confirming, and managing senior public servants in Uganda. Understanding how UPSC works is essential for anyone seeking a government career.

## What is the UPSC?

Established under Article 165 of the Uganda Constitution, the UPSC manages recruitment for:
- Central government ministries and departments
- Constitutional commissions
- Other public service bodies

Note: Local government recruitment is handled by District Service Commissions (DSCs), not the UPSC.

## Types of Positions Recruited by UPSC

### Professional and Technical Posts
Engineers, doctors, lawyers, accountants, and other professionals in government ministries.

### Administrative Posts
Permanent Secretaries, Under Secretaries, Assistant Secretaries, and administrative officers.

### Specialized Roles
ICT officers, statisticians, scientists, and other specialized government roles.

## How the UPSC Recruitment Process Works

### Step 1: Advertisement
UPSC publishes vacancies in:
- The Uganda Gazette (official government publication)
- New Vision and Daily Monitor newspapers
- The UPSC official website (psc.go.ug)
- OpportunityRadar aggregates these for easy access

### Step 2: Application Submission

Applications are submitted to:
**The Secretary**
Public Service Commission
Workers House, 3rd Floor
P.O. Box 3145, Kampala

Or online through the UPSC portal when available.

### Step 3: Shortlisting

UPSC reviews all applications against minimum qualifications. Only candidates meeting all requirements are shortlisted.

### Step 4: Written Examination

For many posts, shortlisted candidates sit a written examination testing:
- Professional knowledge
- General knowledge
- English language proficiency
- Analytical reasoning

### Step 5: Oral Interview

Candidates who pass written exams are invited for panel interviews conducted by UPSC commissioners and technical experts.

### Step 6: Appointment

Successful candidates receive appointment letters and are confirmed in post after a probationary period (usually 6 months to 1 year).

## Required Documents for UPSC Applications

- Certified copies of academic certificates and transcripts
- Professional membership certificates where applicable
- National ID certified copy
- Two recent passport photos
- Detailed CV
- Names and contacts of three referees

## Salary Scales in Public Service

Uganda's public service uses standardized pay scales:
- U1 (Permanent Secretary level): Highest
- U2-U4: Senior management
- U5-U7: Professional and technical
- U8 (Entry level): Starting point for most graduates

## Tips for UPSC Success

1. **Check minimum qualifications carefully** — Applying for posts you don't qualify for wastes everyone's time
2. **Certify all documents** — A Commissioner for Oaths must certify all copies
3. **Apply for the right scale** — Match your qualifications to the advertised scale
4. **Prepare for written exams** — Past papers are invaluable preparation
5. **Be patient** — UPSC processes can take 3-6 months from application to appointment
6. **Follow up professionally** — You can inquire about application status after 3 months

## Common Mistakes to Avoid

- Submitting uncertified documents
- Missing the application deadline
- Applying for posts you are overqualified for
- Not including all required documents
- Providing wrong contact information
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
