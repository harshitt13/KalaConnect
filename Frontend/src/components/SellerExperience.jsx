import { useState } from "react";
import {
  Plus,
  Package,
  ShoppingBag,
  Store,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  MessageCircle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AddProductModal from "./AddProductModal";

const SellerExperience = ({ sellerName }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Handwoven Silk Scarf",
      price: 89,
      image: "/flowing-silk-scarf.png",
      status: "active",
      views: 245,
      likes: 18,
      stock: 5,
      category: "Textiles & Fabrics",
      sales: 12,
      revenue: 1068,
    },
    {
      id: 2,
      title: "Ceramic Tea Set",
      price: 156,
      image: "/ceramic-tea-set.png",
      status: "active",
      views: 189,
      likes: 24,
      stock: 3,
      category: "Pottery & Ceramics",
      sales: 8,
      revenue: 1248,
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Handwoven Silk Scarf",
      buyerName: "Sarah Johnson",
      buyerEmail: "sarah@email.com",
      status: "pending",
      orderDate: "2024-01-15",
      amount: 89,
      quantity: 1,
      shippingAddress: "123 Main St, New York, NY 10001",
    },
    {
      id: 2,
      productName: "Ceramic Tea Set",
      buyerName: "Michael Chen",
      buyerEmail: "michael@email.com",
      status: "processing",
      orderDate: "2024-01-14",
      amount: 156,
      quantity: 1,
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    },
    {
      id: 3,
      productName: "Handwoven Silk Scarf",
      buyerName: "Emma Wilson",
      buyerEmail: "emma@email.com",
      status: "shipped",
      orderDate: "2024-01-12",
      amount: 89,
      quantity: 2,
      shippingAddress: "789 Pine St, Chicago, IL 60601",
    },
  ]);

  const [storeSettings, setStoreSettings] = useState({
    storeName: "Maya's Handcrafted Treasures",
    description:
      "Authentic handwoven textiles and ceramics from traditional artisans",
    location: "Mumbai, India",
    phone: "+91 98765 43210",
    website: "www.mayascrafts.com",
    categories: ["Textiles & Fabrics", "Pottery & Ceramics"],
  });

  // Analytics data
  const analytics = {
    totalRevenue: 1245,
    totalOrders: 28,
    totalViews: 1834,
    conversionRate: 2.4,
    monthlyGrowth: 15.3,
  };

  const bestSellingData = products
    .sort((a, b) => b.sales - a.sales)
    .map((product) => ({
      name:
        product.title.length > 15
          ? product.title.substring(0, 15) + "..."
          : product.title,
      sales: product.sales,
      revenue: product.revenue,
    }));

  const demandTrendData = [
    { month: "Jan", views: 1200, orders: 15, conversion: 1.25 },
    { month: "Feb", views: 1450, orders: 18, conversion: 1.24 },
    { month: "Mar", views: 1680, orders: 22, conversion: 1.31 },
    { month: "Apr", views: 1834, orders: 28, conversion: 1.53 },
    { month: "May", views: 2100, orders: 35, conversion: 1.67 },
    { month: "Jun", views: 2350, orders: 42, conversion: 1.79 },
  ];

  const categoryData = [
    { name: "Textiles & Fabrics", value: 65, color: "#8B5CF6" },
    { name: "Pottery & Ceramics", value: 35, color: "#06B6D4" },
  ];

  const handleAddProduct = (newProduct) => {
    const product = {
      id: Date.now(),
      ...newProduct,
      status: "active",
      views: 0,
      likes: 0,
      sales: 0,
      revenue: 0,
    };
    setProducts([...products, product]);
    setShowAddModal(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {sellerName}
        </h1>
        <p className="text-muted-foreground">
          Manage your store and grow your artisan business
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "dashboard"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <BarChart3 className="inline h-4 w-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "products"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Package className="inline h-4 w-4 mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <ShoppingBag className="inline h-4 w-4 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "store"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Store className="inline h-4 w-4 mr-2" />
            Store Settings
          </button>
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${analytics.totalRevenue}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                +{analytics.monthlyGrowth}% from last month
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.totalOrders}
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                3 pending orders
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Profile Views</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.totalViews}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                +12% this week
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {analytics.conversionRate}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Above average
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Best Selling Products Chart */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Best Selling Products
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bestSellingData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Bar
                      dataKey="sales"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Demand Trend Chart */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Demand Trends
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                      name="Views"
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#06B6D4"
                      strokeWidth={2}
                      dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Distribution */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Sales by Category
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--foreground))",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {category.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* High Demand Insights */}
            <div className="lg:col-span-2 bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                High Demand Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div>
                    <p className="font-medium text-foreground">
                      Peak Viewing Hours
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2 PM - 6 PM sees 40% more traffic
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Trending Category
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Textiles & Fabrics up 25% this month
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-orange-600" />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Customer Behavior
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Average 3.2 products viewed per session
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recent Orders
              </h3>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {order.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.buyerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        ${order.amount}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Top Products
              </h3>
              <div className="space-y-3">
                {products.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          {product.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.views} views
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-foreground">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Your Products
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </button>
          </div>

          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {product.title}
                      </h3>
                      <p className="text-primary font-medium text-lg">
                        ${product.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {product.category}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {product.views} views
                        </span>
                        <span>Stock: {product.stock}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.status === "active"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Order Management
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {order.productName}
                    </h3>
                    <p className="text-muted-foreground">
                      Order #{order.id} • {order.orderDate}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Customer Details
                    </h4>
                    <p className="text-muted-foreground">{order.buyerName}</p>
                    <p className="text-muted-foreground text-sm">
                      {order.buyerEmail}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Order Details
                    </h4>
                    <p className="text-muted-foreground">
                      Quantity: {order.quantity}
                    </p>
                    <p className="text-muted-foreground">
                      Amount: ${order.amount}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">
                    Shipping Address
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {order.shippingAddress}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleOrderStatusChange(order.id, e.target.value)
                      }
                      className="px-3 py-1 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <button className="flex items-center text-primary hover:text-primary/80 transition-colors">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Buyer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Store Settings Tab */}
      {activeTab === "store" && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Store Settings
          </h2>
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeSettings.storeName}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      storeName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={storeSettings.description}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={storeSettings.location}
                    onChange={(e) =>
                      setStoreSettings((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={storeSettings.phone}
                    onChange={(e) =>
                      setStoreSettings((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={storeSettings.website}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-border">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
};

export default SellerExperience;
