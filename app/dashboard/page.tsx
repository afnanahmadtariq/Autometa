import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentMessages } from "@/components/dashboard/recent-messages"
import { ScheduledMessages } from "@/components/dashboard/scheduled-messages"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Dashboard" description="Overview of your messaging activity" />
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentMessages />
        <ScheduledMessages />
      </div>
    </div>
  )
}

