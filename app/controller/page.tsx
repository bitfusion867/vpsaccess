import { AdminController } from "@/components/controller-content"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <AdminController />
        </ProtectedRoute>
    )
}
