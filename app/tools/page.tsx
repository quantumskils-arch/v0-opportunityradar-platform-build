'use client'
import jsPDF from 'jspdf'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wrench, FileText, Calculator, Download, X, Printer } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

const tools = [
  { id: 'land-agreement', title: 'Land Agreement Generator', description: 'Generate a legal land sale agreement template', icon: FileText, color: 'bg-blue-500' },
  { id: 'tenancy-agreement', title: 'Tenancy Agreement Generator', description: 'Create a standard Uganda tenancy agreement', icon: FileText, color: 'bg-accent-green' },
  { id: 'salary-calculator', title: 'Salary Calculator', description: 'Calculate PAYE tax, NSSF, and net take-home', icon: Calculator, color: 'bg-amber' },
  { id: 'cv-templates', title: 'Free CV Templates', description: '5 professional CV templates for download', icon: Download, color: 'bg-navy' },
]

// ---------------------------------------------------------------------------
// Shared legal-document helpers (used by the tenancy & land agreement tools)
// ---------------------------------------------------------------------------

const LEGAL_DISCLAIMER =
  'This is a template for general guidance only and is not legal advice. For high-value, disputed, or complex agreements, consult a qualified lawyer or the relevant authority before signing.'

function LegalDisclaimer() {
  return (
    <div className="rounded-card border border-amber/40 bg-amber/10 p-3 text-xs leading-relaxed text-navy/80">
      <span className="font-semibold text-navy">Disclaimer: </span>
      {LEGAL_DISCLAIMER}
    </div>
  )
}

function Field({ label, type, value, onChange }: { label: string; type?: string; value: string; onChange: (e: any) => void }) {
  const base = 'w-full rounded-md border border-border-color px-3 py-2 text-sm focus:border-accent-green focus:outline-none'
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-navy">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={onChange} rows={2} className={base} placeholder={label} />
      ) : (
        <input type={type || 'text'} value={value} onChange={onChange} className={base} placeholder={label} />
      )}
    </div>
  )
}

function orBlank(v: string) {
  return v && v.trim() ? v.trim() : '__________'
}

function moneyUGX(v: string) {
  const n = String(v ?? '').replace(/[^0-9.]/g, '')
  return n ? `UGX ${Number(n).toLocaleString()}` : 'UGX __________'
}

