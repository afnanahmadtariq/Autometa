"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"

export function MessageHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const messages = [
    {
      id: "1",
      contact: "John Smith",
      message: "Meeting at 3pm tomorrow",
      date: "Apr 28, 2023",
      time: "2:30 PM",
      count: 1,
    },
    {
      id: "2",
      contact: "Sarah Johnson",
      message: "Please send the project files",
      date: "Apr 28, 2023",
      time: "10:15 AM",
      count: 3,
    },
    {
      id: "3",
      contact: "Team Group",
      message: "Weekly update: We've completed the first phase of the project and are moving on to the second phase.",
      date: "Apr 27, 2023",
      time: "4:45 PM",
      count: 1,
    },
    {
      id: "4",
      contact: "David Wilson",
      message: "Thanks for your help!",
      date: "Apr 27, 2023",
      time: "11:30 AM",
      count: 1,
    },
    {
      id: "5",
      contact: "Marketing Team",
      message: "Campaign stats for Q2",
      date: "Apr 26, 2023",
      time: "3:00 PM",
      count: 5,
    },
    {
      id: "6",
      contact: "Client Meeting",
      message: "Agenda for tomorrow's meeting",
      date: "Apr 26, 2023",
      time: "9:15 AM",
      count: 1,
    },
    {
      id: "7",
      contact: "Support Team",
      message: "New ticket assigned: #12345",
      date: "Apr 25, 2023",
      time: "2:00 PM",
      count: 1,
    },
    {
      id: "8",
      contact: "Sales Department",
      message: "Monthly sales report",
      date: "Apr 25, 2023",
      time: "10:30 AM",
      count: 1,
    },
    {
      id: "9",
      contact: "HR Department",
      message: "New policy update",
      date: "Apr 24, 2023",
      time: "4:00 PM",
      count: 1,
    },
    {
      id: "10",
      contact: "Tech Support",
      message: "System maintenance notification",
      date: "Apr 24, 2023",
      time: "11:45 AM",
      count: 3,
    },
  ]

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "single") return matchesSearch && message.count === 1
    if (filter === "multiple") return matchesSearch && message.count > 1
    return matchesSearch
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message History</CardTitle>
        <CardDescription>View and manage your sent messages</CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search messages..."
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
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="single">Single Messages</SelectItem>
                <SelectItem value="multiple">Multiple Messages</SelectItem>
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
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.contact}</TableCell>
                <TableCell className="max-w-[300px] truncate">{message.message}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>{message.time}</TableCell>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Resend</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

