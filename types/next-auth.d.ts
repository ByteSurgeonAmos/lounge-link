import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      rememberMe?: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    avatar?: string | null;
    rememberMe?: boolean;
  }

  interface JWT {
    id?: string;
    image?: string | null;
    rememberMe?: boolean;
  }
}
