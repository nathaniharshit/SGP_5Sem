"use client"

import { useAuth } from "@/components/auth-provider"
import { CustomerDashboard } from "@/components/customer-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AuthForm } from "@/components/auth-form"
import { CartProvider } from "@/components/cart-provider"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return <CartProvider>{user.role === "admin" ? <AdminDashboard /> : <CustomerDashboard />}</CartProvider>
}
