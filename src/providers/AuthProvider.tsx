import { createContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      // Here you would typically make an API call to your authentication endpoint
      // For now, we'll just simulate a successful login
      setUser({
        id: "1",
        email: email,
      });
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error("Failed to sign in");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
