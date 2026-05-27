'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { COUNTRIES } from '@/lib/api'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [country, setCountry] = useState(searchParams.get('country') || '')

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (country) params.set('country', country)
    router.push(`/?${params.toString()}`)
  }, [search, country, router])

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-text" />
        <Input
          type="text"
          placeholder="Search opportunities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-card border-border-color bg-white pl-12 pr-4 text-navy placeholder:text-muted-text"
        />
      </div>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="h-12 rounded-card border border-border-color bg-white px-4 text-navy focus:outline-none focus:ring-2 focus:ring-accent-green"
      >
        <option value="">All Countries</option>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button
        type="submit"
        className="h-12 rounded-card bg-navy px-6 font-medium text-white transition-colors hover:bg-navy/90"
      >
        Search
      </button>
    </form>
  )
}
