import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // const { user, signIn, signOut } = useAuth();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   await signIn(email, password);
    // } catch (error) {
    //   toast.error("Invalid credentials");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Booking.com
            </Link>

            <div>
              {/* {user ? (
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-900">
                  Sign Out
                </button>
              ) : ( */}
              <form onSubmit={handleSignIn} className="flex gap-2">
                {/* <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 py-1 border rounded"
                  /> */}
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <a href="/signup"> Sign Up</a>
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <a href="/signin"> Sign In</a>
                </button>
              </form>
              {/* )} */}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Booking.com  . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
