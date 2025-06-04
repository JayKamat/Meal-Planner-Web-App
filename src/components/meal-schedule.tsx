"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface UpcomingMeal {
  meal: string;
  time: string;
  mealType: MealType;
  dayIndex: number;
  attending: boolean;
  attendingCount: number;
}

interface MealScheduleProps {
  weeklyMeals: {
    [key: string]: Array<{ name: string; description: string }>
  }
  weeklyAttendance: {
    [key: string]: boolean[]
  }
  guestCount: number;
  onToggleAttendance: (meal: MealType, day: number) => void;
}

export function MealSchedule({ weeklyMeals, weeklyAttendance, guestCount, onToggleAttendance }: MealScheduleProps) {
  const getUpcomingMeals = (): UpcomingMeal[] => {
    const now = new Date();
    const currentDay = now.getDay() || 7;
    const currentDayIndex = currentDay - 1;
    const currentHour = now.getHours();
    
    let currentMealType: MealType = 'breakfast';
    let startDayIndex = currentDayIndex;
    
    if (currentHour >= 19) {
      currentMealType = 'breakfast';
      startDayIndex = (currentDayIndex + 1) % 7;
    } else if (currentHour >= 12) {
      currentMealType = 'dinner';
    } else if (currentHour >= 8) {
      currentMealType = 'lunch';
    }

    const upcomingMeals: UpcomingMeal[] = [];
    let nextMealType = currentMealType;
    let nextDayIndex = startDayIndex;

    for (let i = 0; i < 3; i++) {
      const mealTime = nextMealType === 'breakfast' ? '8:00 AM' : 
                      nextMealType === 'lunch' ? '12:30 PM' : '7:00 PM';
      
      const mealDate = new Date(now);
      const daysToAdd = nextDayIndex >= currentDayIndex ? 
        nextDayIndex - currentDayIndex : 
        7 - (currentDayIndex - nextDayIndex);
      mealDate.setDate(mealDate.getDate() + daysToAdd);

      const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        }).format(date)
      };

      const attendingCount = weeklyAttendance[nextMealType].reduce((count: number, isAttending: boolean) => 
        isAttending ? count + 1 : count, 0) + (i === 0 ? guestCount : 0);

      upcomingMeals.push({
        meal: `${nextMealType.charAt(0).toUpperCase() + nextMealType.slice(1)}: ${weeklyMeals[nextMealType][nextDayIndex].name}`,
        time: `${formatDate(mealDate)} • ${mealTime}`,
        mealType: nextMealType,
        dayIndex: nextDayIndex,
        attending: weeklyAttendance[nextMealType][nextDayIndex],
        attendingCount
      });

      // Move to next meal/day
      if (nextMealType === 'breakfast') nextMealType = 'lunch';
      else if (nextMealType === 'lunch') nextMealType = 'dinner';
      else {
        nextMealType = 'breakfast';
        nextDayIndex = (nextDayIndex + 1) % 7;
      }
    }

    return upcomingMeals;
  };

  const getCurrentAttendance = () => {
    const now = new Date();
    const currentDay = now.getDay() || 7;
    const currentDayIndex = currentDay - 1;
    const currentHour = now.getHours();
    
    let mealType: MealType = 'breakfast';
    let nextMealIndex = currentDayIndex;
    
    if (currentHour >= 19) {
      mealType = 'breakfast';
      nextMealIndex = (currentDayIndex + 1) % 7;
    } else if (currentHour >= 12) {
      mealType = 'dinner';
    } else if (currentHour >= 8) {
      mealType = 'lunch';
    }

    const baseAttendees = weeklyAttendance[mealType][nextMealIndex] ? 1 : 0;
    const totalGuests = guestCount;
    
    return {
      mealType,
      nextMealIndex,
      baseAttendees,
      totalGuests,
      totalAttendees: baseAttendees + totalGuests
    };
  };

  const attendance = getCurrentAttendance();

  return (
    <>
      {/* Current Attendance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Current Attendance</h2>
        <div className="flex flex-wrap gap-2">
          {Array(attendance.totalAttendees).fill(0).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                i < attendance.baseAttendees 
                  ? "from-primary/70 to-primary" 
                  : i < attendance.baseAttendees + attendance.totalGuests
                    ? "from-primary/50 to-primary/70"
                    : "from-primary/30 to-primary/50"
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          <p className="text-primary font-medium">{attendance.totalAttendees} people attending next meal</p>
          {attendance.totalAttendees > 0 && (
            <ul className="list-disc list-inside text-xs space-y-0.5">
              {attendance.baseAttendees > 0 && <li>You are attending</li>}
              {attendance.totalGuests > 0 && <li>{attendance.totalGuests} guest{attendance.totalGuests > 1 ? 's' : ''}</li>}
            </ul>
          )}
        </div>
      </Card>

      {/* Upcoming Meals */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Meals</h2>
        <div className="space-y-4">
          {getUpcomingMeals().map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h3 className="font-medium">{item.meal}</h3>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {item.attendingCount} {item.attendingCount === 1 ? 'person' : 'people'} attending
                </span>
                <div className="flex space-x-2">
                  <Button 
                    variant={weeklyAttendance[item.mealType][item.dayIndex] ? "default" : "outline"}
                    size="sm" 
                    className={`transition-colors duration-200 ${
                      weeklyAttendance[item.mealType][item.dayIndex] 
                        ? "bg-primary hover:bg-primary/90" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => onToggleAttendance(item.mealType, item.dayIndex)}
                  >
                    Yes
                  </Button>
                  <Button 
                    variant={!weeklyAttendance[item.mealType][item.dayIndex] ? "default" : "outline"}
                    size="sm"
                    className={`transition-colors duration-200 ${
                      !weeklyAttendance[item.mealType][item.dayIndex] 
                        ? "bg-primary hover:bg-primary/90" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => onToggleAttendance(item.mealType, item.dayIndex)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
