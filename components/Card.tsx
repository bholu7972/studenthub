"use client";

import { useState, useCallback } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ViewAccount from "@/components/ViewAccount";
import UpdateAccount from "@/components/UpdateAccount";
import DeleteAccount from "@/components/DeleteAccount";
import ViewStudent from "@/components/ViewStudent";
import UpdateStudent from "@/components/UpdateStudent";
import DeleteStudent from "@/components/DeleteStudent";
import { User, Student } from "@/types/props";

interface CardProps {
  index: number;
  user: User | Student;
  accessData: "account" | "student";
  loginInfo: User | undefined | null;
  mutate: () => void;
}

export default function Card({
  index,
  user,
  accessData,
  loginInfo,
  mutate,
}: CardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const canView = loginInfo?.permission?.charAt(0) === "r";
  const canWrite = loginInfo?.permission?.charAt(1) === "w";
  const canDelete = loginInfo?.permission?.charAt(2) === "x";

  const userEmail =
    accessData === "account"
      ? (user as User).email
      : (user as Student).email_id;
  const isDefaultAdmin = userEmail === process.env.NEXT_PUBLIC_DEFAULT_ADMIN;
  const isActiveUserDefaultAdmin =
    loginInfo?.email === process.env.NEXT_PUBLIC_DEFAULT_ADMIN;

  const handleUpdateDialogChange = useCallback((open: boolean) => {
    setIsUpdateDialogOpen(open);
  }, []);

  const handleDeleteDialogChange = useCallback((open: boolean) => {
    setIsDeleteDialogOpen(open);
  }, []);

  return (
    // <div className="flex w-full flex-col glassmorphic px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-primary/20">
    <div className="flex w-full flex-col px-4 rounded-lg">
      <div className="flex w-full items-center justify-between gap-3 px-3 py-1.5 border-b">
        <div className="flex flex-wrap items-center gap-3">
          <p>{`${index + 1}.`}</p>
          <h4>
            {isDefaultAdmin ? (
              <span>
                Admin Account <small>(Primary)</small>
              </span>
            ) : accessData === "account" ? (
              <span>
                {(user as User).name} | {(user as User).role}
              </span>
            ) : (
              <div>
                <span>{(user as Student).name}</span>
              </div>
            )}
            {(user as Student).withdrawl && accessData === "student" && (
              <span className="text-red-500"> (Withdrawn)</span>
            )}
          </h4>
        </div>
        <div className="flex items-center justify-evenly gap-2">
          {/* View Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="custom"
                aria-label={`View ${
                  accessData === "account"
                    ? (user as User).name
                    : (user as Student).name
                }`}
                disabled={
                  isActiveUserDefaultAdmin ? false : isDefaultAdmin || !canView
                }
              >
                <Eye className="text-blue-500 size-6" />
              </Button>
            </DialogTrigger>
            {accessData === "account" ? (
              <ViewAccount user={user as User} loginInfo={loginInfo} />
            ) : (
              <ViewStudent user={user as Student} loginInfo={loginInfo} />
            )}
          </Dialog>

          {/* Update Dialog */}
          <Dialog
            open={isUpdateDialogOpen}
            onOpenChange={handleUpdateDialogChange}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="custom"
                aria-label={`Update ${
                  accessData === "account"
                    ? (user as User).name
                    : (user as Student).name
                }`}
                disabled={
                  isActiveUserDefaultAdmin ? false : isDefaultAdmin || !canWrite
                }
              >
                <Pencil className="text-green-600 size-5" />
              </Button>
            </DialogTrigger>
            {accessData === "account" ? (
              <UpdateAccount
                user={user as User}
                loginInfo={loginInfo}
                setIsUpdateDialogOpen={setIsUpdateDialogOpen}
                mutate={mutate}
              />
            ) : (
              <UpdateStudent
                user={user as Student}
                loginInfo={loginInfo}
                setIsUpdateDialogOpen={setIsUpdateDialogOpen}
                mutate={mutate}
              />
            )}
          </Dialog>

          {/* Delete Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={handleDeleteDialogChange}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="custom"
                aria-label={`Delete ${
                  accessData === "account"
                    ? (user as User).name
                    : (user as Student).name
                }`}
                disabled={
                  isActiveUserDefaultAdmin
                    ? false
                    : isDefaultAdmin || !canDelete
                }
              >
                <Trash2 className="text-red-600 size-5" />
              </Button>
            </DialogTrigger>
            {accessData === "account" ? (
              <DeleteAccount
                user={user as User}
                loginInfo={loginInfo}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                mutate={mutate}
              />
            ) : (
              <DeleteStudent
                user={user as Student}
                loginInfo={loginInfo}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                mutate={mutate}
              />
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
}
