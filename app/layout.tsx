import type React from "react"
import type { Metadata } from "next"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description:
    "A modern Next.js boilerplate with App Router, Tailwind CSS, and more",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
