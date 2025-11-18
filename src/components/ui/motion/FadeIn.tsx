'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  fullWidth?: boolean
  viewportAmount?: number
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  fullWidth = false,
  viewportAmount = 0.3
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: viewportAmount })

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 40, x: 0 }
      case 'down': return { y: -40, x: 0 }
      case 'left': return { x: 40, y: 0 }
      case 'right': return { x: -40, y: 0 }
      case 'none': return { x: 0, y: 0 }
      default: return { y: 40, x: 0 }
    }
  }

  const offset = getDirectionOffset()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1], // Custom ease curve
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {children}
    </motion.div>
  )
}

export function FadeInStagger({
  children,
  className = '',
  faster = false
}: {
  children: React.ReactNode
  className?: string
  faster?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: faster ? 0.1 : 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}