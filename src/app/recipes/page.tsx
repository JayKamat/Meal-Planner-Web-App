"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Recipes() {
  const recipe = {
    name: "Avocado Toast",
    duration: "15 minutes",
    servings: 2,
    calories: 350,
    description: "A simple yet delicious breakfast with creamy avocado on toasted bread, topped with poached eggs and cherry tomatoes.",
    ingredients: [
      { name: "Ripe avocado", amount: "1" },
      { name: "Whole grain bread", amount: "2 slices" },
      { name: "Eggs", amount: "2" },
      { name: "Cherry tomatoes", amount: "6" },
      { name: "Lemon juice", amount: "1 tsp" },
      { name: "Salt and pepper", amount: "to taste" },
      { name: "Red pepper flakes", amount: "pinch" }
    ],
    instructions: [
      "Toast the bread slices until golden brown.",
      "Mash the avocado in a bowl with lemon juice, salt and pepper.",
      "Bring a pot of water to a gentle simmer for poaching eggs.",
      "Poach eggs for 3-4 minutes until whites are set but yolks are still runny.",
      "Spread mashed avocado on toast slices.",
      "Top with poached eggs and halved cherry tomatoes.",
      "Sprinkle with red pepper flakes and serve immediately."
    ]
  }

  const recipeList = [
    { name: "Avocado Toast", type: "Breakfast", duration: "15 min" },
    { name: "Quinoa Salad", type: "Lunch", duration: "20 min" },
    { name: "Grilled Salmon", type: "Dinner", duration: "25 min" },
    { name: "Greek Yogurt Bowl", type: "Breakfast", duration: "5 min" },
    { name: "Chicken Wrap", type: "Lunch", duration: "15 min" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recipes & Ingredients</h1>
        <Button className="bg-primary hover:bg-primary/90">
          + Add Recipe
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recipe List */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recipe Database</h2>
          <div className="space-y-4">
            <Input 
              type="search" 
              placeholder="Search recipes..." 
              className="w-full"
            />
            <div className="space-y-2">
              {recipeList.map((item, index) => (
                <div 
                  key={index}
                  className="p-4 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.type} • {item.duration}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      ✏️
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recipe Details */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recipe Details</h2>
            <div className="space-x-2">
              <Button variant="outline">Edit</Button>
              <Button className="bg-primary hover:bg-primary/90">
                Add to Plan
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">{recipe.name}</h3>
              <div className="flex space-x-4 mt-2 text-sm text-muted-foreground">
                <span>⏱️ {recipe.duration}</span>
                <span>👥 {recipe.servings} servings</span>
                <span>🔥 {recipe.calories} calories</span>
              </div>
            </div>

            <p className="text-muted-foreground">
              {recipe.description}
            </p>

            <Tabs defaultValue="ingredients">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="ingredients" className="mt-4">
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{ingredient.name}</span>
                <span className="text-muted-foreground">{ingredient.amount}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="instructions" className="mt-4">
                <ol className="space-y-2 list-decimal list-inside">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="text-sm">
                      {step}
                    </li>
                  ))}
                </ol>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  )
}
