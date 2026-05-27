'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const categories = [
  { value: '', label: 'All' },
  { value: 'Government Tender', label: 'Tenders' },
  { value: 'Job', label: 'Jobs' },
  { value: 'Grant/Scholarship', label: 'Grants & Scholarships' },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page') // Reset to first page
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.value
        return (
          <button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="categoryPill"
                className="absolute inset-0 rounded-full bg-navy"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-white' : 'text-muted-text hover:text-navy'}`}>
              {cat.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
