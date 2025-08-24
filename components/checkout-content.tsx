"use client"

import {useRouter, useSearchParams} from "next/navigation"
import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Check, ArrowLeft, Copy, CheckCircle} from "lucide-react"
import Link from "next/link"
import {planData} from "@/lib/data"
import {createVPSCheckout} from "@/lib/actions/vps_checkout.actions";
import {useAuth} from "@/contexts/auth-context";
import swal from 'sweetalert';

const cryptoOptions = [
    {name: "Bitcoin", symbol: "BTC", icon: "₿"},
    {name: "Ethereum", symbol: "ETH", icon: "Ξ"},
    {name: "Tether", symbol: "USDT", icon: "₮"},
]

const cryptoWallets = {
    BTC: {
        address: "bc1qyrfku2n8gge8z4560avl25f5n2skf52ykzjggw",
        qrCode: "/btc-qr-code.jpg",
    },
    ETH: {
        address: "0x2ca579d80aAc8f5C4d5662cc3e9e105E5Ba6c414",
        qrCode: "/eth-qr-code.jpg",
    },
    USDT: {
        address: "TJpNq4jN9RbCXHsVhUF4xw51jVwzPrRaaL",
        qrCode: "/usdt-qr-code.jpg",
    },
}

export function CheckoutContent() {
    const searchParams = useSearchParams()
    const planParam = searchParams.get("plan") || "standard"
    const selectedPlan = planData[planParam as keyof typeof planData] || planData.standard

    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null)
    const [copiedAddress, setCopiedAddress] = useState(false)

    const handleCryptoSelect = (symbol: string) => {
        setSelectedCrypto(symbol)
        setCopiedAddress(false)
    }
    const {user, loading} = useAuth()
    const router = useRouter()
    const copyAddress = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address)
            setCopiedAddress(true)
            setTimeout(() => setCopiedAddress(false), 2000)
        } catch (err) {
            console.error("Failed to copy address:", err)
        }
    }
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handlePaymentConfirmation = async () => {
        setPaymentLoading(true)
        if (!user) {
            setTimeout(() => {
                setPaymentLoading(false)
                swal("You need be logged before submitting a plan payment")
            }, 2000)
            router.push("/signin")
            return null
        } else if (user) {
            await createVPSCheckout(selectedPlan.name, `$${selectedPlan.price.toString()}`, selectedCrypto!)
            setTimeout(() => {
                setPaymentLoading(false)
                swal("Success, sent and waiting for payment confirmation..")
            }, 2000)
        }
    }
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back button */}
            <div className="mb-8">
                <Button variant="outline" asChild className="rounded-2xl bg-transparent">
                    <Link href="/" className="flex items-center space-x-2">
                        <ArrowLeft className="h-4 w-4"/>
                        <span>Back to Plans</span>
                    </Link>
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Plan Summary */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-6">Checkout</h1>

                    <Card className="rounded-2xl shadow-lg">
                        <CardHeader className="text-center pb-4">
                            <div className="flex items-center justify-center space-x-2">
                                <CardTitle
                                    className="text-2xl font-bold text-foreground">{selectedPlan.name} Plan</CardTitle>
                                {selectedPlan.popular && (
                                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Most Popular</Badge>
                                )}
                            </div>
                            <CardDescription
                                className="text-muted-foreground">{selectedPlan.description}</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-bold text-foreground">${selectedPlan.price}</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <h4 className="font-semibold text-foreground mb-3">What's included:</h4>
                            {selectedPlan.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <Check className="h-5 w-5 text-purple-600 flex-shrink-0"/>
                                    <span className="text-foreground">{feature}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Options */}
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Choose Payment Method</h2>

                    {!selectedCrypto ? (
                        <Card className="rounded-2xl shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl">Cryptocurrency Payment</CardTitle>
                                <CardDescription>Select your preferred cryptocurrency for payment</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {cryptoOptions.map((crypto) => (
                                    <Button
                                        key={crypto.symbol}
                                        variant="outline"
                                        className="w-full h-16 rounded-2xl border-2 hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 bg-transparent"
                                        onClick={() => handleCryptoSelect(crypto.symbol)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-2xl font-bold text-purple-600">{crypto.icon}</div>
                                            <div className="text-left">
                                                <div className="font-semibold text-foreground">{crypto.name}</div>
                                                <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                                            </div>
                                        </div>
                                    </Button>
                                ))}

                                <div className="pt-6 border-t">
                                    <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                                        <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
                                        <div className="flex justify-between items-center">
                                            <span
                                                className="text-muted-foreground">{selectedPlan.name} Plan (Monthly)</span>
                                            <span
                                                className="font-semibold text-foreground">${selectedPlan.price}.00</span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                                            <span className="font-semibold text-foreground">Total</span>
                                            <span
                                                className="font-bold text-xl text-foreground">${selectedPlan.price}.00</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="rounded-2xl shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">
                                            Pay with {cryptoOptions.find((c) => c.symbol === selectedCrypto)?.name}
                                        </CardTitle>
                                        <CardDescription>
                                            Send exactly ${selectedPlan.price}.00 USD worth of {selectedCrypto}
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedCrypto(null)}
                                            className="rounded-xl">
                                        Change
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* QR Code */}
                                <div className="flex justify-center">
                                    <div className="bg-white p-4 rounded-2xl shadow-inner">
                                        <img
                                            src={cryptoWallets[selectedCrypto as keyof typeof cryptoWallets].qrCode || "/placeholder.svg"}
                                            alt={`${selectedCrypto} Payment QR Code`}
                                            className="w-48 h-48"
                                        />
                                    </div>
                                </div>

                                {/* Wallet Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Wallet Address:</label>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-muted/50 rounded-xl p-3 font-mono text-sm break-all">
                                            {cryptoWallets[selectedCrypto as keyof typeof cryptoWallets].address}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyAddress(cryptoWallets[selectedCrypto as keyof typeof cryptoWallets].address)}
                                            className="rounded-xl flex-shrink-0"
                                        >
                                            {copiedAddress ? (
                                                <CheckCircle className="h-4 w-4 text-green-600"/>
                                            ) : (
                                                <Copy className="h-4 w-4"/>
                                            )}
                                        </Button>
                                    </div>
                                    {copiedAddress &&
                                        <p className="text-sm text-green-600">Address copied to clipboard!</p>}
                                </div>

                                {/* Payment Instructions */}
                                <div
                                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Payment
                                        Instructions:</h4>
                                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                        <li>
                                            • First make sure you're logged in!
                                        </li>
                                        <li>
                                            • Send exactly ${selectedPlan.price}.00 USD worth of {selectedCrypto}
                                        </li>
                                        <li>• Use the wallet address above or scan the QR code</li>
                                        <li>• Payment confirmation may take 10-30 minutes</li>
                                        <li>• Your VPS will be activated after confirmation</li>
                                    </ul>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-muted/50 rounded-2xl p-4">
                                    <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
                                    <div className="flex justify-between items-center">
                                        <span
                                            className="text-muted-foreground">{selectedPlan.name} Plan (Monthly)</span>
                                        <span className="font-semibold text-foreground">${selectedPlan.price}.00</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                                        <span className="font-semibold text-foreground">Total in {selectedCrypto}</span>
                                        <span
                                            className="font-bold text-xl text-foreground">${selectedPlan.price}.00</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-2xl"
                                    onClick={handlePaymentConfirmation}>
                                    {paymentLoading ? "Loading..." : "I've made my payment"}
                                </Button>

                                <p className="text-sm text-muted-foreground text-center">
                                    Please make sure you're logged in before submitting a payment, otherwise your
                                    payment will not be processed!
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
