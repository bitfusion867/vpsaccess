import {account, databases} from "@/lib/appwrite";
import { ID } from "appwrite";
import {error} from "next/dist/build/output/log";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const VPS_CHECKOUT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_VPS_CHECKOUT_COLLECTION_ID!


export async function createVPSCheckout(plan: string, amount: string, paymentMethod: string) {
    try {
        const user = await account.get()
        await databases.createDocument(
            DATABASE_ID,
            VPS_CHECKOUT_COLLECTION_ID,
           ID.unique(),
            {
                plan,
                amount,
                paymentMethod,
                userId: user.$id,
                user_name: user.name,
                user_email: user.email
            }
        )
            .then(result => {
                console.log("Successfully create vps checkout data: ", result)
                return result
            }).catch(error => {
                console.log("Failed to create vps checkout data: ", error)
                throw error
            })
    } catch (e) {
        console.error("Failed to create vps checkout data:", e)
        throw e
    }

}


export async function getVPSCheckout() {
    try {
        const user = await account.get();

        await databases.getDocument(
            DATABASE_ID,
            VPS_CHECKOUT_COLLECTION_ID,
            user.$id
        ).then(result => {
            console.log("Successfully fetched vps checkout data: ", result)
            return result
        }).catch(error => {
            console.log("Failed to get vps checkout data: ", error)
            throw error
        })
    } catch (error) {
        console.error("Failed to fetch vps checkout data:", error)
        throw error
    }
}



export async function ListVPSCheckouts() {
    try {
        const results = await databases.listDocuments(
            DATABASE_ID,
            VPS_CHECKOUT_COLLECTION_ID,
        );
        return results;
    } catch (error) {
        console.log("Failed to fetch vps checkouts:", error);
        throw error;
    }
}

export async function DeleteVPSCheckout(docId: string) {
    try {
        const result = await databases.deleteDocument(
            DATABASE_ID,
            VPS_CHECKOUT_COLLECTION_ID,
            docId
        );
        return result;
    } catch (error) {
        console.error("Failed to delete vps checkout:", error);
        throw error;
    }
}
