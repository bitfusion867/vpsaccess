"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import {
    ListUsersMetaActions,
} from "@/lib/actions/user_meta.actions";
import {
    ListVPSCheckouts,
    DeleteVPSCheckout,
} from "@/lib/actions/vps_checkout.actions";
import {
    ListLocationLockerCheckouts,
    DeleteLocationLockerCheckout,
} from "@/lib/actions/location_locker_checkout.actions";
import { updateUserMetaAction } from "@/lib/actions/user_meta.actions"; // 👈 import added
import { sendEmail } from "@/lib/utils/email";
import Swal from "sweetalert2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AdminController = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [usersMeta, setUsersMeta] = useState<any[]>([]);
    const [vpsCheckouts, setVPSCheckouts] = useState<any[]>([]);
    const [lockerCheckouts, setLockerCheckouts] = useState<any[]>([]);
    const [editingUser, setEditingUser] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        if (!loading && user?.email === "kenthomson999@gmail.com") {
            fetchData();
        }
    }, [loading, user]);

    const fetchData = async () => {
        try {
            const usersMetaRes = await ListUsersMetaActions();
            const vpsRes = await ListVPSCheckouts();
            const lockerRes = await ListLocationLockerCheckouts();

            setUsersMeta(usersMetaRes?.documents || []);
            setVPSCheckouts(vpsRes?.documents || []);
            setLockerCheckouts(lockerRes?.documents || []);
        } catch (error) {
            console.error("Admin fetch error:", error);
        }
    };

    // SweetAlert confirmation
    const confirmAction = async (title: string, text: string) => {
        return Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7C3AED",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, continue",
        });
    };

    // Emailing
    const handleSendEmail = async (
        email: string,
        name: string,
        type: "welcome" | "purchase",
        product?: string
    ) => {
        const result = await confirmAction(
            `Send ${type} email?`,
            `This will send a ${type} email to ${email}`
        );

        if (result.isConfirmed) {
            const res = await sendEmail({ to: email, name, type, product });
            if (res.success) {
                Swal.fire("Sent!", `Email sent to ${email}`, "success");
            } else {
                Swal.fire("Error", "Could not send email.", "error");
            }
        }
    };

    // Delete handlers
    const handleDeleteVPS = async (id: string) => {
        const result = await confirmAction(
            "Delete VPS Checkout?",
            "This action cannot be undone."
        );
        if (result.isConfirmed) {
            await DeleteVPSCheckout(id);
            fetchData();
            Swal.fire("Deleted!", "VPS checkout deleted.", "success");
        }
    };

    const handleDeleteLocker = async (id: string) => {
        const result = await confirmAction(
            "Delete Location Locker?",
            "This action cannot be undone."
        );
        if (result.isConfirmed) {
            await DeleteLocationLockerCheckout(id);
            fetchData();
            Swal.fire("Deleted!", "Location Locker checkout deleted.", "success");
        }
    };

    // User meta editing
    const handleEditChange = (id: string, field: string, value: string) => {
        setEditingUser((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    const saveUserMeta = async (id: string) => {
        const result = await confirmAction(
            "Update User Meta?",
            "This will update the user's metadata."
        );

        if (result.isConfirmed) {
            const updates = editingUser[id] || {};
            const res = await updateUserMetaAction({ documentId: id, updates });

            if (res.success) {
                Swal.fire("Updated!", "User meta updated successfully.", "success");
                fetchData(); // refresh data
            } else {
                Swal.fire("Error", "Failed to update user meta.", "error");
            }
        }
    };

    if (loading) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading admin controller...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        router.push("/signin");
        return null;
    }

    if (user?.email !== "kenthomson999@gmail.com") {
        return <div>Unauthorized: {user?.name}</div>;
    }

    return (
        <div className="bg-background min-h-screen p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-4 text-purple-600">
                Admin Dashboard
            </h1>

            <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid grid-cols-3 w-full border-b mb-4">
                    <TabsTrigger value="users" className="border-r">
                        User Meta
                    </TabsTrigger>
                    <TabsTrigger value="vps" className="border-r">
                        VPS Checkouts
                    </TabsTrigger>
                    <TabsTrigger value="locker">Location Locker</TabsTrigger>
                </TabsList>

                {/* Users Meta */}
                <TabsContent value="users">
                    <div className="overflow-x-auto text-xs">
                        <table className="min-w-full table-auto border">
                            <thead>
                            <tr className="bg-purple-100 dark:bg-purple-900 text-left">
                                {/*<th className="p-2 min-w-[120px]">User ID</th>*/}
                                <th className="p-2 min-w-[120px]">Name</th>
                                <th className="p-2 min-w-[160px]">Email</th>
                                <th className="p-2 min-w-[120px]">Balance</th>
                                <th className="p-2 min-w-[120px]">Active VPS</th>
                                <th className="p-2 min-w-[120px]">Plan</th>
                                <th className="p-2 min-w-[140px]">Time</th>
                                <th className="p-2 min-w-[120px]">Uptime</th>
                                <th className="p-2 min-w-[120px]">CPU</th>
                                <th className="p-2 min-w-[120px]">RAM</th>
                                <th className="p-2 min-w-[160px]">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersMeta.map((u) => (
                                <tr key={u.$id} className="border-t">
                                    {/*<td className="p-2">{u.userId}</td>*/}
                                    <td className="p-2">{u.user_name}</td>
                                    <td className="p-2">{u.user_email}</td>
                                    {[
                                        "account_balance",
                                        "active_vps",
                                        "vps_plan",
                                        "time_remaining",
                                        "uptime",
                                        "cpu_usage",
                                        "ram_usage",
                                    ].map((field) => (
                                        <td className="p-2 min-w-[120px]" key={field}>
                                            <Input
                                                className="w-full px-2 py-1 border rounded text-xs"
                                                defaultValue={u[field]}
                                                onChange={(e) =>
                                                    handleEditChange(u.$id, field, e.target.value)
                                                }
                                            />
                                        </td>
                                    ))}
                                    <td className="p-2 min-w-[160px] flex flex-col sm:flex-row gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => saveUserMeta(u.$id)}
                                            className="bg-purple-600 text-white hover:bg-purple-500"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleSendEmail(
                                                    u.user_email,
                                                    u.user_name,
                                                    "welcome"
                                                )
                                            }
                                        >
                                            Send Email
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                {/* VPS Checkouts */}
                <TabsContent value="vps">
                    <div className="overflow-x-auto text-xs">
                        <table className="min-w-full table-auto border">
                            <thead>
                            <tr className="bg-purple-100 dark:bg-purple-900 text-left">
                                {/*<th className="p-2 min-w-[120px]">User ID</th>*/}
                                <th className="p-2 min-w-[160px]">Email</th>
                                <th className="p-2 min-w-[120px]">Name</th>
                                <th className="p-2 min-w-[120px]">Plan</th>
                                <th className="p-2 min-w-[120px]">Amount</th>
                                <th className="p-2 min-w-[140px]">Payment</th>
                                <th className="p-2 min-w-[160px]">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {vpsCheckouts.map((v) => (
                                <tr key={v.$id} className="border-t">
                                    {/*<td className="p-2">{v.userId}</td>*/}
                                    <td className="p-2">{v.user_email}</td>
                                    <td className="p-2">{v.user_name}</td>
                                    <td className="p-2">{v.plan}</td>
                                    <td className="p-2">{v.amount}</td>
                                    <td className="p-2">{v.paymentMethod}</td>
                                    <td className="p-2 min-w-[160px] flex flex-col sm:flex-row gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                handleSendEmail(
                                                    v.user_email,
                                                    v.userId,
                                                    "purchase",
                                                    v.plan
                                                )
                                            }
                                        >
                                            Send Email
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDeleteVPS(v.$id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                {/* Location Locker */}
                <TabsContent value="locker">
                    <div className="overflow-x-auto text-xs">
                        <table className="min-w-full table-auto border">
                            <thead>
                            <tr className="bg-purple-100 dark:bg-purple-900 text-left">
                                {/*<th className="p-2 min-w-[120px]">User ID</th>*/}
                                <th className="p-2 min-w-[160px]">Email</th>
                                <th className="p-2 min-w-[120px]">Name</th>
                                <th className="p-2 min-w-[120px]">Plan</th>
                                <th className="p-2 min-w-[120px]">Amount</th>
                                <th className="p-2 min-w-[140px]">Payment</th>
                                <th className="p-2 min-w-[160px]">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {lockerCheckouts.map((l) => (
                                <tr key={l.$id} className="border-t">
                                    {/*<td className="p-2">{l.userId}</td>*/}
                                    <td className="p-2">{l.user_email}</td>
                                    <td className="p-2">{l.user_name}</td>
                                    <td className="p-2">{l.plan}</td>
                                    <td className="p-2">{l.amount}</td>
                                    <td className="p-2">{l.paymentMethod}</td>
                                    <td className="p-2 min-w-[160px] flex flex-col sm:flex-row gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                handleSendEmail(
                                                    l.user_email,
                                                    l.userId,
                                                    "purchase",
                                                    l.plan
                                                )
                                            }
                                        >
                                            Send Email
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDeleteLocker(l.$id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
