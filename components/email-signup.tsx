'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://api.opportunityradar.africa/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-card bg-accent-green/10 p-6 text-center"
      >
        <p className="font-display text-lg font-semibold text-accent-green">
          You&apos;re subscribed!
        </p>
        <p className="mt-1 text-sm text-muted-text">
          Check your inbox for the latest opportunities.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 flex-1 rounded-card border-border-color bg-white px-4 text-navy placeholder:text-muted-text focus:ring-accent-green"
      />
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="h-12 bg-accent-green px-8 text-white hover:bg-accent-green/90"
      >
        {status === 'loading' ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          'Get Free Alerts'
        )}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
