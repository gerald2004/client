import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import DashboardOverview from "./components/DashboardOverview";
import DashboardLoans from "./components/DashboardLoans";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [accounts, setAccounts] = useState([
    { accountName: "Savings Account", balance: 0 },
    { accountName: "Total Account", balance: 0 },
    { accountName: "Investment Account", balance: 0 },
  ]);

  // Mock function to fetch updated balances
  const updateAccountBalances = () => {
    // Replace with API call
    const updatedBalances = [
      { accountName: "Savings Account", balance: 15000 },
      { accountName: "Total Account", balance: 32000 },
      { accountName: "Investment Account", balance: 8500 },
    ];
    setAccounts(updatedBalances);
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:flex">
        <div className="border-b" />
        <div className="flex-1 space-y-4 p-0 pt-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker onChange={setSelectedDate} />
              <Button onClick={updateAccountBalances}>Update</Button>
            </div>
          </div>
          {/* Cards for Multiple Accounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{account.accountName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    As at:{" "}
                    <span className="font-medium">
                      {selectedDate ? selectedDate.toLocaleString() : "Select a date"}
                    </span>
                  </p>
                  <p className="text-lg">
                    Balance:{" "}
                    <span className="font-bold text-green-600">
                      ${account.balance.toLocaleString()}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <DashboardOverview />
            </TabsContent>
            <TabsContent value="loans" className="space-y-4">
              <DashboardLoans />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
