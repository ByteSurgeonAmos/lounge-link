import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      rememberMe?: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    rememberMe?: boolean;
  }

  interface JWT {
    id?: string;
    rememberMe?: boolean;
  }
}
