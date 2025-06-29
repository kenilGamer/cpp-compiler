"use client";
import React, { useState, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Godcarft | Online Compiler</title>
</head>
<body>

  <!-- Navbar -->
  <header>
    <h2>Godcarft</h2>
    <nav>
      <a href="#features">Features</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <!-- Hero -->
  <section class="hero">
    <h1>Build, Run & Code Online</h1>
    <p>Create and execute C++, Python, Java & JS code right in your browser. No installs, just type and run!</p>
    <button onclick="window.location.href='https://www.godcarft.fun'">Try Compiler</button>
  </section>

  <!-- Features -->
  <section class="features" id="features">
    <div class="feature">
      <h3>Fast Editor</h3>
      <p>Built on Monaco – the editor behind VS Code.</p>
    </div>
    <div class="feature">
      <h3>Multi-language</h3>
      <p>Supports C++, Python, Java, JavaScript, and more.</p>
    </div>
    <div class="feature">
      <h3>Clean Output</h3>
      <p>See console output just like in a real terminal.</p>
    </div>
    <div class="feature">
      <h3>Mobile-Friendly</h3>
      <p>Use it on desktop, tablet, or even your phone.</p>
    </div>
  </section>

  <!-- About -->
  <section class="about" id="about">
    <h2>About Godcarft</h2>
    <p>
      Godcarft is a lightweight online compiler project built with modern web tech. It's perfect for testing snippets, practicing syntax, or learning new languages — all from the browser.
    </p>
  </section>

  <!-- Contact -->
  <section class="contact" id="contact">
    <h3>Want to collaborate?</h3>
    <button onclick="alert('Email: you@example.com')">Get in Touch</button>
  </section> 

  <!-- Footer -->
  <footer>
    &copy; 2025 Godcarft.fun | All rights reserved.
  </footer>

</body>
</html>
`;
const defaultCss = `   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #0f0f0f;
      color: #ffffff;
      line-height: 1.6;
    }
    header {
      background: #111;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #222;
    }
    nav a {
      color: #ccc;
      margin-left: 1.5rem;
      text-decoration: none;
      transition: 0.2s;
    }
    nav a:hover {
      color: #fd7330;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
    }
    .hero h1 {
      font-size: 2.8rem;
      margin-bottom: 1rem;
      color: #fd7330;
    }
    .hero p {
      color: #aaa;
      max-width: 600px;
      margin: 0 auto 2rem;
    }
    .hero button {
      background: #fd7330;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.2s;
    }
    .hero button:hover {
      background: #ff8b50;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2rem;
      padding: 4rem 2rem;
      background: #1a1a1a;
    }
    .feature {
      background: #222;
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 1px solid #333;
    }
    .feature h3 {
      margin-bottom: 0.5rem;
      color: #fd7330;
    }

    .about {
      padding: 4rem 2rem;
      text-align: center;
    }
    .about p {
      color: #bbb;
      max-width: 700px;
      margin: auto;
    }

    .contact {
      background: #111;
      text-align: center;
      padding: 2rem;
    }
    .contact button {
      background: transparent;
      color: #fd7330;
      border: 2px solid #fd7330;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.2s;
    }
    .contact button:hover {
      background: #fd7330;
      color: #111;
    }

    footer {
      background: #0a0a0a;
      text-align: center;
      padding: 1rem;
      font-size: 0.875rem;
      color: #555;
      border-top: 1px solid #222;
    }

    @media (max-width: 600px) {
      .hero h1 {
        font-size: 2rem;
      }
    }`;
const defaultJs = `document.body.style.border = '4px solid #4f46e5';`;

const tabNames = ['HTML', 'CSS', 'JS'];

export default function HtmlPlayground() {
  const [activeTab, setActiveTab] = useState('HTML');
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [srcDoc, setSrcDoc] = useState('');
  const iframeRef = useRef();
  const debounceRef = useRef();

  const runCode = () => {
    const code = `<!DOCTYPE html>\n<html>\n<head>\n<style>${css}</style>\n</head>\n<body>\n${html}\n<script>${js}<\/script>\n</body>\n</html>`;
    setSrcDoc(code);
  };

  // Auto-run on change with debounce
  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(runCode, 500);
    return () => clearTimeout(debounceRef.current);
  }, [html, css, js]);

  // Run once on mount
  React.useEffect(() => { runCode(); }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', background: '#23232b' }}>
        <div style={{ display: 'flex' }}>
          {tabNames.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '0.5rem',
                background: activeTab === tab ? '#18181b' : '#23232b',

                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #4f46e5' : '2px solid transparent',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          {activeTab === 'HTML' && (
            <MonacoEditor
              language="html"
              value={html}
              onChange={setHtml}
              options={{ theme: 'vs-dark', fontSize: 15, minimap: { enabled: false } }}
              height="100%"
            />
          )}
          {activeTab === 'CSS' && (
            <MonacoEditor
              language="css"
              value={css}
              onChange={setCss}
              options={{ theme: 'vs-dark', fontSize: 15, minimap: { enabled: false } }}
              height="100%"
            />
          )}
          {activeTab === 'JS' && (
            <MonacoEditor
              language="javascript"
              value={js}
              onChange={setJs}
              options={{ theme: 'vs-dark', fontSize: 15, minimap: { enabled: false } }}
              height="100%"
            />
          )}
        </div>
        <button
          onClick={runCode}
          style={{ margin: '1rem', padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Run ▶
        </button>
      </div>
      <div style={{ width: '50%', background: '#fff', height: '100%' }}>
        <iframe
          ref={iframeRef}
          title="Output"
          style={{ width: '100%', height: '100%', border: 'none',}}
          sandbox="allow-scripts allow-same-origin allow-modals"
          srcDoc={srcDoc}
        />
      </div>
    </div>
  );
} 