function fmtDate(v: string) {
  if (!v) return '__________'
  const d = new Date(v)
  return isNaN(d.getTime()) ? v : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function ordinalDay(v: string) {
  const n = parseInt(String(v), 10)
  if (!n) return '______'
  const s = ['th', 'st', 'nd', 'rd']
  const r = n % 100
  return `${n}${s[(r - 20) % 10] || s[r] || s[0]}`
}

// Builds a multi-page A4 legal document with margins, wrapping text, an
// auto running Y cursor, a header, page numbers and the disclaimer on every page.
function createLegalDoc(docTitle: string) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const marginX = 20
  const contentW = pageW - marginX * 2
  const contentTop = 28
  const contentBottom = pageH - 28
  let y = contentTop
  let clauseNum = 0

  const lh = (fs: number) => fs * 0.5

  function ensureSpace(h: number) {
    if (y + h > contentBottom) {
      doc.addPage()
      y = contentTop
    }
  }

  function addParagraph(text: string, opts: { fontSize?: number; fontStyle?: string; indent?: number; gapAfter?: number } = {}) {
    const fs = opts.fontSize ?? 11
    const indent = opts.indent ?? 0
    doc.setFont('helvetica', (opts.fontStyle ?? 'normal') as any)
    doc.setFontSize(fs)
    doc.setTextColor(20, 20, 20)
    const lines = doc.splitTextToSize(text, contentW - indent) as string[]
    for (const line of lines) {
      ensureSpace(lh(fs))
      doc.text(line, marginX + indent, y)
      y += lh(fs)
    }
    y += opts.gapAfter ?? 3
  }

  function addTitle(text: string) {
    ensureSpace(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(10, 22, 40)
    doc.text(text, pageW / 2, y, { align: 'center' })
    y += 10
  }

  function addSubtitle(text: string) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(90, 90, 90)
    const lines = doc.splitTextToSize(text, contentW) as string[]
    for (const line of lines) {
      ensureSpace(5)
      doc.text(line, pageW / 2, y, { align: 'center' })
      y += 5
    }
    y += 5
  }

  function addClause(heading: string, body: string) {
    clauseNum += 1
    ensureSpace(14)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(10, 22, 40)
    doc.text(`${clauseNum}. ${heading}`, marginX, y)
    y += 6
    addParagraph(body, { fontSize: 10.5, gapAfter: 4 })
  }

  function addSpace(h = 4) {
    y += h
  }

  function signatureBlock(role: string) {
    ensureSpace(34)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(10, 22, 40)
    doc.text(role, marginX, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(20, 20, 20)
    for (const f of ['Name:', 'Signature:', 'Date:']) {
      ensureSpace(9)
      doc.text(f, marginX, y)
      doc.setDrawColor(150)
      doc.line(marginX + 26, y + 1, marginX + 26 + 80, y + 1)
      y += 9
    }
    y += 4
  }

  function finalize(filename: string) {
    const total = doc.getNumberOfPages()
    for (let i = 1; i <= total; i++) {
      doc.setPage(i)
      // Header
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(10, 22, 40)
      doc.text('OpportunityRadar', marginX, 14)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(120, 120, 120)
      doc.text(docTitle, pageW - marginX, 14, { align: 'right' })
      doc.setDrawColor(210)
      doc.line(marginX, 18, pageW - marginX, 18)
      // Footer: disclaimer + page number
      doc.setDrawColor(210)
      doc.line(marginX, pageH - 24, pageW - marginX, pageH - 24)
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(7)
      doc.setTextColor(120, 120, 120)
      const dl = doc.splitTextToSize(LEGAL_DISCLAIMER, contentW) as string[]
      let fy = pageH - 19
      for (const line of dl) {
        doc.text(line, pageW / 2, fy, { align: 'center' })
        fy += 3
      }
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(`Page ${i} of ${total}`, pageW - marginX, pageH - 7, { align: 'right' })
    }
    doc.save(filename)
  }

  return { addTitle, addSubtitle, addClause, addParagraph, addSpace, signatureBlock, finalize }
}

function LandAgreementTool() {
  const [form, setForm] = useState({
    seller: '', buyer: '', location: '', district: '', title: '', size: '', price: '', paymentTerms: '', date: '',
  })
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value })

  const fields: [string, string, string?][] = [
    ['seller', 'Seller Full Name'],
    ['buyer', 'Buyer Full Name'],
    ['location', 'Land Location / Description', 'textarea'],
    ['district', 'District'],
    ['title', 'Plot / Title Reference (if any)'],
    ['size', 'Approximate Size (e.g. 50 x 100 ft, 2 acres)'],
    ['price', 'Agreed Price (UGX)', 'number'],
    ['paymentTerms', 'Payment Terms (e.g. full on signing, or instalments)', 'textarea'],
    ['date', 'Agreement Date', 'date'],
  ]

  const generate = () => {
    const d = createLegalDoc('Land Sale Agreement')
    d.addTitle('LAND SALE AGREEMENT')
    d.addSubtitle(`Made on ${fmtDate(form.date)} in ${orBlank(form.district)} District, Uganda`)
    d.addSpace(2)

    d.addClause('PARTIES', `This Land Sale Agreement is made between ${orBlank(form.seller)} ("the Seller") and ${orBlank(form.buyer)} ("the Buyer"), who agree to the sale and purchase of the land described below on the terms set out in this Agreement.`)

    d.addClause('THE LAND', `The Seller agrees to sell and the Buyer agrees to buy all that piece of land described as ${orBlank(form.location)}, situated in ${orBlank(form.district)} District, measuring approximately ${orBlank(form.size)}${form.title && form.title.trim() ? `, and referenced under plot/title ${form.title.trim()}` : ' (no formal plot or title reference provided)'} ("the Land").`)

    d.addClause('PURCHASE PRICE', `The agreed total purchase price for the Land is ${moneyUGX(form.price)}, which the Buyer agrees to pay to the Seller in accordance with the payment terms below.`)

    d.addClause('PAYMENT TERMS', `The purchase price shall be paid as follows: ${orBlank(form.paymentTerms)}. The Seller shall issue a written receipt for every payment received from the Buyer.`)

    d.addClause('TRANSFER OF OWNERSHIP', 'Upon receipt of the full purchase price, the Seller shall transfer ownership of the Land to the Buyer and shall sign all transfer forms and hand over all documents of title and any other documents reasonably required to register the Land in the name of the Buyer.')

    d.addClause('SELLER’S WARRANTIES', 'The Seller warrants that he/she is the rightful and lawful owner of the Land, that the Land is free from any encumbrance, mortgage, caveat, dispute or claim by any other person, and that the Land has not been previously sold, gifted or pledged to any other party.')

    d.addClause('POSSESSION', 'The Seller shall give the Buyer vacant and peaceful possession of the Land upon payment of the full purchase price, free from any occupants or third-party claims.')

    d.addClause('COSTS AND TAXES', 'Unless otherwise agreed in writing, each party shall bear its own legal costs. Stamp duty, registration fees and any taxes arising from the transfer shall be borne by the Buyer.')

    d.addClause('DISPUTE RESOLUTION', 'Any dispute arising out of or in connection with this Agreement shall first be settled amicably through negotiation between the parties. If the dispute is not resolved within a reasonable time, it shall be referred to mediation and, failing that, resolved in accordance with the laws of Uganda.')

    d.addSpace(2)
    d.addParagraph('IN WITNESS WHEREOF, the parties have signed this Agreement on the date first written above.', { fontSize: 10.5, gapAfter: 6 })
    d.signatureBlock('THE SELLER')
    d.signatureBlock('THE BUYER')
    d.addParagraph('WITNESSES', { fontStyle: 'bold', fontSize: 10.5, gapAfter: 4 })
    d.signatureBlock('Witness 1')
    d.signatureBlock('Witness 2')

    d.finalize('land-sale-agreement.pdf')
  }

  return (
    <div className="space-y-4">
      {fields.map(([k, label, type]) => (
        <Field key={k} label={label} type={type} value={(form as any)[k]} onChange={set(k)} />
      ))}
      <LegalDisclaimer />
      <button onClick={generate} className="w-full rounded-card bg-accent-green py-3 text-white font-semibold hover:bg-accent-green/90 flex items-center justify-center gap-2">
        <Download className="h-4 w-4" /> Generate PDF
      </button>
    </div>
  )
}

