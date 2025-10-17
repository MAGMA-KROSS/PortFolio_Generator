"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `http://localhost:5000/api/v1/projects?page=${page}&limit=10&search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) return console.error("Fetch failed:", res.status);

      const data = await res.json();
      setProjects(data.results || []);
      setTotalPages(Math.ceil((data.total || data.results.length) / 10)); // fallback
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, search]);

  const handleEdit = (id: string) => router.push(`/admin/projects/${id}`);
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/api/v1/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#121212", color: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>Admin Dashboard</h1>

      <input
        type="text"
        placeholder="Search by title or ID"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #333",
          backgroundColor: "#1e1e1e",
          color: "#f0f0f0",
        }}
      />

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e1e1e" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #444" }}>
            <th style={{ padding: "10px" }}>Image</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Description</th>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} style={{ borderBottom: "1px solid #333" }}>
              <td style={{ padding: "10px" }}>
                <img
  src={project.imageUrl ? `/images/${project.imageUrl}` : "https://via.placeholder.com/150?text=No+Image"}
  alt={project.title}
  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
/>

              </td>
              <td style={{ padding: "10px" }}>{project.title}</td>
              <td style={{ padding: "10px" }}>{project.description}</td>
              <td style={{ padding: "10px" }}>{project._id}</td>
              <td style={{ padding: "10px" }}>
                <button onClick={() => handleEdit(project._id)} style={{ marginRight: "8px" }}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
