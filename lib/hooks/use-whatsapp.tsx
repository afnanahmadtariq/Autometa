"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import * as whatsappApi from "@/lib/api/whatsapp"
import { useAuth } from "./use-auth"

// Types
import type {
  Contact,
  Message,
  ScheduledMessage,
  WhatsAppSendMessageData,
  WhatsAppScheduleMessageData,
} from "@/lib/api/whatsapp"

interface WhatsAppContextType {
  isConnected: boolean
  isConnecting: boolean
  contacts: Contact[]
  sentMessages: Message[]
  scheduledMessages: ScheduledMessage[]
  connectWithQR: () => Promise<string>
  connectWithPhone: (phoneNumber: string) => Promise<void>
  disconnect: () => Promise<void>
  verifyQRCode: () => Promise<void>
  sendMessage: (data: WhatsAppSendMessageData) => Promise<void>
  scheduleMessage: (data: WhatsAppScheduleMessageData) => Promise<void>
  cancelScheduledMessage: (messageId: string) => Promise<void>
  refreshContacts: () => Promise<void>
  refreshSentMessages: () => Promise<void>
  refreshScheduledMessages: () => Promise<void>
}

// Create context
const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined)

// Provider component
export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [sentMessages, setSentMessages] = useState<Message[]>([])
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([])

  // Check WhatsApp connection status on mount and when user changes
  useEffect(() => {
    if (user) {
      refreshContacts()
      refreshSentMessages()
      refreshScheduledMessages()
    }
  }, [user])

  // Connect with QR code
  const connectWithQR = async () => {
    setIsConnecting(true)
    try {
      const response = await whatsappApi.getWhatsAppQRCode()
      return response.qrCode
    } catch (error) {
      console.error("WhatsApp QR code error:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  // Verify QR code was scanned
  const verifyQRCode = async () => {
    setIsConnecting(true)
    try {
      await whatsappApi.verifyWhatsAppQRCode()
      setIsConnected(true)
      await refreshContacts()
    } catch (error) {
      console.error("WhatsApp QR verification error:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  // Connect with phone number
  const connectWithPhone = async (phoneNumber: string) => {
    setIsConnecting(true)
    try {
      await whatsappApi.connectWhatsAppWithPhone({ phoneNumber })
      setIsConnected(true)
      await refreshContacts()
    } catch (error) {
      console.error("WhatsApp phone connection error:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect from WhatsApp
  const disconnect = async () => {
    try {
      await whatsappApi.disconnectWhatsApp()
      setIsConnected(false)
      setContacts([])
    } catch (error) {
      console.error("WhatsApp disconnect error:", error)
      throw error
    }
  }

  // Send message
  const sendMessage = async (data: WhatsAppSendMessageData) => {
    try {
      await whatsappApi.sendWhatsAppMessage(data)
      await refreshSentMessages()
    } catch (error) {
      console.error("WhatsApp send message error:", error)
      throw error
    }
  }

  // Schedule message
  const scheduleMessage = async (data: WhatsAppScheduleMessageData) => {
    try {
      await whatsappApi.scheduleWhatsAppMessage(data)
      await refreshScheduledMessages()
    } catch (error) {
      console.error("WhatsApp schedule message error:", error)
      throw error
    }
  }

  // Cancel scheduled message
  const cancelScheduledMessage = async (messageId: string) => {
    try {
      await whatsappApi.cancelScheduledMessage(messageId)
      await refreshScheduledMessages()
    } catch (error) {
      console.error("WhatsApp cancel scheduled message error:", error)
      throw error
    }
  }

  // Refresh contacts
  const refreshContacts = async () => {
    try {
      const fetchedContacts = await whatsappApi.getWhatsAppContacts()
      setContacts(fetchedContacts)
      setIsConnected(fetchedContacts.length > 0)
    } catch (error) {
      console.error("WhatsApp contacts refresh error:", error)
      setIsConnected(false)
    }
  }

  // Refresh sent messages
  const refreshSentMessages = async () => {
    try {
      const messages = await whatsappApi.getSentMessages()
      setSentMessages(messages)
    } catch (error) {
      console.error("WhatsApp sent messages refresh error:", error)
    }
  }

  // Refresh scheduled messages
  const refreshScheduledMessages = async () => {
    try {
      const messages = await whatsappApi.getScheduledMessages()
      setScheduledMessages(messages)
    } catch (error) {
      console.error("WhatsApp scheduled messages refresh error:", error)
    }
  }

  const value = {
    isConnected,
    isConnecting,
    contacts,
    sentMessages,
    scheduledMessages,
    connectWithQR,
    connectWithPhone,
    disconnect,
    verifyQRCode,
    sendMessage,
    scheduleMessage,
    cancelScheduledMessage,
    refreshContacts,
    refreshSentMessages,
    refreshScheduledMessages,
  }

  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>
}

// Hook for using WhatsApp context
export function useWhatsApp() {
  const context = useContext(WhatsAppContext)
  if (context === undefined) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider")
  }
  return context
}

