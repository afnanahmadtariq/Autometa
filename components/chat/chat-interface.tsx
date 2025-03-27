"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Send } from "lucide-react"
import { ContactsList } from "@/components/whatsapp/contacts-list"

const formSchema = z.object({
  contact: z.string({
    required_error: "Please select a contact",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
  count: z.coerce
    .number()
    .min(1, { message: "Must send at least 1 message" })
    .max(100, { message: "Cannot send more than 100 messages" }),
  date: z.date().optional(),
  time: z.string().optional(),
})

export function ChatInterface() {
  const [selectedContact, setSelectedContact] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
      message: "",
      count: 1,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (form.getValues("contact") === "") {
      form.setError("contact", {
        type: "manual",
        message: "Please select a contact",
      })
      return
    }

    console.log(values)

    // Simulate sending message
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      form.reset()
      setSelectedContact("")
    }, 1500)

    // In a real app, you would call your API here
    // const response = await fetch("/api/whatsapp/send", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
  }

  function onSchedule(values: z.infer<typeof formSchema>) {
    if (form.getValues("contact") === "") {
      form.setError("contact", {
        type: "manual",
        message: "Please select a contact",
      })
      return
    }

    if (!values.date) {
      form.setError("date", {
        type: "manual",
        message: "Please select a date",
      })
      return
    }

    if (!values.time) {
      form.setError("time", {
        type: "manual",
        message: "Please select a time",
      })
      return
    }

    console.log(values)

    // Simulate scheduling message
    setIsScheduling(true)
    setTimeout(() => {
      setIsScheduling(false)
      form.reset()
      setSelectedContact("")
    }, 1500)

    // In a real app, you would call your API here
    // const response = await fetch("/api/whatsapp/schedule", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
  }

  return (
    <div className="flex h-full flex-col">
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Select a contact to send a message</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactsList
              onSelectContact={(contact) => {
                setSelectedContact(contact)
                form.setValue("contact", contact)
              }}
              selectedContact={selectedContact}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Create and send messages to your WhatsApp contacts</CardDescription>
          </CardHeader>
          <Form {...form}>
            <Tabs defaultValue="send" className="w-full">
              <CardContent>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="send">Send Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
              </CardContent>
              <TabsContent value="send">
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of times to send</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} max={100} {...field} />
                        </FormControl>
                        <FormDescription>Send this message multiple times (1-100)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={isSending || !selectedContact}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
              <TabsContent value="schedule">
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="count"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of times to send</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} max={100} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, hour) =>
                              [0, 30].map((minute) => {
                                const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
                                return (
                                  <SelectItem key={timeString} value={timeString}>
                                    {timeString}
                                  </SelectItem>
                                )
                              }),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    className="w-full"
                    disabled={isScheduling || !selectedContact}
                    onClick={form.handleSubmit(onSchedule)}
                  >
                    {isScheduling ? "Scheduling..." : "Schedule Message"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Form>
        </Card>
      </div>
    </div>
  )
}

