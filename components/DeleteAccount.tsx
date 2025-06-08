"use client";

import { useState, useCallback } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CustomButton from "@/components/CustomButton";
import { User } from "@/types/props";

interface DeleteProps {
  _id: string;
}

interface AccountProps {
  user: DeleteProps;
  loginInfo: User | undefined | null;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: () => void;
}

export default function DeleteAccount({
  user,
  loginInfo,
  setIsDeleteDialogOpen,
  mutate,
}: AccountProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (loginInfo?.role !== "admin") {
        toast.error("Restricted Access", {
          description:
            "You do not have permission to delete accounts. Contact your administrator.",
          duration: 4000,
        });
        setIsDeleteDialogOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/settings/accounts/${user._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to delete account.");
        }

        toast.success(data.message || "Account deleted successfully.");
        mutate();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Network error. Please try again.");
      } finally {
        setIsLoading(false);
        setIsDeleteDialogOpen(false);
      }
    },
    [loginInfo, user._id, mutate, setIsDeleteDialogOpen]
  );

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this account? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogFooter>
          <CustomButton
            title="Delete"
            loadingTitle="Deleting..."
            variant="destructive"
            isLoading={isLoading}
          />
        </DialogFooter>
      </form>
    </DialogContent>
  );
}