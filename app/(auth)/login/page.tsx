"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ResponseJsonData {
  success: boolean;
  message: string;
}

const LoginPage = () => {

  const router = useRouter()

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toastId = toast.loading("Account is being created...");
    const formData = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });
      const data: ResponseJsonData = await res.json();
      if (data.success) {
        toast.success(data.message, {
          id: toastId,
        });
      } else {
        toast.error(data.message, {
          id: toastId,
        });
      }
      router.refresh();
      router.push('/')
    } catch (err) {
      toast.error(err as string, {
        id: toastId,
      });
    }
  };
  return (
    <div className="container min-h-screen flex items-center justify-center">
      <Card className="lg:w-[30%] shadow-xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to book your movies</CardDescription>
        </CardHeader>
        <form onSubmit={onFormSubmit}>
          <CardContent className="grid items-center gap-y-4">
            <div className="grid items-center gap-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email..."
                required
              />
            </div>

            <div className="grid items-center gap-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password..."
                required
              />
            </div>
          </CardContent>
          <CardFooter className="grid items-center gap-y-4">
            <p className="text-center">
              Don&apos;t have an account&#63; Please{" "}
              <Link className="text-blue-600" href="/register">
                register
              </Link>
            </p>
            <Button type="submit" className="w-full font-semibold">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
