/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef } from "react";
import { getInitials } from "@/lib/general-functions";

const BioInformation = ({
  data,
  isLoading,
  refetch,
  isRefetching,
  isError,
}) => {
  // File input refs
  const profileInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  // Open file manager
  const openFilePicker = (ref) => {
    if (ref.current) {
      ref.current.click(); // Open file manager
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 space-y-8">
      {isError ? (
        <div className="text-center">
          <p className="font-semibold mb-4">
            Failed to load data. Please try again.
          </p>
          <Button onClick={refetch} disabled={isRefetching}>
            {isRefetching ? "Retrying Please Wait..." : "Retry"}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6 border p-6 rounded-lg shadow-sm">
            <div className="flex gap-20 items-start">
              <div className="flex flex-col items-center space-y-2">
                {isLoading ? (
                  <Skeleton className="w-20 h-20 rounded-full" />
                ) : (
                  <>
                    <Avatar
                      className="w-20 h-20 cursor-pointer"
                      onClick={() => openFilePicker(profileInputRef)}
                    >
                      <AvatarImage
                        src={data?.image || ""}
                        alt="Profile Picture"
                      />
                      <AvatarFallback className="text-1xl font-semibold">
                        {getInitials(`${data?.firstname} ${data?.lastname}`)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-center">
                      Click to upload picture
                    </p>
                    <input
                      type="file"
                      ref={profileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        console.log(
                          "Profile image selected:",
                          e.target.files[0]
                        )
                      }
                    />
                  </>
                )}
              </div>

              {/* Signature Section in Box Format */}
              <div className="text-center space-y-2">
                {isLoading ? (
                  <Skeleton className="w-[120px] h-[80px]" />
                ) : (
                  <>
                    <div
                      className="w-30 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                      onClick={() => openFilePicker(signatureInputRef)}
                    >
                      {data?.signature ? (
                        <img
                          src={data.signature}
                          alt="Signature"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-sm font-semibold">Signature</span>
                      )}
                    </div>
                    <p className="text-sm">Click to upload signature</p>
                    <input
                      type="file"
                      ref={signatureInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        console.log(
                          "Signature image selected:",
                          e.target.files[0]
                        )
                      }
                    />
                  </>
                )}
              </div>

              {/* Bio Details */}
              <div className="space-y-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-60 mb-1" />
                    <Skeleton className="h-4 w-60 mb-1" />
                  </>
                ) : (
                  <>
                    <h6 className="font-bold capitalize">
                      {`${data?.firstname} ${data?.middlename ?? ""} ${
                        data?.lastname
                      }`}
                    </h6>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      <span className="capitalize">{data?.gender}</span>
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth:</span>{" "}
                      <span>{data?.date_of_birth}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-10">
                <Button>Update</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border p-6 rounded-lg shadow-sm">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex gap-x-4 items-center">
                  <Skeleton className="w-1/3 h-4" />
                  <Skeleton className="w-2/3 h-4" />
                </div>
              ))
            ) : (
              <>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Account No.</Label>
                  <span className="w-2/3">{data?.account}</span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Marital Status</Label>
                  <span className="w-2/3 capitalize">
                    {data?.martial_status || "None"}
                  </span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Dependants</Label>
                  <span className="w-2/3">{data?.children || "0"}</span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">
                    Employment Status
                  </Label>
                  <span className="w-2/3 capitalize">
                    {data?.employment_status || "None"}
                  </span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Disability</Label>
                  <span className="w-2/3">{data?.disability || "No"}</span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Date Of Joining</Label>
                  <span className="w-2/3">
                    {data?.date_of_joining || "None"}
                  </span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">NIN</Label>
                  <span className="w-2/3">
                    {data?.identification || "None"}
                  </span>
                </div>

                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Date Of Birth</Label>
                  <span className="w-2/3">{data?.date_of_birth || "None"}</span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Extra Notes</Label>
                  <span className="w-2/3">{data?.notes || "None"}</span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Branch</Label>
                  <span className="w-2/3">{data?.trackers?.branch}</span>
                </div>
                <div className="flex gap-x-4 items-center">
                  <Label className="w-1/3 font-semibold">Registered By</Label>
                  <span className="w-2/3">{data?.trackers?.user}</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BioInformation;
