"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, MessageSquare, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WhatsappConnect } from "@/components/whatsapp/whatsapp-connect"
import { ContactsList } from "@/components/whatsapp/contacts-list"
import { useWhatsApp } from "@/lib/hooks/use-whatsapp"
import { useAuth } from "@/lib/hooks/use-auth"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { isConnected, disconnect } = useWhatsApp()
  const { user } = useAuth()

  const navItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: BarChart3,
    },
    {
      href: "/dashboard/chat",
      title: "Send Messages",
      icon: MessageSquare,
    },
    {
      href: "/dashboard/scheduled",
      title: "Scheduled",
      icon: Calendar,
    },
    {
      href: "/dashboard/messages",
      title: "Message History",
      icon: MessageSquare,
    },
    {
      href: "/dashboard/settings",
      title: "Settings",
      icon: Settings,
    },
  ]

  return (
    <aside className={cn("fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-card px-2 md:flex", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Automata</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">WhatsApp</h2>
          {!isConnected ? (
            <WhatsappConnect onConnected={() => {}} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span>Connected to WhatsApp</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          )}
        </div>
        {isConnected && (
          <div className="px-3 py-2">
            <h2 className="mb-2 text-lg font-semibold tracking-tight">Contacts</h2>
            <div className="space-y-1">
              <ContactsList />
            </div>
          </div>
        )}
        <div className="px-3 py-2">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">Navigation</h2>
          <SidebarNav items={navItems} />
        </div>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-[calc(100vh-15rem)]">
      <nav className={cn("flex flex-col space-y-1", className)}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </ScrollArea>
  )
}

