"use client"

import React, {useState, useEffect} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    Server,
    Shield,
    Clock,
    DollarSign,
    Activity,
    TrendingUp,
    Lock,
    Home,
    LogOut, CheckCircle,
} from "lucide-react"
import {useAuth} from "@/contexts/auth-context"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {getUserMetaActions} from "@/lib/actions/user_meta.actions";

const mockVpsData = [
    {
        id: "vps-001",
        name: "Trading Server #1",
        status: "Running",
        plan: "Professional",
        location: "UK",
        uptime: "99.9%",
        cpu: "45%",
        ram: "2.1GB / 4GB",
    },
]


export function DashboardContent() {
    const {user, logout, loading} = useAuth()
    const router = useRouter()
    const [userMeta, setUserMeta] = useState<any>(null);

    useEffect(() => {
        getUserMetaActions().then(setUserMeta).catch(console.error);
    }, []);


    const handleLogout = async () => {
        try {
            await logout()
            router.push("/")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }
    const [showConnectionForm, setShowConnectionForm] = useState(false);
    const [connectionLoading, setConnectionLoading] = useState(false);
    const [botConnected, setBotConnected] = useState(false);

    const [botConnectionForm, setBotConnectionForm] = useState({
        botName: "",
        brokerName: "",
        email: "",
        token: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBotConnectionForm({ ...botConnectionForm, [e.target.name]: e.target.value });
    };

    const handleBotConnection = () => {
        setShowConnectionForm(true);
    };

    const handleRunVPS = async () => {
        setConnectionLoading(true);
        setBotConnected(false);

        // simulate process for 2s
        setTimeout(() => {
            setConnectionLoading(false);
            setBotConnected(true);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        router.push("/signin")
        return null
    }

    const userInitials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()


    const joinDate = new Date(user.$createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    {/* Left: Title */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Welcome back, {user.name}
                        </p>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 items-center mt-4 sm:mt-0">
                        <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 px-2 py-1 text-xs sm:text-sm"
                        >
                            <Activity className="h-3 w-3 mr-1" />
                            Active
                        </Badge>



                        <Link href="/">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl bg-transparent text-xs sm:text-sm px-3 py-1"
                            >
                                <Home className="h-4 w-4 mr-1" />
                                Home
                            </Button>
                        </Link>

                        <Link href="/location-locker">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl bg-transparent text-xs sm:text-sm px-3 py-1"
                            >
                                <Lock className="h-4 w-4 mr-1" />
                                Location Locker
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="rounded-xl bg-transparent text-xs sm:text-sm px-3 py-1"
                        >
                            <LogOut className="h-4 w-4 mr-1" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            {
                                userMeta ? (
                                        <div className="text-2xl font-bold">${userMeta.account_balance.replace("$","")}</div>
                                    ) :
                                    <p>Loading...</p>
                            }
                            <p className="text-xs text-muted-foreground">Available for services</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active VPS</CardTitle>
                            <Server className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            {
                                userMeta ?
                                    (
                                        <div className="text-2xl font-bold">{userMeta.active_vps}</div>
                                    ) :
                                    <p>Loading...</p>
                            }
                            <p className="text-xs text-muted-foreground">Running servers</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            {
                                userMeta ?
                                    (
                                        <div className="text-2xl font-bold">{userMeta.uptime}</div>
                                    ) :
                                    (
                                        <p>Loading...</p>
                                    )
                            }
                            <p className="text-xs text-muted-foreground">Last 30 days</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            {
                                userMeta ?
                                    (
                                        <>
                                            <div className="text-2xl font-bold">{userMeta.vps_plan}</div>
                                            <p className="text-xs text-muted-foreground">{userMeta.time_remaining} remaining</p>
                                        </>
                                    ) :
                                    (
                                        <p>Loading...</p>

                                    )
                            }
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* VPS Overview */}
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Server className="h-5 w-5"/>
                                    <span>Your VPS Servers</span>
                                </CardTitle>
                                <CardDescription>Manage and monitor your forex trading servers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {mockVpsData.map((vps) => (
                                    <div key={vps.id} className="border rounded-xl p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-foreground">{vps.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Currently running in {vps.location}
                                                </p>
                                            </div>
                                            <Badge
                                                className="bg-green-100 text-green-800 border-green-200">{vps.status}</Badge>
                                        </div>

                                        {
                                            userMeta ?
                                                (
                                                    <>
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                                            <div>
                                                                <p className="text-muted-foreground">Uptime</p>
                                                                <p className="font-semibold">{userMeta.uptime}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-muted-foreground">CPU Usage</p>
                                                                <p className="font-semibold">{userMeta.cpu_usage}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-muted-foreground">RAM Usage</p>
                                                                <p className="font-semibold">{userMeta.ram_usage}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) :
                                                (
                                                    <p>Loading...</p>

                                                )
                                        }

                                        <div className="flex flex-col space-y-4 pt-4">
                                            {!showConnectionForm ? (
                                                <Button
                                                    onClick={handleBotConnection}
                                                    size="sm"
                                                    variant="outline"
                                                    className="rounded-xl bg-transparent"
                                                >
                                                    Connect Bot
                                                </Button>
                                            ) : (
                                                <div className="space-y-4 p-4 border rounded-xl shadow">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="botName">Bot Name</Label>
                                                        <Input
                                                            id="botName"
                                                            name="botName"
                                                            value={botConnectionForm.botName}
                                                            onChange={handleChange}
                                                            placeholder="Enter bot name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="brokerName">Broker Name</Label>
                                                        <Input
                                                            id="brokerName"
                                                            name="brokerName"
                                                            value={botConnectionForm.brokerName}
                                                            onChange={handleChange}
                                                            placeholder="Enter broker name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={botConnectionForm.email}
                                                            onChange={handleChange}
                                                            placeholder="Enter email"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="token">Password / API Token</Label>
                                                        <Input
                                                            id="token"
                                                            name="token"
                                                            type="password"
                                                            value={botConnectionForm.token}
                                                            onChange={handleChange}
                                                            placeholder="Enter password or API token"
                                                        />
                                                    </div>

                                                    <Button
                                                        onClick={handleRunVPS}
                                                        disabled={loading}
                                                        variant="outline"
                                                        className="w-full rounded-xl bg-transparent"
                                                    >
                                                        {connectionLoading ? "Processing..." : "Run VPS"}
                                                    </Button>

                                                    {botConnected && (
                                                        <div className="flex items-center justify-center space-x-2 text-green-600 font-medium">
                                                            <CheckCircle className="w-5 h-5" />
                                                            <span>VPS is connected</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Profile */}
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="/profile.svg" alt={user.name}/>
                                        <AvatarFallback
                                            className="bg-purple-100 text-purple-700">{userInitials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                        <p className="text-xs text-muted-foreground">Member since {joinDate}</p>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4"/>
                                    <span>Recent Activity</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-sm">
                                    <p className="font-medium">Account Created</p>
                                    <p className="text-muted-foreground">{joinDate}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium">Profile Setup</p>
                                    <p className="text-muted-foreground">Welcome to VPS Access!</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Support */}
                        <Card className="rounded-2xl">
                            <CardHeader>
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="mailto:classicforextraderoffical@gmail">
                                    <Button variant="outline" className="w-full rounded-xl bg-transparent">
                                        Contact Support
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
