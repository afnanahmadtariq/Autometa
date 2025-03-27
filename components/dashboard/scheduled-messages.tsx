import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ScheduledMessages() {
  const messages = [
    {
      id: "1",
      contact: "Marketing Team",
      message: "Weekly newsletter",
      date: "Today, 5:00 PM",
      count: 1,
      status: "pending",
    },
    {
      id: "2",
      contact: "Client Meeting",
      message: "Meeting reminder for tomorrow",
      date: "Today, 8:00 PM",
      count: 1,
      status: "pending",
    },
    {
      id: "3",
      contact: "Support Team",
      message: "Customer follow-up",
      date: "Tomorrow, 9:00 AM",
      count: 3,
      status: "pending",
    },
    {
      id: "4",
      contact: "Sales Department",
      message: "Monthly report distribution",
      date: "May 1, 10:00 AM",
      count: 5,
      status: "pending",
    },
    {
      id: "5",
      contact: "Team Leads",
      message: "Project deadline reminder",
      date: "May 3, 9:00 AM",
      count: 1,
      status: "pending",
    },
  ]

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
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.contact}</TableCell>
                <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <Badge variant="outline">{message.count}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

