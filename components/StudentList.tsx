"use client";

import { useState, useMemo, useEffect } from "react";
import useSWR, { KeyedMutator } from "swr";
import { CirclePlus } from "lucide-react";
import NameFilter from "@/components/NameFilter";
import Loading from "@/components/Loading";
import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddStudent from "@/components/AddStudent";
import { User, Student } from "@/types/props";
// import { toast } from "sonner";

interface Permissions {
  canView: boolean;
  canWrite: boolean;
}

interface StudentListProps {
  loginInfo: User | undefined | null;
}

// Fetcher with error handling
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  return res.json();
};

export default function StudentList({ loginInfo }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInClass = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-4";
  const transitionClass = "transition-all duration-300 ease-in-out";

  const {
    data: students,
    error,
    isLoading,
    mutate,
  } = useSWR<Student[]>("/api/settings/students", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  // Parse permissions with validation
  const permissions: Permissions = {
    canView: loginInfo?.permission?.charAt(0) === "r" || false,
    canWrite: loginInfo?.permission?.charAt(1) === "w" || false,
  };

  // Sort students by schlor_no
  const sortedStudents = useMemo(() => {
    if (!students) return [];
    return [...students].sort((a, b) => {
      const getNumber = (schlor_no: string) => {
        const match = schlor_no.match(/\/(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      };
      return getNumber(a.schlor_no) - getNumber(b.schlor_no);
    });
  }, [students]);

  return (
    <>
      <div className="bg-gray-100 min-h-screen pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <section
            className={`bg-white shadow rounded-lg p-6 mb-8 ${fadeInClass} ${transitionClass}`}
          >
            <header
              className={` mb-8 ${fadeInClass} ${transitionClass} flex justify-between items-center`}
            >
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Student Section{" "}
                  <span className="text-indigo-500 text-xl ml-2 animate-pulse">
                    ✨
                  </span>
                </h1>
                <p className="text-sm text-gray-500">
                  Student section for admin to manage students.
                </p>
              </div>
              {permissions.canWrite && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="custom"
                      aria-label="Add new student"
                      disabled={!permissions.canWrite || isLoading}
                    >
                      <CirclePlus className="h-4 w-4" />
                      New Student
                    </Button>
                  </DialogTrigger>
                  <AddStudent
                    setIsOpen={setIsOpen}
                    mutate={mutate as KeyedMutator<Student[]>}
                  />
                </Dialog>
              )}
            </header>
            {isLoading ? (
              <Loading size="md" />
            ) : error ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-red-600">Failed to load students.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4 mb-6">
                  <form
                    className="w-full flex justify-center items-center gap-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Input
                      className="py-3 w-full lg:w-1/2 h-11"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search students"
                      autoComplete="off"
                      aria-label="Search students"
                      disabled={!permissions.canView}
                    />
                  </form>
                  {permissions.canView && (
                    <NameFilter
                      data={sortedStudents}
                      searchTerm={searchTerm}
                      accessData="student"
                      loginInfo={loginInfo}
                    />
                  )}
                </div>
                <div
                  className="grid grid-cols-1"
                  role="list"
                  aria-label="Student cards"
                >
                  {sortedStudents.length > 0 ? (
                    sortedStudents.map((student, index) => (
                      <Card
                        key={student._id}
                        index={index}
                        user={student}
                        accessData="student"
                        loginInfo={loginInfo}
                        mutate={mutate as KeyedMutator<Student[]>}
                      />
                    ))
                  ) : (
                    <p className="text-center col-span-full">
                      No students found.
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
