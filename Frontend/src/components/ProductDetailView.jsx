"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, Check } from "lucide-react"

const ProductDetailView = ({ product, onBack }) => {
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [question, setQuestion] = useState("")
  const [questionSent, setQuestionSent] = useState(false)

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => setOrderPlaced(false), 3000)
  }

  const handleSendQuestion = () => {
    if (question.trim()) {
      setQuestionSent(true)
      setQuestion("")
      setTimeout(() => setQuestionSent(false), 3000)
    }
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="aspect-square overflow-hidden rounded-lg">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-gray-600 text-lg">by {product.artisan}</p>
            <p className="text-primary-600 font-bold text-2xl mt-4">${product.price}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full btn-primary text-lg py-3 flex items-center justify-center"
          >
            {orderPlaced ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Order Placed!
              </>
            ) : (
              "Place Order"
            )}
          </button>

          {orderPlaced && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 font-medium">
                Thank you for your order! The artisan will be in touch soon.
              </p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Story Behind the Craft</h2>
            <p className="text-gray-700 leading-relaxed">{product.fullStory}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Ask a Question Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Ask a Question
            </h3>

            {questionSent ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">Your question has been sent to {product.artisan}!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`Ask ${product.artisan} about this product...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSendQuestion}
                  disabled={!question.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Query
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailView
