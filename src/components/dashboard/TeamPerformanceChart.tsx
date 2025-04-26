
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ['#4f46e5', '#10b981', '#f97316', '#8b5cf6', '#ec4899'];

const TeamPerformanceChart = () => {
  const { teamMembers } = useApp();
  
  // Group team by performance range
  const performanceData = [
    { name: 'Excellent (90-100%)', value: 0 },
    { name: 'Good (80-89%)', value: 0 },
    { name: 'Average (70-79%)', value: 0 },
    { name: 'Below Average (60-69%)', value: 0 },
    { name: 'Poor (<60%)', value: 0 },
  ];
  
  teamMembers.forEach(member => {
    if (member.performance >= 90) {
      performanceData[0].value += 1;
    } else if (member.performance >= 80) {
      performanceData[1].value += 1;
    } else if (member.performance >= 70) {
      performanceData[2].value += 1;
    } else if (member.performance >= 60) {
      performanceData[3].value += 1;
    } else {
      performanceData[4].value += 1;
    }
  });
  
  // Filter out categories with zero value
  const filteredData = performanceData.filter(item => item.value > 0);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} members`, 'Count']}
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--card-foreground)'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformanceChart;
