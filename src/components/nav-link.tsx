"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))

  return (
    <Link 
      href={href} 
      className={`px-4 py-4 border-b-2 transition-colors duration-200 ${
        isActive 
          ? "border-primary font-medium text-foreground" 
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
      }`}
    >
      {children}
    </Link>
  )
}
