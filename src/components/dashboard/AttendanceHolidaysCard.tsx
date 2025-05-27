
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Generate sample attendance data for the last 7 days
const generateAttendanceData = () => {
  const today = new Date();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Weekends have lower attendance
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      attendance: isWeekend ? 
        Math.floor(Math.random() * 20) + 10 : // Weekend: 10-30%
        Math.floor(Math.random() * 30) + 70   // Weekday: 70-100%
    });
  }
  
  return data;
};

const AttendanceHolidaysCard = () => {
  const { holidays } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const attendanceData = generateAttendanceData();
  
  // Convert holiday dates to Date objects
  const holidayDates = holidays.map(holiday => ({
    ...holiday,
    date: new Date(holiday.date),
    type: holiday.type
  }));
  
  // Find current selected holiday if any
  const selectedHoliday = holidayDates.find(
    holiday => selectedDate && format(holiday.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );
  
  // Create a function to add class to holiday dates
  const modifiers = {
    holiday: holidayDates.map(holiday => holiday.date),
    publicHoliday: holidayDates.filter(h => h.type === "public").map(h => h.date),
    observanceHoliday: holidayDates.filter(h => h.type === "observance").map(h => h.date)
  };

  const modifiersClassNames = {
    holiday: "relative",
    publicHoliday: "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
    observanceHoliday: "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-orange-500"
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Attendance & Holidays</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance">Attendance Tracker</TabsTrigger>
            <TabsTrigger value="holidays">Holidays Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance" className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={attendanceData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Attendance']}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      color: 'var(--card-foreground)'
                    }}  
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)" 
                    name="Attendance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="holidays" className="mt-4">
            <div className="space-y-4">
              <div className="flex gap-2 items-center justify-center">
                <Badge variant="outline" className="text-xs bg-primary/10">
                  Public
                </Badge>
                <Badge variant="outline" className="text-xs bg-orange-500/10">
                  Observance
                </Badge>
              </div>
              
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border pointer-events-auto"
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                />
              </div>
              
              {selectedHoliday && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <h4 className="font-medium">{selectedHoliday.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(selectedHoliday.date, 'MMMM d, yyyy')} - {selectedHoliday.type === "public" ? "Public Holiday" : "Observance"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AttendanceHolidaysCard;
