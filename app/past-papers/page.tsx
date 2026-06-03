'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Eye, TrendingUp, Mail, X, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { API_BASE_URL } from '@/lib/api'

const pastPapers = [
  { id: 1, title: 'URA Aptitude Test Pack', description: 'Complete collection of URA aptitude tests from 2020-2025. Numerical reasoning, verbal reasoning, and situational judgment.', years: '2020-2025', downloads: 1250, trending: true, category: 'Government', sampleQuestions: [{ q: 'If a train travels 120km in 2 hours, what is its speed?', options: ['40 km/h', '60 km/h', '80 km/h', '100 km/h'], answer: 'B' },{ q: 'Which word is the odd one out: Revenue, Tax, Customs, Hospital?', options: ['Revenue', 'Tax', 'Customs', 'Hospital'], answer: 'D' },{ q: 'A taxpayer earns UGX 5,000,000/month. Which URA tax applies?', options: ['VAT', 'PAYE', 'Corporate Tax', 'Excise Duty'], answer: 'B' }] },
  { id: 2, title: 'UNRA Graduate Trainee Papers', description: 'Past papers for UNRA Graduate Trainee Programme. Engineering, Administration, and Finance tracks.', years: '2021-2025', downloads: 890, trending: true, category: 'Government', sampleQuestions: [{ q: 'What does UNRA stand for?', options: ['Uganda National Roads Authority', 'Uganda National Revenue Authority', 'Uganda National Roads Agency', 'None'], answer: 'A' },{ q: 'Which road connects Kampala to Jinja?', options: ['Northern Bypass', 'Kampala-Jinja Highway', 'Entebbe Expressway', 'Gulu Highway'], answer: 'B' },{ q: 'What is the standard road width for a Uganda national highway?', options: ['4m', '6m', '7.5m', '10m'], answer: 'C' }] },
  { id: 3, title: 'Uganda Public Service Commission Prep', description: 'Comprehensive preparation for UPSC examinations. General paper, essay writing, and interview questions.', years: '2019-2025', downloads: 2100, trending: false, category: 'Government', sampleQuestions: [{ q: "What Article establishes the Public Service Commission?", options: ['Article 155', 'Article 165', 'Article 175', 'Article 185'], answer: 'B' },{ q: 'How long is the probationary period for most public servants?', options: ['3 months', '6 months', '1 year', '2 years'], answer: 'C' },{ q: 'Which ministry oversees the Public Service Commission?', options: ['Finance', 'Public Service', 'Internal Affairs', 'Justice'], answer: 'B' }] },
  { id: 4, title: 'NGO Interview Question Bank', description: '500+ real interview questions from UNHCR, UNICEF, WFP, IRC, and other major NGOs with model answers.', years: '2022-2025', downloads: 750, trending: true, category: 'NGO', sampleQuestions: [{ q: 'What does UNHCR stand for?', options: ['UN High Commission for Refugees', 'UN Humanitarian Crisis Response', 'UN Health Care Resources', 'None'], answer: 'A' },{ q: 'What is the SPHERE standard related to?', options: ['Financial reporting', 'Humanitarian response quality', 'Staff recruitment', 'Donor relations'], answer: 'B' },{ q: 'What does M&E stand for in NGO work?', options: ['Management & Evaluation', 'Monitoring & Evaluation', 'Mapping & Engagement', 'None'], answer: 'B' }] },
  { id: 5, title: 'KCCA Recruitment Prep Pack', description: 'Interview questions, aptitude tests, and assessment tips for Kampala Capital City Authority jobs.', years: '2020-2025', downloads: 620, trending: false, category: 'Government', sampleQuestions: [{ q: 'When was KCCA established?', options: ['2009', '2010', '2011', '2012'], answer: 'C' },{ q: 'What is the main mandate of KCCA?', options: ['Tax collection', 'Urban management of Kampala', 'Road construction', 'Healthcare'], answer: 'B' },{ q: 'Who heads KCCA as the technical head?', options: ['Mayor', 'Executive Director', 'Minister', 'Commissioner'], answer: 'B' }] },
  { id: 6, title: 'Mastercard Foundation Scholarship Guide', description: 'Complete application guide, essay templates, and interview preparation for the Mastercard Foundation Scholars Program.', years: '2021-2025', downloads: 1800, trending: true, category: 'Scholarship', sampleQuestions: [{ q: 'What is the core selection criterion for Mastercard Foundation Scholars?', options: ['Academic excellence only', 'Financial need only', 'Leadership + Academic + Financial need', 'Age only'], answer: 'C' },{ q: 'Which Ugandan university partners with Mastercard Foundation?', options: ['Kyambogo', 'Makerere', 'MUBS', 'UCU'], answer: 'B' },{ q: 'What does "giving back" mean in the MFC context?', options: ['Paying back the scholarship', 'Returning to serve African communities', 'Donating money', 'Teaching'], answer: 'B' }] },
]

function generateSamplePDF(paper: typeof pastPapers[0], email: string) {
  const lines: string[] = []
  lines.push('OPPORTUNITYRADAR.AFRICA — FREE SAMPLE PACK')
  lines.push('='.repeat(50))
  lines.push('')
  lines.push(paper.title.toUpperCase())
  lines.push('Years: ' + paper.years)
  lines.push('')
  lines.push('Prepared for: ' + email)
  lines.push('Date: ' + new Date().toDateString())
  lines.push('')
  lines.push('SAMPLE QUESTIONS:')
  lines.push('-'.repeat(40))
  paper.sampleQuestions.forEach((q, i) => {
    lines.push('Q' + (i+1) + ': ' + q.q)
    q.options.forEach((o, j) => lines.push('   ' + String.fromCharCode(65+j) + ') ' + o))
    lines.push('Answer: ' + q.answer)
    lines.push('')
  })
  lines.push('-'.repeat(40))
  lines.push('Get the FULL pack at: opportunityradar.africa/past-papers')
  lines.push('Subscribe for daily alerts: opportunityradar.africa')
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = paper.title.toLowerCase().replace(/\s+/g, '-') + '-sample.txt'
  a.click()
  URL.revokeObjectURL(url)
}

