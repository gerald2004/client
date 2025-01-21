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

const Clients = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/dashboard">Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Clients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:flex">
        <div className="border-b" />
        <div className="flex-1 space-y-4 p-0 pt-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          </div>
          <Tabs defaultValue="individuals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="individuals">Individuals</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
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

export default Clients;
