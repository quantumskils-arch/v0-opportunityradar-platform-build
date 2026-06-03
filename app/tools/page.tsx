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
  { id: 'cv-templates', title: 'Free CV Templates', description: '4 professional CV templates for download', icon: Download, color: 'bg-navy' },
]

function LandAgreementTool() {
  const [form, setForm] = useState({ seller: '', buyer: '', land: '', price: '', parish: '', district: '' })
  const generate = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('LAND SALE AGREEMENT', 105, 20, { align: 'center' })
    doc.setFontSize(11)
    doc.text(`This agreement is made between ${form.seller} (Seller) and ${form.buyer} (Buyer).`, 20, 40)
    doc.text(`Property: ${form.land}, ${form.parish}, ${form.district} District.`, 20, 55)
    doc.text(`Purchase Price: UGX ${form.price}`, 20, 70)
    doc.text('The Seller agrees to transfer ownership upon receipt of full payment.', 20, 85)
    doc.text('Signed: _________________ Date: _________________', 20, 120)
    doc.save('land-agreement.pdf')
  }
  return (
    <div className="space-y-4">
      {[['seller','Seller Full Name'],['buyer','Buyer Full Name'],['land','Land Description'],['price','Purchase Price (UGX)'],['parish','Parish'],['district','District']].map(([k,l]) => (
        <div key={k}>
          <label className="block text-sm font-medium text-navy mb-1">{l}</label>
          <input value={(form as any)[k]} onChange={e => setForm({...form, [k]: e.target.value})} className="w-full rounded-md border border-border-color px-3 py-2 text-sm" placeholder={l} />
        </div>
      ))}
      <button onClick={generate} className="w-full rounded-card bg-accent-green py-3 text-white font-semibold hover:bg-accent-green/90 flex items-center justify-center gap-2">
        <Download className="h-4 w-4" /> Generate PDF
      </button>
    </div>
  )
}

function TenancyAgreementTool() {
  const [form, setForm] = useState({ landlord: '', tenant: '', property: '', rent: '', duration: '', district: '' })
  const generate = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('TENANCY AGREEMENT', 105, 20, { align: 'center' })
    doc.setFontSize(11)
    doc.text(`Landlord: ${form.landlord}`, 20, 40)
    doc.text(`Tenant: ${form.tenant}`, 20, 52)
    doc.text(`Property: ${form.property}, ${form.district} District`, 20, 64)
    doc.text(`Monthly Rent: UGX ${form.rent}`, 20, 76)
    doc.text(`Duration: ${form.duration} months`, 20, 88)
    doc.text('The tenant agrees to pay rent on the 1st of each month.', 20, 100)
    doc.text('Landlord: _________________ Tenant: _________________', 20, 130)
    doc.save('tenancy-agreement.pdf')
  }
  return (
    <div className="space-y-4">
      {[['landlord','Landlord Name'],['tenant','Tenant Name'],['property','Property Address'],['rent','Monthly Rent (UGX)'],['duration','Duration (months)'],['district','District']].map(([k,l]) => (
        <div key={k}>
          <label className="block text-sm font-medium text-navy mb-1">{l}</label>
          <input value={(form as any)[k]} onChange={e => setForm({...form, [k]: e.target.value})} className="w-full rounded-md border border-border-color px-3 py-2 text-sm" placeholder={l} />
        </div>
      ))}
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
    const nssf = Math.min(g * 0.05, 320000)
    const taxable = g - nssf
    let paye = 0
    if (taxable > 10000000) paye = (taxable - 10000000) * 0.40 + 2567500
    else if (taxable > 4920000) paye = (taxable - 4920000) * 0.30 + 522500
    else if (taxable > 335000) paye = (taxable - 335000) * 0.20
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
        </div>
      )}
    </div>
  )
}

function CVTemplatesTool() {
  const downloadCV = (type: string) => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text('CURRICULUM VITAE', 105, 25, { align: 'center' })
    doc.setFontSize(12)
    doc.text(`${type} Template`, 105, 35, { align: 'center' })
    doc.setFontSize(11)
    doc.text('Full Name: _________________________________', 20, 55)
    doc.text('Email: ____________________________________', 20, 68)
    doc.text('Phone: ____________________________________', 20, 81)
    doc.text('EDUCATION', 20, 100)
    doc.line(20, 103, 190, 103)
    doc.text('Degree / Institution / Year: ________________', 20, 112)
    doc.text('WORK EXPERIENCE', 20, 130)
    doc.line(20, 133, 190, 133)
    doc.text('Position / Organisation / Duration: __________', 20, 142)
    doc.text('SKILLS', 20, 160)
    doc.line(20, 163, 190, 163)
    doc.text('1. __________ 2. __________ 3. __________', 20, 172)
    doc.save(type.toLowerCase() + '-cv-template.pdf')
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-text">Click any template to download free. Edit in Word or Google Docs.</p>
      <div className="grid grid-cols-2 gap-3">
        {[{name:'Professional',color:'bg-navy'},{name:'NGO',color:'bg-accent-green'},{name:'Government',color:'bg-blue-500'},{name:'Graduate',color:'bg-purple-500'}].map((t) => (
          <button key={t.name} onClick={() => downloadCV(t.name)} className="rounded-card border border-border-color p-4 text-center hover:border-accent-green hover:shadow-md transition-all group">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 group-hover:scale-110 transition-transform">
              <FileText className="h-5 w-5 text-accent-green" />
            </div>
            <p className="mt-2 text-sm font-medium text-navy">{t.name} CV</p>
            <p className="mt-1 text-xs text-accent-green">Click to download free</p>
          </button>
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
