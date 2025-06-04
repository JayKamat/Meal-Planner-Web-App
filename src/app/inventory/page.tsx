"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function Inventory() {
  const categories = ["All", "Produce", "Dairy", "Grains", "Protein", "Pantry"]

  const inventoryItems = [
    { name: "Avocados", category: "Produce", remaining: "2 remaining" },
    { name: "Eggs", category: "Dairy", remaining: "6 remaining" },
    { name: "Whole Grain Bread", category: "Grains", remaining: "1/2 loaf remaining" },
    { name: "Cherry Tomatoes", category: "Produce", remaining: "1 pint remaining" },
    { name: "Quinoa", category: "Grains", remaining: "2 cups remaining" }
  ]

  const shoppingList = {
    missing: [
      { name: "Salmon fillets", amount: "4 fillets" },
      { name: "Feta cheese", amount: "200g" },
      { name: "Firm tofu", amount: "1 block" }
    ],
    weekly: {
      produce: [
        { name: "Avocados", amount: "4" },
        { name: "Cherry tomatoes", amount: "2 pints" },
        { name: "Baby spinach", amount: "1 bag" },
        { name: "Mixed berries", amount: "2 pints" }
      ],
      protein: [
        { name: "Salmon fillets", amount: "4 fillets" },
        { name: "Chicken breast", amount: "1 lb" },
        { name: "Firm tofu", amount: "1 block" }
      ],
      dairy: [
        { name: "Eggs", amount: "1 dozen" },
        { name: "Greek yogurt", amount: "32 oz" }
      ]
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Inventory */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Current Inventory</h2>
            <div className="space-x-2">
              <Button variant="outline" className="text-muted-foreground hover:text-foreground">
                ↻ Update All
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                + Add Item
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Input 
              type="search" 
              placeholder="Search inventory..." 
              className="w-full"
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className={category === "All" ? "bg-primary hover:bg-primary/90" : ""}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-2">
              {inventoryItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category} • {item.remaining}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      ✏️
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      🗑️
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Shopping List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Shopping List</h2>
            <Button className="bg-primary hover:bg-primary/90">
              🛒 Order Now
            </Button>
          </div>

          <div className="space-y-6">
            {/* Missing Ingredients */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h3 className="text-destructive font-medium mb-2">
                ⚠️ Missing Ingredients for This Week
              </h3>
              <div className="space-y-2">
                {shoppingList.missing.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`missing-${index}`} />
                      <label htmlFor={`missing-${index}`} className="text-sm">
                        {item.name}
                      </label>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Shopping List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Weekly Shopping List</h3>
                <span className="text-sm text-muted-foreground">
                  For week of May 20 - May 26
                </span>
              </div>

              <div className="space-y-4">
                {/* Produce Section */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Produce</h4>
                  <div className="space-y-2">
                    {shoppingList.weekly.produce.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`produce-${index}`} />
                          <label htmlFor={`produce-${index}`} className="text-sm">
                            {item.name}
                          </label>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Protein Section */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Protein</h4>
                  <div className="space-y-2">
                    {shoppingList.weekly.protein.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`protein-${index}`} />
                          <label htmlFor={`protein-${index}`} className="text-sm">
                            {item.name}
                          </label>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dairy Section */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Dairy</h4>
                  <div className="space-y-2">
                    {shoppingList.weekly.dairy.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`dairy-${index}`} />
                          <label htmlFor={`dairy-${index}`} className="text-sm">
                            {item.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-600">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline">Export List</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
