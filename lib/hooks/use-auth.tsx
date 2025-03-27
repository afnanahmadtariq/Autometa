"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"
import * as authApi from "@/lib/api/auth"

// Types
interface User {
  id: string
  name: string
  email: string
  twoFactorEnabled: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  verifyTwoFactor: (code: string, method?: "totp" | "email") => Promise<void>
  setupTwoFactor: (method: "totp" | "email") => Promise<{ qrCode?: string; message: string }>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (storedUser && token) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.login({ email, password })

      // Store user and token
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)

      // Redirect based on 2FA status
      if (response.user.twoFactorEnabled) {
        router.push("/verify-2fa")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.signup({ name, email, password })

      // Store user and token
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)

      // Redirect to 2FA setup
      router.push("/setup-2fa")
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      await authApi.logout()

      // Clear user and token
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)

      // Redirect to login
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)

      // Clear user and token even if API call fails
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)

      // Redirect to login
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  // Verify 2FA function
  const verifyTwoFactor = async (code: string, method?: "totp" | "email") => {
    setIsLoading(true)
    try {
      const response = await authApi.verifyTwoFactor({ code, method })

      // Update user and token
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("2FA verification error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Setup 2FA function
  const setupTwoFactor = async (method: "totp" | "email") => {
    setIsLoading(true)
    try {
      const response = await authApi.setupTwoFactor({ method })
      return response
    } catch (error) {
      console.error("2FA setup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    verifyTwoFactor,
    setupTwoFactor,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

