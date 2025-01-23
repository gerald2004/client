import {  Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

const Profile = ({ className, ...props }) => {
  const isLoading = false;

  const onSubmit = async (event) => {
    event.preventDefault();
    // Handle profile update logic
  };

  return (
    <>
      <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="profile">Profile</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
    <div>
      <div className="container relative flex flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          {/* <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/logo.png" className="w-[30px] h-[30px]" alt="Logo" />
            iRembo Finance
          </div> */}
          {/* <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <footer className="text-sm">
                Powered by Mobitungo © 2024 Ahuriire (U) LTD
              </footer>
            </blockquote>
          </div> */}
        </div>

        <div className="flex items-center justify-center w-full h-full lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Update Profile
              </h1>
              <p className="text-sm text-muted-foreground">
                Update your profile details
              </p>
            </div>

            <div className={cn("grid gap-6", className)} {...props}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      autoComplete="name"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-1">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      placeholder="Administrator"
                      type="text"
                      disabled={isLoading}
                    />
                  </div>

                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
};

export default Profile;
