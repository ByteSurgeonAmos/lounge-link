import Sidenav from "@/components/Sidenav";
import AuthNavbar from "@/components/Authnavbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidenav />
      <div className="flex-1 md:ml-64  w-full fixed z-50">
        <AuthNavbar userName="Amos" isAuthenticated={true} />
      </div>
      <main className="md:ml-64 pt-16">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
