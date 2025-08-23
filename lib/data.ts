export const plans = [
    {
        name: "1 Month",
        _name: "basic",
        price: 255,
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
        price: 500,
        originalPrice: 700,
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
        price: 700,
        originalPrice: 900,
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



export const locationLockerPlans = [
    {
        name: "1 Month",
        _name: "basic",
        price: 75,
        originalPrice: null,
        description: "Perfect for testing our service",
        features: [

        ],
        popular: false,
    },
    {
        name: "6 Months",
        _name: "standard",
        price: 100,
        originalPrice: null,
        description: "Most popular for serious traders",
        features: [

        ],
        popular: true,
    },
    {
        name: "Lifetime",
        _name: "premium",
        price: 500,
        originalPrice: null,
        description: "Best value for professional traders",
        features: [

        ],
        popular: false,
    },
]


export const locationLockerPlanData = {
    basic:  locationLockerPlans[0],
    standard:  locationLockerPlans[1],
    premium: locationLockerPlans[2]
}
