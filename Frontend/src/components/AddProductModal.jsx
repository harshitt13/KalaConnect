

import { useState } from "react"
import { X, Wand2, Loader2 } from "lucide-react"

const AddProductModal = ({ onClose, onAddProduct }) => {
  const [craftName, setCraftName] = useState("")
  const [keyMaterials, setKeyMaterials] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [productTitle, setProductTitle] = useState("")
  const [productStory, setProductStory] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState(null)

  const generateAIContent = async () => {
    if (!craftName.trim() || !keyMaterials.trim()) {
      alert("Please fill in both Craft Name and Key Materials before generating content.")
      return
    }

    setIsGenerating(true)

    // Simulate AI generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Generate realistic content based on inputs
    const aiContent = {
      title: generateTitle(craftName, keyMaterials),
      story: generateStory(craftName, keyMaterials),
      description: generateDescription(craftName, keyMaterials),
    }

    setGeneratedContent(aiContent)
    setProductTitle(aiContent.title)
    setProductStory(aiContent.story)
    setProductDescription(aiContent.description)
    setIsGenerating(false)
  }

  const generateTitle = (craft, materials) => {
    const adjectives = ["Handcrafted", "Artisan", "Premium", "Elegant", "Traditional", "Unique", "Exquisite"]
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    return `${randomAdjective} ${craft}`
  }

  const generateStory = (craft, materials) => {
    const stories = [
      `This beautiful ${craft.toLowerCase()} represents generations of traditional craftsmanship. Using carefully selected ${materials.toLowerCase()}, each piece is created with meticulous attention to detail and passion for the art form. The techniques used have been passed down through my family for decades, ensuring authenticity and quality in every creation.`,

      `Inspired by ancient traditions and modern aesthetics, this ${craft.toLowerCase()} showcases the natural beauty of ${materials.toLowerCase()}. Every piece tells a unique story, reflecting the time-honored methods that have been refined over years of practice. The creation process is both meditative and purposeful, resulting in a truly special handmade item.`,

      `Born from a deep appreciation for traditional crafts, this ${craft.toLowerCase()} combines the finest ${materials.toLowerCase()} with skilled artisanship. Each piece is individually crafted, making it one-of-a-kind. The process involves careful selection of materials, precise techniques, and a commitment to preserving cultural heritage through contemporary design.`,
    ]
    return stories[Math.floor(Math.random() * stories.length)]
  }

  const generateDescription = (craft, materials) => {
    const descriptions = [
      `This exceptional ${craft.toLowerCase()} is meticulously crafted using premium ${materials.toLowerCase()}. Each piece undergoes a careful creation process that ensures both durability and beauty. The natural characteristics of the materials shine through, creating unique variations that make every item special. Perfect for those who appreciate authentic handmade quality and timeless design.`,

      `Featuring high-quality ${materials.toLowerCase()}, this ${craft.toLowerCase()} exemplifies superior craftsmanship and attention to detail. The creation process involves traditional techniques combined with modern quality standards. Each piece is carefully finished to highlight the natural beauty of the materials while ensuring longevity and functionality.`,

      `This stunning ${craft.toLowerCase()} showcases the versatility and beauty of ${materials.toLowerCase()}. Created using time-tested methods, each piece reflects the artisan's dedication to quality and authenticity. The careful selection of materials and precise execution result in a product that is both functional and aesthetically pleasing, perfect for discerning customers who value handmade excellence.`,
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!productTitle.trim() || !productStory.trim() || !productDescription.trim() || !price) {
      alert("Please fill in all required fields.")
      return
    }

    const newProduct = {
      title: productTitle.trim(),
      story: productStory.trim(),
      description: productDescription.trim(),
      price: Number.parseFloat(price),
      image: image ? URL.createObjectURL(image) : null,
    }

    onAddProduct(newProduct)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Initial Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="craftName" className="block text-sm font-medium text-gray-700 mb-2">
                Craft Name *
              </label>
              <input
                type="text"
                id="craftName"
                value={craftName}
                onChange={(e) => setCraftName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Ceramic Vase, Wooden Bowl"
                required
              />
            </div>

            <div>
              <label htmlFor="keyMaterials" className="block text-sm font-medium text-gray-700 mb-2">
                Key Materials *
              </label>
              <input
                type="text"
                id="keyMaterials"
                value={keyMaterials}
                onChange={(e) => setKeyMaterials(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Clay, Oak Wood, Silk"
                required
              />
            </div>
          </div>

          {/* AI Generation Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={generateAIContent}
              disabled={isGenerating || !craftName.trim() || !keyMaterials.trim()}
              className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating with AI...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  Generate with AI
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Fill in the craft name and materials above, then click to generate product details
            </p>
          </div>

          {/* Generated/Editable Fields */}
          {(generatedContent || productTitle || productStory || productDescription) && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>

              <div>
                <label htmlFor="productTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  id="productTitle"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div>
                <label htmlFor="productStory" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Story *
                </label>
                <textarea
                  id="productStory"
                  value={productStory}
                  onChange={(e) => setProductStory(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Tell the story behind your craft"
                  required
                />
              </div>

              <div>
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description *
                </label>
                <textarea
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Describe your product in detail"
                  required
                />
              </div>
            </div>
          )}

          {/* Final Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 border-t pt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
