"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Grid, List } from "lucide-react"
import ProductCard from "./ProductCard"

const MarketplaceView = ({ onProductSelect, onAddToWishlist, isInWishlist }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Enhanced product data with more details
  const products = [
    {
      id: 1,
      title: "Handwoven Silk Scarf",
      artisan: "Maya Patel",
      price: 89,
      originalPrice: 120,
      image: "/elegant-embroidered-silk-scarf.jpg",
      category: "Textiles & Fabrics",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 24,
      isOnSale: true,
      tags: ["handwoven", "silk", "traditional", "sustainable"],
      story: "Crafted using traditional techniques passed down through generations...",
      description:
        "This exquisite silk scarf is handwoven using premium mulberry silk threads. Each piece takes approximately 3 days to complete, featuring intricate patterns inspired by ancient Indian motifs.",
      fullStory:
        "Maya learned the art of silk weaving from her grandmother in a small village in Karnataka, India. This particular scarf represents over 200 years of family tradition.",
    },
    {
      id: 2,
      title: "Ceramic Tea Set",
      artisan: "Chen Wei",
      price: 156,
      image: "/artistic-hand-blown-glass-vase.jpg",
      category: "Pottery & Ceramics",
      location: "Jingdezhen, China",
      rating: 4.8,
      reviews: 18,
      isOnSale: false,
      tags: ["ceramic", "tea", "handmade", "traditional"],
      story: "Hand-thrown pottery inspired by Song Dynasty aesthetics...",
      description:
        "This elegant tea set includes a teapot and four cups, each piece individually thrown on the potter's wheel.",
      fullStory:
        "Chen Wei studied traditional Chinese pottery techniques in Jingdezhen, the porcelain capital of China.",
    },
    {
      id: 3,
      title: "Wooden Jewelry Box",
      artisan: "Sarah Thompson",
      price: 124,
      image: "/beautiful-handcrafted-wooden-bowls.jpg",
      category: "Woodworking",
      location: "Portland, USA",
      rating: 5.0,
      reviews: 12,
      isOnSale: false,
      tags: ["wood", "jewelry", "carved", "sustainable"],
      story: "Carved from sustainable walnut wood with intricate floral patterns...",
      description:
        "This beautiful jewelry box features hand-carved floral patterns and is made from sustainable walnut wood.",
      fullStory: "Sarah Thompson carves each jewelry box by hand from sustainable walnut wood.",
    },
    {
      id: 4,
      title: "Silver Pendant Necklace",
      artisan: "Aisha Johnson",
      price: 78,
      image: "/african-american-woman-jewelry-designer.jpg",
      category: "Jewelry & Accessories",
      location: "Santa Fe, USA",
      rating: 4.7,
      reviews: 31,
      isOnSale: false,
      tags: ["silver", "pendant", "handcrafted", "modern"],
      story: "Contemporary design meets traditional silversmithing techniques...",
      description: "This stunning silver pendant features a unique geometric design that catches light beautifully.",
      fullStory: "Aisha combines modern design aesthetics with traditional Native American silversmithing techniques.",
    },
    {
      id: 5,
      title: "Woven Basket Set",
      artisan: "Carlos Rodriguez",
      price: 95,
      originalPrice: 130,
      image: "/hispanic-man-potter-working-with-clay.jpg",
      category: "Home & Living",
      location: "Oaxaca, Mexico",
      rating: 4.6,
      reviews: 15,
      isOnSale: true,
      tags: ["woven", "basket", "natural", "storage"],
      story: "Traditional Zapotec weaving techniques using local palm fibers...",
      description: "Set of three handwoven baskets perfect for storage and home decoration.",
      fullStory: "Carlos learned traditional Zapotec weaving from his grandfather in the mountains of Oaxaca.",
    },
    {
      id: 6,
      title: "Hand-painted Ceramic Vase",
      artisan: "Elena Vasquez",
      price: 142,
      image: "/indian-woman-artisan-weaving-colorful-textiles.jpg",
      category: "Pottery & Ceramics",
      location: "Talavera, Mexico",
      rating: 4.9,
      reviews: 22,
      isOnSale: false,
      tags: ["ceramic", "painted", "colorful", "decorative"],
      story: "Traditional Talavera pottery with vibrant hand-painted designs...",
      description: "This beautiful ceramic vase features traditional Talavera patterns in vibrant blues and yellows.",
      fullStory:
        "Elena is a master of Talavera pottery, a tradition that dates back to the 16th century in Puebla, Mexico.",
    },
  ]

  const categories = [
    "all",
    "Textiles & Fabrics",
    "Pottery & Ceramics",
    "Jewelry & Accessories",
    "Woodworking",
    "Home & Living",
  ]

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "Under $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200+", label: "$200+" },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      // Price filter
      const matchesPrice = (() => {
        if (priceRange === "all") return true
        if (priceRange === "0-50") return product.price < 50
        if (priceRange === "50-100") return product.price >= 50 && product.price < 100
        if (priceRange === "100-200") return product.price >= 100 && product.price < 200
        if (priceRange === "200+") return product.price >= 200
        return true
      })()

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  return (
    <div>
      {/* Search and Filters Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, artisans, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>

            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </span>
          {(searchQuery || selectedCategory !== "all" || priceRange !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setPriceRange("all")
                setSortBy("featured")
              }}
              className="text-primary hover:text-primary/80"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductSelect={onProductSelect}
            onAddToWishlist={onAddToWishlist}
            isInWishlist={isInWishlist(product.id)}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketplaceView
