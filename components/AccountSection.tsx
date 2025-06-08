"use client";

import { useState, useCallback } from "react";
import { CirclePlus } from "lucide-react";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import NameFilter from "@/components/NameFilter";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import CreateAccount from "@/components/CreateAccount";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Loading from "@/components/Loading";
import ErrorComponent from "@/components/Error";
import { User } from "@/types/props";


// API fetcher function
const fetcher = async (url: string): Promise<User[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch admins");
  }
  return res.json();
};

export default function AccountSection({
  loginInfo,
}: {
  loginInfo: User | undefined | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<User[], Error>(
    "/api/settings/accounts",
    fetcher
  );

  const canView = loginInfo?.permission?.charAt(0) === "r";
  const canWrite = loginInfo?.permission?.charAt(1) === "w";

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  return (
    <section
      className="flex w-full flex-col"
      role="region"
      aria-label="Account Management"
    >
      <div className="rounded-lg bg-white p-5">
        <div aria-live="polite" aria-busy={isLoading}>
          {isLoading ? (
            <Loading size="sm" />
          ) : error ? (
            <ErrorComponent error={error.message || "Error loading data"} />
          ) : (
            <>
              {canWrite && (
                <div className="mb-2 flex flex-wrap justify-end gap-3 px-2 py-2">
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="custom"
                        aria-label="Create new account"
                        disabled={!canWrite}
                      >
                        <CirclePlus className="h-4 w-4" />
                        New Account
                      </Button>
                    </DialogTrigger>
                    <CreateAccount
                      setIsOpen={setIsOpen}
                      loginInfo={loginInfo}
                      mutate={mutate}
                    />
                  </Dialog>
                </div>
              )}
              {canView && (
                <div className="mb-8 flex flex-wrap justify-between gap-3 px-2 py-2">
                  <form className="flex w-full items-center justify-center gap-4">
                    <Input
                      className="h-11 w-full py-3 lg:w-1/2"
                      id="search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search accounts"
                      autoComplete="off"
                      aria-label="Search accounts"
                      disabled={!canView}
                    />
                  </form>
                  {data && (
                    <NameFilter
                      data={data}
                      searchTerm={searchTerm}
                      accessData="account"
                      loginInfo={loginInfo}
                    />
                  )}
                </div>
              )}
              {canView && data && (
                <div className="mt-5 flex flex-wrap justify-center px-2 py-3 md:px-5">
                  {data.map((user, index) => (
                    <Card
                      key={`${user._id}-${index}`}
                      index={index}
                      user={user}
                      accessData="account"
                      loginInfo={loginInfo}
                      mutate={mutate}
                    />
                  ))}
                </div>
              )}
              {canView && data?.length === 0 && (
                <div className="mt-5 text-center text-sm text-gray-600">
                  No admins found.
                </div>
              )}
              {!canView && (
                <div className="mt-5 text-center text-sm text-gray-600">
                  Restricted Access: You do not have permission to view this
                  admin section information.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
