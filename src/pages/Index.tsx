
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ExpensesChart } from "@/components/dashboard/ExpensesChart";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingTrendsChart } from "@/components/dashboard/SpendingTrendsChart";
import { Wallet, TrendingUp, PiggyBank, CreditCard } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-finance-blue">Financial Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
              </div>
              <SidebarTrigger />
            </div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Balance" 
              value="$12,580.00" 
              description="across all accounts"
              icon={Wallet}
            />
            <StatCard 
              title="Monthly Income" 
              value="$4,200.00" 
              trend={{ value: 2.5, isPositive: true }}
              icon={TrendingUp}
              iconColor="text-finance-green"
            />
            <StatCard 
              title="Monthly Expenses" 
              value="$2,250.00" 
              trend={{ value: 4.1, isPositive: false }}
              icon={CreditCard}
              iconColor="text-finance-red"
            />
            <StatCard 
              title="Total Savings" 
              value="$9,500.00" 
              trend={{ value: 12, isPositive: true }}
              icon={PiggyBank}
              iconColor="text-finance-teal"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ExpensesChart />
            <SpendingTrendsChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BudgetProgress />
            <div className="grid grid-cols-1 gap-6">
              <SavingsGoals />
              <RecentTransactions />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
