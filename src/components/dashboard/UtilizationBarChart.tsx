
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

// Dropdown options
const projectOptions = ['USHG', 'P2P', 'Uctapharma', 'DN', 'FPL', 'Met Iren'];
const timeOptions = ['Week', '1 Month', '3 Month', '6 Month', '1 Year'];
const memberOptions = ['Sathish', 'Mukesh', 'Pradeep', 'Perumal'];

// Mock data (expandable)
const mockUtilizationData = {
  USHG: {
    Sathish: {
      'Week': [
        { name: 'Mon', utilization: 70 },
        { name: 'Tue', utilization: 72 },
        { name: 'Wed', utilization: 74 },
        { name: 'Thu', utilization: 76 },
        { name: 'Fri', utilization: 78 },
      ],
      '1 Month': [
        { name: 'Week 1', utilization: 70 },
        { name: 'Week 2', utilization: 72 },
        { name: 'Week 3', utilization: 74 },
        { name: 'Week 4', utilization: 76 },
      ],
      '3 Month': [
        { name: 'Jan', utilization: 68 },
        { name: 'Feb', utilization: 72 },
        { name: 'Mar', utilization: 75 },
      ],
      '6 Month': [
        { name: 'Nov', utilization: 70 },
        { name: 'Dec', utilization: 71 },
        { name: 'Jan', utilization: 72 },
        { name: 'Feb', utilization: 74 },
        { name: 'Mar', utilization: 76 },
        { name: 'Apr', utilization: 78 },
      ],
      '1 Year': [
        { name: 'May', utilization: 65 },
        { name: 'Jun', utilization: 66 },
        { name: 'Jul', utilization: 67 },
        { name: 'Aug', utilization: 68 },
        { name: 'Sep', utilization: 70 },
        { name: 'Oct', utilization: 72 },
        { name: 'Nov', utilization: 73 },
        { name: 'Dec', utilization: 75 },
        { name: 'Jan', utilization: 77 },
        { name: 'Feb', utilization: 78 },
        { name: 'Mar', utilization: 80 },
        { name: 'Apr', utilization: 82 },
      ],
    },
    Mukesh: {
      'Week': [
        { name: 'Mon', utilization: 60 },
        { name: 'Tue', utilization: 62 },
        { name: 'Wed', utilization: 64 },
        { name: 'Thu', utilization: 66 },
        { name: 'Fri', utilization: 68 },
      ],
    },
    Pradeep: {
      'Week': [
        { name: 'Mon', utilization: 55 },
        { name: 'Tue', utilization: 57 },
        { name: 'Wed', utilization: 59 },
        { name: 'Thu', utilization: 60 },
        { name: 'Fri', utilization: 62 },
      ],
    },
    Perumal: {
      'Week': [
        { name: 'Mon', utilization: 63 },
        { name: 'Tue', utilization: 65 },
        { name: 'Wed', utilization: 66 },
        { name: 'Thu', utilization: 67 },
        { name: 'Fri', utilization: 69 },
      ],
    },
  },
  // Add more projects/members/timeframes as needed
};

const getBarColor = (value: number) => {
  if (value >= 80) return '#22c55e'; // green for high utilization
  if (value >= 60) return '#004499'; // presidio blue for medium utilization
  return '#f59e0b'; // amber for low utilization
};

const UtilizationBarChart = () => {
  const [selectedProject, setSelectedProject] = useState('USHG');
  const [selectedTime, setSelectedTime] = useState('Week');
  const [selectedMember, setSelectedMember] = useState('Sathish');

  const data =
    mockUtilizationData[selectedProject]?.[selectedMember]?.[selectedTime] || [];

  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-3">
        <CardTitle className="font-medium text-lg md:text-xl">Resource Utilization</CardTitle>
        <div className="space-y-2">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
          >
            {projectOptions.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
          >
            {timeOptions.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>

          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
          >
            {memberOptions.map((member) => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] md:h-[250px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis 
                domain={[0, 100]} 
                allowDecimals={false} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Utilization']}
                labelFormatter={(label) => `Day: ${label}`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="utilization" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.utilization)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UtilizationBarChart;
