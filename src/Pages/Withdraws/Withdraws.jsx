import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { WithdrawsIndividuals } from "./Components/WithdrawsIndividuals";

  const Withdraws = () => {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Withdraws</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-col md:flex">
          <div className="border-b" />
          <div className="flex-1 space-y-4 p-0 pt-2">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">My Withdraws</h2>
            </div>
            <div className="space-y-4">
                <WithdrawsIndividuals />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Withdraws;