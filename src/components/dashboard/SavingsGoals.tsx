
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SavingsGoalProps {
  title: string;
  current: number;
  target: number;
  deadline: string;
}

function SavingsGoal({ title, current, target, deadline }: SavingsGoalProps) {
  const percentage = Math.round((current / target) * 100);
  const remaining = target - current;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">${current} saved</span>
          <span className="text-sm">${target} goal</span>
        </div>
        <Progress value={percentage} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>${remaining} to go</span>
          <span>Deadline: {deadline}</span>
        </div>
      </div>
    </div>
  );
}

export function SavingsGoals() {
  const goals = [
    {
      title: "Emergency Fund",
      current: 3000,
      target: 10000,
      deadline: "Dec 2023",
    },
    {
      title: "Vacation",
      current: 1500,
      target: 3000,
      deadline: "Jul 2023",
    },
    {
      title: "New Car",
      current: 5000,
      target: 20000,
      deadline: "Jan 2024",
    },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <SavingsGoal key={index} {...goal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