function TenancyAgreementTool() {
  const [form, setForm] = useState({
    landlord: '', tenant: '', property: '', district: '', rent: '', deposit: '', duration: '', startDate: '', paymentDay: '',
  })
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value })

  const fields: [string, string, string?][] = [
    ['landlord', 'Landlord Full Name'],
    ['tenant', 'Tenant Full Name'],
    ['property', 'Property Description / Address', 'textarea'],
    ['district', 'District'],
    ['rent', 'Monthly Rent (UGX)', 'number'],
    ['deposit', 'Security Deposit (UGX)', 'number'],
    ['duration', 'Tenancy Duration (months)', 'number'],
    ['startDate', 'Start Date', 'date'],
    ['paymentDay', 'Rent Payment Day of Month', 'number'],
  ]

  const generate = () => {
    const d = createLegalDoc('Tenancy Agreement')
    d.addTitle('TENANCY AGREEMENT')
    d.addSubtitle(`Made on ${fmtDate(form.startDate)} in ${orBlank(form.district)} District, Uganda`)
    d.addSpace(2)

    d.addClause('PARTIES', `This Tenancy Agreement is made between ${orBlank(form.landlord)} ("the Landlord") and ${orBlank(form.tenant)} ("the Tenant").`)

    d.addClause('THE PROPERTY', `The Landlord lets to the Tenant the residential premises described as ${orBlank(form.property)}, situated in ${orBlank(form.district)} District ("the Property"), together with its fixtures and fittings.`)

    d.addClause('TERM AND DURATION', `The tenancy shall run for a period of ${orBlank(form.duration)} month(s) commencing on ${fmtDate(form.startDate)}, and may be renewed by mutual written agreement of both parties.`)

    d.addClause('RENT AND PAYMENT', `The monthly rent for the Property is ${moneyUGX(form.rent)}, payable by the Tenant in advance on or before the ${ordinalDay(form.paymentDay)} day of each month. The Landlord shall acknowledge receipt of each payment made by the Tenant.`)

    d.addClause('SECURITY DEPOSIT', `The Tenant shall pay a refundable security deposit of ${moneyUGX(form.deposit)} before taking occupation. The deposit shall be refunded to the Tenant within thirty (30) days after the end of the tenancy, less any lawful deductions for unpaid rent, unpaid utility bills, or the cost of repairing damage beyond fair wear and tear.`)

    d.addClause('TENANT’S OBLIGATIONS', 'The Tenant shall: (a) pay the rent on time; (b) keep the Property clean and in good condition; (c) pay for water, electricity and other utilities consumed; (d) not use the Property for any illegal, immoral or nuisance-causing purpose; (e) not sublet or assign the Property without the prior written consent of the Landlord; and (f) allow the Landlord reasonable access to inspect or repair the Property upon reasonable notice.')

    d.addClause('LANDLORD’S OBLIGATIONS', 'The Landlord shall: (a) allow the Tenant quiet and peaceful enjoyment of the Property during the tenancy; (b) carry out structural and major repairs not caused by the Tenant’s misuse; and (c) ensure the Property is fit for habitation at the start of the tenancy.')

    d.addClause('TERMINATION AND NOTICE', 'Either party may terminate this tenancy by giving the other not less than one (1) month’s written notice. The Landlord may terminate the tenancy where the Tenant fails to pay rent for a continuous period or commits a serious breach of this Agreement. On termination, the Tenant shall hand over vacant possession of the Property to the Landlord.')

    d.addClause('DISPUTE RESOLUTION', 'Any dispute arising out of or in connection with this Agreement shall first be settled amicably through negotiation between the parties. If the dispute is not resolved within a reasonable time, it shall be referred to mediation and, failing that, resolved in accordance with the laws of Uganda.')

    d.addSpace(2)
    d.addParagraph('IN WITNESS WHEREOF, the parties have signed this Agreement on the date first written above.', { fontSize: 10.5, gapAfter: 6 })
    d.signatureBlock('THE LANDLORD')
    d.signatureBlock('THE TENANT')
    d.addParagraph('WITNESSES', { fontStyle: 'bold', fontSize: 10.5, gapAfter: 4 })
    d.signatureBlock('Witness 1')
    d.signatureBlock('Witness 2')

    d.finalize('tenancy-agreement.pdf')
  }

  return (
    <div className="space-y-4">
      {fields.map(([k, label, type]) => (
        <Field key={k} label={label} type={type} value={(form as any)[k]} onChange={set(k)} />
      ))}
      <LegalDisclaimer />
      <button onClick={generate} className="w-full rounded-card bg-accent-green py-3 text-white font-semibold hover:bg-accent-green/90 flex items-center justify-center gap-2">
        <Download className="h-4 w-4" /> Generate PDF
      </button>
    </div>
  )
}

