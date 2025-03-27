"use client"

import { useState } from "react"
import { Check, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContactsListProps {
  onSelectContact?: (contact: string) => void
  selectedContact?: string
}

export function ContactsList({ onSelectContact, selectedContact }: ContactsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock contacts data
  const contacts = [
    { id: "1", name: "John Smith", lastMessage: "2 hours ago" },
    { id: "2", name: "Sarah Johnson", lastMessage: "5 hours ago" },
    { id: "3", name: "Team Group", lastMessage: "Yesterday" },
    { id: "4", name: "David Wilson", lastMessage: "Yesterday" },
    { id: "5", name: "Marketing Team", lastMessage: "2 days ago" },
    { id: "6", name: "Client Meeting", lastMessage: "3 days ago" },
    { id: "7", name: "Support Team", lastMessage: "4 days ago" },
    { id: "8", name: "Sales Department", lastMessage: "5 days ago" },
    { id: "9", name: "HR Department", lastMessage: "1 week ago" },
    { id: "10", name: "Tech Support", lastMessage: "1 week ago" },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="space-y-1">
          {filteredContacts.map((contact) => (
            <Button
              key={contact.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                selectedContact === contact.name && "bg-accent text-accent-foreground",
              )}
              onClick={() => onSelectContact?.(contact.name)}
            >
              <div className="flex w-full items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-3 flex flex-1 flex-col items-start">
                  <span className="text-sm font-medium">{contact.name}</span>
                  <span className="text-xs text-muted-foreground">{contact.lastMessage}</span>
                </div>
                {selectedContact === contact.name && <Check className="ml-2 h-4 w-4" />}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

