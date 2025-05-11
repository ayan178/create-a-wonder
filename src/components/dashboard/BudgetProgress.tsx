
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetCategoryProps {
  category: string;
  spent: number;
  total: number;
  color: string;
}

function BudgetCategory({ category, spent, total, color }: BudgetCategoryProps) {
  const percentage = Math.round((spent / total) * 100);
  const remaining = total - spent;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{category}</span>
        <span className="text-sm text-muted-foreground">${spent} of ${total}</span>
      </div>
      <Progress value={percentage} className="h-2" indicatorClassName={color} />
      <div className="text-xs text-right text-muted-foreground">${remaining} remaining</div>
    </div>
  );
}

export function BudgetProgress() {
  const categories = [
    { category: "Housing", spent: 950, total: 1200, color: "bg-finance-blue" },
    { category: "Food", spent: 320, total: 400, color: "bg-finance-teal" },
    { category: "Transportation", spent: 150, total: 300, color: "bg-finance-green" },
    { category: "Entertainment", spent: 120, total: 150, color: "bg-finance-red" },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((item, index) => (
          <BudgetCategory key={index} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}
