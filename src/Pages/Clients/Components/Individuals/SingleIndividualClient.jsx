import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/MiddleWares/Hooks/useAxiosPrivate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSummary from "./Components/AccountSummary";

const SingleIndividualClient = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  const {
    data = [],
    isLoading,
    refetch,
    isRefetching,
    isError,
  } = useQuery({
    queryKey: ["individuals-data", params.id],
    queryFn: async () => {
      const fetchURL = `/clients/individual/${params.id}`;
      try {
        const response = await axiosPrivate.get(fetchURL);
        if (!response.data.data) {
          throw new Error(response?.data?.message);
        }
        return response.data.data;
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate("/", { state: { from: location }, replace: true });
        }
        throw new Error(error?.response?.data?.message);
      }
    },
  });
  // console.log(isError);
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="/clients">Clients</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <p className="capitalize hover:uppercase">
                {`${data?.client?.firstname} ${data?.client?.middlename} ${data?.client?.lastname} (${data?.client?.account})`}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:flex">
        <div className="border-b" />
        <div className="flex-1 space-y-4 pt-2">
          <Tabs defaultValue="summary" className="space-y-4">
            <div className="flex justify-end">
              <TabsList className="overflow-x-auto scroll-smooth snap-x snap-start scrollbar-hide">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="loans">Loans</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="shares">Shares</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="summary" className="space-y-4">
              <AccountSummary
                data={data?.client}
                isLoading={isLoading}
                refetch={refetch}
                isRefetching={isRefetching}
                isError={isError}
              />
            </TabsContent>
            <TabsContent value="accounts" className="space-y-4">
              Accounts
            </TabsContent>
            <TabsContent value="loans" className="space-y-4">
              Loans
            </TabsContent>
            <TabsContent value="loans" className="space-y-4">
              Loans
            </TabsContent>
            <TabsContent value="communication" className="space-y-4">
              Communication
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SingleIndividualClient;
