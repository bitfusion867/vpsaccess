"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, LinkIcon, LogOut, Menu } from "lucide-react"

export function Navigation() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const [mobileOpen, setMobileOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await logout()
            router.push("/")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    const userInitials =
        user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "U"

    // Close sheet on route change
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white text-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top bar */}
                <div className="flex h-16 items-center justify-between">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">V</span>
                        </div>
                        <span className="font-bold text-md">VPS Access</span>
                    </Link>

                    {/* Right: desktop menu */}
                    <div className="hidden sm:flex items-center gap-4">
                        <ModeToggle />

                        <Button variant="outline" asChild className="flex items-center gap-2">
                            <Link href="/location-locker">
                                Location Locker
                                <LinkIcon className="h-4 w-4" />
                            </Link>
                        </Button>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="/profile.svg" alt={user.name} />
                                            <AvatarFallback className="bg-purple-200 text-purple-800">
                                                {userInitials}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    forceMount
                                    className="w-56 bg-white text-black shadow-lg border"
                                >
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">{user.name}</p>
                                            <p className="w-[200px] truncate text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="flex items-center text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button aria-label="Open menu" variant="outline" size="icon" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 bg-white text-black p-6 flex flex-col gap-6">
                            {/* Theme toggle */}
                            <ModeToggle />

                            {/* Links */}
                            <Button variant="ghost" asChild className="justify-start">
                                <Link href="/location-locker">
                                    <LinkIcon className="h-4 w-4 mr-2" />
                                    Location Locker
                                </Link>
                            </Button>

                            {user ? (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="/profile.svg" alt={user.name} />
                                            <AvatarFallback className="bg-purple-200 text-purple-800">
                                                {userInitials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" asChild className="justify-start">
                                        <Link href="/dashboard">
                                            <User className="h-4 w-4 mr-2" />
                                            Dashboard
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="justify-start text-red-600"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Log out
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Button variant="outline" asChild>
                                        <Link href="/signin">Sign In</Link>
                                    </Button>
                                    <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                                        <Link href="/signup">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
