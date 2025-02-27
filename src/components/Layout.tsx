import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Booking.com
            </Link>
            <div>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Xin chào, {user.email}</span>
                  <button
                    onClick={signOut}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/signup"
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Sign Up
                  </Link>
                  <Link
                    to="/signin"
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="bg-white border-t mt-12 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Booking.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
