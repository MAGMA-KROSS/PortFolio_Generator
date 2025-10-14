"use client";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      setMessage("Signup successful!");
      console.log(res.data);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Signup failed");
      console.error(err);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </main>
  );
}
