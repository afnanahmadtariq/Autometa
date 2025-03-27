/**
 * User API service
 * Handles all user profile and settings-related API calls to the backend
 */

// Base URL for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Types
export interface UserProfile {
  id: string
  name: string
  email: string
  twoFactorEnabled: boolean
  whatsappConnected: boolean
}

export interface UpdateProfileData {
  name: string
  email: string
}

export interface UpdatePasswordData {
  currentPassword: string
  newPassword: string
}

/**
 * Get user profile
 */
export async function getUserProfile(): Promise<UserProfile> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get user profile")
  }

  return response.json()
}

/**
 * Update user profile
 */
export async function updateUserProfile(data: UpdateProfileData): Promise<UserProfile> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update user profile")
  }

  return response.json()
}

/**
 * Update user password
 */
export async function updateUserPassword(data: UpdatePasswordData): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/user/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update password")
  }

  return response.json()
}

/**
 * Get user settings
 */
export async function getUserSettings(): Promise<any> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/user/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to get user settings")
  }

  return response.json()
}

/**
 * Update user settings
 */
export async function updateUserSettings(data: any): Promise<{ success: boolean; message: string }> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE_URL}/api/user/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update user settings")
  }

  return response.json()
}

