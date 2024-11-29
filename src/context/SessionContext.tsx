// src/context/SessionContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface Session {
  user?: User;
  isAuthenticated: boolean;
}

interface Profile {
  isProfileComplete: boolean;
  subscriptionTier: string;
}

interface SessionContextProps {
  session: Session | null; // Current session data
  profile: Profile | null; // Current profile data
  hasFirstPost: boolean; // Has the user made their first post
  loading: boolean; // Is data being fetched
  error: string | null; // Errors encountered during fetch
  refreshSession: () => Promise<void>; // Refresh the session and profile data
  updateUser: (user: Partial<User>) => void; // Update user data
  updateProfile: (profile: Partial<Profile>) => void; // Update profile data
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hasFirstPost, setHasFirstPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch session and profile data from APIs
  const fetchSessionAndProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();

      setSession({ user: sessionData.user, isAuthenticated: true });

      const profileResponse = await fetch("/api/profile");
      const profileData = await profileResponse.json();

      setProfile(profileData);

      // Replace this logic with actual first post validation if needed.
      setHasFirstPost(false);
    } catch (err) {
      console.error(err);
      setSession({ isAuthenticated: false });
      setProfile(null);
      setHasFirstPost(false);
      setError("Failed to fetch session or profile data.");
    } finally {
      setLoading(false);
    }
  };

  // Allow child components to manually refresh session/profile
  const refreshSession = async () => {
    await fetchSessionAndProfile();
  };

  // Update user details (partial updates allowed)
  const updateUser = (user: Partial<User>) => {
    setSession((prev) => ({
      ...prev,
      user: { ...prev?.user, ...user },
    }));
  };

  // Update profile details (partial updates allowed)
  const updateProfile = (profile: Partial<Profile>) => {
    setProfile((prev) => ({
      ...prev,
      ...profile,
    }));
  };

  useEffect(() => {
    // Fetch session and profile on mount
    fetchSessionAndProfile();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        profile,
        hasFirstPost,
        loading,
        error,
        refreshSession,
        updateUser,
        updateProfile,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// Hook for using SessionContext in child components
export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
