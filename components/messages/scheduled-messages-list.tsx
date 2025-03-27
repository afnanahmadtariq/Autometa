"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"
import { useWhatsApp } from "@/lib/hooks/use-whatsapp"

export function ScheduledMessagesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const { scheduledMessages, refreshScheduledMessages, cancelScheduledMessage } = useWhatsApp()

  useEffect(() => {
    refreshScheduledMessages()
  }, [refreshScheduledMessages])

  const filteredMessages = scheduledMessages.filter((message) => {
    const matchesSearch =
      message.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    const scheduledDate = new Date(message.scheduledFor)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const isToday =
      scheduledDate.getDate() === today.getDate() &&
      scheduledDate.getMonth() === today.getMonth() &&
      scheduledDate.getFullYear() === today.getFullYear()

    const isTomorrow =
      scheduledDate.getDate() === tomorrow.getDate() &&
      scheduledDate.getMonth() === tomorrow.getMonth() &&
      scheduledDate.getFullYear() === tomorrow.getFullYear()

    if (filter === "all") return matchesSearch
    if (filter === "today") return matchesSearch && isToday
    if (filter === "tomorrow") return matchesSearch && isTomorrow
    if (filter === "future") return matchesSearch && scheduledDate > tomorrow

    return matchesSearch
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Messages</CardTitle>
        <CardDescription>Manage your upcoming scheduled messages</CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search scheduled messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
              type="search"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scheduled</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="future">Future</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Count</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => {
                const scheduledDate = new Date(message.scheduledFor)
                const formattedDate = scheduledDate.toLocaleDateString()
                const formattedTime = scheduledDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

                return (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.contact}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{message.message}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{formattedTime}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{message.count}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Send Now</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => cancelScheduledMessage(message.id)}>Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No scheduled messages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

