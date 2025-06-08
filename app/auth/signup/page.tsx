"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import Loading from "@/components/Loading";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  role: z.enum(["student", "teacher"], {
    message: "Please select a valid role.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// Define API response interface
interface SignUpResponse {
  message?: string;
  error?: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data: SignUpResponse = await response.json();
      setIsLoading(false);

      if (response.ok) {
        toast.success(data.message || "Registration successful");
        // Redirect to sign-in page after a delay to show toast
        setTimeout(() => router.push("/auth/signin"), 2000);
      } else {
        toast.error(
          data.error || data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Sign-up error:", error);
      toast.error("Network error. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {isLoading ? (
        <Loading size="md" />
      ) : (
        <div className="w-full max-w-md flex flex-col gap-6 border p-6 md:p-8 bg-white rounded-lg shadow-md m-4">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <p className="text-center text-sm text-slate-600 mb-4">
            Your Journey Begins Here: Sign Up to Unlock Endless Possibilities!
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              aria-label="Sign-up form"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Roles</SelectLabel>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="underline underline-offset-2 text-blue-600 hover:text-blue-800"
                  >
                    Sign in
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
