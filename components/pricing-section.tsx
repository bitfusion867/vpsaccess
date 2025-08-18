"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { plans } from "@/lib/data"


export function PricingSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isMobile = useIsMobile()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % plans.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + plans.length) % plans.length)
  }

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Choose Your Forex VPS Plan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ultra-low latency servers optimized for forex trading. All plans support MT4/MT5 and unlimited EAs.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>

          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {plans.map((plan) => (
                  <div key={plan.name} className="w-full flex-shrink-0 px-4">
                    <PricingCard plan={plan} mobile />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="rounded-full w-10 h-10 p-0 bg-transparent"
              >
                ←
              </Button>
              <div className="flex space-x-2">
                {plans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="rounded-full w-10 h-10 p-0 bg-transparent"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan, mobile = false }: { plan: (typeof plans)[0]; mobile?: boolean }) {
  return (
    <Card
      className={`relative rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        plan.popular ? "border-purple-600 border-2 scale-105" : "border-border hover:border-purple-300"
      } ${mobile ? "max-w-sm mx-auto" : ""}`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1">
          Most Popular
        </Badge>
      )}

      <CardHeader className={`text-center ${mobile ? "pb-3" : "pb-4"}`}>
        <CardTitle className={`font-bold text-foreground ${mobile ? "text-xl" : "text-2xl"}`}>{plan.name}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">{plan.description}</CardDescription>
        <div className="mt-3">
          {plan.originalPrice && (
            <div className="text-sm text-muted-foreground line-through">${plan.originalPrice}</div>
          )}
          <span className={`font-bold text-foreground ${mobile ? "text-3xl" : "text-4xl"}`}>${plan.price}</span>
          <span className="text-muted-foreground text-sm ml-1">{plan.name === "Lifetime" ? "one-time" : "total"}</span>
        </div>
      </CardHeader>

      <CardContent className={`${mobile ? "space-y-2" : "space-y-3"}`}>
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className={`text-purple-600 flex-shrink-0 ${mobile ? "h-4 w-4" : "h-5 w-5"}`} />
            <span className={`text-foreground ${mobile ? "text-sm" : ""}`}>{feature}</span>
          </div>
        ))}
      </CardContent>

      <CardFooter className={mobile ? "pt-4" : "pt-6"}>
        <Button
          className={`w-full rounded-2xl font-semibold transition-all duration-300 ${
            mobile ? "py-2 text-base" : "py-3 text-lg"
          } ${
            plan.popular
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-background border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
          }`}
          asChild
        >
          <Link href={`/checkout?plan=${plan._name.toLowerCase()}`}>Choose Plan</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
