"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { Star, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this advanced smartwatch",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    rating: 4.3,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable cotton t-shirt in various colors",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Clothing",
    rating: 4.7,
    reviews: 234,
    inStock: true,
  },
  {
    id: "4",
    name: "Professional Coffee Maker",
    description: "Brew perfect coffee every time with this premium coffee maker",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home & Kitchen",
    rating: 4.4,
    reviews: 156,
    inStock: false,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable height",
    price: 399.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Furniture",
    rating: 4.6,
    reviews: 67,
    inStock: true,
  },
  {
    id: "6",
    name: "Portable Power Bank",
    description: "20000mAh power bank with fast charging and multiple ports",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    rating: 4.2,
    reviews: 312,
    inStock: true,
  },
]

interface ProductGridProps {
  searchQuery: string
}

export function ProductGrid({ searchQuery }: ProductGridProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(mockProducts.map((p) => p.category)))]

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="secondary">Out of Stock</Badge>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
              </div>
              <Button onClick={() => handleAddToCart(product)} disabled={!product.inStock} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
