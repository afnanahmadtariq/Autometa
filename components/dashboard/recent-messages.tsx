import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentMessages() {
  const messages = [
    {
      id: "1",
      contact: "John Smith",
      message: "Meeting at 3pm tomorrow",
      time: "2 hours ago",
      count: 1,
    },
    {
      id: "2",
      contact: "Sarah Johnson",
      message: "Please send the project files",
      time: "5 hours ago",
      count: 3,
    },
    {
      id: "3",
      contact: "Team Group",
      message: "Weekly update: We've completed...",
      time: "Yesterday",
      count: 1,
    },
    {
      id: "4",
      contact: "David Wilson",
      message: "Thanks for your help!",
      time: "Yesterday",
      count: 1,
    },
    {
      id: "5",
      contact: "Marketing Team",
      message: "Campaign stats for Q2",
      time: "2 days ago",
      count: 5,
    },
  ]

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
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.contact}</TableCell>
                <TableCell className="max-w-[200px] truncate">{message.message}</TableCell>
                <TableCell>{message.time}</TableCell>
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

