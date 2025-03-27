import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ScheduledMessagesList } from "@/components/messages/scheduled-messages-list"

export default function ScheduledPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Scheduled Messages" description="Manage your upcoming scheduled messages" />
      <ScheduledMessagesList />
    </div>
  )
}

