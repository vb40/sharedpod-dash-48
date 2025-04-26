
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

const HolidaysCard = () => {
  const { holidays } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
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
  const dayClassName = (date: Date) => {
    const isHoliday = holidayDates.some(
      holiday => format(holiday.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    if (isHoliday) {
      // Find the type of holiday to determine color
      const holiday = holidayDates.find(
        h => format(h.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      
      return cn(
        "relative",
        "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full",
        holiday?.type === "public" ? "after:bg-primary" : "after:bg-orange-500"
      );
    }
    
    return "";
  };

  return (
    <Card className="col-span-3 lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Holidays</span>
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="text-xs bg-primary/10">
              Public
            </Badge>
            <Badge variant="outline" className="text-xs bg-orange-500/10">
              Observance
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          dayClassName={dayClassName}
        />
        
        {selectedHoliday && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <h4 className="font-medium">{selectedHoliday.name}</h4>
            <p className="text-sm text-muted-foreground">
              {format(selectedHoliday.date, 'MMMM d, yyyy')} - {selectedHoliday.type === "public" ? "Public Holiday" : "Observance"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HolidaysCard;