function SalaryCalculatorTool() {
  const [gross, setGross] = useState('')
  const [result, setResult] = useState<any>(null)
  const calculate = () => {
    const g = parseFloat(gross) || 0
    const nssf = g * 0.05
    // URA monthly resident PAYE schedule (in effect June 2026), computed on gross.
    let paye = 0
    if (g > 10000000) paye = 25000 + (g - 410000) * 0.30 + (g - 10000000) * 0.10
    else if (g > 410000) paye = 25000 + (g - 410000) * 0.30
    else if (g > 335000) paye = 10000 + (g - 335000) * 0.20
    else if (g > 235000) paye = (g - 235000) * 0.10
    const net = g - nssf - paye
    setResult({ gross: g, nssf, paye, net })
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Gross Monthly Salary (UGX)</label>
        <input value={gross} onChange={e => setGross(e.target.value)} type="number" className="w-full rounded-md border border-border-color px-3 py-2 text-sm" placeholder="e.g. 2000000" />
      </div>
      <button onClick={calculate} className="w-full rounded-card bg-accent-green py-3 text-white font-semibold hover:bg-accent-green/90">Calculate</button>
      {result && (
        <div className="rounded-card bg-gray-50 p-4 space-y-2 text-sm">
          {[['Gross Salary', result.gross],['NSSF (5%)', result.nssf],['PAYE Tax', result.paye],['Net Take-Home', result.net]].map(([l,v]) => (
            <div key={String(l)} className="flex justify-between">
              <span className="text-muted-text">{l}</span>
              <span className="font-semibold text-navy">UGX {Number(v).toLocaleString()}</span>
            </div>
          ))}
          <p className="pt-2 text-xs text-muted-text">Based on URA PAYE bands in effect June 2026 (resident employees).</p>
        </div>
      )}
    </div>
  )
}

