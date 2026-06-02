'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Clock, Building2, MapPin, X, Calendar, Globe } from 'lucide-react'
import { type Opportunity, COUNTRY_FLAGS, CATEGORY_COLORS, getDeadlineStatus, formatDeadline } from '@/lib/api'

interface OpportunityCardProps {
  opportunity: Opportunity
  index?: number
}

function OpportunityModal({ opportunity, onClose }: { opportunity: Opportunity; onClose: () => void }) {
  const deadlineStatus = getDeadlineStatus(opportunity.deadline)
  const categoryStyle = CATEGORY_COLORS[opportunity.category] || { bg: 'bg-gray-100', text: 'text-gray-700' }
 const deadlineColors = {
    urgent: 'bg-red-100 text-red-700',
    soon: 'bg-orange-100 text-orange-700',
    normal: 'bg-green-100 text-green-700',
    none: 'bg-gray-100 text-gray-500',
  }
    none: 'bg-gray-100 text-gray-500',
  } 

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Category Badge */}
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
            {opportunity.category === 'Government Tender' ? 'Tender' : opportunity.category === 'Grant/Scholarship' ? 'Grant' : opportunity.category}
          </span>

          {/* Title */}
          <h2 className="mt-3 pr-8 text-xl font-bold leading-tight text-gray-900">
            {opportunity.title}
          </h2>

          {/* Details */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-800">{opportunity.organisation}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{COUNTRY_FLAGS[opportunity.country] || '🌍'} {opportunity.country}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4 text-gray-400" />
              <span>{opportunity.source}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${deadlineColors[deadlineStatus]}`}>
                {formatDeadline(opportunity.deadline)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-gray-100" />

          {/* Subscribe nudge */}
          <p className="mb-4 text-xs text-gray-500 text-center">
            Get opportunities like this delivered to your inbox every morning.{' '}
            <Link href="/alerts" className="text-emerald-600 font-medium hover:underline">
              Subscribe free →
            </Link>
          </p>

          {/* Apply Button */}
          
           <a href={opportunity.link} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 active:scale-95">
            Apply Now
            <ExternalLink className="h-4 w-4" />
          </a> 
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function OpportunityCard({ opportunity, index = 0 }: OpportunityCardProps) {
  const [showModal, setShowModal] = useState(false)
  const deadlineStatus = getDeadlineStatus(opportunity.deadline)
  const categoryStyle = CATEGORY_COLORS[opportunity.category] || { bg: 'bg-gray-100', text: 'text-gray-700' }
  const deadlineColors = {
    urgent: 'bg-red-100 text-red-700',
    soon: 'bg-orange-100 text-orange-700',
    normal: 'bg-accent-green/10 text-accent-green',
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(10, 22, 40, 0.12)' }}
        className="group relative overflow-hidden rounded-card bg-white p-5 shadow-card transition-shadow cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {/* Category Badge */}
        <div className="absolute right-4 top-4">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
            {opportunity.category === 'Government Tender' ? 'Tender' : opportunity.category === 'Grant/Scholarship' ? 'Grant' : opportunity.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="pr-20 font-display text-lg font-semibold leading-tight text-navy group-hover:text-accent-green">
          {opportunity.title}
        </h3>

        {/* Organization */}
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-text">
          <Building2 className="h-4 w-4" />
          <span className="line-clamp-1">{opportunity.organisation}</span>
        </div>

        {/* Country & Source */}
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-text">
          <div className="flex items-center gap-1">
            <span>{COUNTRY_FLAGS[opportunity.country] || '🌍'}</span>
            <span>{opportunity.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{opportunity.source}</span>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-4 flex items-center justify-between border-t border-border-color pt-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-text" />
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${deadlineColors[deadlineStatus]}`}>
              {formatDeadline(opportunity.deadline)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View details <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </motion.div>

      {showModal && (
        <OpportunityModal
          opportunity={opportunity}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export function OpportunityCardSkeleton() {
  return (
    <div className="animate-pulse rounded-card bg-white p-5 shadow-card">
      <div className="flex justify-between">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </div>
      <div className="mt-4 h-4 w-1/2 rounded bg-gray-200" />
      <div className="mt-3 flex gap-4">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
      <div className="mt-4 border-t border-border-color pt-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </div>
  )
}
