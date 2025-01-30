import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientTransactions } from "./Components/Individuals/ClientTransactions";
import { Groups } from "./Components/Groups/Groups";

const Transactions = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Transactions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:flex">
        <div className="border-b" />
        <div className="flex-1 space-y-4 p-0 pt-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">My Transactions</h2>
          </div>
          <Tabs defaultValue="individuals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="individuals">General Savings</TabsTrigger>
              <TabsTrigger value="groups">Ussd Savings</TabsTrigger>
              <TabsTrigger value="individuals">Withdraws</TabsTrigger>
              <TabsTrigger value="groups">Transfers</TabsTrigger>
              <TabsTrigger value="individuals">Shares</TabsTrigger>
            </TabsList>
            <TabsContent value="individuals" className="space-y-4">
              <ClientTransactions />
            </TabsContent>
            <TabsContent value="groups" className="space-y-4">
              <Groups />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Transactions;
