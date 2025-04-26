
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ProjectAnalyticsChart = () => {
  const { projects } = useApp();
  
  // Format data for chart
  const chartData = projects.map(project => ({
    name: project.name,
    progress: project.progress,
    spent: Math.round((project.spent / project.budget) * 100),
    remaining: project.budget > project.spent ? Math.round(((project.budget - project.spent) / project.budget) * 100) : 0
  })).slice(0, 7); // Limit to first 7 projects for better display

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Project Time Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--card-foreground)'
                }} 
              />
              <Bar dataKey="progress" name="Progress %" fill="hsl(var(--primary))" />
              <Bar dataKey="spent" name="Budget Used %" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectAnalyticsChart;
