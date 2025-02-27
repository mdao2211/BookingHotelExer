import { createContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

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

type JwtPayload = {
  email: string;
  sub: string;
  iat: number;
  exp: number;
};

// Hàm này sẽ đọc token từ localStorage và trả về thông tin user nếu token hợp lệ
function getInitialUser(): User | null {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return { id: decoded.sub, email: decoded.email };
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("jwtToken");
      return null;
    }
  }
  return null;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  // Khởi tạo state user ngay từ đầu dựa trên token có trong localStorage
  const [user, setUser] = useState<User | null>(getInitialUser());

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to sign in");
        throw new Error(result.message || "Failed to sign in");
      }

      // Lưu token vào localStorage
      localStorage.setItem("jwtToken", result.access_token);

      // Giải mã token và cập nhật state user ngay lập tức
      const decoded = jwtDecode<JwtPayload>(result.access_token);
      setUser({ id: decoded.sub, email: decoded.email });
      toast.success("Signed in successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem("jwtToken");
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
