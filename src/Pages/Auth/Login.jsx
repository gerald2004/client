import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "@/Config/Axios";
import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import useAuth from "@/MiddleWares/Hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Login = ({ className, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const [disabled, setDisabled] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/verify";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const onLoginAction = async (data) => {
    try {
      setDisabled(true);
      const otp_status = !location.state?.from?.pathname ? "yes" : "no";
      data.otp_status = otp_status;
      const response = await axios.post("/auth/advanced/sessions", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      const accessToken = response?.data?.data?.accessToken;
      console.log(accessToken);
      const sessionid = response?.data?.data?.sessionId;
      console.log(sessionid);
      const client= response?.data?.data?.client;
      console.log(client);
      setAuth({ sessionid, accessToken, client });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setDisabled(false);
      const errorMessage =
        error?.response?.data?.messages || "No server response";
      toast({
        title: "Uh oh! Something went wrong.",
        variant: "destructive",
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div>
      <div className="container relative flex flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-zinc-900"
            style={{ backgroundImage: `url('/login2.png')` }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/logo.png" className="w-[30px] h-[30px]" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <footer className="text-sm">
                Powered by Mobitungo © 2025 Ahuriire (U) LTD
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] px-4">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your account number below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn("grid gap-4", className)} {...props}>
                  <form
                    onSubmit={handleSubmit(onLoginAction)}
                    autoComplete="off"
                  >
                    <div className="grid gap-2">
                      <div className="grid gap-1">
                        <Label htmlFor="account_number">Account Number</Label>
                        <Input
                          id="account_number"
                          placeholder="100200300"
                          type="number"
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                          disabled={disabled}
                          {...register("account_number", { required: true })}
                        />
                        {errors.account_number && (
                          <p className="text-red-600 text-sm">
                            Account Number is required
                          </p>
                        )}
                      </div>
                      {/* <div className="grid gap-1 relative">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link
                            to="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          placeholder="****************"
                          type={showPassword ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="new-password"
                          autoCorrect="off"
                          disabled={disabled}
                          {...register("password", { required: true })}
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility}
                          style={{ bottom: "-22px" }}
                        >
                          {showPassword ? (
                            <Icons.eyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Icons.eye className="h-5 w-5 text-gray-500" />
                          )}
                        </span>
                        {errors.password && (
                          <p className="text-red-600 text-sm">
                            Password is required
                          </p>
                        )}
                      </div> */}
                      <Button disabled={disabled}>
                        {disabled && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
};

export default Login;
