// src/app/admin/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link href="/admin/posts" className="hover:bg-gray-700 p-2 rounded">
            Posts
          </Link>
          {/* Add more sections later */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
}
