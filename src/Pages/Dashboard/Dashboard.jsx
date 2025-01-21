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
import DashboardOverview from "./components/DashboardOverview";
import DashboardTransactions from "./components/DashboardTransactions";
import DashboardLoans from "./components/DashboardLoans";
import DashboardMembership from "./components/DashboardMembership";
import DashboardNotifications from "./components/DashboardNotifications";

const Dashboard = () => {
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
              <CalendarDateRangePicker />
              <Button>Update</Button>
            </div>
          </div>
          <Tabs defaultValue="accounting" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="accounting">Accounting</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <DashboardOverview />
            </TabsContent>
            <TabsContent value="accounting" className="space-y-4">
              <DashboardTransactions />
            </TabsContent>
            <TabsContent value="loans" className="space-y-4">
              <DashboardLoans />
            </TabsContent>
            <TabsContent value="members" className="space-y-4">
              <DashboardMembership />
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <DashboardNotifications />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