export default function PastPapersPage() {
  const [previewPaper, setPreviewPaper] = useState<typeof pastPapers[0] | null>(null)
  const [downloadPaper, setDownloadPaper] = useState<typeof pastPapers[0] | null>(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const handleDownload = async () => {
    if (!email || !downloadPaper) return
    setStatus('loading')
    try {
      await fetch(API_BASE_URL + '/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, name: 'Past Papers Subscriber' }) })
    } catch {}
    generateSamplePDF(downloadPaper, email)
    setStatus('done')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <FileText className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Past Papers & Prep Packs</h1>
              <p className="mt-1 text-white/70">Free sample questions for Uganda government jobs, NGOs and scholarships</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastPapers.map((paper, index) => (
              <motion.div key={paper.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="rounded-card bg-white p-6 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-accent-green/10 px-3 py-1 text-xs font-medium text-accent-green">{paper.category}</span>
                  {paper.trending && <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"><TrendingUp className="h-3 w-3" /> Trending</span>}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{paper.title}</h3>
                <p className="mt-2 text-sm text-muted-text line-clamp-2">{paper.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-text">
                  <span>{paper.years}</span>
                  <span>{paper.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setPreviewPaper(paper)} className="flex-1 rounded-card border border-border-color py-2 text-sm font-medium text-navy hover:border-accent-green hover:text-accent-green transition-all flex items-center justify-center gap-1">
                    <Eye className="h-4 w-4" /> Preview
                  </button>
                  <button onClick={() => { setDownloadPaper(paper); setStatus('idle'); setEmail('') }} className="flex-1 rounded-card bg-accent-green py-2 text-sm font-medium text-white hover:bg-accent-green/90 transition-all flex items-center justify-center gap-1">
                    <Download className="h-4 w-4" /> Free Sample
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {previewPaper && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-lg rounded-card bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setPreviewPaper(null)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"><X className="h-5 w-5 text-muted-text" /></button>
              <h2 className="font-display text-xl font-bold text-navy mb-1">{previewPaper.title}</h2>
              <p className="text-sm text-muted-text mb-6">3 sample questions from this pack</p>
              <div className="space-y-4">
                {previewPaper.sampleQuestions.map((q, i) => (
                  <div key={i} className="rounded-card bg-gray-50 p-4">
                    <p className="font-medium text-navy text-sm mb-3">Q{i+1}: {q.q}</p>
                    <div className="space-y-2">
                      {q.options.map((o, j) => (
                        <div key={j} className={'flex items-center gap-2 rounded-md px-3 py-2 text-sm ' + (String.fromCharCode(65+j) === q.answer ? 'bg-accent-green/10 text-accent-green font-medium' : 'text-muted-text')}>
                          <span className="font-mono">{String.fromCharCode(65+j)})</span> {o}
                          {String.fromCharCode(65+j) === q.answer && <Check className="h-4 w-4 ml-auto" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setDownloadPaper(previewPaper); setPreviewPaper(null); setStatus('idle'); setEmail('') }} className="mt-6 w-full rounded-card bg-accent-green py-3 text-white font-semibold hover:bg-accent-green/90 flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Get Full Sample Pack Free
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {downloadPaper && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-md rounded-card bg-white p-6 shadow-xl">
              {status !== 'done' ? (
                <>
                  <button onClick={() => setDownloadPaper(null)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"><X className="h-5 w-5 text-muted-text" /></button>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-green/10 mb-4"><Mail className="h-6 w-6 text-accent-green" /></div>
                  <h2 className="font-display text-xl font-bold text-navy">Get Your Free Sample</h2>
                  <p className="mt-2 text-sm text-muted-text mb-6">Enter your email to download <strong>{downloadPaper.title}</strong> sample + get daily opportunity alerts.</p>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="w-full rounded-md border border-border-color px-3 py-3 text-sm mb-4 focus:border-accent-green focus:outline-none" />
                  <button onClick={handleDownload} disabled={!email || status === 'loading'} className="w-full rounded-card bg-accent-green py-3 text-white font-semibold hover:bg-accent-green/90 disabled:opacity-50 flex items-center justify-center gap-2">
                    {status === 'loading' ? 'Processing...' : <><Download className="h-4 w-4" /> Download Free Sample</>}
                  </button>
                  <p className="mt-3 text-xs text-center text-muted-text">No spam. Unsubscribe anytime.</p>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/10 mx-auto mb-4"><Check className="h-8 w-8 text-accent-green" /></div>
                  <h2 className="font-display text-xl font-bold text-navy">Download Started!</h2>
                  <p className="mt-2 text-sm text-muted-text">Your sample pack is downloading. Check your downloads folder.</p>
                  <p className="mt-2 text-sm text-accent-green font-medium">You are now subscribed to daily opportunity alerts!</p>
                  <button onClick={() => setDownloadPaper(null)} className="mt-6 w-full rounded-card bg-navy py-3 text-white font-semibold">Done</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
