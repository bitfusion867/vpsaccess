"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { CheckoutContent } from "@/components/checkout-content"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-12">
        <Suspense fallback={<div className="container mx-auto px-4 text-center">Loading...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
    </div>
  )
}
