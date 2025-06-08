"use client";

import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";

interface UserButtonProps {
  redirectUrl: string;
  title: string;
  altText: string;
}

export default function Page() {
  const btnClasses =
    "bg-white shadow-md rounded-lg p-4 hover:bg-slate-50 flex justify-start items-start flex-col gap-0 h-22";

  const UserButton = ({ redirectUrl, title, altText }: UserButtonProps) => {
    const router = useRouter();
    return (
      <Button
        className={btnClasses}
        variant="ghost"
        onClick={() => router.push(redirectUrl)}
      >
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-slate-500 font-normal">{altText}</p>
      </Button>
    );
  };

  return (
    <AdminLayout>
      <div className="flex-grow p-6 bg-gray-100 min-h-screen">
        {/* Content Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserButton
            redirectUrl="/admin/settings/accounts"
            title="Manage Accounts"
            altText="all accounts info"
          />
          <UserButton
            redirectUrl="/admin/settings/apis"
            title="API's"
            altText="get API's info"
          />
        </section>
      </div>
    </AdminLayout>
  );
}
