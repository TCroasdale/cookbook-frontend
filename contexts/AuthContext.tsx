import { useStorageState } from "@/lib/storage";
import React, { createContext, use, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (tkn: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (tkn: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('secure_token');

  return (
    <AuthContext
      value={{
        signIn: (token : string) => {
          // Perform sign-in logic here
          setSession(token)
        },
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext>
  );
}