function CVTemplatesTool() {
  const templates = [
    { name: 'ATS Classic', desc: 'Government & NGO roles', file: 'ats-classic.docx', color: 'bg-navy' },
    { name: 'Modern', desc: 'Banking & private sector', file: 'modern.docx', color: 'bg-accent-green' },
    { name: 'Executive', desc: 'Director & senior roles', file: 'executive.docx', color: 'bg-blue-500' },
    { name: 'Graduate', desc: 'Entry-level & fresh grads', file: 'graduate.docx', color: 'bg-purple-500' },
    { name: 'NGO / MEAL', desc: 'Development sector', file: 'ngo.docx', color: 'bg-amber-500' },
  ]
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-text">5 professional CV templates, free to download. Open and edit in Microsoft Word or Google Docs.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {templates.map((t) => (
          <a key={t.name} href={`/cv-templates/${t.file}`} download className="rounded-card border border-border-color p-4 text-center hover:border-accent-green hover:shadow-md transition-all group">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5 text-accent-green" />
            </div>
            <p className="mt-2 text-sm font-medium text-navy">{t.name}</p>
            <p className="text-xs text-muted-text">{t.desc}</p>
            <p className="mt-1 text-xs text-accent-green">Download free</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const toolComponents: Record<string, React.ReactNode> = {
    'land-agreement': <LandAgreementTool />,
    'tenancy-agreement': <TenancyAgreementTool />,
    'salary-calculator': <SalaryCalculatorTool />,
    'cv-templates': <CVTemplatesTool />,
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <Wrench className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Free Tools</h1>
              <p className="mt-1 text-white/70">Legal documents, calculators and CV templates — all free</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} className="group rounded-card bg-white p-6 text-left shadow-card transition-all hover:shadow-card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-card bg-gray-100">
                  <tool.icon className="h-6 w-6 text-accent-green" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-accent-green">{tool.title}</h3>
                <p className="mt-2 text-sm text-muted-text">{tool.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-accent-green">Open Tool →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {activeTool && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-lg rounded-card bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setActiveTool(null)} className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5 text-muted-text" />
              </button>
              <h2 className="font-display text-xl font-bold text-navy mb-6">{tools.find(t => t.id === activeTool)?.title}</h2>
              {toolComponents[activeTool]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
