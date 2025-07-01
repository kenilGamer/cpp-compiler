"use client";
import React, { useState, useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { DocumentDuplicateIcon, TrashIcon, PlayIcon } from "@heroicons/react/24/outline";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import parserCss from "prettier/plugins/postcss";
import parserBabel from "prettier/plugins/babel";

// --- Monaco Editor options (from @file_context_0) ---
const monacoOptions = {
  fontSize: 14,
  fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace",
  minimap: { enabled: false },
  wordWrap: "on",
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  scrollbar: { 
    vertical: "auto", 
    horizontal: "auto",
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8
  },
  lineNumbers: "on",
  glyphMargin: true,
  folding: true,
  lineDecorationsWidth: 20,
  lineNumbersMinChars: 3,
  renderLineHighlight: "all",
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: true,
  contextmenu: true,
  mouseWheelZoom: true,
  quickSuggestions: true,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  tabCompletion: "on",
  wordBasedSuggestions: true,
  parameterHints: {
    enabled: true
  },
  autoIndent: "full",
  formatOnPaste: true,
  formatOnType: true,
  bracketPairColorization: {
    enabled: true
  },
  guides: {
    bracketPairs: true,
    indentation: true
  }
};
// ---

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
const defaultJs = `console.log('Hello World');`;

const tabNames = ['HTML', 'CSS', 'JS', 'Console'];

export default function HtmlPlayground() {
  const [activeTab, setActiveTab] = useState('HTML');
  const [html, setHtml] = useState(defaultHtml);
  const [css, setCss] = useState(defaultCss);
  const [js, setJs] = useState(defaultJs);
  const [srcDoc, setSrcDoc] = useState('');
  const iframeRef = useRef();
  const debounceRef = useRef();
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [editorWidth, setEditorWidth] = useState(50); // percent
  const isResizing = useRef(false);

  // --- Begin: Add copy, clear, and run actions for each tab ---
  const copyToClipboard = async () => {
    let code = '';
    if (activeTab === 'HTML') code = html;
    else if (activeTab === 'CSS') code = css;
    else if (activeTab === 'JS') code = js;
    try {
      await navigator.clipboard.writeText(code);
      // Optionally, show a toast/notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const clearCode = () => {
    if (activeTab === 'HTML') setHtml('');
    else if (activeTab === 'CSS') setCss('');
    else if (activeTab === 'JS') setJs('');
  };

  const runCode = () => {
    setConsoleOutput('');

    let output = '';
    const log = (...args) => {
      output += args.join(' ') + '\n';
    };
    const error = (...args) => {
      output += 'Error: ' + args.join(' ') + '\n';
    };

    // Create a new function with user JS, override console
    const jsWithConsole = `
      (function() {
        const console = { log: (...args) => window.parent.postMessage({ type: 'log', args }, '*'), error: (...args) => window.parent.postMessage({ type: 'error', args }, '*') };
        try {
          ${js}
        } catch (e) {
          console.error(e);
        }
      })();
    `;

    const code = `<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'run-js') {
        try {
          eval(event.data.code);
        } catch (e) {
          window.parent.postMessage({ type: 'error', args: [e.message] }, '*');
        }
      }
    });
    window.parent.postMessage({ type: 'ready' }, '*');
  <\/script>
</body>
</html>`;

    setSrcDoc(code);

    // Listen for logs from iframe
    window.onmessage = (event) => {
      if (event.data.type === 'log') {
        setConsoleOutput((prev) => prev + event.data.args.join(' ') + '\n');
      }
      if (event.data.type === 'error') {
        setConsoleOutput((prev) => prev + 'Error: ' + event.data.args.join(' ') + '\n');
      }
    };

    // Send JS to iframe after it loads
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.contentWindow.postMessage({ type: 'run-js', code: jsWithConsole }, '*');
      }
    }, 500);
  };
  // --- End: Add copy, clear, and run actions for each tab ---

  // Auto-run on change with debounce
  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(runCode, 500);
    return () => clearTimeout(debounceRef.current);
  }, [html, css, js]);

  // Run once on mount
  React.useEffect(() => { runCode(); }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [dark, mounted]);

  // Safe way to access localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHtml(localStorage.getItem('html') || defaultHtml);
      setCss(localStorage.getItem('css') || defaultCss);
      setJs(localStorage.getItem('js') || defaultJs);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('html', html);
      localStorage.setItem('css', css);
      localStorage.setItem('js', js);
    }
  }, [html, css, js]);

  // On mount, load from localStorage
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    if (codeParam) {
      try {
        const data = JSON.parse(decodeURIComponent(escape(atob(codeParam))));
        setHtml(data.html || defaultHtml);
        setCss(data.css || defaultCss);
        setJs(data.js || defaultJs);
        return;
      } catch (e) {
        // fallback to localStorage if decode fails
      }
    }
    setHtml(localStorage.getItem('html') || defaultHtml);
    setCss(localStorage.getItem('css') || defaultCss);
    setJs(localStorage.getItem('js') || defaultJs);
    // eslint-disable-next-line
  }, []);

  function handleDownload() {
    let filename, content, type;
    if (activeTab === 'HTML') {
      filename = 'index.html';
      content = html;
      type = 'text/html';
    } else if (activeTab === 'CSS') {
      filename = 'style.css';
      content = css;
      type = 'text/css';
    } else if (activeTab === 'JS') {
      filename = 'script.js';
      content = js;
      type = 'text/javascript';
    }
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleShare() {
    // Encode all code as base64
    const data = {
      html,
      css,
      js
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    // Create shareable URL
    const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
    // Copy to clipboard
    navigator.clipboard.writeText(url);
    alert('Shareable link copied to clipboard!');
  }

  function handleFormat() {
    try {
      if (activeTab === "HTML") {
        const formatted = prettier.format(html, {
          parser: "html",
          plugins: [parserHtml],
        });
        setHtml(typeof formatted === "string" ? formatted : html);
      } else if (activeTab === "CSS") {
        const formatted = prettier.format(css, {
          parser: "css",
          plugins: [parserCss],
        });
        setCss(typeof formatted === "string" ? formatted : css);
      } else if (activeTab === "JS") {
        const formatted = prettier.format(js, {
          parser: "babel",
          plugins: [parserBabel],
        });
        setJs(typeof formatted === "string" ? formatted : js);
      }
    } catch (e) {
      alert("Formatting error: " + e.message);
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    function onMouseMove(e) {
      if (!isResizing.current) return;
      const totalWidth = window.innerWidth;
      let newWidth = (e.clientX / totalWidth) * 100;
      if (newWidth < 20) newWidth = 20;
      if (newWidth > 80) newWidth = 80;
      setEditorWidth(newWidth);
    }
    function onMouseUp() {
      isResizing.current = false;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) setTheme(stored);
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
      <div style={{ width: `${editorWidth}%`, display: 'flex', flexDirection: 'column', background: '#23232b' }}>
      
        {/* --- Begin: Editor header with action buttons --- */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#23232b',
          borderBottom: '1px solid #222',
          padding: '0.5rem 1rem'
        }}>
          <div style={{ fontSize: 14, color: '#bbb', fontWeight: 500 }}>
            {activeTab} Editor
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={copyToClipboard}
              title="Copy code"
              style={{
                background: 'none',
                border: 'none',
                color: '#bbb',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#222'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <DocumentDuplicateIcon className="w-5 h-5" />
            </button>
            <button
              onClick={runCode}
              title="Run code"
              style={{
                background: 'none',
                border: 'none',
                color: '#4f46e5',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#222'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <PlayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={clearCode}
              title="Clear code"
              style={{
                background: 'none',
                border: 'none',
                color: '#fd7330',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#222'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDownload()}
              title="Download code"
              style={{
                background: 'none',
                border: 'none',
                color: '#22c55e',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#222'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              ⬇️
            </button>
            <button
              onClick={handleShare}
              title="Share code"
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#222'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              🔗
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'none',
                border: 'none',
                color: theme === 'dark' ? '#fff' : '#222',
                fontSize: 20,
                cursor: 'pointer',
                marginLeft: 12
              }}
              title="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={handleFormat}
              title="Format code"
              style={{
                background: 'none',
                border: 'none',
                color: '#f59e42',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#222'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              🎨
            </button>
          </div>
        </div>
          <div
          style={{
            display: 'flex',
            background: '#18181b',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            borderBottom: '1px solid #222'
          }}
        >
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
                color: '#fff'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* --- End: Editor header with action buttons --- */}
        <div style={{ flex: 1, minHeight: 0 }}>
          {activeTab === 'HTML' && (
            <MonacoEditor
              language="html"
              value={html || ""}
              onChange={setHtml}
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              options={{ ...monacoOptions, theme: theme === 'dark' ? 'vs-dark' : 'vs-light' }}
              height="100%"
            />
          )}
          {activeTab === 'CSS' && (
            <MonacoEditor
              language="css"
              value={css || ""}
              onChange={setCss}
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              options={{ fontSize: 15, minimap: { enabled: false } }}
              height="100%"
            />
          )}
          {activeTab === 'JS' && (
            <MonacoEditor
              language="javascript"
              value={js || ""}
              onChange={setJs}
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              options={{ fontSize: 15, minimap: { enabled: false } }}
              height="100%"
            />
          )}
          {activeTab === 'Console' && (
            <div style={{
              background: '#18181b',
              color: '#0f0',
              fontFamily: 'monospace',
              padding: 16,
              height: '100%',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {consoleOutput || 'No output yet.'}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${editorWidth}%`,
          width: 8,
          height: '100%',
          cursor: 'col-resize',
          zIndex: 100,
          background: 'transparent'
        }}
        onMouseDown={() => { isResizing.current = true; }}
      />
      <div style={{ width: `${100 - editorWidth}%`, background: '#fff', height: '100%' }}>
        <iframe
          ref={iframeRef}
          title="Output"
          style={{ width: '100%', height: '100%', border: 'none',}}
          sandbox="allow-scripts allow-modals"
          srcDoc={srcDoc}
        />
      </div>
    </div>
  );
} 