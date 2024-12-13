import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card'; // Adjust import as per your directory

// Generate sample data
const generateData = () => {
  const years = Array.from({ length: 31 }, (_, i) => 1994 + i);
  const leagues = ['NBA', 'NFL', 'MLB', 'NHL'];
  
  return years.map(year => {
    const baseAttendance = {
      NBA: 17000 + Math.random() * 2000,
      NFL: 65000 + Math.random() * 5000,
      MLB: 30000 + Math.random() * 3000,
      NHL: 16000 + Math.random() * 2000,
    };
    
    const baseHotDogs = {
      NBA: 800000 + Math.random() * 200000,
      NFL: 1500000 + Math.random() * 300000,
      MLB: 2000000 + Math.random() * 400000,
      NHL: 700000 + Math.random() * 150000,
    };
    
    const baseJerseys = {
      NBA: 2000000 + Math.random() * 500000,
      NFL: 3000000 + Math.random() * 700000,
      MLB: 1500000 + Math.random() * 400000,
      NHL: 1000000 + Math.random() * 300000,
    };
    
    return {
      year,
      ...leagues.reduce((acc, league) => ({
        ...acc,
        [`${league}Attendance`]: Math.round(baseAttendance[league]),
        [`${league}HotDogs`]: Math.round(baseHotDogs[league]),
        [`${league}Jerseys`]: Math.round(baseJerseys[league]),
      }), {}),
    };
  });
};

const MetricsDashboard = () => {
  const [data] = useState(generateData());
  const [activeMetric, setActiveMetric] = useState('Attendance');
  
  const metrics = {
    Attendance: 'Average attendance per game',
    HotDogs: 'Total hot dogs sold per season',
    Jerseys: 'Total jerseys sold per season',
  };
  
  const colors = {
    NBA: '#C9082A',
    NFL: '#013369',
    MLB: '#002D72',
    NHL: '#000000',
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sports Leagues Metrics Dashboard (1994-2024)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-center space-x-2">
            {Object.entries(metrics).map(([metric, label]) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`px-4 py-2 rounded ${
                  activeMetric === metric
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          <div className="w-full h-[400px]">
            <LineChart
              width={900}
              height={400}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {['NBA', 'NFL', 'MLB', 'NHL'].map(league => (
                <Line
                  key={league}
                  type="monotone"
                  dataKey={`${league}${activeMetric}`}
                  name={league}
                  stroke={colors[league]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsDashboard;
