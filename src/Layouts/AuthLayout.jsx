import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import useAuth from "@/MiddleWares/Hooks/useAuth";
import useLogout from "@/MiddleWares/Hooks/useLogout";

const AuthLayout = () => {
  const [notifications, setNotifications] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown
  const { setTheme } = useTheme();
  const { auth } = useAuth();
  const initials = `${auth?.client?.firstname[0]} ${auth?.client?.lastname[0]}`.toUpperCase();
 
  const logout = useLogout();
  const navigate = useNavigate();

  const handleDropdownClose = () => setDropdownOpen(false);

  const signOut = async () => {
    await logout();
    navigate("/");
    handleDropdownClose();
  };

  useEffect(() => {
    setNotifications(0);
  }, []);

  return (
    <div className="flex flex-col">
      <SidebarProvider>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="hidden lg:block fixed top-0 w-64 h-full">
            <AppSidebar />
          </div>
          <div className="lg:hidden">
            <SidebarTrigger className="w-12 h-12 p-2 text-xl" />
          </div>
          <div className="flex-grow lg:ml-64">
            <div className="sticky top-0 bg-background z-10 flex items-center justify-between p-4">
              <div className="hidden md:flex items-center space-x-4 ml-auto">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="md:w-[100px] lg:w-[200px]"
                />
                <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <div className="relative">
                  <Bell className="w-6 h-7 cursor-pointer" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {notifications}
                    </span>
                  )}
                </div>

                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger asChild>
                      <Avatar
                        className="cursor-pointer h-9 w-9"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                      >
                        <AvatarImage src="#" alt="User Avatar" />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </MenubarTrigger>
                    {dropdownOpen && ( // Show only if dropdown is open
                      <MenubarContent
                        align="end"
                        className="z-20"
                        onClickOutside={handleDropdownClose} // Automatically close on outside click
                      >
                        <MenubarItem>
                          <Link to="/profile" className="w-full block" onClick={handleDropdownClose}>
                            Profile
                          </Link>
                        </MenubarItem>
                        <MenubarItem>
                          <span>Settings</span>
                        </MenubarItem>
                        {/* <MenubarSeparator /> */}
                        <MenubarItem>
                          <span onClick={signOut}>Logout</span>
                        </MenubarItem>
                      </MenubarContent>
                    )}
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>

            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AuthLayout;
