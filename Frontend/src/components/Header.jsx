

import { useState } from "react"
import { Palette, LogOut, ShoppingBag, Bell, User, Menu, X } from "lucide-react"

const Header = ({ userName, userRole, onLogout, cartCount = 0, notificationCount = 0 }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, message: "Your order has been shipped!", time: "2 hours ago", type: "order" },
    { id: 2, message: "New message from artisan Maya Patel", time: "1 day ago", type: "message" },
    { id: 3, message: "Price drop on items in your wishlist", time: "2 days ago", type: "wishlist" },
  ]

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Palette className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-bold text-foreground">KalaConnect AI</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {userRole === "buyer" && (
              <>
                <a href="#marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace
                </a>
                <a href="#artisans" className="text-muted-foreground hover:text-foreground transition-colors">
                  Artisans
                </a>
                <a href="#orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Orders
                </a>
              </>
            )}
            {userRole === "seller" && (
              <>
                <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </a>
                <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </a>
                <a href="#orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  Orders
                </a>
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart (Buyers only) */}
            {userRole === "buyer" && (
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-border hover:bg-muted/50 cursor-pointer"
                      >
                        <p className="text-sm text-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="text-sm text-primary hover:text-primary/80 w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Welcome, {userName}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <nav className="space-y-2">
              {userRole === "buyer" && (
                <>
                  <a href="#marketplace" className="block py-2 text-muted-foreground hover:text-foreground">
                    Marketplace
                  </a>
                  <a href="#artisans" className="block py-2 text-muted-foreground hover:text-foreground">
                    Artisans
                  </a>
                  <a href="#orders" className="block py-2 text-muted-foreground hover:text-foreground">
                    My Orders
                  </a>
                </>
              )}
              {userRole === "seller" && (
                <>
                  <a href="#dashboard" className="block py-2 text-muted-foreground hover:text-foreground">
                    Dashboard
                  </a>
                  <a href="#products" className="block py-2 text-muted-foreground hover:text-foreground">
                    Products
                  </a>
                  <a href="#orders" className="block py-2 text-muted-foreground hover:text-foreground">
                    Orders
                  </a>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
