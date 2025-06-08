"use client";

import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";

export default function Page() {
  const handleClick = (apiName: string) => {
    console.log("Api name : " + apiName);
  };

  return (
    <AdminLayout>
      <section className="w-full flex flex-col h-auto p-5">
        <div className="bg-white shadow-md rounded-lg p-5 pb-10">
          <h2 className="font-semibold text-lg pb-3">API&apos;s Information</h2>
          <div className="flex flex-col items-start gap-1">
            <Button variant="link" onClick={() => handleClick("students")}>
              1. Students API&apos;s
            </Button>
            <Button variant="link" onClick={() => handleClick("teachers")}>
              2. Teachers API&apos;s
            </Button>
            <Button variant="link" onClick={() => handleClick("admin")}>
              3. Admins API&apos;s
            </Button>
            <Button variant="link" onClick={() => handleClick("temp-admin")}>
              4. Temp Admins API&apos;s
            </Button>
            <Button variant="link" onClick={() => handleClick("auth")}>
              5. Auth API&apos;s
            </Button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
