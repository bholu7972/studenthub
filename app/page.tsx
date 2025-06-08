// className="dark:invert"
{
  /*<a
  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
  href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
></a> */
}

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Student Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your academic journey with our comprehensive student
            management system
          </p>
          <div className="flex justify-center items-center flex-col sm:flex-row gap-4 w-full">
            <Link href="/auth/signin" target="_self" rel="noopener noreferrer">
              <Button variant="link" size="lg">
                SignIn panel
              </Button>
            </Link>
            {/* <Link href="/auth/signin">
              <Button size="lg">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="link" size="lg">
                Student Portal
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
