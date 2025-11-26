"use client";

import React from 'react';
import HtmlPlayground from '../components/HtmlPlayground';

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl float-animation"
          style={{
            left: '20%',
            top: '20%',
            boxShadow: '0 0 100px rgba(0, 168, 204, 0.2)',
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-accent/10 to-cyan/10 rounded-full blur-3xl float-animation"
          style={{
            right: '20%',
            bottom: '20%',
            animationDelay: '1s',
            boxShadow: '0 0 100px rgba(12, 123, 147, 0.2)',
          }}
        />
        <div className="absolute inset-0 holographic opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,168,204,0.08),transparent_50%)]" />
      </div>

      {/* Premium Header */}
      <div className="relative border-b border-border-light glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-cyan rounded-lg flex items-center justify-center shadow-lg neon-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-cyan rounded-lg blur opacity-30" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text-neon">HTML Playground</h1>
                <p className="text-sm text-foreground-secondary">Edit HTML, CSS, and JavaScript in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground card-glass px-4 py-2 rounded-lg border border-border-light">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Live Preview
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <HtmlPlayground />
      </div>
    </div>
  );
}
    