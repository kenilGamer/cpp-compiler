"use client";

import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function DocsClient({ docs }) {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const filteredDocs = useMemo(() => {
    if (!search.trim()) return docs;
    return docs.filter(doc =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, docs]);

  // Use a consistent date format to avoid hydration issues
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [filteredDocs]);

  // Highlight search terms in content
  const highlightSearchTerms = (text) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-400/30 text-yellow-200 px-1 rounded">$1</mark>');
  };

  // Extract headings for table of contents
  const extractHeadings = (content) => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2],
        id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
    return headings;
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-slate-900  via-blue-900/20 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
            transform: 'translate(50%, 50%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Enhanced Sidebar Navigation */}
      <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-0 h-screen bg-slate-900/95 border-r border-slate-700/50 backdrop-blur-xl shadow-2xl ">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-8 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Documentation
            </h2>
          </div>
          
          {/* Enhanced Search in sidebar */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`relative w-full px-4 py-3 rounded-xl bg-slate-800/60 border transition-all duration-500 ${
                isSearchFocused 
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/30 scale-105' 
                  : 'border-slate-600/50 hover:border-slate-500/50 hover:scale-102'
              } text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm`}
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <nav className="space-y-2">
            {docs.map((doc, index) => {
              const isActive = activeSection === doc.title.replace(/\s+/g, '-');
              const isVisible = filteredDocs.includes(doc);
              return (
                <a
                  key={doc.filename}
                  href={`#${doc.title.replace(/\s+/g, '-')}`}
                  className={`group block px-4 py-3 rounded-xl transition-all duration-500 font-medium transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/40 shadow-xl shadow-blue-500/20 backdrop-blur-sm'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-200 hover:shadow-lg hover:shadow-slate-500/10'
                  } ${!isVisible ? 'opacity-50' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-blue-400/50 scale-150' 
                        : 'bg-slate-600 group-hover:bg-slate-500'
                    }`} />
                    <span className="transition-all duration-300 group-hover:translate-x-1">{doc.title}</span>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Enhanced Quick stats */}
          <div className="mt-8 p-4 bg-gradient-to-br from-slate-800/40 to-slate-700/40 rounded-xl border border-slate-600/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group">
            <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Documentation Stats
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 group-hover:text-blue-300 transition-colors duration-300">Total: {docs.length}</span>
              <span className="text-slate-300 group-hover:text-purple-300 transition-colors duration-300">Found: {filteredDocs.length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 max-w-5xl mx-auto py-8 px-4 lg:px-8">
        {/* Mobile header */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:bg-slate-700/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Documentation
              </h1>
            </div>
            <button
              onClick={() => setShowTableOfContents(!showTableOfContents)}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:bg-slate-700/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile search */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="relative w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-600/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Mobile navigation */}
          {showTableOfContents && (
            <div className="mt-4 p-4 bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-xl animate-in slide-in-from-top-2 duration-300">
              <nav className="space-y-2">
                {docs.map(doc => (
                  <a
                    key={doc.filename}
                    href={`#${doc.title.replace(/\s+/g, '-')}`}
                    onClick={() => setShowTableOfContents(false)}
                    className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700/60 hover:text-slate-200 transition-all duration-300 hover:scale-105"
                  >
                    {doc.title}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Desktop header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.history.back()}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:bg-slate-700/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 animate-in slide-in-from-left duration-1000">
                Documentation
              </h1>
              <p className="text-slate-400 text-lg animate-in slide-in-from-left duration-1000 delay-200">
                Comprehensive guide to C++ Compiler features and SQL tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              {filteredDocs.length} of {docs.length} docs
            </div>
          </div>
        </div>

        {/* Enhanced Breadcrumb navigation */}
        {search && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm shadow-lg animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-2 text-sm text-blue-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search results for "{search}" • {filteredDocs.length} matches found
            </div>
          </div>
        )}

        {/* Enhanced Quick navigation pills */}
        <div className="mb-8 flex flex-wrap gap-3">
          {filteredDocs.map((doc, index) => (
            <a
              key={doc.filename}
              href={`#${doc.title.replace(/\s+/g, '-')}`}
              className="group px-4 py-2 rounded-full bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/50 text-slate-300 hover:from-blue-600/30 hover:to-purple-600/30 hover:text-slate-200 transition-all duration-500 text-sm font-medium hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="transition-all duration-300 group-hover:translate-x-1">{doc.title}</span>
            </a>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-800/60 to-slate-700/60 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No documentation found</h3>
            <p className="text-slate-400">Try adjusting your search terms or browse all documentation.</p>
          </div>
        )}

        {filteredDocs.map((doc, docIndex) => {
          const headings = extractHeadings(doc.content);
          return (
            <section 
              key={doc.filename} 
              id={doc.title.replace(/\s+/g, '-')}
              className="group mb-12 bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 rounded-2xl p-8 border border-slate-600/50 shadow-2xl backdrop-blur-xl hover:shadow-3xl hover:shadow-blue-500/10 transition-all animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${docIndex * 200}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">
                  {doc.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-800/40 px-3 py-1 rounded-full border border-slate-600/50">
                  <span>•</span>
                  <span>{headings.length} sections</span>
                </div>
              </div>

              {/* Enhanced Table of contents for this section */}
              {headings.length > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-xl border border-slate-600/30 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-500">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Table of Contents
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {headings.slice(0, 6).map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className="group/toc px-3 py-1 rounded-lg bg-slate-700/40 text-slate-300 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-purple-600/30 hover:text-slate-200 transition-all duration-300 text-sm hover:scale-105"
                        style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
                      >
                        <span className="transition-all duration-300 group-hover/toc:translate-x-1">{heading.text}</span>
                      </a>
                    ))}
                    {headings.length > 6 && (
                      <span className="px-3 py-1 text-slate-400 text-sm">
                        +{headings.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="prose prose-invert max-w-none text-slate-200 prose-headings:text-slate-100 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-300 prose-strong:text-slate-100 prose-code:text-blue-300 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-700/50">
                <ReactMarkdown 
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    // Custom components for better styling
                    h1: ({children}) => <h1 className="text-2xl font-bold mb-4 mt-8 first:mt-0 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{children}</h1>,
                    h2: ({children}) => <h2 className="text-xl font-semibold mb-3 mt-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{children}</h2>,
                    h3: ({children}) => <h3 className="text-lg font-medium text-slate-100 mb-2 mt-4">{children}</h3>,
                    p: ({children}) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                    code: ({children, className}) => {
                      if (className) {
                        return <code className={`${className} bg-slate-900/60 px-2 py-1 rounded text-blue-300 text-sm border border-slate-600/50 shadow-sm`}>{children}</code>;
                      }
                      return <code className="bg-slate-900/60 px-2 py-1 rounded text-blue-300 text-sm border border-slate-600/50 shadow-sm">{children}</code>;
                    },
                    pre: ({children}) => <pre className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-600/50 rounded-xl p-4 overflow-x-auto mb-4 shadow-lg backdrop-blur-sm">{children}</pre>,
                    ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-300">{children}</ol>,
                    li: ({children}) => <li className="text-slate-300">{children}</li>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-4 italic text-slate-400 mb-4 bg-slate-800/30 rounded-r-lg py-2">{children}</blockquote>,
                    table: ({children}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse border border-slate-600/50 rounded-lg overflow-hidden shadow-lg">{children}</table></div>,
                    th: ({children}) => <th className="border border-slate-600/50 px-4 py-2 bg-gradient-to-r from-slate-800/60 to-slate-700/60 text-slate-200 font-semibold">{children}</th>,
                    td: ({children}) => <td className="border border-slate-600/50 px-4 py-2 text-slate-300 bg-slate-800/20">{children}</td>,
                  }}
                >
                  {doc.content}
                </ReactMarkdown>
              </div>
            </section>
          );
        })}

        {/* Enhanced footer */}
        <div className="text-center py-12 border-t border-slate-700/50">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-slate-400 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-600/50 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last updated: {currentDate}
            </div>
            <div className="flex items-center gap-2 text-slate-400 bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-600/50 backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by Next.js & React Markdown
            </div>
          </div>
          <p className="text-sm text-slate-500 bg-slate-800/30 px-4 py-2 rounded-full border border-slate-600/30 backdrop-blur-sm inline-block">
            Built with ❤️ for developers
          </p>
        </div>
      </main>
    </div>
  );
} 