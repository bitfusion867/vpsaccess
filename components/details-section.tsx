import { Zap, TrendingUp, CreditCard } from "lucide-react"

export function DetailsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Why Forex Traders Choose Us?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Designed specifically for forex trading with ultra-low latency, 99.9% uptime, and seamless EA hosting.
                Trade with confidence 24/7.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ultra-Low Latency</h3>
                  <p className="text-muted-foreground">
                    Lightning-fast execution with sub-millisecond latency. Perfect for scalping, high-frequency trading,
                    and time-sensitive strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">99.9% Uptime Guarantee</h3>
                  <p className="text-muted-foreground">
                    Never miss a trading opportunity. Our servers ensure your EAs run continuously, even when your
                    computer is off or internet is down.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Anonymous Crypto Payments</h3>
                  <p className="text-muted-foreground">
                    Complete privacy with Bitcoin, Ethereum, USDT payments. No personal information required - perfect
                    for traders who value anonymity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Supporting graphic */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-foreground">Trade 24/7</h4>
                    <p className="text-sm text-muted-foreground px-4">
                      Keep your EAs running around the clock with enterprise-grade reliability
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-600 rounded-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-400 rounded-xl opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
