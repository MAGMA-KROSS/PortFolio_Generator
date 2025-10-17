'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrl: string;
}

export default function PostsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/projects?page=${page}&limit=10&search=${search}`
      );
      const data = await res.json();

      setProjects(data.results);
      setTotalPages(Math.ceil((data.total || data.results.length) / 10));
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/projects/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Posts</h1>

      <input
        type="text"
        placeholder="Search by title or ID"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #333',
          backgroundColor: '#1e1e1e',
          color: '#f0f0f0'
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e1e1e' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #444' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Created At</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '10px' }}>
                <img src={p.imageUrl} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
              </td>
              <td style={{ padding: '10px' }}>{p.title}</td>
              <td style={{ padding: '10px' }}>{p.description}</td>
              <td style={{ padding: '10px' }}>{p._id}</td>
              <td style={{ padding: '10px' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                <Link
                  href={`/admin/projects/${p._id}`}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    textDecoration: 'none'
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#333',
            color: '#f0f0f0',
            border: 'none',
            borderRadius: '4px',
            cursor: page <= 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#333',
            color: '#f0f0f0',
            border: 'none',
            borderRadius: '4px',
            cursor: page >= totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
