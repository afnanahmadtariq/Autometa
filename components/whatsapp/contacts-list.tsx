"use client"

import { useState, useEffect } from "react"
import { Check, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWhatsApp } from "@/lib/hooks/use-whatsapp"

interface ContactsListProps {
  onSelectContact?: (contact: string) => void
  selectedContact?: string
}

export function ContactsList({ onSelectContact, selectedContact }: ContactsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { contacts, refreshContacts } = useWhatsApp()

  useEffect(() => {
    refreshContacts()
  }, [refreshContacts])

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
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
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
            ))
          ) : (
            <div className="py-4 text-center text-sm text-muted-foreground">
              {contacts.length === 0 ? "No contacts found" : "No results found"}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

