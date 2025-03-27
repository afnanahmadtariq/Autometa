"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useWhatsApp } from "@/lib/hooks/use-whatsapp"

export function ScheduledMessages() {
  const { scheduledMessages, refreshScheduledMessages } = useWhatsApp()

  useEffect(() => {
    refreshScheduledMessages()
  }, [refreshScheduledMessages])

  // Take only the 5 most recent scheduled messages
  const upcomingMessages = [...scheduledMessages]
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Messages</CardTitle>
        <CardDescription>Your upcoming scheduled messages</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingMessages.length > 0 ? (
              upcomingMessages.map((message) => {
                const scheduledDate = new Date(message.scheduledFor)
                // Format date as "Today, 5:00 PM" or "Tomorrow, 9:00 AM" or "May 1, 10:00 AM"
                const formattedDate = getFormattedScheduledDate(scheduledDate)

                return (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.contact}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{message.count}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No scheduled messages.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Helper function to format the scheduled date
function getFormattedScheduledDate(date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()

  const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  if (isToday) {
    return `Today, ${timeString}`
  } else if (isTomorrow) {
    return `Tomorrow, ${timeString}`
  } else {
    // Format like "May 1, 10:00 AM"
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
    const dateString = date.toLocaleDateString(undefined, options)
    return `${dateString}, ${timeString}`
  }
}

