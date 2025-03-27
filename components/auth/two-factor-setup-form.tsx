"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  method: z.enum(["totp", "email"], {
    required_error: "Please select a 2FA method",
  }),
  code: z.string().optional(),
})

export function TwoFactorSetupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("/placeholder.svg?height=200&width=200")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "totp",
      code: "",
    },
  })

  const method = form.watch("method")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!showVerification) {
      setShowVerification(true)
      // In a real app, you would fetch the QR code or send the email here
      // const response = await fetch("/api/auth/setup-2fa", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ method: values.method }),
      // });
      // if (values.method === "totp") {
      //   const data = await response.json();
      //   setQrCodeUrl(data.qrCode);
      // }
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      console.log(values)
      // In a real app, you would verify the code here
      // const response = await fetch("/api/auth/verify-2fa", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!showVerification ? (
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Two-Factor Authentication Method</FormLabel>
                <FormDescription>Choose how you want to receive your verification codes</FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="totp" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Authenticator App (Google Authenticator, Authy, etc.)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-normal">Email-based OTP verification</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="space-y-4">
            {method === "totp" ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Scan the QR code with your authenticator app</h3>
                  <div className="mt-4 flex justify-center">
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="QR Code for authenticator app"
                      className="h-48 w-48 rounded-md border"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the 6-digit code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Check your email for a verification code</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We&apos;ve sent a 6-digit code to your email address
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the 6-digit code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {!showVerification ? "Continue" : isLoading ? "Verifying..." : "Verify & Complete Setup"}
        </Button>
      </form>
    </Form>
  )
}

