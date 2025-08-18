"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Server,
  CreditCard,
  Settings,
  BarChart3,
  Shield,
  Clock,
  DollarSign,
  Activity,
  TrendingUp,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

const mockVpsData = [
  {
    id: "vps-001",
    name: "Trading Server #1",
    status: "Running",
    plan: "Professional",
    location: "New York",
    uptime: "99.9%",
    cpu: "45%",
    ram: "2.1GB / 4GB",
  },
]

const quickActions = [
  // { icon: Server, label: "Manage VPS", href: "/dashboard/vps" },
  // { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  // { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  // { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, logout, loading } = useAuth()
  const router = useRouter()


  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
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

  const userBalance = 327.5
  const userPlan = "Professional"
  const joinDate = new Date(user.$createdAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-xl bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userBalance}</div>
              <p className="text-xs text-muted-foreground">Available for services</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active VPS</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockVpsData.length}</div>
              <p className="text-xs text-muted-foreground">Running servers</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userPlan}</div>
              <p className="text-xs text-muted-foreground">6 months remaining</p>
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
                  <Server className="h-5 w-5" />
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
                          {vps.plan} Plan • {vps.location}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">{vps.status}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="font-semibold">{vps.uptime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CPU Usage</p>
                        <p className="font-semibold">{vps.cpu}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">RAM Usage</p>
                        <p className="font-semibold">{vps.ram}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                        Manage
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                        Connect
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl bg-transparent">
                        Restart
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {/*<Card className="rounded-2xl">*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>Quick Actions</CardTitle>*/}
            {/*    <CardDescription>Common tasks and shortcuts</CardDescription>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">*/}
            {/*      {quickActions.map((action, index) => (*/}
            {/*        <Button*/}
            {/*          key={index}*/}
            {/*          variant="outline"*/}
            {/*          className="h-20 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 bg-transparent"*/}
            {/*        >*/}
            {/*          <action.icon className="h-6 w-6" />*/}
            {/*          <span className="text-sm">{action.label}</span>*/}
            {/*        </Button>*/}
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
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
                    <AvatarImage src="/profile.svg" alt={user.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-700">{userInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Member since {joinDate}</p>
                  </div>
                </div>
                {/*<Button variant="outline" className="w-full rounded-xl bg-transparent">*/}
                {/*  Edit Profile*/}
                {/*</Button>*/}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
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
                {/*<Button variant="outline" className="w-full rounded-xl bg-transparent">*/}
                {/*  View Documentation*/}
                {/*</Button>*/}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
