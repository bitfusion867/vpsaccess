"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { CheckoutContent } from "@/components/checkout-content"
import {LocationLockerPricingSection} from "@/components/location-locker-pricing";
import {DetailsSection} from "@/components/details-section";

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="py-12">
                <LocationLockerPricingSection/>
                <DetailsSection/>
            </main>
        </div>
    )
}
