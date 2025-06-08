"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        // router.push("/auth/signin?error=logout_failed");
        router.back();
      }
    }

    logout();
  }, [router]); // Add router to the dependency array
}
