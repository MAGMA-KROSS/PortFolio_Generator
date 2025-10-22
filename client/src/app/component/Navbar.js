"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const [NavSlide, setNavSlide] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if access token exists in localStorage
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();

    // Optional: Listen for storage changes (for multi-tab sync)
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");

      // Update state
      setIsLoggedIn(false);

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sticky top-0 z-25 md:p-12">
      {/* Desktop Header */}
      <header className="text-purple-500 hidden md:block body-font backdrop-blur-xl bg-white/3 border-1 border-gray-200/40 rounded-full">
        <div className="container mx-auto flex flex-wrap p-5 justify-center md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-2xl text-white">MagmaBuilder</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex text-white flex-wrap items-center text-base justify-center">
            <Link
              href="/"
              className="mr-5 hover:text-purple-500 transition-all duration-250 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              href="/Portfolios"
              className="mr-5 hover:text-purple-500 transition-all duration-250 relative group"
            >
              Portfolios
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              href="/About"
              className="mr-5 hover:text-purple-500 transition-all duration-250 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              href="/#Contact"
              className="mr-5 hover:text-purple-500 transition-all duration-250 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* Auth Button - Desktop */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-6 py-2 font-semibold rounded-full bg-gradient-to-r from-white to-gray-200 text-black shadow-lg hover:shadow-gray-500/50 cursor-pointer hover:scale-105 transition-all duration-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="text-purple-500 relative block md:hidden z-25 body-font">
        <div className="container mx-auto flex flex-wrap p-5 justify-center flex-col">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <svg
                onClick={() => {
                  setNavSlide(!NavSlide);
                }}
                className="scale-110 mr-2 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>

              <Link
                href="/"
                className="flex title-font font-medium items-center text-gray-900"
              >
                <span className="text-2xl text-white">MagmaBuilder</span>
              </Link>
            </div>

            {/* Auth Button - Mobile (Top Right) */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 text-sm rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          <nav
            className={`md:ml-auto md:mr-auto flex text-white mt-4 ml-4 transition-all duration-300 flex-wrap ${
              NavSlide ? "-translate-x-[0]" : "-translate-x-[200%] h-0"
            } relative flex-col text-base justify-center`}
          >
            <Link
              href="/#Hero"
              className="mr-5 border-1 border-gray-200/40 p-2 pl-5 hover:text-purple-500 text-center transition-all duration-250"
              onClick={() => setNavSlide(false)}
            >
              Home
            </Link>
            <Link
              href="/About"
              className="mr-5 border-1 border-gray-200/40 p-2 pl-5 hover:text-purple-500 text-center transition-all duration-250"
              onClick={() => setNavSlide(false)}
            >
              About
            </Link>
            <Link
              href="/Portfolios"
              className="mr-5 border-1 border-gray-200/40 p-2 pl-5 hover:text-purple-500 text-center transition-all duration-250"
              onClick={() => setNavSlide(false)}
            >
              Portfolios
            </Link>
            <Link
              href="/#Contact"
              className="mr-5 border-1 border-gray-200/40 p-2 pl-5 hover:text-purple-500 text-center transition-all duration-250"
              onClick={() => setNavSlide(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;