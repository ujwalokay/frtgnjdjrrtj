import { createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  role: "admin" | "staff";
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isStaff: boolean;
  canMakeChanges: boolean;
  deviceRestricted: boolean;
  onboardingCompleted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, user }: { children: ReactNode; user: User | null }) {
  // No authentication - everyone has admin access
  const isAdmin = true;
  const isStaff = false;
  
  const canMakeChanges = true;
  const deviceRestricted = false;
  const onboardingCompleted = true;

  return (
    <AuthContext.Provider value={{ user, isAdmin, isStaff, canMakeChanges, deviceRestricted, onboardingCompleted }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
