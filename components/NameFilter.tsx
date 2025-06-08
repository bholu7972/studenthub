"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewStudent from "@/components/ViewStudent";
import ViewAccount from "@/components/ViewAccount";
import { Student, User } from "@/types/props";
import StarButton from "@/components/StarButton";

// Define possible values for accessData
type AccessData = "account" | "student";

// Define props for NameFilter
interface NameFilterProps {
  data: Student[] | User[];
  searchTerm: string;
  accessData: AccessData;
  loginInfo: User | Student | undefined | null;
}

export default function NameFilter({
  data,
  searchTerm,
  accessData,
  loginInfo,
}: NameFilterProps) {
  const [open, setIsOpen] = useState(false);
  // Filter users based on search term
  const filteredNames = searchTerm
    ? data.filter((user) =>
        accessData === "student"
          ? // For students, search name, f_name, m_name
            (["name", "f_name", "m_name"] as const).some(
              (field) =>
                typeof (user as Student)[field] === "string" &&
                (user as Student)[field]
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
          : // For admins, search only name
            typeof (user as User).name === "string" &&
            (user as User).name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  // Hide container if searchTerm is empty
  if (!searchTerm) {
    return null;
  }
  console.log(open);

  return (
    <div
      className="w-full border border-gray-300 p-4 flex justify-center items-center gap-3 flex-wrap rounded-md"
      role="list"
      aria-label={`Filtered ${accessData} names`}
    >
      {filteredNames.length > 0 ? (
        filteredNames.map((user) => (
          <Dialog key={user._id}>
            <DialogTrigger asChild>
              <StarButton title={user.name} onClick={() => setIsOpen(true)} />
              {/* <button
                className="border border-gray-500 px-4 py-1 rounded-full text-gray-900 hover:bg-gray-100 cursor-pointer outline-0"
                aria-label={`View ${user.name}`}
              >
                {user.name}
              </button> */}
            </DialogTrigger>
            {accessData === "student" ? (
              <ViewStudent
                user={user as Student}
                loginInfo={loginInfo as User}
              />
            ) : accessData === "account" ? (
              <ViewAccount user={user as User} loginInfo={loginInfo as User} />
            ) : null}
          </Dialog>
        ))
      ) : (
        <p className="text-gray-600">No record found!</p>
      )}
    </div>
  );
}
