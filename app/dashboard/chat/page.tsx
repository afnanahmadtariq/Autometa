import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col space-y-6">
      <DashboardHeader title="Send Messages" description="Send instant or scheduled messages to your contacts" />
      <ChatInterface />
    </div>
  )
}

