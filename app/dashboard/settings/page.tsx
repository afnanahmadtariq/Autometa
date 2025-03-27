import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Settings" description="Manage your account and WhatsApp connection" />
      <SettingsTabs />
    </div>
  )
}

