"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { NextMeal } from "@/components/next-meal"
import { MealSchedule } from "@/components/meal-schedule"
import { WeeklyPlanner } from "@/components/weekly-planner"

type MealType = 'breakfast' | 'lunch' | 'dinner';

export default function Home() {
  const [guestCount, setGuestCount] = useState(0)

  // Weekly meal data
  const weeklyMeals = {
    breakfast: [
      { name: 'Greek Yogurt Bowl', description: 'With fresh berries and honey' },
      { name: 'Avocado Toast', description: 'With poached eggs and cherry tomatoes' },
      { name: 'Oatmeal', description: 'With banana and cinnamon' },
      { name: 'Pancakes', description: 'With maple syrup and fresh fruits' },
      { name: 'Breakfast Burrito', description: 'With eggs, beans, and salsa' },
      { name: 'Continental', description: 'Croissants with jam and butter' },
      { name: 'English Breakfast', description: 'Eggs, bacon, beans, and toast' }
    ],
    lunch: [
      { name: 'Chicken Wrap', description: 'With fresh vegetables and hummus' },
      { name: 'Quinoa Salad', description: 'With roasted vegetables' },
      { name: 'Tuna Sandwich', description: 'With lettuce and mayo' },
      { name: 'Vegetable Soup', description: 'With crusty bread' },
      { name: 'Caesar Salad', description: 'With grilled chicken' },
      { name: 'Pasta Salad', description: 'With pesto and cherry tomatoes' },
      { name: 'Buddha Bowl', description: 'With rice, tofu, and vegetables' }
    ],
    dinner: [
      { name: 'Grilled Salmon', description: 'With asparagus and lemon butter sauce' },
      { name: 'Vegetable Stir Fry', description: 'With tofu and brown rice' },
      { name: 'Chicken Curry', description: 'With basmati rice' },
      { name: 'Beef Tacos', description: 'With guacamole and salsa' },
      { name: 'Mushroom Risotto', description: 'With parmesan cheese' },
      { name: 'Baked Cod', description: 'With roasted potatoes' },
      { name: 'Eggplant Parmesan', description: 'With spaghetti' }
    ]
  };

  type WeeklyAttendance = {
    [key in MealType]: boolean[];
  };

  const [weeklyAttendance, setWeeklyAttendance] = useState<WeeklyAttendance>({
    breakfast: Array(7).fill(false),
    lunch: Array(7).fill(false),
    dinner: Array(7).fill(false)
  });

  const handleAttendance = (attending: boolean) => {
    const now = new Date()
    const currentDay = now.getDay() || 7 // Convert Sunday from 0 to 7
    const dayIndex = currentDay - 1 // Convert to 0-based index
    const currentHour = now.getHours()
    
    let mealType: MealType = 'breakfast'
    if (currentHour >= 19) mealType = 'breakfast'
    else if (currentHour >= 12) mealType = 'dinner'
    else if (currentHour >= 8) mealType = 'lunch'
    
    const mealIndex = currentHour >= 19 ? (dayIndex + 1) % 7 : dayIndex
    
    setWeeklyAttendance(prev => ({
      ...prev,
      [mealType]: prev[mealType].map((value: boolean, i: number) => 
        i === mealIndex ? attending : value
      )
    }));
  };

  const toggleAttendance = (meal: MealType, day: number) => {
    setWeeklyAttendance(prev => ({
      ...prev,
      [meal]: prev[meal].map((value, i) => i === day ? !value : value)
    }))
  }

  const setAllAttendance = (value: boolean) => {
    setWeeklyAttendance({
      breakfast: Array(7).fill(value),
      lunch: Array(7).fill(value),
      dinner: Array(7).fill(value)
    })
  }

  return (
    <div className="space-y-8">
      {/* Next Meal Section */}
      <section className="grid md:grid-cols-2 gap-6">
        <NextMeal 
          weeklyMeals={weeklyMeals}
          weeklyAttendance={weeklyAttendance}
          onAttendanceChange={handleAttendance}
          onGuestCountChange={setGuestCount}
        />

        <WeeklyPlanner 
          weeklyAttendance={weeklyAttendance}
          onToggleAttendance={toggleAttendance}
          onSetAllAttendance={setAllAttendance}
        />
      </section>

      <MealSchedule 
        weeklyMeals={weeklyMeals}
        weeklyAttendance={weeklyAttendance}
        guestCount={guestCount}
        onToggleAttendance={toggleAttendance}
      />
    </div>
  )
}
