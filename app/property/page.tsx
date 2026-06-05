'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, MapPin, Bed, Bath, Square, MessageCircle, Plus, Filter } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = ['For Sale', 'For Rent', 'Land', 'Commercial']

const locations = ['Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Mukono']

const sampleListings = [
  {
    id: 1,
    title: '3 Bedroom Apartment in Kololo',
    type: 'For Rent',
    location: 'Kololo, Kampala',
    price: 2500000,
    priceType: 'month',
    bedrooms: 3,
    bathrooms: 2,
    size: 1500,
    image: null,
  },
  {
    id: 2,
    title: 'Commercial Plot in Nakawa',
    type: 'Land',
    location: 'Nakawa, Kampala',
    price: 350000000,
    priceType: 'total',
    bedrooms: null,
    bathrooms: null,
    size: 5000,
    image: null,
  },
  {
    id: 3,
    title: '4 Bedroom House in Bugolobi',
    type: 'For Sale',
    location: 'Bugolobi, Kampala',
    price: 450000000,
    priceType: 'total',
    bedrooms: 4,
    bathrooms: 3,
    size: 2500,
    image: null,
  },
  {
    id: 4,
    title: 'Office Space in Nakasero',
    type: 'Commercial',
    location: 'Nakasero, Kampala',
    price: 5000000,
    priceType: 'month',
    bedrooms: null,
    bathrooms: 2,
    size: 800,
    image: null,
  },
  {
    id: 5,
    title: '2 Bedroom Apartment in Ntinda',
    type: 'For Rent',
    location: 'Ntinda, Kampala',
    price: 1200000,
    priceType: 'month',
    bedrooms: 2,
    bathrooms: 1,
    size: 900,
    image: null,
  },
  {
    id: 6,
    title: '1 Acre Land in Entebbe',
    type: 'Land',
    location: 'Garuga, Entebbe',
    price: 200000000,
    priceType: 'total',
    bedrooms: null,
    bathrooms: null,
    size: 43560,
    image: null,
  },
]

export default function PropertyPage() {
  const [activeCategory, setActiveCategory] = useState('For Sale')
  const [showListingForm, setShowListingForm] = useState(false)

  const filteredListings = sampleListings.filter(l => l.type === activeCategory)

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)}M`
    }
    return new Intl.NumberFormat('en-UG').format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-card bg-accent-green/20">
                <Home className="h-7 w-7 text-accent-green" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Property & Land
                </h1>
                <p className="mt-1 text-white/70">
                  Find your perfect property in Uganda
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowListingForm(true)}
              className="gap-2 bg-accent-green text-white hover:bg-accent-green/90"
            >
              <Plus className="h-4 w-4" />
              List Property Free
            </Button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="border-b border-border-color bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-navy text-white'
                    : 'text-muted-text hover:bg-background'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border-color bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-text">
              <Filter className="h-4 w-4" />
              <span>Location:</span>
            </div>
            <select className="rounded-card border border-border-color bg-white px-4 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent-green">
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select className="rounded-card border border-border-color bg-white px-4 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent-green">
              <option value="">Price Range</option>
              <option value="0-50">Under 50M</option>
              <option value="50-100">50M - 100M</option>
              <option value="100-300">100M - 300M</option>
              <option value="300+">Above 300M</option>
            </select>
            {(activeCategory === 'For Sale' || activeCategory === 'For Rent') && (
              <select className="rounded-card border border-border-color bg-white px-4 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent-green">
                <option value="">Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            )}
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredListings.length === 0 ? (
            <div className="rounded-card bg-white p-12 text-center shadow-card">
              <p className="font-display text-xl font-semibold text-navy">No listings found</p>
              <p className="mt-2 text-muted-text">Be the first to list your property in this category!</p>
              <Button
                onClick={() => setShowListingForm(true)}
                className="mt-6 bg-accent-green text-white hover:bg-accent-green/90"
              >
                List Property Free
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-border-color to-background">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="h-12 w-12 text-muted-text/30" />
                    </div>
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-navy px-3 py-1 text-xs font-medium text-white">
                        {listing.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-navy group-hover:text-accent-green">
                      {listing.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-text">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-text">
                      {listing.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{listing.bedrooms}</span>
                        </div>
                      )}
                      {listing.bathrooms && (
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{listing.bathrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{listing.size.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border-color pt-4">
                      <div>
                        <p className="text-xl font-bold text-accent-green">
                          UGX {formatPrice(listing.price)}
                        </p>
                        {listing.priceType === 'month' && (
                          <p className="text-xs text-muted-text">/month</p>
                        )}
                      </div>
                      <a
                        href={`https://wa.me/256748556140?text=Hi,%20I'm%20interested%20in:%20${encodeURIComponent(listing.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-card bg-[#25D366] px-3 py-2 text-sm font-medium text-white hover:bg-[#25D366]/90"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Contact
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Listing Form Modal */}
      {showListingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-card bg-white p-6"
          >
            <h2 className="font-display text-xl font-bold text-navy">List Your Property Free</h2>
            <p className="mt-1 text-sm text-muted-text">Fill in the details and we&apos;ll publish your listing</p>

            <form className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Property Title</label>
                <Input placeholder="e.g., 3 Bedroom Apartment in Kololo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">Type</label>
                  <select className="h-10 w-full rounded-card border border-border-color px-3 text-navy">
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">Location</label>
                  <select className="h-10 w-full rounded-card border border-border-color px-3 text-navy">
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Price (UGX)</label>
                <Input type="number" placeholder="e.g., 150000000" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Your Phone Number</label>
                <Input placeholder="+256 7XX XXX XXX" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">Description</label>
                <textarea
                  placeholder="Describe your property..."
                  className="h-24 w-full rounded-card border border-border-color p-3 text-navy placeholder:text-muted-text"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowListingForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-accent-green text-white hover:bg-accent-green/90"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Listing submitted! We will review and publish it shortly.')
                    setShowListingForm(false)
                  }}
                >
                  Submit Listing
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
