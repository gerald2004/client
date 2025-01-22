import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Individuals } from "./Components/Individuals/Individuals";
import { Groups } from "./Components/Groups/Groups";

const Loans = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Loans</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:flex">
        <div className="border-b" />
        <div className="flex-1 space-y-4 p-0 pt-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">My Loans</h2>
          </div>
          <Tabs defaultValue="individuals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="individuals">Pending Applications</TabsTrigger>
              <TabsTrigger value="groups">Processed Loans</TabsTrigger>
              <TabsTrigger value="individuals">Approved Loans</TabsTrigger>
              <TabsTrigger value="groups">Active Loans</TabsTrigger>
              <TabsTrigger value="individuals">Settled Loans</TabsTrigger>
              <TabsTrigger value="individuals">Waivedoff Loans</TabsTrigger>
              <TabsTrigger value="individuals">Writtenoff</TabsTrigger>
            </TabsList>
            <TabsContent value="individuals" className="space-y-4">
              <Individuals />
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

export default Loans;
