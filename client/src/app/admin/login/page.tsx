"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("=== Attempting admin login ===");
    console.log("Email entered:", email);
    console.log("Password entered:", password);

    try {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status code:", res.status);

      const text = await res.text(); // read raw response
      console.log("Raw response text:", text);

      let data;
      try {
        data = JSON.parse(text); // parse JSON if possible
        console.log("Parsed response JSON:", data);
      } catch (jsonErr) {
        console.error("Failed to parse JSON:", jsonErr);
        setError("Server returned non-JSON response");
        return;
      }

      if (!res.ok) {
        console.error("Login failed:", data.message || "Unknown error");
        setError(data.message || "Login failed");
        return;
      }

      // Save token and role in localStorage
      console.log("Login successful, storing token and role...");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", "admin");

      // Redirect to dashboard
      console.log("Redirecting to /admin/dashboard");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Server error during login:", err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLoginPage;
