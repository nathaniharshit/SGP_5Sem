"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Calendar, DollarSign } from "lucide-react"

interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  date: string
  estimatedDelivery: string
}

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = localStorage.getItem("smartcart_orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500">When you place orders, they'll appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(order.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  <div className="flex items-center mt-2 text-lg font-semibold text-blue-600">
                    <DollarSign className="h-4 w-4" />
                    {order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {order.status === "Processing" && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Estimated delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
