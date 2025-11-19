import React from 'react'

export const UKFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 30"
    className={className}
    width="30"
    height="15"
  >
    <clipPath id="t">
      <path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" />
    </clipPath>
    <path d="M0,0v30h60v-30z" fill="#012169" />
    <path d="M0,0 60,30m0-30 -60,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 60,30m0-30 -60,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
)

export const ITFlag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1500 1000"
    className={className}
    width="30"
    height="20"
  >
    <rect width="500" height="1000" fill="#009246" />
    <rect x="500" width="500" height="1000" fill="#fff" />
    <rect x="1000" width="500" height="1000" fill="#ce2b37" />
  </svg>
)