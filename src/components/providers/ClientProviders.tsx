'use client'

import { ReactNode } from 'react'
import { LocaleProvider } from '@/hooks/useLocale'

interface ClientProvidersProps {
  children: ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <LocaleProvider>
      {children}
    </LocaleProvider>
  )
}