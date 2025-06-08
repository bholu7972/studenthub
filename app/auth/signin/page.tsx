"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { toast } from "sonner";
// import { getCookie } from "cookies-next";

// Define form schema
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// Define API response interface
interface SignInResponse {
  user: {
    role: string;
  };
  message?: string;
}

// Define role-to-route mapping
const roleRoutes: Record<string, string> = {
  admin: "/admin/dashboard",
  "temp-admin": "/admin/dashboard",
  student: "/students/dashboard",
  teacher: "/teachers/dashboard",
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const userRole = getCookie("role");
  //   userRole === "admin" || userRole === "temp-admin"
  //     ? router.push("/admin/dashboard")
  //     : userRole === "student"
  //     ? router.push("/students/dashboard")
  //     : router.push("/teachers/dashboard");
  // }, [router]);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data: SignInResponse = await response.json();
      setIsLoading(false);

      if (response.ok) {
        const { user } = data;
        if (!user?.role) {
          toast.error("Invalid user data received");
          return;
        }
        // Redirect based on role
        const route = roleRoutes[user.role] || "/dashboard"; // Fallback route
        router.push(route);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Sign-in error:", error);
      toast.error("Network error. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {isLoading ? (
        // <Loading title="Authenticating..." />
        <Loading size="md" />
      ) : (
        <div className="w-full md:w-[460px] flex flex-col gap-4 border p-6 m-1 md:p-10 bg-white rounded-md">
          <h2 className="text-center text-2xl font-bold mb-5">SignIn Panel</h2>
          <p className="text-center text-sm text-slate-700 mb-6">
            Step Into Success: Join Us and Elevate Your Learning!
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
              <div className="flex mt-4 flex-col">
                <p className="text-sm text-gray-500">
                  I. Don&apos;t have an account?
                  <Link
                    href="/auth/signup"
                    className="underline underline-offset-1 pl-[3px]"
                  >
                    signup
                  </Link>
                </p>
                <p className="text-sm text-gray-500">
                  II. Forgot password? We&apos;ll send you a reset link
                  <Link
                    href="/auth/reset-password"
                    className="underline underline-offset-1 pl-[3px]"
                  >
                    reset password
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
