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

function Signup() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center min-h-[calc(100vh-50rem)] my-10">
      <Card className="w-[30rem]">
        <CardHeader>
          <CardHeader className="text-2xl pl-0 pb-0">
            Create your account
          </CardHeader>
          <CardDescription className="pb-8">
            Enter your email and password to create your notes.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input></Input>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input></Input>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={theme === "dark" ? "outline" : "default"}>
            Signup
          </Button>
          <Link to="/login">Already have an account?</Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default transition(Signup);
