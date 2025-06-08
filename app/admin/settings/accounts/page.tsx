"use client";

import AdminLayout from "@/components/AdminLayout";
import AccountSection from "@/components/AccountSection";
import Loading from "@/components/Loading";
import LoginInfo from "@/components/LoginInfo";
import Error from "@/components/Error";

export default function Page() {
  const { user, error, isLoading } = LoginInfo();

  return (
    <AdminLayout>
      {isLoading ? (
        <Loading size="md" />
      ) : error ? (
        <Error error={error.message || "Error loading data"} />
      ) : (
        <AccountSection loginInfo={user} /> // Correct way to pass the user object as a prop
      )}
    </AdminLayout>
  );
}
