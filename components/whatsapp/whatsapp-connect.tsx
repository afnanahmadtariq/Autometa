"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { useWhatsApp } from "@/lib/hooks/use-whatsapp"

interface WhatsappConnectProps {
  onConnected: () => void
}

const phoneFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .regex(/^\+?[0-9]+$/, {
      message: "Please enter a valid phone number.",
    }),
})

export function WhatsappConnect({ onConnected }: WhatsappConnectProps) {
  const { connectWithQR, connectWithPhone, verifyQRCode, isConnecting } = useWhatsApp()
  const [showQrCode, setShowQrCode] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [error, setError] = useState<string | null>(null)

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  async function onPhoneSubmit(values: z.infer<typeof phoneFormSchema>) {
    setError(null)
    try {
      await connectWithPhone(values.phoneNumber)
      onConnected()
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : "Failed to connect with phone number")
    }
  }

  async function onQrConnect() {
    setError(null)
    try {
      const qrCode = await connectWithQR()
      setQrCodeUrl(qrCode)
      setShowQrCode(true)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : "Failed to generate QR code")
    }
  }

  async function onQrCodeScanned() {
    setError(null)
    try {
      await verifyQRCode()
      onConnected()
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : "Failed to verify QR code")
    }
  }

  return (
    <Tabs defaultValue="qr" className="space-y-4">
      {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="qr">QR Code</TabsTrigger>
        <TabsTrigger value="phone">Phone Number</TabsTrigger>
      </TabsList>
      <TabsContent value="qr">
        {!showQrCode ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Connect to WhatsApp by scanning a QR code with your phone.</p>
            <Button className="w-full" onClick={onQrConnect} disabled={isConnecting}>
              {isConnecting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isConnecting ? "Generating QR Code..." : "Generate QR Code"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-center text-sm font-medium">Scan this QR code with your phone</p>
              <ol className="text-sm text-muted-foreground">
                <li>1. Open WhatsApp on your phone</li>
                <li>2. Tap Menu or Settings and select WhatsApp Web</li>
                <li>3. Point your phone to this screen to capture the code</li>
              </ol>
              <div className="mt-4 rounded-md border p-2">
                <img
                  src={qrCodeUrl || "/placeholder.svg?height=300&width=300"}
                  alt="WhatsApp QR Code"
                  className="h-64 w-64"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full" onClick={() => setShowQrCode(false)}>
                Cancel
              </Button>
              <Button className="w-full" onClick={onQrCodeScanned} disabled={isConnecting}>
                {isConnecting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                {isConnecting ? "Connecting..." : "I've Scanned the QR Code"}
              </Button>
            </div>
          </div>
        )}
      </TabsContent>
      <TabsContent value="phone">
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
            <FormField
              control={phoneForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormDescription>Enter your WhatsApp phone number with country code.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isConnecting}>
              {isConnecting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              {isConnecting ? "Connecting..." : "Connect to WhatsApp"}
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}

