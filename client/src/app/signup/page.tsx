"use client";
import { useState, FormEvent } from "react";
import axios from "axios";

// SVG Icon components for each input field
const NameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // --- Form Validation ---
    const validateForm = () => {
        const newErrors = { name: "", email: "", password: "" };
        let isValid = true;

        if (!name) {
            newErrors.name = "Name is required.";
            isValid = false;
        }

        if (!email) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid.";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // --- Handle Signup Submission ---
    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop if validation fails

        setIsSuccess(false);
        setMessage("");

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/signup",
                { name, email, password },
                { withCredentials: true }
            );
            setMessage("Signup successful! You can now log in.");
            setIsSuccess(true);
            console.log(res.data);
            // Clear form on success
            setName("");
            setEmail("");
            setPassword("");

        } catch (err: any) {
            setMessage(err.response?.data?.message || "An error occurred during signup.");
            setIsSuccess(false);
        }
    };

    return (
        <>
            {/* The animated Glassmorphism Dialog Box */}
            <div className="login-dialog w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-gray-300">Join us and start your journey</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6" noValidate>
                    {/* Name Input with Icon & Validation */}
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400"><NameIcon /></span>
                        <input
                            id="name"
                            type="text"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`peer w-full bg-transparent text-white border-b-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-400 focus:border-purple-500'} focus:ring-0 outline-none p-2 pl-10 transition duration-300`}
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-10 -top-3.5 text-gray-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        >
                            Full Name
                        </label>
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Input with Icon & Validation */}
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400"><EmailIcon /></span>
                        <input
                            id="email"
                            type="email"
                            placeholder=" "
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
                            placeholder=" "
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white font-bold p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-purple-600/40"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Status Message */}
                {message && (
                    <p className={`mt-4 text-center font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
                
                {/* Link to Login Page */}
                <p className="text-center text-sm text-gray-300">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-purple-400 hover:text-purple-300">
                        Sign In
                    </a>
                </p>
            </div>
        </>
    );
}
