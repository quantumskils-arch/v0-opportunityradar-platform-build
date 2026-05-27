// API configuration and types for OpportunityRadar

export const API_BASE_URL = 'https://api.opportunityradar.africa'

export interface Opportunity {
  id: number
  title: string
  organisation: string
  deadline: string
  link: string
  category: 'Government Tender' | 'Grant/Scholarship' | 'Job'
  country: string
  source: string
  scraped_at: string
}

export interface OpportunitiesResponse {
  total: number
  page: number
  limit: number
  results: Opportunity[]
}

export interface Stats {
  total: number
  addedToday: number
  countries: number
  dailyUpdates: boolean
}

export const COUNTRIES = [
  'Uganda',
  'Kenya', 
  'Tanzania',
  'Rwanda',
  'Ethiopia',
  'International',
  'East Africa',
] as const

export const CATEGORIES = [
  'Government Tender',
  'Grant/Scholarship',
  'Job',
] as const

export const COUNTRY_FLAGS: Record<string, string> = {
  'Uganda': '🇺🇬',
  'Kenya': '🇰🇪',
  'Tanzania': '🇹🇿',
  'Rwanda': '🇷🇼',
  'Ethiopia': '🇪🇹',
  'International': '🌍',
  'East Africa': '🌍',
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Government Tender': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Job': { bg: 'bg-accent-green/10', text: 'text-accent-green' },
  'Grant/Scholarship': { bg: 'bg-amber/10', text: 'text-amber-700' },
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
    next: { revalidate: 300 }, // Cache for 5 minutes
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch opportunities')
  }
  
  return response.json()
}

export async function fetchStats(): Promise<Stats> {
  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  })
  
  if (!response.ok) {
    // Return default stats on error
    return {
      total: 0,
      addedToday: 0,
      countries: 5,
      dailyUpdates: true,
    }
  }
  
  return response.json()
}

export async function subscribeEmail(email: string, name?: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name }),
  })
  
  return { success: response.ok }
}

// Utility functions
export function getDeadlineStatus(deadline: string): 'urgent' | 'soon' | 'normal' {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 5) return 'urgent'
  if (daysUntil < 14) return 'soon'
  return 'normal'
}

export function formatDeadline(deadline: string): string {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return 'Expired'
  if (daysUntil === 0) return 'Today'
  if (daysUntil === 1) return 'Tomorrow'
  if (daysUntil < 7) return `${daysUntil} days left`
  if (daysUntil < 30) return `${Math.ceil(daysUntil / 7)} weeks left`
  return deadlineDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
