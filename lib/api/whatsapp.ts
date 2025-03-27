/**
 * WhatsApp API service
 * Handles all WhatsApp-related API calls to the backend
 */

// Base URL for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Types
export interface WhatsAppQRResponse {
  qrCode: string
  expiresAt: string
}

export interface WhatsAppPhoneConnectData {
  phoneNumber: string
}

export interface WhatsAppSendMessageData {
  contact: string
  message: string
  count: number
}

export interface WhatsAppScheduleMessageData {
  contact: string
  message: string
  count: number
  date: Date
  time: string
}

export interface Contact {
  id: string
  name: string
  phoneNumber: string
  lastMessage?: string
  lastMessageTime?: string
}

export interface Message {
  id: string
  contact: string
  message: string
  count: number
  sentAt: string
  status: "sent" | "failed" | "pending"
}

export interface ScheduledMessage extends Message {
  scheduledFor: string
}

/**
 * Get WhatsApp QR code for connection
 */
export async function getWhatsAppQRCode(): Promise<WhatsAppQRResponse> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/qr-code`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get WhatsApp QR code")
  }

  return response.json()
}

/**
 * Connect to WhatsApp using phone number
 */
export async function connectWhatsAppWithPhone(
  data: WhatsAppPhoneConnectData,
): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to connect to WhatsApp")
  }

  return response.json()
}

/**
 * Verify WhatsApp QR code was scanned
 */
export async function verifyWhatsAppQRCode(): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/verify-qr`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to verify WhatsApp QR code")
  }

  return response.json()
}

/**
 * Disconnect from WhatsApp
 */
export async function disconnectWhatsApp(): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/disconnect`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to disconnect from WhatsApp")
  }

  return response.json()
}

/**
 * Get WhatsApp contacts
 */
export async function getWhatsAppContacts(): Promise<Contact[]> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/contacts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get WhatsApp contacts")
  }

  return response.json()
}

/**
 * Send WhatsApp message
 */
export async function sendWhatsAppMessage(
  data: WhatsAppSendMessageData,
): Promise<{ success: boolean; message: string; messageId: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to send WhatsApp message")
  }

  return response.json()
}

/**
 * Schedule WhatsApp message
 */
export async function scheduleWhatsAppMessage(
  data: WhatsAppScheduleMessageData,
): Promise<{ success: boolean; message: string; messageId: string }> {
  const token = localStorage.getItem("token")

  // Format the date and time for the API
  const scheduledFor = new Date(data.date)
  const [hours, minutes] = data.time.split(":").map(Number)
  scheduledFor.setHours(hours, minutes)

  const formattedData = {
    contact: data.contact,
    message: data.message,
    count: data.count,
    scheduledFor: scheduledFor.toISOString(),
  }

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formattedData),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to schedule WhatsApp message")
  }

  return response.json()
}

/**
 * Get sent messages history
 */
export async function getSentMessages(): Promise<Message[]> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get sent messages")
  }

  return response.json()
}

/**
 * Get scheduled messages
 */
export async function getScheduledMessages(): Promise<ScheduledMessage[]> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/scheduled`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get scheduled messages")
  }

  return response.json()
}

/**
 * Cancel scheduled message
 */
export async function cancelScheduledMessage(messageId: string): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/whatsapp/scheduled/${messageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to cancel scheduled message")
  }

  return response.json()
}

