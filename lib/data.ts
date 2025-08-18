export const plans = [
    {
        name: "1 Month",
        _name: "basic",
        price: 25,
        originalPrice: null,
        description: "Perfect for testing our service",
        features: [
            "2 CPU Cores",
            "4 GB RAM",
            "50 GB SSD Storage",
            "Ultra-Low Latency",
            "MT4/MT5 Compatible",
            "Unlimited EAs",
            "99.9% Uptime",
            "24/7 Support",
            "Crypto Payments",
        ],
        popular: false,
    },
    {
        name: "6 Months",
        _name: "standard",
        price: 120,
        originalPrice: 150,
        description: "Most popular for serious traders",
        features: [
            "2 CPU Cores",
            "4 GB RAM",
            "50 GB SSD Storage",
            "Ultra-Low Latency",
            "MT4/MT5 Compatible",
            "Unlimited EAs",
            "99.9% Uptime",
            "Priority Support",
            "Crypto Payments",
            "20% Discount Applied",
        ],
        popular: true,
    },
    {
        name: "Lifetime",
        _name: "premium",
        price: 399,
        originalPrice: 600,
        description: "Best value for professional traders",
        features: [
            "2 CPU Cores",
            "4 GB RAM",
            "50 GB SSD Storage",
            "Ultra-Low Latency",
            "MT4/MT5 Compatible",
            "Unlimited EAs",
            "99.9% Uptime",
            "VIP Support",
            "Crypto Payments",
            "One-time Payment",
            "33% Discount Applied",
        ],
        popular: false,
    },
]


export const planData = {
    basic:  plans[0],
    standard:  plans[1],
    premium: plans[2]
}
