'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  User, Bell, FileText, Download, Settings, LogOut, 
  Heart, Clock, MapPin, ChevronRight, Plus 
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { COUNTRIES, CATEGORIES } from '@/lib/api'

const tabs = [
  { id: 'saved', label: 'Saved Opportunities', icon: Heart },
  { id: 'alerts', label: 'Alert Preferences', icon: Bell },
  { id: 'cvs', label: 'Generated CVs', icon: FileText },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'settings', label: 'Account Settings', icon: Settings },
]

// Mock data
const savedOpportunities = [
  {
    id: 1,
    title: 'Supply of Office Equipment - KCCA',
    organization: 'Kampala Capital City Authority',
    deadline: '2026-06-15',
    category: 'Government Tender',
    country: 'Uganda',
  },
  {
    id: 2,
    title: 'Program Officer - UNHCR',
    organization: 'UNHCR Uganda',
    deadline: '2026-06-10',
    category: 'Job',
    country: 'Uganda',
  },
]

const generatedCVs = [
  { id: 1, name: 'NGO CV - May 2026', date: '2026-05-20', type: 'NGO' },
  { id: 2, name: 'Government CV - April 2026', date: '2026-04-15', type: 'Government' },
]

const downloads = [
  { id: 1, name: 'URA Aptitude Test Pack', date: '2026-05-18', type: 'Past Paper' },
  { id: 2, name: 'NGO Interview Question Bank', date: '2026-05-10', type: 'Past Paper' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('saved')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [alertPrefs, setAlertPrefs] = useState({
    countries: ['Uganda'],
    categories: ['Job', 'Government Tender'],
    frequency: 'daily',
  })

  // Simple login simulation
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-card bg-white p-8 shadow-card"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/10 mx-auto">
              <User className="h-8 w-8 text-accent-green" />
            </div>
            <h1 className="text-center font-display text-2xl font-bold text-navy">
              Welcome to Your Dashboard
            </h1>
            <p className="mt-2 text-center text-muted-text">
              Sign in with your email to access saved opportunities and more.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (loginEmail) setIsLoggedIn(true)
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Email</label>
                <Input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-accent-green text-white hover:bg-accent-green/90"
              >
                Continue with Email
              </Button>
            </form>
            <p className="mt-6 text-center text-xs text-muted-text">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-card bg-white p-4 shadow-card">
              <div className="mb-4 flex items-center gap-3 border-b border-border-color pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green text-white font-semibold">
                  {loginEmail.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy">{loginEmail}</p>
                  <p className="text-xs text-muted-text">Free Account</p>
                </div>
              </div>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent-green/10 font-medium text-accent-green'
                        : 'text-muted-text hover:bg-background'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </div>

            {/* Upgrade CTA */}
            <div className="mt-4 rounded-card bg-navy p-4 text-white">
              <p className="font-semibold">Upgrade to Pro</p>
              <p className="mt-1 text-sm text-white/70">Get unlimited saves, priority alerts, and more.</p>
              <p className="mt-2 text-lg font-bold text-accent-green">UGX 15,000/month</p>
              <Button className="mt-3 w-full bg-accent-green text-white hover:bg-accent-green/90">
                Upgrade Now
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-card bg-white p-6 shadow-card"
            >
              {activeTab === 'saved' && (
                <>
                  <h2 className="font-display text-xl font-bold text-navy">Saved Opportunities</h2>
                  <p className="mt-1 text-sm text-muted-text">Opportunities you&apos;ve bookmarked for later</p>
                  
                  {savedOpportunities.length === 0 ? (
                    <div className="mt-8 text-center">
                      <Heart className="mx-auto h-12 w-12 text-muted-text/30" />
                      <p className="mt-4 text-muted-text">No saved opportunities yet</p>
                      <Link href="/">
                        <Button className="mt-4 bg-accent-green text-white hover:bg-accent-green/90">
                          Browse Opportunities
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {savedOpportunities.map((opp) => (
                        <div
                          key={opp.id}
                          className="flex items-center justify-between rounded-lg border border-border-color p-4"
                        >
                          <div>
                            <h3 className="font-medium text-navy">{opp.title}</h3>
                            <p className="mt-1 text-sm text-muted-text">{opp.organization}</p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-text">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {opp.deadline}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {opp.country}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-text" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'alerts' && (
                <>
                  <h2 className="font-display text-xl font-bold text-navy">Alert Preferences</h2>
                  <p className="mt-1 text-sm text-muted-text">Customize what opportunities you receive</p>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="mb-2 block font-medium text-navy">Countries</label>
                      <div className="flex flex-wrap gap-2">
                        {COUNTRIES.map((country) => (
                          <button
                            key={country}
                            onClick={() => {
                              setAlertPrefs(prev => ({
                                ...prev,
                                countries: prev.countries.includes(country)
                                  ? prev.countries.filter(c => c !== country)
                                  : [...prev.countries, country]
                              }))
                            }}
                            className={`rounded-full px-3 py-1 text-sm ${
                              alertPrefs.countries.includes(country)
                                ? 'bg-accent-green text-white'
                                : 'bg-background text-muted-text'
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-navy">Categories</label>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setAlertPrefs(prev => ({
                                ...prev,
                                categories: prev.categories.includes(cat)
                                  ? prev.categories.filter(c => c !== cat)
                                  : [...prev.categories, cat]
                              }))
                            }}
                            className={`rounded-full px-3 py-1 text-sm ${
                              alertPrefs.categories.includes(cat)
                                ? 'bg-accent-green text-white'
                                : 'bg-background text-muted-text'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-navy">Frequency</label>
                      <select
                        value={alertPrefs.frequency}
                        onChange={(e) => setAlertPrefs(prev => ({ ...prev, frequency: e.target.value }))}
                        className="rounded-card border border-border-color px-4 py-2 text-navy"
                      >
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Summary</option>
                        <option value="instant">Instant (As Posted)</option>
                      </select>
                    </div>

                    <Button className="bg-accent-green text-white hover:bg-accent-green/90">
                      Save Preferences
                    </Button>
                  </div>
                </>
              )}

              {activeTab === 'cvs' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl font-bold text-navy">Generated CVs</h2>
                      <p className="mt-1 text-sm text-muted-text">CVs you&apos;ve created with our AI builder</p>
                    </div>
                    <Link href="/cv-builder">
                      <Button className="gap-2 bg-accent-green text-white hover:bg-accent-green/90">
                        <Plus className="h-4 w-4" />
                        New CV
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {generatedCVs.map((cv) => (
                      <div
                        key={cv.id}
                        className="flex items-center justify-between rounded-lg border border-border-color p-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-accent-green" />
                          <div>
                            <p className="font-medium text-navy">{cv.name}</p>
                            <p className="text-xs text-muted-text">{cv.type} • Created {cv.date}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'downloads' && (
                <>
                  <h2 className="font-display text-xl font-bold text-navy">Download History</h2>
                  <p className="mt-1 text-sm text-muted-text">Past papers and materials you&apos;ve purchased</p>
                  
                  <div className="mt-6 space-y-4">
                    {downloads.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-border-color p-4"
                      >
                        <div className="flex items-center gap-3">
                          <Download className="h-8 w-8 text-amber" />
                          <div>
                            <p className="font-medium text-navy">{item.name}</p>
                            <p className="text-xs text-muted-text">{item.type} • Purchased {item.date}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Re-download
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <h2 className="font-display text-xl font-bold text-navy">Account Settings</h2>
                  <p className="mt-1 text-sm text-muted-text">Manage your account details</p>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-navy">Email</label>
                      <Input value={loginEmail} disabled />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-navy">Full Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-navy">Phone</label>
                      <Input placeholder="+256 7XX XXX XXX" />
                    </div>
                    <Button className="bg-navy text-white hover:bg-navy/90">
                      Update Profile
                    </Button>
                  </div>

                  <div className="mt-8 border-t border-border-color pt-6">
                    <h3 className="font-semibold text-red-500">Danger Zone</h3>
                    <p className="mt-1 text-sm text-muted-text">Permanently delete your account and all data.</p>
                    <Button variant="outline" className="mt-4 border-red-200 text-red-500 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
