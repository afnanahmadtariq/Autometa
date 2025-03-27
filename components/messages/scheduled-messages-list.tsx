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

export function ScheduledMessagesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const messages = [
    {
      id: "1",
      contact: "Marketing Team",
      message: "Weekly newsletter",
      date: "Apr 29, 2023",
      time: "5:00 PM",
      count: 1,
      status: "pending",
    },
    {
      id: "2",
      contact: "Client Meeting",
      message: "Meeting reminder for tomorrow",
      date: "Apr 29, 2023",
      time: "8:00 PM",
      count: 1,
      status: "pending",
    },
    {
      id: "3",
      contact: "Support Team",
      message: "Customer follow-up",
      date: "Apr 30, 2023",
      time: "9:00 AM",
      count: 3,
      status: "pending",
    },
    {
      id: "4",
      contact: "Sales Department",
      message: "Monthly report distribution",
      date: "May 1, 2023",
      time: "10:00 AM",
      count: 5,
      status: "pending",
    },
    {
      id: "5",
      contact: "Team Leads",
      message: "Project deadline reminder",
      date: "May 3, 2023",
      time: "9:00 AM",
      count: 1,
      status: "pending",
    },
    {
      id: "6",
      contact: "HR Department",
      message: "Team building event details",
      date: "May 5, 2023",
      time: "3:00 PM",
      count: 1,
      status: "pending",
    },
    {
      id: "7",
      contact: "Product Team",
      message: "Release announcement",
      date: "May 10, 2023",
      time: "10:00 AM",
      count: 3,
      status: "pending",
    },
    {
      id: "8",
      contact: "Customer Success",
      message: "Quarterly review invitation",
      date: "May 15, 2023",
      time: "2:00 PM",
      count: 1,
      status: "pending",
    },
  ]

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "today") return matchesSearch && message.date === "Apr 29, 2023"
    if (filter === "tomorrow") return matchesSearch && message.date === "Apr 30, 2023"
    if (filter === "future") return matchesSearch && message.date !== "Apr 29, 2023" && message.date !== "Apr 30, 2023"
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Send Now</DropdownMenuItem>
                      <DropdownMenuItem>Cancel</DropdownMenuItem>
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

