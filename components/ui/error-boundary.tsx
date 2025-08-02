"use client"

import React, { ReactNode } from "react"
import { Button } from "./button"

interface ErrorBoundaryProps {
  children: ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return <>{children}</>
}

interface ErrorDisplayProps {
  error: Error
  reset: () => void
  message?: string
}

export function ErrorDisplay({ error, reset, message }: ErrorDisplayProps) {
  console.error("Application error:", error)

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-xl font-bold text-red-700">
        {message || "Something went wrong"}
      </h2>
      <p className="text-sm text-red-600">
        {error?.message || "An unexpected error occurred"}
      </p>
      <div className="mt-4 flex gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh page
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  )
}
