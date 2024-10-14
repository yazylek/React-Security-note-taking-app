import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import transition from "@/transition";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password, email } = data;

    try {
      const response = await api.post("/auth/public/signup", {
        username,
        password,
        email,
      });
      toast.success("Account created successfully");
      reset();
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      if (
        error?.response?.data?.message === "Error: Username is already taken!"
      ) {
        toast.error("Username is already taken");
      }

      if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        toast.error("Email is already taken");
      }

      console.log(error);
    }
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-50rem)] my-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[30rem]">
          <CardHeader>
            <CardHeader className="text-2xl pl-0 pb-0">
              Create your account
            </CardHeader>
            <CardDescription className="pb-8">
              Enter your credentials to create new account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username", {
                  required: "username is required",
                  minLength: {
                    value: 3,
                    message: "username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "username must be less than 20 characters",
                  },
                })}
              ></Input>
              {errors.username && (
                <p className="text-[#EF4444] font-bold">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 3,
                    message: "Email must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Email must be less than 20 characters",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              ></Input>
              {errors.email && (
                <p className="text-[#EF4444] font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "password must be less than 20 characters",
                  },
                })}
                type="password"
              ></Input>
              {errors.password && (
                <p className="text-[#EF4444] font-bold">
                  {errors.password.message}{" "}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant={theme === "dark" ? "outline" : "default"}>
              Signup
            </Button>
            <Link to="/login">Already have an account?</Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default transition(Signup);
