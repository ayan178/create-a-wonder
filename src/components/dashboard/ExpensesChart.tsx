
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Housing', value: 1200, color: '#1a365d' },
  { name: 'Food', value: 400, color: '#319795' },
  { name: 'Transportation', value: 300, color: '#2a4365' },
  { name: 'Utilities', value: 200, color: '#38a169' },
  { name: 'Entertainment', value: 150, color: '#e53e3e' },
];

const COLORS = ['#1a365d', '#319795', '#2a4365', '#38a169', '#e53e3e'];

export function ExpensesChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-medium">{item.name}: ${item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
