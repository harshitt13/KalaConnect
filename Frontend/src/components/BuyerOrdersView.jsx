"use client"

import { useState } from "react"
import { Package, Truck, CheckCircle, Clock, MessageCircle, Star, ArrowLeft } from "lucide-react"

const BuyerOrdersView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("all")

  const orders = [
    {
      id: "ORD-001",
      productName: "Handwoven Silk Scarf",
      artisan: "Maya Patel",
      image: "/elegant-embroidered-silk-scarf.jpg",
      price: 89,
      quantity: 1,
      status: "delivered",
      orderDate: "2024-01-10",
      deliveryDate: "2024-01-18",
      trackingNumber: "TRK123456789",
      shippingAddress: "123 Main St, New York, NY 10001",
    },
    {
      id: "ORD-002",
      productName: "Ceramic Tea Set",
      artisan: "Chen Wei",
      image: "/artistic-hand-blown-glass-vase.jpg",
      price: 156,
      quantity: 1,
      status: "shipped",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-22",
      trackingNumber: "TRK987654321",
      shippingAddress: "123 Main St, New York, NY 10001",
    },
    {
      id: "ORD-003",
      productName: "Wooden Jewelry Box",
      artisan: "Sarah Thompson",
      image: "/beautiful-handcrafted-wooden-bowls.jpg",
      price: 124,
      quantity: 1,
      status: "processing",
      orderDate: "2024-01-20",
      estimatedDelivery: "2024-01-28",
      shippingAddress: "123 Main St, New York, NY 10001",
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-orange-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
      </div>

      {/* Order Status Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "all", label: "All Orders", count: orders.length },
            { key: "processing", label: "Processing", count: orders.filter((o) => o.status === "processing").length },
            { key: "shipped", label: "Shipped", count: orders.filter((o) => o.status === "shipped").length },
            { key: "delivered", label: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="font-semibold text-foreground">Order {order.id}</h3>
                  <p className="text-sm text-muted-foreground">Placed on {order.orderDate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <img
                src={order.image || "/placeholder.svg"}
                alt={order.productName}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{order.productName}</h4>
                <p className="text-sm text-muted-foreground">by {order.artisan}</p>
                <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">${order.price}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">Shipping Address:</p>
                <p className="text-foreground">{order.shippingAddress}</p>
              </div>
              <div>
                {order.trackingNumber && (
                  <>
                    <p className="text-muted-foreground">Tracking Number:</p>
                    <p className="text-foreground font-mono">{order.trackingNumber}</p>
                  </>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            {order.status === "delivered" && order.deliveryDate && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                <p className="text-orange-800 text-sm">
                  <CheckCircle className="inline h-4 w-4 mr-1" />
                  Delivered on {order.deliveryDate}
                </p>
              </div>
            )}

            {order.status === "shipped" && order.estimatedDelivery && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-blue-800 text-sm">
                  <Truck className="inline h-4 w-4 mr-1" />
                  Estimated delivery: {order.estimatedDelivery}
                </p>
              </div>
            )}

            {order.status === "processing" && order.estimatedDelivery && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Processing - Estimated delivery: {order.estimatedDelivery}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <button className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Contact Artisan
                </button>
                {order.trackingNumber && (
                  <button className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm">
                    <Package className="h-4 w-4 mr-1" />
                    Track Package
                  </button>
                )}
              </div>

              {order.status === "delivered" && (
                <button className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                  <Star className="h-4 w-4 mr-1" />
                  Leave Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6">
            {activeTab === "all" ? "You haven't placed any orders yet" : `No ${activeTab} orders`}
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default BuyerOrdersView
