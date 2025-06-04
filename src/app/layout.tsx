import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Bell, Home } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "House Meal Planner",
  description: "Plan and manage your house meals efficiently",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <header className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-6 h-6" />
              <span className="text-xl font-semibold">House Meal Planner</span>
            </Link>
            <div className="flex items-center space-x-4">
                <button className="relative hover:opacity-80">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center text-primary">
                  A
                </div>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>
        <MainNav />
        <main className="container mx-auto py-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
