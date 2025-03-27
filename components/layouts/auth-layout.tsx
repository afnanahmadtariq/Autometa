import type React from "react"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Automata</span>
          </Link>
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">{children}</div>
        <div className="text-center text-sm">
          <Link href="/" className="text-muted-foreground underline underline-offset-4 hover:text-primary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

