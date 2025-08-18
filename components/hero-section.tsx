"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ultra-Low Latency <span className="text-purple-600">Forex VPS</span> for Serious Traders
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lightning-fast execution, 99.9% uptime, and seamless EA hosting with flexible crypto payments
          </p>

          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-2xl"
            onClick={scrollToPricing}
          >
            Start Trading Now
          </Button>
        </div>
      </div>
    </section>
  )
}
