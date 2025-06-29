"use client";

import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function DocsClient({ docs }) {
  const [search, setSearch] = useState('');
  const filteredDocs = useMemo(() => {
    if (!search.trim()) return docs;
    return docs.filter(doc =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, docs]);

  // Use a consistent date format to avoid hydration issues
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar Navigation */}
      <aside className="hidden md:block w-64 flex-shrink-0 sticky top-0 h-screen p-8 bg-gray-900/80 border-r border-gray-800">
        <h2 className="text-2xl font-bold mb-8 gradient-text">Docs</h2>
        <nav className="space-y-2">
          {docs.map(doc => (
            <a
              key={doc.filename}
              href={`#${doc.title.replace(/\s+/g, '-')}`}
              className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-blue-600/20 hover:text-blue-400 transition-colors font-medium"
            >
              {doc.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold gradient-text">Documentation</h1>
          <input
            type="text"
            placeholder="Search docs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <ul className="mb-8 space-x-4 flex flex-wrap">
          {filteredDocs.map(doc => (
            <li key={doc.filename}>
              <a href={`#${doc.title.replace(/\s+/g, '-')}`} className="text-blue-400 hover:underline text-lg font-medium">
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
        {filteredDocs.length === 0 && (
          <div className="text-gray-400 text-lg mt-12">No documentation found for your search.</div>
        )}
        {filteredDocs.map(doc => (
          <section key={doc.filename} id={doc.title.replace(/\s+/g, '-')}
            className="mb-12 bg-gray-800/70 rounded-2xl p-8 border border-gray-700 shadow-lg card-hover animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{doc.title}</h2>
            <div className="prose prose-invert max-w-none text-gray-200">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{doc.content}</ReactMarkdown>
            </div>
          </section>
        ))}
        <div className="text-center text-xs text-gray-500 mt-16">
          Last updated: {currentDate} &middot; Powered by Next.js &amp; React Markdown
        </div>
      </main>
    </div>
  );
} 