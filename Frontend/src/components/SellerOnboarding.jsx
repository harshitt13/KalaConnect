

import { useState } from "react"
import { Palette, ArrowRight, ArrowLeft, Store, MapPin, Globe, Camera, Sparkles } from "lucide-react"

const SellerOnboarding = ({ userName, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [storeData, setStoreData] = useState({
    storeName: "",
    description: "",
    location: "",
    phone: "",
    website: "",
    categories: [],
    profileImage: null,
  })

  const categories = [
    "Jewelry & Accessories",
    "Home & Living",
    "Art & Collectibles",
    "Clothing & Shoes",
    "Toys & Games",
    "Craft Supplies",
    "Vintage Items",
    "Bags & Purses",
  ]

  const handleCategoryToggle = (category) => {
    setStoreData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(storeData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return storeData.storeName.trim() && storeData.description.trim()
      case 2:
        return storeData.location.trim()
      case 3:
        return storeData.categories.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">KalaConnect AI</h1>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Set Up Your Store</h2>
          <p className="text-muted-foreground">Step {currentStep} of 3 - Let's create your artisan profile</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border">
          {/* Step 1: Store Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Store className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Store Information</h3>
                <p className="text-muted-foreground">Tell us about your craft business</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Store Name *</label>
                <input
                  type="text"
                  value={storeData.storeName}
                  onChange={(e) => setStoreData((prev) => ({ ...prev, storeName: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Maya's Handwoven Textiles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Store Description *</label>
                <textarea
                  value={storeData.description}
                  onChange={(e) => setStoreData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Describe your craft, your story, and what makes your work unique..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Website (Optional)</label>
                <input
                  type="url"
                  value={storeData.website}
                  onChange={(e) => setStoreData((prev) => ({ ...prev, website: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://your-website.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Location & Contact</h3>
                <p className="text-muted-foreground">Help customers find and contact you</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                <input
                  type="text"
                  value={storeData.location}
                  onChange={(e) => setStoreData((prev) => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="e.g., Mumbai, India or New York, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={storeData.phone}
                  onChange={(e) => setStoreData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Global Reach</h4>
                    <p className="text-sm text-muted-foreground">
                      Your location helps customers understand shipping times and costs. You can sell to customers
                      worldwide!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Product Categories</h3>
                <p className="text-muted-foreground">Select the categories that best describe your crafts</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      storeData.categories.includes(category)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background hover:border-primary/50 text-foreground"
                    }`}
                  >
                    <div className="font-medium text-sm">{category}</div>
                  </button>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start">
                  <Camera className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Ready to Start Selling?</h4>
                    <p className="text-sm text-muted-foreground">
                      After setup, you'll be able to add products with our AI-powered description generator to help
                      showcase your crafts beautifully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {currentStep === 3 ? "Complete Setup" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerOnboarding
