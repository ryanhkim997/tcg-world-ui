"use client"

import { ErrorDisplay } from "@/components/ui/error-boundary"

export default function PullPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorDisplay 
      error={error} 
      reset={reset} 
      message="Failed to load pack details" 
    />
  )
}
