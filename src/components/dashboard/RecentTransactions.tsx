
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "expense" | "income";
}

export function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: "t1",
      description: "Whole Foods Market",
      amount: 89.24,
      date: "Today",
      category: "Groceries",
      type: "expense",
    },
    {
      id: "t2",
      description: "Spotify Premium",
      amount: 9.99,
      date: "Yesterday",
      category: "Entertainment",
      type: "expense",
    },
    {
      id: "t3",
      description: "Salary Deposit",
      amount: 2800,
      date: "May 1",
      category: "Income",
      type: "income",
    },
    {
      id: "t4",
      description: "Amazon.com",
      amount: 32.50,
      date: "Apr 29",
      category: "Shopping",
      type: "expense",
    },
    {
      id: "t5",
      description: "Uber Ride",
      amount: 24.75,
      date: "Apr 28",
      category: "Transportation",
      type: "expense",
    },
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-2 border-b last:border-0">
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</div>
              </div>
              <div className={`font-medium ${transaction.type === "expense" ? "text-finance-red" : "text-finance-green"}`}>
                {transaction.type === "expense" ? "-" : "+"} ${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
