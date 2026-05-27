'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Metadata } from 'next'
import { FileText, User, GraduationCap, Briefcase, Sparkles, Download, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { PaymentModal } from '@/components/payment-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const cvTypes = [
  { id: 'ngo', label: 'NGO CV', description: 'For humanitarian & development roles' },
  { id: 'government', label: 'Government CV', description: 'For public service positions' },
  { id: 'graduate', label: 'Graduate Trainee CV', description: 'For entry-level positions' },
  { id: 'corporate', label: 'Corporate CV', description: 'For private sector roles' },
]

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Education', icon: GraduationCap },
  { id: 3, label: 'Experience', icon: Briefcase },
  { id: 4, label: 'Skills', icon: Sparkles },
  { id: 5, label: 'Preview', icon: FileText },
]

interface FormData {
  // Personal
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  // Education
  university: string
  degree: string
  graduationYear: string
  // Experience
  company: string
  position: string
  duration: string
  description: string
  // Skills
  skills: string
  languages: string
  certifications: string
}

export default function CVBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvType, setCvType] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    university: '',
    degree: '',
    graduationYear: '',
    company: '',
    position: '',
    duration: '',
    description: '',
    skills: '',
    languages: '',
    certifications: '',
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerateWithAI = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    setIsGenerated(true)
  }

  const handleDownload = () => {
    // Simulate download
    alert('CV downloaded successfully!')
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
              <FileText className="h-7 w-7 text-accent-green" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                AI CV Builder
              </h1>
              <p className="mt-1 text-white/70">
                Create a professional, ATS-optimized CV in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CV Type Selection */}
      {!cvType ? (
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-xl font-semibold text-navy">
              Select CV Type
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cvTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCvType(type.id)}
                  className="rounded-card border-2 border-border-color bg-white p-6 text-left transition-all hover:border-accent-green hover:shadow-card-hover"
                >
                  <h3 className="font-display text-lg font-semibold text-navy">{type.label}</h3>
                  <p className="mt-1 text-sm text-muted-text">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      currentStep >= step.id
                        ? 'bg-accent-green text-white'
                        : 'bg-border-color text-muted-text'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-12 sm:w-20 ${
                        currentStep > step.id ? 'bg-accent-green' : 'bg-border-color'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Form Panel */}
              <div className="rounded-card bg-white p-6 shadow-card">
                <h3 className="mb-6 font-display text-lg font-semibold text-navy">
                  {steps[currentStep - 1].label}
                </h3>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {currentStep === 1 && (
                      <>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Full Name</label>
                          <Input
                            value={formData.fullName}
                            onChange={(e) => updateFormData('fullName', e.target.value)}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Email</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Phone</label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            placeholder="+256 7XX XXX XXX"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Location</label>
                          <Input
                            value={formData.location}
                            onChange={(e) => updateFormData('location', e.target.value)}
                            placeholder="Kampala, Uganda"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Professional Summary</label>
                          <textarea
                            value={formData.summary}
                            onChange={(e) => updateFormData('summary', e.target.value)}
                            placeholder="Brief overview of your experience and goals..."
                            className="h-24 w-full rounded-card border border-border-color p-3 text-navy placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-accent-green"
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 2 && (
                      <>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">University/Institution</label>
                          <Input
                            value={formData.university}
                            onChange={(e) => updateFormData('university', e.target.value)}
                            placeholder="Makerere University"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Degree/Qualification</label>
                          <Input
                            value={formData.degree}
                            onChange={(e) => updateFormData('degree', e.target.value)}
                            placeholder="Bachelor of Commerce"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Graduation Year</label>
                          <Input
                            value={formData.graduationYear}
                            onChange={(e) => updateFormData('graduationYear', e.target.value)}
                            placeholder="2023"
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 3 && (
                      <>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Company/Organization</label>
                          <Input
                            value={formData.company}
                            onChange={(e) => updateFormData('company', e.target.value)}
                            placeholder="UNHCR Uganda"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Position</label>
                          <Input
                            value={formData.position}
                            onChange={(e) => updateFormData('position', e.target.value)}
                            placeholder="Program Assistant"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Duration</label>
                          <Input
                            value={formData.duration}
                            onChange={(e) => updateFormData('duration', e.target.value)}
                            placeholder="Jan 2022 - Present"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Key Responsibilities</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => updateFormData('description', e.target.value)}
                            placeholder="Describe your key achievements and responsibilities..."
                            className="h-24 w-full rounded-card border border-border-color p-3 text-navy placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-accent-green"
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 4 && (
                      <>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Technical Skills</label>
                          <textarea
                            value={formData.skills}
                            onChange={(e) => updateFormData('skills', e.target.value)}
                            placeholder="Microsoft Office, Data Analysis, Project Management..."
                            className="h-20 w-full rounded-card border border-border-color p-3 text-navy placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-accent-green"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Languages</label>
                          <Input
                            value={formData.languages}
                            onChange={(e) => updateFormData('languages', e.target.value)}
                            placeholder="English (Fluent), Swahili (Native)"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-navy">Certifications</label>
                          <textarea
                            value={formData.certifications}
                            onChange={(e) => updateFormData('certifications', e.target.value)}
                            placeholder="List any relevant certifications..."
                            className="h-20 w-full rounded-card border border-border-color p-3 text-navy placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-accent-green"
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-4">
                        {isGenerated ? (
                          <div className="rounded-card bg-accent-green/10 p-4">
                            <div className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-accent-green" />
                              <span className="font-medium text-accent-green">CV Generated Successfully!</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-text">
                              Your ATS-optimized CV is ready for download.
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-green/20 px-3 py-1 text-sm font-medium text-accent-green">
                              ATS Score: 87%
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-card bg-amber/10 p-4">
                            <p className="text-sm text-amber-700">
                              Generate an AI-optimized CV tailored for your target role. Our AI will enhance your content and ensure ATS compatibility.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>

                  {currentStep < 5 ? (
                    <Button onClick={nextStep} className="gap-1 bg-navy text-white hover:bg-navy/90">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : isGenerated ? (
                    <Button onClick={handleDownload} className="gap-2 bg-accent-green text-white hover:bg-accent-green/90">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  ) : (
                    <Button onClick={handleGenerateWithAI} className="gap-2 bg-accent-green text-white hover:bg-accent-green/90">
                      <Sparkles className="h-4 w-4" />
                      Generate with AI — UGX 5,000
                    </Button>
                  )}
                </div>
              </div>

              {/* Preview Panel */}
              <div className="rounded-card bg-white p-6 shadow-card">
                <h3 className="mb-6 font-display text-lg font-semibold text-navy">Live Preview</h3>
                <div className="aspect-[8.5/11] rounded-lg border border-border-color bg-white p-6">
                  <div className="border-b border-border-color pb-4">
                    <h4 className="font-display text-xl font-bold text-navy">
                      {formData.fullName || 'Your Name'}
                    </h4>
                    <p className="mt-1 text-sm text-muted-text">
                      {formData.email || 'email@example.com'} | {formData.phone || '+256 XXX XXX XXX'}
                    </p>
                    <p className="text-sm text-muted-text">{formData.location || 'Location'}</p>
                  </div>

                  {formData.summary && (
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold uppercase text-navy">Summary</h5>
                      <p className="mt-1 text-xs text-muted-text">{formData.summary}</p>
                    </div>
                  )}

                  {formData.university && (
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold uppercase text-navy">Education</h5>
                      <p className="mt-1 text-xs font-medium text-navy">{formData.degree}</p>
                      <p className="text-xs text-muted-text">{formData.university} - {formData.graduationYear}</p>
                    </div>
                  )}

                  {formData.company && (
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold uppercase text-navy">Experience</h5>
                      <p className="mt-1 text-xs font-medium text-navy">{formData.position}</p>
                      <p className="text-xs text-muted-text">{formData.company} | {formData.duration}</p>
                      {formData.description && (
                        <p className="mt-1 text-xs text-muted-text">{formData.description}</p>
                      )}
                    </div>
                  )}

                  {formData.skills && (
                    <div className="mt-4">
                      <h5 className="text-xs font-semibold uppercase text-navy">Skills</h5>
                      <p className="mt-1 text-xs text-muted-text">{formData.skills}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Free Templates */}
            <div className="mt-12 rounded-card bg-white p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-navy">Free CV Templates</h3>
              <p className="mt-1 text-sm text-muted-text">Download basic templates without AI generation</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cvTypes.map((type) => (
                  <button
                    key={type.id}
                    className="rounded-card border border-border-color p-4 text-left transition-all hover:border-accent-green"
                  >
                    <FileText className="h-8 w-8 text-muted-text" />
                    <p className="mt-2 font-medium text-navy">{type.label}</p>
                    <p className="mt-1 text-xs text-accent-green">Free Download</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        title="AI CV Generation"
        amount={5000}
        onSuccess={handlePaymentSuccess}
      />

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
