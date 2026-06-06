// API configuration and types for OpportunityRadar
// Uses /proxy/* to avoid CORS issues — Vercel proxies to api.opportunityradar.africa
export const API_BASE_URL = 'https://api.opportunityradar.africa'
 // Server-side: direct call OK

export interface Opportunity {
  id: number
  title: string
  organization: string
  deadline: string
  url: string
  category: 'Government Tender' | 'Grant/Scholarship' | 'Job'
  country: string
  source: string
  scraped_at: string
  summary_json?: { summary: string; urgency_flag: string | null; key_requirements: string[]; whatsapp_teaser: string }
  whatsapp_teaser?: string
}

export interface OpportunitiesResponse {
  total: number
  page: number
  limit: number
  results: Opportunity[]
}

export interface Stats {
  total: number
  today: number
  by_category: Record<string, number>
  by_country: Record<string, number>
}

export const COUNTRIES = [
  'Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Ethiopia', 'International', 'East Africa',
] as const

export const CATEGORIES = [
  'Government Tender', 'Grant/Scholarship', 'Job',
] as const

export const COUNTRY_FLAGS: Record<string, string> = {
  'Uganda': '🇺🇬', 'Kenya': '🇰🇪', 'Tanzania': '🇹🇿',
  'Rwanda': '🇷🇼', 'Ethiopia': '🇪🇹', 'International': '🌍', 'East Africa': '🌍',
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Government Tender': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Job': { bg: 'bg-green-100', text: 'text-green-700' },
  'Grant/Scholarship': { bg: 'bg-amber-100', text: 'text-amber-700' },
}

// API Functions
export async function fetchOpportunities(params: {
  page?: number
  limit?: number
  category?: string
  country?: string
  search?: string
}): Promise<OpportunitiesResponse> {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', params.page.toString())
  if (params.limit) searchParams.set('limit', params.limit.toString())
  if (params.category) searchParams.set('category', params.category)
  if (params.country) searchParams.set('country', params.country)
  if (params.search) searchParams.set('search', params.search)

  const response = await fetch(`${API_BASE_URL}/api/opportunities?${searchParams}`, {
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch opportunities')
  }

  return response.json()
}

export async function fetchStats(): Promise<Stats> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`, {
      next: { revalidate: 300 },
    })
    if (!response.ok) throw new Error('Stats fetch failed')
    return response.json()
  } catch {
    return { total: 76, today: 25, by_category: {}, by_country: {} }
  }
}

export async function subscribeEmail(email: string, name?: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    })
    return { success: response.ok }
  } catch {
    return { success: false }
  }
}

// Utility functions
export function getDeadlineStatus(deadline: string): 'urgent' | 'soon' | 'normal' | 'none' {
  if (!deadline || deadline === 'None' || deadline === '') return 'none'
  const daysUntil = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)
  if (daysUntil < 0) return 'none'
  if (daysUntil < 5) return 'urgent'
  if (daysUntil < 14) return 'soon'
  return 'normal'
}

export function formatDeadline(deadline: string): string {
  if (!deadline || deadline === 'None' || deadline === '') return ''
  const daysUntil = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)
  if (daysUntil < 0) return 'Expired'
  if (daysUntil === 0) return 'Closes today'
  if (daysUntil === 1) return 'Tomorrow'
  if (daysUntil < 7) return `${daysUntil} days left`
  if (daysUntil < 30) return `${Math.ceil(daysUntil / 7)} weeks left`
  return new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
