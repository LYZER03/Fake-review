"use client"

import CommentDetector from '@/components/CommentDetector'
import React from 'react'

export default function page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <CommentDetector/>
    </div>
  )
}
