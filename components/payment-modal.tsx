'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Loader2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  amount: number
  onSuccess: () => void
}

type PaymentNetwork = 'mtn' | 'airtel'

export function PaymentModal({ isOpen, onClose, title, amount, onSuccess }: PaymentModalProps) {
  const [network, setNetwork] = useState<PaymentNetwork>('mtn')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // Simulate payment processing (3 seconds as per spec)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setStatus('success')
    
    // Trigger success callback after animation
    setTimeout(() => {
      onSuccess()
      onClose()
      setStatus('idle')
      setPhone('')
    }, 1500)
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-UG').format(amount)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="rounded-card bg-white p-6 shadow-card-hover">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1 text-muted-text hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green"
                  >
                    <Check className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-navy">Payment Successful!</h3>
                  <p className="mt-2 text-muted-text">Your content is being prepared...</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
                  <p className="mt-1 text-2xl font-bold text-accent-green">
                    UGX {formatAmount(amount)}
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Network Selection */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-navy">
                        Select Payment Network
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setNetwork('mtn')}
                          className={`flex items-center justify-center gap-2 rounded-card border-2 p-4 transition-all ${
                            network === 'mtn'
                              ? 'border-amber bg-amber/5'
                              : 'border-border-color hover:border-amber/50'
                          }`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber font-bold text-white">
                            M
                          </div>
                          <span className="font-medium text-navy">MTN MoMo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNetwork('airtel')}
                          className={`flex items-center justify-center gap-2 rounded-card border-2 p-4 transition-all ${
                            network === 'airtel'
                              ? 'border-red-500 bg-red-50'
                              : 'border-border-color hover:border-red-300'
                          }`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-bold text-white">
                            A
                          </div>
                          <span className="font-medium text-navy">Airtel Money</span>
                        </button>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text">
                          +256
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="7XX XXX XXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                          className="pl-14"
                          required
                        />
                        <Smartphone className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-text" />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={status === 'loading' || phone.length < 9}
                      className="w-full bg-accent-green py-6 text-lg font-semibold text-white hover:bg-accent-green/90"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay UGX ${formatAmount(amount)}`
                      )}
                    </Button>
                  </form>

                  <p className="mt-4 text-center text-xs text-muted-text">
                    You will receive a payment prompt on your phone. Enter your PIN to complete.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
