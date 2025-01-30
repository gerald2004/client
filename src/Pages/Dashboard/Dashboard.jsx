// import {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/MiddleWares/Hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import  useAuth  from "@/MiddleWares/Hooks/useAuth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { auth } = useAuth();
  // console.log(auth);
  const clientId = auth?.client?.client_id;
  //console.log(clientId);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // const [selectedDate, setSelectedDate] = useState(null);

  const { data: accounts = [], isLoading, refetch } = useQuery({
    queryKey: ["account-balance", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      try {
        const response = await axiosPrivate.get(`/client/account/balance/${clientId}`);
        console.log(response.data.data.accounts);
        return response.data.data.accounts.map((account) => ({
          accountName: account.account_name,
          accountNumber: account.account_number,
          balance: account.account_balance,
        }));
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate("/", { state: { from: location }, replace: true });
        }
        throw error;
      }
    },
    enabled: !!clientId, // Prevent query from running if clientId is not available
  });

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
              {/* <CalendarDateRangePicker onChange={setSelectedDate} /> */}
              <Button onClick={() => refetch()} disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{account.accountName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">
                    Acc Number: {" "}
                    <span className="font-small">
                      {account.accountNumber}
                    </span>
                  </p>
                  <p className="text-lg">
                    Balance: {" "}
                    <span className="font-bold text-green-600">
                    UGX{" "}{Number(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
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
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
