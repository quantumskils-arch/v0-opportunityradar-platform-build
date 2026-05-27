'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Clock, Building2, MapPin } from 'lucide-react'
import { type Opportunity, COUNTRY_FLAGS, CATEGORY_COLORS, getDeadlineStatus, formatDeadline } from '@/lib/api'

interface OpportunityCardProps {
  opportunity: Opportunity
  index?: number
}

export function OpportunityCard({ opportunity, index = 0 }: OpportunityCardProps) {
  const deadlineStatus = getDeadlineStatus(opportunity.deadline)
  const categoryStyle = CATEGORY_COLORS[opportunity.category] || { bg: 'bg-gray-100', text: 'text-gray-700' }
  
  const deadlineColors = {
    urgent: 'bg-red-100 text-red-700',
    soon: 'bg-orange-100 text-orange-700',
    normal: 'bg-accent-green/10 text-accent-green',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(10, 22, 40, 0.12)' }}
      className="group relative overflow-hidden rounded-card bg-white p-5 shadow-card transition-shadow"
    >
      {/* Category Badge */}
      <div className="absolute right-4 top-4">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
          {opportunity.category === 'Government Tender' ? 'Tender' : opportunity.category === 'Grant/Scholarship' ? 'Grant' : opportunity.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="pr-20 font-display text-lg font-semibold leading-tight text-navy group-hover:text-accent-green">
        <Link 
          href={opportunity.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="after:absolute after:inset-0"
        >
          {opportunity.title}
        </Link>
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
        {/* Deadline */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-text" />
          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${deadlineColors[deadlineStatus]}`}>
            {formatDeadline(opportunity.deadline)}
          </span>
        </div>

        {/* External Link Icon */}
        <ExternalLink className="h-4 w-4 text-muted-text opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.div>
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
