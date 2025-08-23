import {account, databases} from "./appwrite"
import {ID} from "appwrite"

export interface User {
    $createdAt: string;
    $id: string
    name: string
    email: string
    emailVerification: boolean
    prefs: Record<string, any>
}


const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USER_META_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_META_COLLECTION_ID!;

export class AuthService {
    // Create account
    async createAccount(email: string, password: string, name: string) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if (userAccount) {
                await databases.createDocument(
                    DATABASE_ID,
                    USER_META_COLLECTION_ID,
                    userAccount.$id,
                    {
                        userId: userAccount.$id,
                        user_name: userAccount.name,
                        user_email: userAccount.email,
                        account_balance: "$0.00",
                        active_vps: "0",
                        vps_plan: "Awaiting Access",
                        time_remaining: "0 months",
                        uptime: "0.1%",
                        cpu_usage: "0.1%",
                        ram_usage: "0.1GB",
                    }

                )
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

