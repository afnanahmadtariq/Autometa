import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MessageHistory } from "@/components/messages/message-history"

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Message History" description="View and manage your sent messages" />
      <MessageHistory />
    </div>
  )
}

