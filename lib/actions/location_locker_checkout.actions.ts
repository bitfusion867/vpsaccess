import {account, databases} from "@/lib/appwrite";
import { ID } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const LOCATION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LOCATION_LOCKER_CHECKOUT_COLLECTION_ID!

export async function createLocationLockerCheckout(plan: string, amount: string, paymentMethod: string) {
    try {
        const user = await account.get();
        await databases.createDocument(
            DATABASE_ID,
            LOCATION_COLLECTION_ID,
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
                console.log(result);
                return result
            }).catch(error => {
                console.log("Failed to create location locker checkout data: ", error);
                throw error
            })
    } catch (e) {
        console.error("Failed to create location checker checkout data:", e);

        throw e;
    }

}


export async function getLocationLockerCheckout() {
    try {
        const user = await account.get();
        await databases.getDocument(
            DATABASE_ID,
            LOCATION_COLLECTION_ID,
            user.$id
        ).then(result => {
            console.log("Location locker checkout data: ", result);
            return result
        }).catch(error => {
            console.log("Failed o get location locker checkout data", error);
            throw error
        })

    } catch (error) {
        console.error("Failed to fetch location locker checkout data:", error);
        throw error;
    }
}

export async function ListLocationLockerCheckouts() {
    try {
        const results = await databases.listDocuments(
            DATABASE_ID,
            LOCATION_COLLECTION_ID,
        );
        return results;
    } catch (error) {
        console.log("Failed to fetch locker checkouts:", error);
        throw error;
    }
}

export async function DeleteLocationLockerCheckout(docId: string) {
    try {
        const result = await databases.deleteDocument(
            DATABASE_ID,
            LOCATION_COLLECTION_ID,
            docId
        );
        return result;
    } catch (error) {
        console.error("Failed to delete locker checkout:", error);
        throw error;
    }
}
