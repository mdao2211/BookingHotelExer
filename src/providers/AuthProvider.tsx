import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
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
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Hàm lấy CSRF token có thể gọi lại từ nhiều nơi
  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/csrf-token", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch CSRF token");
      }
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/profile", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 401) {
          // Người dùng chưa đăng nhập, bỏ qua
          return;
        }
        throw new Error("Failed to fetch user");
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchCsrfToken();
    fetchUser();
  }, [fetchCsrfToken, fetchUser]);

  const signIn = async (email: string, password: string) => {
    try {
      // Nếu csrfToken chưa có, hãy fetch lại
      if (!csrfToken) {
        await fetchCsrfToken();
      }
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken || "",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to sign in");
      }
      toast.success("Signed in successfully");
      await fetchUser();
      // Sau khi đăng nhập, có thể token CSRF sẽ cần được cập nhật lại
      await fetchCsrfToken();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken || "",
        },
        credentials: "include",
      });
      setUser(null);
      toast.success("Signed out successfully");
      // Cập nhật lại CSRF token sau khi đăng xuất
      await fetchCsrfToken();
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
