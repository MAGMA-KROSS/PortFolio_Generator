"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`http://localhost:5000/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch project");
        const data: Project = await res.json();
        setProject(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        alert("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        alert("Project updated!");
      } else {
        alert("Update failed!");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Project deleted!");
        router.push("/admin/dashboard");
      } else {
        alert("Delete failed!");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {project?.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginBottom: "20px" }}
        />
      )}

      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Edit Project
      </h1>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px", minHeight: "120px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={handleUpdate}
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          style={{
            padding: "10px 20px",
            background: "#f44336",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
