
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  icon?: LucideIcon;
  iconColor?: string;
}

export function StatCard({ title, value, description, trend, icon: Icon, iconColor = "text-finance-blue" }: StatCardProps) {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {trend && (
            <span className={`mr-1 ${trend.isPositive ? "text-finance-green" : "text-finance-red"}`}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
          )}
          {description && <span>{description}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
