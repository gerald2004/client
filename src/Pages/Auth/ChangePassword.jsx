import { Button } from "@/components/ui/button";
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

const ChangePassword = ({ className, ...props }) => {
    const isLoading = false;

    const onSubmit = async (event) => {
        event.preventDefault();
        const oldPassword = event.target.oldPassword.value;
        const newPassword = event.target.newPassword.value;

        // Handle change password logic here
        console.log("Changing password", { oldPassword, newPassword });
    };

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="password-change">Change Password</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Change Password</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <div className="container relative flex flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                    <div className="flex items-center justify-center w-full h-full lg:p-8">
                        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Change Password
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your current password and set a new password.
                                </p>
                            </div>

                            <div className={cn("grid gap-6", className)} {...props}>
                                <form onSubmit={onSubmit} className="mt-4">
                                    <div className="grid gap-3">
                                        <div className="grid gap-1">
                                            <Label htmlFor="oldPassword">Old Password</Label>
                                            <Input
                                                id="oldPassword"
                                                name="oldPassword"
                                                placeholder="Enter old password"
                                                type="password"
                                                autoComplete="current-password"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="grid gap-1">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input
                                                id="newPassword"
                                                name="newPassword"
                                                placeholder="Enter new password"
                                                type="password"
                                                autoComplete="new-password"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <Button
                                            disabled={isLoading}
                                            type="submit"
                                            className="mt-3 w-full"
                                        >
                                            {isLoading && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Change Password
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

ChangePassword.propTypes = {
    className: PropTypes.string,
    props: PropTypes.object,
};

export default ChangePassword;
