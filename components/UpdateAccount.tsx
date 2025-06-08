"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User } from "@/types/props";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
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

interface AccountProps {
  user: User;
  loginInfo: User | undefined | null;
  setIsUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: () => void;
}

export default function UpdateAdmin({
  user,
  loginInfo,
  setIsUpdateDialogOpen,
  mutate,
}: AccountProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    permission: user.permission,
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.permission
    ) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      permission: formData.permission,
      ...(formData.password && { password: formData.password }),
    };

    try {
      const response = await fetch(`/api/settings/accounts/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        toast.success(data.message || "Account updated successfully.");
        if (mutate) mutate();
      } else {
        toast.error(data.error || "Updating account failed. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Network error. Please try again.");
      }
    } finally {
      setIsUpdateDialogOpen(false);
      setIsLoading(false);
    }
  };

  // Trap focus within the dialog
  useEffect(() => {
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, []);

  return (
    <DialogContent
      className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto"
      ref={dialogRef}
    >
      <DialogHeader>
        <DialogTitle>Update Account Details</DialogTitle>
        <DialogDescription>
          Make changes to account information here. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              aria-describedby="name-error"
            />
            {!formData.name && (
              <p id="name-error" className="text-red-500 text-sm">
                Name is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              aria-describedby="email-error"
              disabled={loginInfo?.role === "admin" ? false : true}
            />
            {!formData.email && (
              <p id="email-error" className="text-red-500 text-sm">
                Email is required
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              defaultValue={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
              disabled={loginInfo?.role === "admin" ? false : true}
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="role-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent id="role-select-content">
                <SelectGroup>
                  <SelectLabel>Select role</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="temp-admin">Temp-Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="permission">Permission</Label>
            <Select
              defaultValue={formData.permission}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, permission: value }))
              }
              disabled={loginInfo?.role === "admin" ? false : true}
              required
            >
              <SelectTrigger
                className="w-full"
                aria-controls="permission-select-content"
                aria-expanded={false}
              >
                <SelectValue placeholder="Select permission" />
              </SelectTrigger>
              <SelectContent id="permission-select-content">
                <SelectGroup>
                  <SelectLabel>Select permission</SelectLabel>
                  <SelectItem value="---">No Access</SelectItem>
                  <SelectItem value="r--">Read Only</SelectItem>
                  <SelectItem value="-w-">Write Only</SelectItem>
                  <SelectItem value="--x">Execute Only</SelectItem>
                  <SelectItem value="rw-">Read and Write</SelectItem>
                  <SelectItem value="r-x">Read and Execute</SelectItem>
                  <SelectItem value="-wx">Write and Execute</SelectItem>
                  <SelectItem value="rwx">Read, Write, and Execute</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <CustomButton
            title="Save changes"
            loadingTitle="Updating..."
            variant="default"
            isLoading={isLoading}
          />
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
