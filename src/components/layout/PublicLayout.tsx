import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";

const PublicLayout = () => {
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header/Navigation */}
      <header className="backdrop-blur-md bg-black/30 border-b border-gray-800 fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">YS</span>
            </div>
            <h1 className="text-xl font-bold">Yield Sx</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="hover:text-blue-400 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="hover:text-blue-400 transition-colors"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex space-x-4">
            {user ? (
              <>
                <Link to={isAdmin ? "/admin" : "/dashboard"}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    {isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-blue-400 hover:bg-gray-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">YS</span>
              </div>
              <h1 className="text-xl font-bold">Yield Sx</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              <a
                href="#features"
                className="hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="hover:text-blue-400 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="hover:text-blue-400 transition-colors"
              >
                Testimonials
              </a>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-400 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Yield Sx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
