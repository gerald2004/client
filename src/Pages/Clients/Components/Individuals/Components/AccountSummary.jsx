/* eslint-disable react/prop-types */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BioInformation from "./BioInformation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Briefcase,
  FileText,
  Folder,
  Settings,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";

const AccountSummary = ({
  data,
  isLoading,
  refetch,
  isRefetching,
  isError,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" }); // Mobile screens

  return (
    <div className="flex gap-6">
      <Tabs defaultValue="bio" className="flex w-full">
        <TabsList className="flex flex-col justify-start w-1/6 border-r shadow-lg rounded-lg h-full p-4">
          <TabsTrigger
            value="bio"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? (
              <User className="w-5 h-5 mx-auto" />
            ) : (
              "Bio Information"
            )}
          </TabsTrigger>

          <TabsTrigger
            value="contact"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <Phone className="w-5 h-5 mx-auto" /> : "Contacts"}
          </TabsTrigger>
          <TabsTrigger
            value="emails"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <Mail className="w-5 h-5 mx-auto" /> : "Emails"}
          </TabsTrigger>
          <TabsTrigger
            value="address"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <MapPin className="w-5 h-5 mx-auto" /> : "Addresses"}
          </TabsTrigger>

          <TabsTrigger
            value="beneficiary"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <Users className="w-5 h-5 mx-auto" /> : "Beneficiary"}
          </TabsTrigger>
          <TabsTrigger
            value="employment"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? (
              <Briefcase className="w-5 h-5 mx-auto" />
            ) : (
              "Employment History"
            )}
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <FileText className="w-5 h-5 mx-auto" /> : "Documents"}
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <Folder className="w-5 h-5 mx-auto" /> : "Business"}
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="lg:w-full py-3 text-left rounded-md hover:bg-black hover:text-white focus:bg-gray-200 focus:text-white transition"
          >
            {isMobile ? <Settings className="w-5 h-5 mx-auto" /> : "Settings"}
          </TabsTrigger>
        </TabsList>

        {/* Main Content Section */}
        <div className="flex-1 px-2 rounded-sm shadow-lg overflow-y-auto">
          <TabsContent value="bio">
            <BioInformation
              data={data}
              isLoading={isLoading}
              refetch={refetch}
              isRefetching={isRefetching}
              isError={isError}
            />
          </TabsContent>
          <TabsContent value="accounts">
            <h3 className="text-lg font-semibold">Accounts</h3>
            <p>Details about the client’s accounts go here...</p>
          </TabsContent>
          <TabsContent value="loans">
            <h3 className="text-lg font-semibold">Loans</h3>
            <p>Details about the client’s loans go here...</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AccountSummary;
