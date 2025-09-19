"use client"

import { Heart, ShoppingBag, Trash2 } from "lucide-react"

const WishlistView = ({ wishlist, onProductSelect, onRemoveFromWishlist }) => {
  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-6">
          Start exploring our marketplace to find unique handcrafted items you love
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">My Wishlist</h2>
        <p className="text-muted-foreground">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg overflow-hidden border border-border group hover:shadow-md transition-all duration-200"
          >
            <div
              className="relative aspect-square overflow-hidden cursor-pointer"
              onClick={() => onProductSelect(product)}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {product.isOnSale && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Sale
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-foreground text-lg line-clamp-1">{product.title}</h3>
                <p className="text-muted-foreground text-sm">by {product.artisan}</p>
              </div>

              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.story}</p>

              <div className="flex items-center justify-between">
                <div>
                  {product.isOnSale && product.originalPrice && (
                    <p className="text-muted-foreground text-sm line-through">${product.originalPrice}</p>
                  )}
                  <p className="text-primary font-bold text-xl">${product.price}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onProductSelect(product)}
                    className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition-colors"
                    title="View Details"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="bg-muted text-muted-foreground p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistView
