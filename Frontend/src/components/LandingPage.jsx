"use client"

import { useState } from "react"
import { Palette, Search, Star, ArrowRight, Users, ShoppingBag, Sparkles } from "lucide-react"

const LandingPage = ({ onGetStarted }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredArtisans = [
    {
      id: 1,
      name: "Maya Patel",
      craft: "Handwoven Textiles",
      image: "/indian-woman-artisan-weaving-colorful-textiles.jpg",
      rating: 4.9,
      products: 24,
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      craft: "Ceramic Pottery",
      image: "/hispanic-man-potter-working-with-clay.jpg",
      rating: 4.8,
      products: 18,
    },
    {
      id: 3,
      name: "Aisha Johnson",
      craft: "Jewelry Design",
      image: "/african-american-woman-jewelry-designer.jpg",
      rating: 5.0,
      products: 32,
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      title: "Handcrafted Wooden Bowl Set",
      price: "$89",
      image: "/beautiful-handcrafted-wooden-bowls.jpg",
      artisan: "David Chen",
    },
    {
      id: 2,
      title: "Embroidered Silk Scarf",
      price: "$65",
      image: "/elegant-embroidered-silk-scarf.jpg",
      artisan: "Elena Vasquez",
    },
    {
      id: 3,
      title: "Hand-blown Glass Vase",
      price: "$120",
      image: "/artistic-hand-blown-glass-vase.jpg",
      artisan: "Michael Thompson",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">KalaConnect AI</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                Marketplace
              </a>
              <a href="#artisans" className="text-muted-foreground hover:text-foreground transition-colors">
                Artisans
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>

            <button
              onClick={onGetStarted}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Empowering Local Artisans, Connecting You to
              <span className="text-primary"> Unique Creations</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Discover handcrafted treasures from talented artisans worldwide. Every purchase supports creativity and
              craftsmanship.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for unique crafts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={onGetStarted}
                className="bg-card text-foreground border border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Join as Artisan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-muted-foreground">Talented Artisans</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">2,000+</h3>
              <p className="text-muted-foreground">Unique Products</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">10,000+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section id="artisans" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Artisans</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the talented creators behind our unique marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtisans.map((artisan) => (
              <div
                key={artisan.id}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="text-center">
                  <img
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{artisan.name}</h3>
                  <p className="text-primary font-medium mb-3">{artisan.craft}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      {artisan.rating}
                    </div>
                    <div>{artisan.products} products</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="marketplace" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Marketplace Highlights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover handcrafted treasures that tell a story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">by {product.artisan}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of artisans and buyers in our thriving marketplace community
          </p>
          <button
            onClick={onGetStarted}
            className="bg-background text-foreground px-8 py-4 rounded-lg hover:bg-background/90 transition-colors font-semibold text-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-6 w-6" />
                <h3 className="text-lg font-bold">KalaConnect AI</h3>
              </div>
              <p className="text-background/70">Connecting artisans with the world, one creation at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Browse Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Featured
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Artisans</h4>
              <ul className="space-y-2 text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Sell Your Crafts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    AI Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 KalaConnect AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
