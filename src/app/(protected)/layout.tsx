"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@/context/SessionContext";
import Sidenav from "@/components/Sidenav";
import AuthNavbar from "@/components/Authnavbar";
import { ChainLoader } from "@/components/ChainLoader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session?.isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div>
          <ChainLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidenav />
      <div className="flex-1 md:ml-64 w-full fixed z-50">
        <AuthNavbar
          userName={session?.user?.name || "Guest"}
          isAuthenticated={!!session?.isAuthenticated}
        />
      </div>
      <main className="md:ml-64 pt-16">
        <div>{children}</div>
      </main>
    </div>
  );
}
