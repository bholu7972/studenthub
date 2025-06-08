import { redirect } from "next/navigation";

export default function RedirectToSignIn() {
  redirect("/auth/signin");
}