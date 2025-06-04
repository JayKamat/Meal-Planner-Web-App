"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface WeeklyPlannerProps {
  weeklyAttendance: {
    [key in MealType]: boolean[];
  };
  onToggleAttendance: (meal: MealType, day: number) => void;
  onSetAllAttendance: (value: boolean) => void;
}

export function WeeklyPlanner({ weeklyAttendance, onToggleAttendance, onSetAllAttendance }: WeeklyPlannerProps) {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      dates.push(day);
    }
    return dates;
  };

  const formatWeekRange = (dates: Date[]) => {
    const start = dates[0];
    const end = dates[dates.length - 1];
    
    return `${start.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric'
    })} - ${end.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    })}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Weekly Attendance Planner</h2>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
            onClick={() => navigateWeek('prev')}
          >
            {'<'}
          </button>
          <span className="text-sm text-muted-foreground">
            {formatWeekRange(weekDates)}
          </span>
          <button 
            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
            onClick={() => navigateWeek('next')}
          >
            {'>'}
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-sm font-medium text-muted-foreground">Meal</th>
            <th className="text-right text-sm font-medium text-muted-foreground">Time</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Mon</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Tue</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Wed</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Thu</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Fri</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Sat</th>
            <th className="text-center text-sm font-medium text-muted-foreground px-1">Sun</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="py-2 text-sm">Breakfast</td>
            <td className="py-2 text-sm text-right">8:00 AM</td>
            {weeklyAttendance.breakfast.map((isAttending, i) => (
              <td key={i} className="px-1">
                <Button
                  variant={isAttending ? "default" : "outline"}
                  size="sm"
                  className={`w-full text-xs transition-colors duration-200 ${
                    isAttending 
                      ? "bg-primary hover:bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => onToggleAttendance('breakfast', i)}
                >
                  {isAttending ? 'Yes' : 'No'}
                </Button>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-2 text-sm">Lunch</td>
            <td className="py-2 text-sm text-right">12:30 PM</td>
            {weeklyAttendance.lunch.map((isAttending, i) => (
              <td key={i} className="px-1">
                <Button
                  variant={isAttending ? "default" : "outline"}
                  size="sm"
                  className={`w-full text-xs transition-colors duration-200 ${
                    isAttending 
                      ? "bg-primary hover:bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => onToggleAttendance('lunch', i)}
                >
                  {isAttending ? 'Yes' : 'No'}
                </Button>
              </td>
            ))}
          </tr>
          <tr>
            <td className="py-2 text-sm">Dinner</td>
            <td className="py-2 text-sm text-right">7:00 PM</td>
            {weeklyAttendance.dinner.map((isAttending, i) => (
              <td key={i} className="px-1">
                <Button
                  variant={isAttending ? "default" : "outline"}
                  size="sm"
                  className={`w-full text-xs transition-colors duration-200 ${
                    isAttending 
                      ? "bg-primary hover:bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => onToggleAttendance('dinner', i)}
                >
                  {isAttending ? 'Yes' : 'No'}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-sm text-muted-foreground">
        Tip: Set your preferences for the entire week to help with meal planning and reduce food waste.
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button 
          variant="default" 
          className="bg-primary hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
          onClick={() => onSetAllAttendance(true)}
        >
          <span>Set All to Yes</span>
          <span className="text-xs opacity-75">✓</span>
        </Button>
        <Button 
          variant="outline"
          className="transition-colors duration-200 hover:bg-muted flex items-center space-x-2"
          onClick={() => onSetAllAttendance(false)}
        >
          <span>Set All to No</span>
          <span className="text-xs opacity-75">✕</span>
        </Button>
      </div>
    </Card>
  );
}
