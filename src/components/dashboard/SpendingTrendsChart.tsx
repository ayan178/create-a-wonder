
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: 'Jan', amount: 2200 },
  { month: 'Feb', amount: 2100 },
  { month: 'Mar', amount: 2400 },
  { month: 'Apr', amount: 2000 },
  { month: 'May', amount: 2500 },
];

export function SpendingTrendsChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              <Bar dataKey="amount" fill="#1a365d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
