"use client";

import {account, databases} from "@/lib/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USER_META_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_META_COLLECTION_ID!;

export async function getUserMetaActions() {
    try {
        const user = await account.get();

        const data = await databases.getDocument(
            DATABASE_ID,
            USER_META_COLLECTION_ID,
            user.$id
        );

        console.log("User Meta:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch user meta:", error);
        throw error;
    }
}

export async function ListUsersMetaActions() {
    try {
        const results = await databases.listDocuments(
            DATABASE_ID,
            USER_META_COLLECTION_ID,
        );
        return results;
    } catch (error) {
        console.log("Failed to fetch users meta:", error);
        throw error;
    }
}


export async function updateUserMetaAction({
                                               documentId,
                                               updates,
                                           }: {
    documentId: string;
    updates: Record<string, any>;
}) {
    try {
        const res = await databases.updateDocument(
            DATABASE_ID!,
            USER_META_COLLECTION_ID!,
            documentId,
            updates
        );
        return {success: true, res};
    } catch (error) {
        console.error("Update User Meta Error:", error);
        return {success: false, error};
    }
}