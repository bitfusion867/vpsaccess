import { account } from "./appwrite"
import { ID } from "appwrite"

export interface User {
  $id: string
  name: string
  email: string
  emailVerification: boolean
  prefs: Record<string, any>
}

export class AuthService {
  // Create account
  async createAccount(email: string, password: string, name: string) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name)
      if (userAccount) {
        return this.login(email, password)
      } else {
        return userAccount
      }
    } catch (error) {
      throw error
    }
  }

  // Login
  async login(email: string, password: string) {
    try {
      return await account.createEmailPasswordSession(email, password)
    } catch (error) {
      throw error
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      return await account.get()
    } catch (error) {
      return null
    }
  }

  // Logout
  async logout() {
    try {
      return await account.deleteSessions()
    } catch (error) {
      throw error
    }
  }

  // Get user preferences
  async getUserPrefs() {
    try {
      const user = await this.getCurrentUser()
      return user?.prefs || {}
    } catch (error) {
      return {}
    }
  }

  // Update user preferences
  async updateUserPrefs(prefs: Record<string, any>) {
    try {
      return await account.updatePrefs(prefs)
    } catch (error) {
      throw error
    }
  }
}

export const authService = new AuthService()
