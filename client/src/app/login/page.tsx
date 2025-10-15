"use client";
import { useState, FormEvent } from "react";
import axios from "axios";

// SVG Icon components for clarity (e.g., from Heroicons)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    setIsSuccess(false);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setMessage("Login successful!");
      setIsSuccess(true);
      console.log(res.data);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
      setIsSuccess(false);
    }
  };

  return (
    <>

      {/* The animated Glassmorphism Dialog Box */}
      <div className="login-dialog w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-300">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          {/* Email Input with Icon & Validation */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400"><UserIcon /></span>
            <input
              id="email"
              type="email"
              placeholder=" " // Required for the floating label to work correctly
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full bg-transparent text-white border-b-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-purple-500'} focus:ring-0 outline-none p-2 pl-10 transition duration-300`}
            />
            <label
              htmlFor="email"
              className="absolute left-10 -top-3.5 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
            >
              Email Address
            </label>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Input with Icon & Validation */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400"><LockIcon /></span>
            <input
              id="password"
              type="password"
              placeholder=" " // Required for the floating label to work correctly
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`peer w-full bg-transparent text-white border-b-2 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-purple-500'} focus:ring-0 outline-none p-2 pl-10 transition duration-300`}
            />
            <label
              htmlFor="password"
              className="absolute left-10 -top-3.5 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
            >
              Password
            </label>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button with Interactive States */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-purple-600/40"
          >
            Sign In
          </button>
        </form>

        {/* Login Status Message */}
        {message && (
          <p className={`mt-4 text-center font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}