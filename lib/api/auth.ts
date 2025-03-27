/**
 * Authentication API service
 * Handles all authentication-related API calls to the backend
 */

// Base URL for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Types
export interface SignupData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface TwoFactorSetupData {
  method: "totp" | "email"
}

export interface TwoFactorVerifyData {
  method?: "totp" | "email"
  code: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    twoFactorEnabled: boolean
  }
}

/**
 * Sign up a new user
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to sign up")
  }

  return response.json()
}

/**
 * Log in an existing user
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to log in")
  }

  return response.json()
}

/**
 * Google OAuth login/signup
 */
export function googleAuth(): string {
  return `${API_BASE_URL}/api/auth/google`
}

/**
 * Set up two-factor authentication
 */
export async function setupTwoFactor(data: TwoFactorSetupData): Promise<{ qrCode?: string; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/auth/setup-2fa`, {
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
    throw new Error(error.message || "Failed to set up two-factor authentication")
  }

  return response.json()
}

/**
 * Verify two-factor authentication code
 */
export async function verifyTwoFactor(data: TwoFactorVerifyData): Promise<AuthResponse> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/auth/verify-2fa`, {
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
    throw new Error(error.message || "Failed to verify two-factor authentication")
  }

  return response.json()
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to log out")
  }

  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

