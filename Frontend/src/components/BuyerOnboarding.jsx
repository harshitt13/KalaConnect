"use client"

import { useState } from "react"
import { Palette, ArrowRight, Heart, Search, ShoppingBag, Sparkles, MapPin, Bell } from "lucide-react"

const BuyerOnboarding = ({ userName, onComplete }) => {
  const [preferences, setPreferences] = useState({
    interests: [],
    location: "",
    budget: "",
    notifications: true,
  })

  const interests = [
    "Handmade Jewelry",
    "Home Decor",
    "Art & Paintings",
    "Clothing & Fashion",
    "Pottery & Ceramics",
    "Woodworking",
    "Textiles & Fabrics",
    "Vintage Items",
    "Toys & Games",
    "Bags & Accessories",
  ]

  const budgetRanges = ["Under $25", "$25 - $50", "$50 - $100", "$100 - $250", "$250 - $500", "$500+"]

  const handleInterestToggle = (interest) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleComplete = () => {
    onComplete(preferences)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">KalaConnect AI</h1>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, {userName}!</h2>
          <p className="text-muted-foreground text-lg">Let's personalize your marketplace experience</p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border">
          <div className="space-y-8">
            {/* Interests Section */}
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">What interests you?</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Select categories you'd like to explore (you can change these later)
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded-lg border-2 text-sm text-left transition-all duration-200 ${
                      preferences.interests.includes(interest)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Where are you located?</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                This helps us show you local artisans and estimate shipping costs
              </p>

              <input
                type="text"
                value={preferences.location}
                onChange={(e) => setPreferences((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g., New York, USA or London, UK"
              />
            </div>

            {/* Budget Section */}
            <div>
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Typical budget range</h3>
              </div>
              <p className="text-muted-foreground mb-4">What do you usually spend on handcrafted items?</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setPreferences((prev) => ({ ...prev, budget: range }))}
                    className={`p-3 rounded-lg border-2 text-sm text-center transition-all duration-200 ${
                      preferences.budget === range
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background hover:border-primary/50 text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications Section */}
            <div>
              <div className="flex items-center mb-4">
                <Bell className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Stay updated</h3>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Get notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new products, sales, and artisan stories
                  </p>
                </div>
                <button
                  onClick={() => setPreferences((prev) => ({ ...prev, notifications: !prev.notifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold text-foreground">What's next?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-primary mr-2" />
                  <span className="text-muted-foreground">Discover unique crafts</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-primary mr-2" />
                  <span className="text-muted-foreground">Connect with artisans</span>
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="h-4 w-4 text-primary mr-2" />
                  <span className="text-muted-foreground">Support local creators</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complete Button */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <button
              onClick={handleComplete}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg flex items-center mx-auto"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerOnboarding
