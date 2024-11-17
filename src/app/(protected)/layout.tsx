"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidenav from "@/components/Sidenav";
import AuthNavbar from "@/components/Authnavbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidenav />
      <div className="flex-1 md:ml-64 w-full fixed z-50">
        <AuthNavbar
          userName={session?.user?.name || "Guest"}
          isAuthenticated={!!session}
        />
      </div>
      <main className="md:ml-64 pt-16">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
