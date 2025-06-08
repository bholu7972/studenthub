"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import { User } from "@/types/props";

// Define a type for the return value of LoginInfo
interface LoginInfoResult {
  user: User | undefined;
  error: FetchError | undefined; // Use our custom error type
  isLoading: boolean;
}

// Define a custom error type that extends the built-in Error and includes status
interface FetchError extends Error {
  status?: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: FetchError = new Error(`Failed to fetch ${url}: ${res.statusText}`);
    error.status = res.status; // Now TypeScript knows about the potential 'status'
    throw error;
  }
  return res.json() as Promise<User>; // Expecting the API to return a User object
};

export default function LoginInfo(): LoginInfoResult {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { data: user, error, isLoading } = useSWR<User, FetchError>( // Specify the error type for useSWR
    userId ? `/api/login-info/${userId}` : null,
    fetcher
  );

  useEffect(() => {
    const idFromCookie = getCookie("id");
    if (idFromCookie) {
      setUserId(idFromCookie as string | undefined); // Type assertion as getCookie can return undefined
    }
  }, [setUserId]);

  // console.log("User data from LoginInfo : ", user);

  return { user, error, isLoading }; // Now we directly return the entire user object
}