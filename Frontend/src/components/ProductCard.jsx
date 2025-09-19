"use client"

import { Heart, Star, MapPin, Eye } from "lucide-react"

const ProductCard = ({ product, onProductSelect, onAddToWishlist, isInWishlist, viewMode = "grid" }) => {
  const handleCardClick = () => {
    onProductSelect(product)
  }

  const handleWishlistClick = (e) => {
    e.stopPropagation()
    onAddToWishlist(product)
  }

  if (viewMode === "list") {
    return (
      <div
        onClick={handleCardClick}
        className="bg-card rounded-lg p-4 border border-border cursor-pointer hover:shadow-md transition-all duration-200 flex items-center space-x-4"
      >
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg truncate">{product.title}</h3>
              <p className="text-muted-foreground text-sm">by {product.artisan}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {product.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                  {product.rating} ({product.reviews})
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{product.story}</p>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <div className="text-right">
                {product.isOnSale && product.originalPrice && (
                  <p className="text-muted-foreground text-sm line-through">${product.originalPrice}</p>
                )}
                <p className="text-primary font-bold text-xl">${product.price}</p>
                {product.isOnSale && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Sale</span>
                )}
              </div>
              <button
                onClick={handleWishlistClick}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist
                    ? "bg-red-100 text-red-600"
                    : "bg-muted text-muted-foreground hover:bg-red-100 hover:text-red-600"
                }`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-card rounded-lg overflow-hidden border border-border cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isInWishlist
              ? "bg-red-100 text-red-600"
              : "bg-white/80 text-muted-foreground hover:bg-red-100 hover:text-red-600"
          }`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Sale Badge */}
        {product.isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Sale
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg line-clamp-1">{product.title}</h3>
          <p className="text-muted-foreground text-sm">by {product.artisan}</p>
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {product.location}
          </div>
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
            {product.rating} ({product.reviews})
          </div>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2">{product.story}</p>

        <div className="flex items-center justify-between">
          <div>
            {product.isOnSale && product.originalPrice && (
              <p className="text-muted-foreground text-sm line-through">${product.originalPrice}</p>
            )}
            <p className="text-primary font-bold text-xl">${product.price}</p>
          </div>

          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>Popular</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
