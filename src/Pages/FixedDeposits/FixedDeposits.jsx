import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { FixedIndividuals } from "./Components/FixedIndividual";
  // import { Individuals } from "../Transactions/Components/Individuals/ClientTransactions";
  const FixedDeposits = () => {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>fixed deposits</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-col md:flex">
          <div className="border-b" />
          <div className="flex-1 space-y-4 p-0 pt-2">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">My Fixed Deposits</h2>
            </div>
            <div className="space-y-4">
                <FixedIndividuals />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default FixedDeposits;