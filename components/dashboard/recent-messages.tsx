"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useWhatsApp } from "@/lib/hooks/use-whatsapp"

export function RecentMessages() {
  const { sentMessages, refreshSentMessages } = useWhatsApp()

  useEffect(() => {
    refreshSentMessages()
  }, [refreshSentMessages])

  // Take only the 5 most recent messages
  const recentMessages = [...sentMessages]
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
        <CardDescription>Your most recently sent messages</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => {
                const sentDate = new Date(message.sentAt)
                // Calculate relative time (e.g., "2 hours ago", "Yesterday")
                const timeAgo = getRelativeTime(sentDate)

                return (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.contact}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
                    <TableCell>{timeAgo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{message.count}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No messages sent yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Helper function to get relative time string
function getRelativeTime(date: Date) {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay > 6) {
    return date.toLocaleDateString()
  } else if (diffDay > 1) {
    return `${diffDay} days ago`
  } else if (diffDay === 1) {
    return "Yesterday"
  } else if (diffHour >= 1) {
    return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`
  } else if (diffMin >= 1) {
    return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`
  } else {
    return "Just now"
  }
}

