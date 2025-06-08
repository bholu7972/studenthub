"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "./CustomButton";
import { User } from "@/types/props";

// Define the schema for the form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  role: z.string().nonempty({
    message: "Please select a role.",
  }),
  permission: z.string().nonempty({
    message: "Please select a permission.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Define the props type for CreateAdmin
interface AccountProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loginInfo: User | undefined | null;
  mutate: () => void;
}

export default function CreateAccount({
  setIsOpen,
  loginInfo,
  mutate,
}: AccountProps) {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      permission: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/settings/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        toast.success(data.message || "Account created successfully");
        form.reset();
        // Revalidate to ensure consistency
        if (mutate) mutate();
      } else {
        toast.error(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Account</DialogTitle>
        <DialogDescription>
          Enter details for the new account account. Click create when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter name" {...field} />
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
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        {loginInfo?.email ===
                          process.env.NEXT_PUBLIC_DEFAULT_ADMIN && (
                          <SelectItem value="admin">Admin</SelectItem>
                        )}
                        <SelectItem value="temp-admin">Temp-Admin</SelectItem>
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
            name="permission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permission</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Permissions</SelectLabel>
                        <SelectItem value="---">No Access</SelectItem>
                        <SelectItem value="r--">Read Only</SelectItem>
                        {loginInfo?.email ===
                          process.env.NEXT_PUBLIC_DEFAULT_ADMIN && (
                          <>
                            <SelectItem value="-w-">Write Only</SelectItem>
                            <SelectItem value="--x">Execute Only</SelectItem>
                            <SelectItem value="rw-">Read and Write</SelectItem>
                            <SelectItem value="r-x">
                              Read and Execute
                            </SelectItem>
                            <SelectItem value="-wx">
                              Write and Execute
                            </SelectItem>
                            <SelectItem value="rwx">
                              Read, Write, and Execute
                            </SelectItem>
                          </>
                        )}
                        {loginInfo?.email !==
                          process.env.NEXT_PUBLIC_DEFAULT_ADMIN &&
                          loginInfo?.role === "admin" && (
                            <>
                              <SelectItem value="-w-">Write Only</SelectItem>
                              <SelectItem value="rw-">
                                Read and Write
                              </SelectItem>
                            </>
                          )}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomButton
            title="Submit"
            loadingTitle="Creating..."
            variant="default"
            isLoading={isLoading}
          />
        </form>
      </Form>
    </DialogContent>
  );
}