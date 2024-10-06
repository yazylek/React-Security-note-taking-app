import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import transition from "@/transition";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMyContext } from "../../store/ContextApi.jsx";
import { jwtDecode } from "jwt-decode";

function Login() {
  const { theme } = useTheme();
  const [jwtToken, setJwtToken] = useState("");
  const [step, setStep] = useState(1);
  const { setToken, token } = useMyContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));

    setToken(token);

    navigate("/notes");
  };

  const onLoginSubmit = async (data) => {
    try {
      console.log(data);
      const response = await api.post("/auth/public/signin", data);

      toast.success("Login Successful!");
      reset();

      if (response.status === 200 && response.data.jwtToken) {
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        if (decodedToken) {
          handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        }
      }
    } catch (error) {
      if (error) {
        toast.error("Invalid Credentials");
      }
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="flex justify-center min-h-[calc(100vh-50rem)] my-10">
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <Card className="w-[30rem]">
          <CardHeader>
            <CardHeader className="text-2xl pl-0 pb-0">
              Login to Notees
            </CardHeader>
            <CardDescription className="pb-8">
              Enter your email and password to access your notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                placeholder="Type your username"
              ></Input>
              {errors.username && (
                <p className="text-red font-bold">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Type your password"
              ></Input>
              {errors.password && (
                <p className="text-red font-bold">{errors.password.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              required={isSubmitting}
              type="submit"
              value={isSubmitting ? "Submitting..." : "Login"}
              variant={theme === "dark" ? "outline" : "default"}
            >
              Login
            </Button>
            <Link to="/signup">Don't have an account?</Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default transition(Login);
