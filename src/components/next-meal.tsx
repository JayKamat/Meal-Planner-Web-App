"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface NextMealProps {
  weeklyMeals: {
    [key: string]: Array<{ name: string; description: string }>
  }
  weeklyAttendance: {
    [key: string]: boolean[]
  }
  onAttendanceChange: (attending: boolean) => void
  onGuestCountChange: (count: number) => void
}

export function NextMeal({ weeklyMeals, weeklyAttendance, onAttendanceChange, onGuestCountChange }: NextMealProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [guestCount, setGuestCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const currentHour = currentTime.getHours()
  const currentDay = currentTime.getDay() || 7 // Convert Sunday from 0 to 7
  const dayIndex = currentDay - 1 // Convert to 0-based index

  const getNextMeal = () => {
    if (currentHour < 8) return { type: 'breakfast', time: '8:00 AM' }
    if (currentHour < 12) return { type: 'lunch', time: '12:30 PM' }
    if (currentHour < 19) return { type: 'dinner', time: '7:00 PM' }
    return { type: 'breakfast', time: '8:00 AM', tomorrow: true }
  }

  const nextMeal = getNextMeal()
  const mealDate = new Date(currentTime)
  if (nextMeal.tomorrow) {
    mealDate.setDate(mealDate.getDate() + 1)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const handleGuestCountChange = (newCount: number) => {
    const count = Math.max(0, newCount)
    setGuestCount(count)
    onGuestCountChange(count)
  }

  const mealIndex = nextMeal.tomorrow ? (dayIndex + 1) % 7 : dayIndex
  const currentMeal = weeklyMeals[nextMeal.type][mealIndex]
  const isAttending = weeklyAttendance[nextMeal.type][mealIndex]

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Next Meal</h2>
      <div className="space-y-4">
        <div>
          <div className="inline-block bg-primary/10 text-primary text-sm px-2 py-1 rounded">
            {nextMeal.tomorrow ? 'tomorrow' : 'today'}
          </div>
          <h3 className="text-xl font-semibold mt-2">
            {nextMeal.type.charAt(0).toUpperCase() + nextMeal.type.slice(1)}: {currentMeal.name}
          </h3>
          <p className="text-muted-foreground">{currentMeal.description}</p>
          <p className="text-sm text-muted-foreground mt-2">{nextMeal.time} • {formatDate(mealDate)}</p>
        </div>
        <div>
          <p className="font-medium mb-2">Will you attend?</p>
          <div className="flex space-x-2">
            <Button 
              variant={isAttending ? "default" : "outline"}
              className={`transition-colors duration-200 ${
                isAttending ? "bg-primary hover:bg-primary/90" : "hover:bg-muted"
              }`}
              onClick={() => onAttendanceChange(true)}
            >
              Yes
            </Button>
            <Button 
              variant={!isAttending ? "default" : "outline"}
              className={`transition-colors duration-200 ${
                !isAttending ? "bg-primary hover:bg-primary/90" : "hover:bg-muted"
              }`}
              onClick={() => onAttendanceChange(false)}
            >
              No
            </Button>
          </div>
        </div>
        <div>
          <p className="font-medium mb-2">Bringing guests?</p>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="transition-colors duration-200 hover:bg-muted"
              onClick={() => handleGuestCountChange(guestCount - 1)}
            >
              -
            </Button>
            <span className="w-8 text-center">{guestCount}</span>
            <Button 
              variant="outline" 
              size="sm"
              className="transition-colors duration-200 hover:bg-muted"
              onClick={() => handleGuestCountChange(guestCount + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
