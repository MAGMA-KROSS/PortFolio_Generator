"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/projects", { withCredentials: true })
      .then((res) => setProjects(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ul className="mt-4">
        {projects.map((p: any, idx: number) => (
          <li key={idx} className="border p-3 my-2 rounded">
            {p.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
