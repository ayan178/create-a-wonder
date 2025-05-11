
import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { Home, PieChart, BarChart3, Wallet, Target, Settings } from "lucide-react";

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: Home },
    { id: "expenses", title: "Expenses", icon: PieChart },
    { id: "budgets", title: "Budgets", icon: BarChart3 },
    { id: "accounts", title: "Accounts", icon: Wallet },
    { id: "goals", title: "Goals", icon: Target },
    { id: "settings", title: "Settings", icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-finance-blue">FinTrack</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    className={activeItem === item.id ? "bg-finance-blue text-white" : ""}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
