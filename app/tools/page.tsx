'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wrench, FileText, Calculator, Download, CheckSquare, Users, X, Printer } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmailSignup } from '@/components/email-signup'

const tools = [
  {
    id: 'land-agreement',
    title: 'Land Agreement Generator',
    description: 'Generate a legal land sale agreement template',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    id: 'tenancy-agreement',
    title: 'Tenancy Agreement Generator',
    description: 'Create a standard Uganda tenancy agreement',
    icon: FileText,
    color: 'bg-accent-green',
  },
  {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Calculate PAYE tax, NSSF, and net take-home',
    icon: Calculator,
    color: 'bg-amber',
  },
  {
    id: 'cv-templates',
    title: 'Free CV Templates',
    description: '4 professional CV templates for download',
    icon: Download,
    color: 'bg-navy',
  },
  {
    id: 'bid-checklist',
    title: 'Bid Writing Checklist',
    description: 'Interactive checklist for tender preparation',
    icon: CheckSquare,
    color: 'bg-red-500',
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep Hub',
    description: 'Common questions and STAR method guide',
    icon: Users,
    color: 'bg-purple-500',
  },
]

// Uganda Tax Rates 2025
const calculateTax = (gross: number) => {
  // NSSF: 5% employee contribution
  const nssf = gross * 0.05
  
  // PAYE calculation
  let paye = 0
  const taxableIncome = gross - nssf
  
  if (taxableIncome <= 235000) {
    paye = 0
  } else if (taxableIncome <= 335000) {
    paye = (taxableIncome - 235000) * 0.1
  } else if (taxableIncome <= 410000) {
    paye = 10000 + (taxableIncome - 335000) * 0.2
  } else if (taxableIncome <= 10000000) {
    paye = 25000 + (taxableIncome - 410000) * 0.3
  } else {
    paye = 2901900 + (taxableIncome - 10000000) * 0.4
  }
  
  const netPay = gross - nssf - paye
  
  return { nssf, paye, netPay }
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [salaryInput, setSalaryInput] = useState('')
  const [salaryResult, setSalaryResult] = useState<{ nssf: number; paye: number; netPay: number } | null>(null)

  // Form states for agreement generators
  const [landForm, setLandForm] = useState({
    buyerName: '', sellerName: '', plotNumber: '', location: '', price: '', date: ''
  })
  const [tenancyForm, setTenancyForm] = useState({
    landlord: '', tenant: '', address: '', rent: '', duration: ''
  })

  const handleSalaryCalculate = () => {
    const gross = parseFloat(salaryInput)
    if (!isNaN(gross) && gross > 0) {
      setSalaryResult(calculateTax(gross))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG').format(Math.round(amount))
  }

  const renderToolContent = () => {
    switch (activeTool) {
      case 'salary-calculator':
        return (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-navy">Monthly Gross Salary (UGX)</label>
              <Input
                type="number"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                placeholder="e.g., 3000000"
              />
            </div>
            <Button onClick={handleSalaryCalculate} className="w-full bg-amber text-white hover:bg-amber/90">
              Calculate
            </Button>
            {salaryResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 rounded-card bg-background p-4"
              >
                <div className="flex justify-between">
                  <span className="text-muted-text">Gross Salary</span>
                  <span className="font-semibold text-navy">UGX {formatCurrency(parseFloat(salaryInput))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-text">NSSF (5%)</span>
                  <span className="font-semibold text-red-500">- UGX {formatCurrency(salaryResult.nssf)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-text">PAYE Tax</span>
                  <span className="font-semibold text-red-500">- UGX {formatCurrency(salaryResult.paye)}</span>
                </div>
                <div className="border-t border-border-color pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-navy">Net Take-Home</span>
                    <span className="text-xl font-bold text-accent-green">UGX {formatCurrency(salaryResult.netPay)}</span>
                  </div>
                </div>
              </motion.div>
            )}
            <p className="text-xs text-muted-text">Based on Uganda Revenue Authority tax bands 2025</p>
          </div>
        )

      case 'land-agreement':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Buyer Name</label>
                <Input
                  value={landForm.buyerName}
                  onChange={(e) => setLandForm({ ...landForm, buyerName: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Seller Name</label>
                <Input
                  value={landForm.sellerName}
                  onChange={(e) => setLandForm({ ...landForm, sellerName: e.target.value })}
                  placeholder="Full name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Plot Number</label>
                <Input
                  value={landForm.plotNumber}
                  onChange={(e) => setLandForm({ ...landForm, plotNumber: e.target.value })}
                  placeholder="e.g., Plot 123"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Location</label>
                <Input
                  value={landForm.location}
                  onChange={(e) => setLandForm({ ...landForm, location: e.target.value })}
                  placeholder="e.g., Kampala"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Sale Price (UGX)</label>
                <Input
                  value={landForm.price}
                  onChange={(e) => setLandForm({ ...landForm, price: e.target.value })}
                  placeholder="e.g., 50000000"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Date</label>
                <Input
                  type="date"
                  value={landForm.date}
                  onChange={(e) => setLandForm({ ...landForm, date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Printer className="h-4 w-4" />
                Preview
              </Button>
              <Button className="flex-1 gap-2 bg-blue-500 text-white hover:bg-blue-600">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        )

      case 'tenancy-agreement':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Landlord Name</label>
                <Input
                  value={tenancyForm.landlord}
                  onChange={(e) => setTenancyForm({ ...tenancyForm, landlord: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Tenant Name</label>
                <Input
                  value={tenancyForm.tenant}
                  onChange={(e) => setTenancyForm({ ...tenancyForm, tenant: e.target.value })}
                  placeholder="Full name"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy">Property Address</label>
              <Input
                value={tenancyForm.address}
                onChange={(e) => setTenancyForm({ ...tenancyForm, address: e.target.value })}
                placeholder="Full address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Monthly Rent (UGX)</label>
                <Input
                  value={tenancyForm.rent}
                  onChange={(e) => setTenancyForm({ ...tenancyForm, rent: e.target.value })}
                  placeholder="e.g., 1500000"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Duration</label>
                <select
                  value={tenancyForm.duration}
                  onChange={(e) => setTenancyForm({ ...tenancyForm, duration: e.target.value })}
                  className="h-10 w-full rounded-card border border-border-color px-3 text-navy"
                >
                  <option value="">Select</option>
                  <option value="6">6 Months</option>
                  <option value="12">1 Year</option>
                  <option value="24">2 Years</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Printer className="h-4 w-4" />
                Preview
              </Button>
              <Button className="flex-1 gap-2 bg-accent-green text-white hover:bg-accent-green/90">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        )

      case 'cv-templates':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-text">Enter your email to receive free CV templates</p>
            <EmailSignup />
            <div className="grid grid-cols-2 gap-3 pt-4">
              {['Professional', 'NGO', 'Government', 'Graduate'].map((template) => (
                <div key={template} className="rounded-card border border-border-color p-3 text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-text" />
                  <p className="mt-2 text-sm font-medium text-navy">{template} CV</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'bid-checklist':
        const checklistItems = [
          'Read the tender document thoroughly',
          'Check eligibility requirements',
          'Prepare company registration documents',
          'Gather tax compliance certificates',
          'Prepare financial statements',
          'Write technical proposal',
          'Prepare financial proposal',
          'Get bid bond/security',
          'Review and proofread all documents',
          'Submit before deadline',
        ]
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {checklistItems.map((item, index) => (
                <label key={index} className="flex items-start gap-3 rounded-lg bg-background p-3">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border-color text-accent-green" />
                  <span className="text-sm text-navy">{item}</span>
                </label>
              ))}
            </div>
            <div className="rounded-card bg-amber/10 p-4">
              <p className="text-sm font-medium text-amber-700">Need help writing your bid?</p>
              <a
                href="https://wa.me/256778030847?text=I%20need%20help%20writing%20a%20tender%20bid"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-navy underline"
              >
                WhatsApp us — UGX 500,000
              </a>
            </div>
          </div>
        )

      case 'interview-prep':
        const questions = [
          { q: 'Tell me about yourself', sector: 'General' },
          { q: 'Why do you want to work for this organization?', sector: 'NGO' },
          { q: 'Describe a challenging project you managed', sector: 'Government' },
          { q: 'How do you handle tight deadlines?', sector: 'Corporate' },
          { q: 'What are your salary expectations?', sector: 'General' },
        ]
        return (
          <div className="space-y-6">
            <div>
              <h4 className="mb-3 font-semibold text-navy">STAR Method Guide</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded bg-background p-2"><strong>S</strong>ituation - Set the context</div>
                <div className="rounded bg-background p-2"><strong>T</strong>ask - Describe your role</div>
                <div className="rounded bg-background p-2"><strong>A</strong>ction - Explain what you did</div>
                <div className="rounded bg-background p-2"><strong>R</strong>esult - Share the outcome</div>
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-navy">Common Questions</h4>
              <div className="space-y-2">
                {questions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-background p-3">
                    <span className="text-sm text-navy">{item.q}</span>
                    <span className="rounded-full bg-navy/10 px-2 py-0.5 text-xs text-navy">{item.sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <Wrench className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Utility Tools
              </h1>
              <p className="mt-1 text-white/70">
                Free tools to help your job search and career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTool(tool.id)}
                className="group rounded-card bg-white p-6 text-left shadow-card transition-all hover:shadow-card-hover"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-card ${tool.color}/10`}>
                  <tool.icon className={`h-6 w-6 ${tool.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-accent-green">
                  {tool.title}
                </h3>
                <p className="mt-1 text-sm text-muted-text">{tool.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Modal */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setActiveTool(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-navy">
                  {tools.find(t => t.id === activeTool)?.title}
                </h2>
                <button
                  onClick={() => setActiveTool(null)}
                  className="rounded-full p-1 text-muted-text hover:bg-background"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {renderToolContent()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
