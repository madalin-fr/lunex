'use client'

import dynamic from 'next/dynamic'

const ChatbotProvider = dynamic(
  () => import('./ChatbotProvider').then(mod => mod.ChatbotProvider),
  { 
    ssr: false,
    loading: () => null
  }
)

export function ChatbotWrapper({ children }: { children: React.ReactNode }) {
  return <ChatbotProvider>{children}</ChatbotProvider>
}