"use client";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setMessage("Login successful!");
      console.log(res.data);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Login</button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </main>
  );
}
