"use client"

import { useState } from "react"
import { Palette, ShoppingBag, Store, ArrowRight, Users, Sparkles, TrendingUp } from "lucide-react"

const RoleSelection = ({ userName, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState("")

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Palette className="h-10 w-10 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">KalaConnect AI</h1>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Welcome, {userName}!</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to get started with our AI-powered marketplace for local artisans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Buyer Option */}
          <div
            onClick={() => setSelectedRole("buyer")}
            className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
              selectedRole === "buyer"
                ? "border-primary bg-primary/5 shadow-lg scale-105"
                : "border-border bg-card hover:border-primary/50 hover:shadow-md"
            }`}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">I'm a Buyer</h3>
              <p className="text-muted-foreground mb-6">
                Discover unique handcrafted items from talented local artisans around the world
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Browse thousands of unique products
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Connect directly with artisans
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  Support local craftsmanship
                </div>
              </div>
            </div>
          </div>

          {/* Seller Option */}
          <div
            onClick={() => setSelectedRole("seller")}
            className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
              selectedRole === "seller"
                ? "border-primary bg-primary/5 shadow-lg scale-105"
                : "border-border bg-card hover:border-primary/50 hover:shadow-md"
            }`}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">I'm a Seller</h3>
              <p className="text-muted-foreground mb-6">
                Showcase your crafts to the world with AI-powered tools to grow your business
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  AI-powered product descriptions
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Store className="h-4 w-4 mr-2 text-primary" />
                  Create your online store
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                  Reach global customers
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
