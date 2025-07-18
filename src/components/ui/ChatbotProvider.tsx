'use client'

import { useState } from 'react'
import Chatbot from './Chatbot'

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const toggleChatbot = () => {
    setChatbotOpen(prev => !prev)
  }

  return (
    <>
      {children}
      <Chatbot 
        isOpen={chatbotOpen} 
        onToggle={toggleChatbot}
      />
    </>
  )
}