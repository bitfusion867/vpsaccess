import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PricingSection } from "@/components/pricing-section"
import { DetailsSection } from "@/components/details-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PricingSection />
        <DetailsSection />
      </main>
    </div>
  )
}
