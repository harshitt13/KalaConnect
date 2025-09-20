import { useState } from "react";
import MarketplaceView from "./MarketplaceView";
import ProductDetailView from "./ProductDetailView";
import WishlistView from "./WishlistView";
import BuyerOrdersView from "./BuyerOrdersView";
import { Heart, Search, Package } from "lucide-react";

const BuyerExperience = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeView, setActiveView] = useState("marketplace"); // marketplace, wishlist, orders, profile
  const [wishlist, setWishlist] = useState([]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToMarketplace = () => {
    setSelectedProduct(null);
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  if (selectedProduct) {
    return (
      <ProductDetailView
        product={selectedProduct}
        onBack={handleBackToMarketplace}
        onAddToWishlist={handleAddToWishlist}
        isInWishlist={isInWishlist(selectedProduct.id)}
      />
    );
  }

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="border-b border-border mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView("marketplace")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeView === "marketplace"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Search className="inline h-4 w-4 mr-2" />
            Marketplace
          </button>
          <button
            onClick={() => setActiveView("wishlist")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeView === "wishlist"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Heart className="inline h-4 w-4 mr-2" />
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveView("orders")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeView === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Package className="inline h-4 w-4 mr-2" />
            My Orders
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeView === "marketplace" && (
        <MarketplaceView
          onProductSelect={handleProductSelect}
          onAddToWishlist={handleAddToWishlist}
          isInWishlist={isInWishlist}
        />
      )}

      {activeView === "wishlist" && (
        <WishlistView
          wishlist={wishlist}
          onProductSelect={handleProductSelect}
          onRemoveFromWishlist={handleRemoveFromWishlist}
        />
      )}

      {activeView === "orders" && (
        <BuyerOrdersView onBack={() => setActiveView("marketplace")} />
      )}
    </div>
  );
};

export default BuyerExperience;
