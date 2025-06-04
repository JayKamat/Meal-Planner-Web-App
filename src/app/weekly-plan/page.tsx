"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function WeeklyPlan() {
  const days = [
    { name: "Monday", date: "May 20" },
    { name: "Tuesday", date: "May 21" },
    { name: "Wednesday", date: "May 22" },
    { name: "Thursday", date: "May 23" },
    { name: "Friday", date: "May 24" }
  ]

  const meals = [
    {
      type: "Breakfast",
      items: [
        { name: "Avocado Toast", description: "With poached eggs and cherry tomatoes" },
        { name: "Greek Yogurt Bowl", description: "With honey, granola and mixed berries" },
        { name: "Oatmeal", description: "With banana, cinnamon and maple syrup" },
        { name: "Smoothie Bowl", description: "With spinach, banana, berries and chia seeds" },
        { name: "Breakfast Burrito", description: "With scrambled eggs, beans and salsa" }
      ]
    },
    {
      type: "Lunch",
      items: [
        { name: "Quinoa Salad", description: "With roasted vegetables and feta" },
        { name: "Chicken Wrap", description: "With avocado, lettuce and chipotle mayo" },
        { name: "Mediterranean Bowl", description: "With hummus, falafel and tabouleh" },
        { name: "Lentil Soup", description: "With crusty bread and green salad" },
        { name: "Poke Bowl", description: "With tuna, avocado and edamame" }
      ]
    },
    {
      type: "Dinner",
      items: [
        { name: "Grilled Salmon", description: "With asparagus and lemon butter sauce" },
        { name: "Vegetable Stir Fry", description: "With tofu and brown rice" },
        { name: "Pasta Primavera", description: "With seasonal vegetables and parmesan" },
        { name: "Chicken Curry", description: "With basmati rice and naan bread" },
        { name: "Homemade Pizza", description: "With mixed toppings and side salad" }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Weekly Meal Plan</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="text-muted-foreground hover:text-foreground">{'<'}</Button>
          <span className="text-sm text-muted-foreground">May 20 - May 26, 2024</span>
          <Button variant="outline" size="icon" className="text-muted-foreground hover:text-foreground">{'>'}</Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {days.map((day, dayIndex) => (
          <Card key={day.name} className="p-4">
            <div className="text-center mb-4">
              <h2 className="font-medium">{day.name}</h2>
              <p className="text-sm text-gray-500">{day.date}</p>
            </div>

            <div className="space-y-6">
              {meals.map((meal) => (
                <div key={meal.type} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {meal.type}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="float-right p-0 h-auto hover:bg-transparent text-muted-foreground hover:text-foreground"
                    >
                      ✏️
                    </Button>
                  </h3>
                  <Card className="p-3 bg-muted/50 border-dashed">
                    <p className="font-medium text-sm">{meal.items[dayIndex].name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {meal.items[dayIndex].description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
