"use client";

import { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { DocumentDuplicateIcon, TrashIcon, PlayIcon, FolderIcon, ServerIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { submitCode, estimateMemoryUsage } from "../utils/api";
import SaveLoadModal from "./SaveLoadModal";
import SQLTools from "./SQLTools";
import DatabaseManager from "./DatabaseManager";

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

const defaultSQL = `-- SQL Playground
-- Write your SQL queries here

-- Example: Create a simple table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, created_at) VALUES ('Alice', 'alice@example.com', '2024-01-01');
INSERT INTO users (name, email, created_at) VALUES ('Bob', 'bob@example.com', '2024-01-02');

-- Query the data
SELECT * FROM users;`;

// SQL Query Templates
const sqlTemplates = {
  "Basic SELECT": "SELECT column1, column2 FROM table_name WHERE condition;",
  "INSERT Data": "INSERT INTO table_name (column1, column2) VALUES (value1, value2);",
  "UPDATE Data": "UPDATE table_name SET column1 = value1 WHERE condition;",
  "DELETE Data": "DELETE FROM table_name WHERE condition;",
  "CREATE Table": `CREATE TABLE table_name (
  id INTEGER PRIMARY KEY,
  column1 TEXT NOT NULL,
  column2 INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
  "JOIN Tables": `SELECT a.column1, b.column2 
FROM table1 a
INNER JOIN table2 b ON a.id = b.foreign_key_id
WHERE condition;`,
  "GROUP BY": `SELECT column1, COUNT(*) as count
FROM table_name
GROUP BY column1
HAVING COUNT(*) > 1;`,
  "Subquery": `SELECT column1 
FROM table1 
WHERE column2 IN (
  SELECT column2 FROM table2 WHERE condition
);`,
  "Window Function": `SELECT column1, column2,
ROW_NUMBER() OVER (PARTITION BY column1 ORDER BY column2) as row_num
FROM table_name;`,
  "CTE (Common Table Expression)": `WITH cte_name AS (
  SELECT column1, column2 FROM table1 WHERE condition
)
SELECT * FROM cte_name;`
};

export default function SQLPlayground() {
  const [sql, setSql] = useState(defaultSQL);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsed, setMemoryUsed] = useState(null);
  const [editorWidth, setEditorWidth] = useState(50); // percent
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showDatabaseTools, setShowDatabaseTools] = useState(false);
  const [autoSaveTitle, setAutoSaveTitle] = useState("");
  const isResizing = useRef(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleQuickSave();
            break;
          case 'o':
            e.preventDefault();
            setShowLoadModal(true);
            break;
          case 'r':
            e.preventDefault();
            runCode();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sql]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sql);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const clearCode = () => {
    setSql("");
    setOutput("");
    setExecutionTime(null);
    setMemoryUsed(null);
  };

  const handleQuickSave = () => {
    // Auto-generate title based on code content
    let title = "SQL Query";
    if (sql.toLowerCase().includes("create table")) {
      const tableMatch = sql.match(/CREATE TABLE\s+(\w+)/i);
      if (tableMatch) {
        title = `Create Table: ${tableMatch[1]}`;
      }
    } else if (sql.toLowerCase().includes("select")) {
      title = "SELECT Query";
    } else if (sql.toLowerCase().includes("insert")) {
      title = "INSERT Query";
    } else if (sql.toLowerCase().includes("update")) {
      title = "UPDATE Query";
    } else if (sql.toLowerCase().includes("delete")) {
      title = "DELETE Query";
    }
    setAutoSaveTitle(title);
    setShowSaveModal(true);
  };

  const handleLoadCode = (loadedCode) => {
    setSql(loadedCode);
  };

  const insertTemplate = (template) => {
    setSql(prev => prev + "\n\n" + sqlTemplates[template]);
    setShowTemplates(false);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setExecutionTime(null);
    setMemoryUsed(null);
    
    const startTime = Date.now();
    
    try {
      const result = await submitCode("82", sql, ""); // SQL language ID is 82
      console.log("SQL Execution Result:", result);
      
      const endTime = Date.now();
      setExecutionTime(endTime - startTime);
      
      let finalOutput = "";
      
      if (result.run) {
        const run = result.run;
        
        if (run.stderr) {
          finalOutput += `❌ SQL Error: ${run.stderr}\n`;
        }
        
        if (run.stdout) {
          finalOutput += `📊 Query Results:\n${run.stdout}`;
        }
        
        if (run.code !== 0) {
          finalOutput += `\n⚠️ Exit code: ${run.code}`;
        }
        
        if (!finalOutput) {
          finalOutput = "✅ SQL executed successfully with no output.";
        }
        const estimatedMemory = estimateMemoryUsage(sql, "82");
        setMemoryUsed(estimatedMemory);
      } else if (result.compile) {
        finalOutput = `❌ SQL Syntax Error:\n${result.compile.stderr || result.compile.output || 'Unknown SQL error'}`;
        setMemoryUsed(null);
      } else {
        finalOutput = "❌ Unexpected response format from API";
        setMemoryUsed(null);
      }
      
      setOutput(finalOutput);
      setIsRunning(false);
      
    } catch (err) {
      console.error("SQL execution error:", err.response?.data || err.message);
      setOutput(`❌ Error executing SQL: ${err.response?.data?.message || err.message}`);
      setIsRunning(false);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSQL = localStorage.getItem('sql');
      if (savedSQL) {
        setSql(savedSQL);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sql', sql);
    }
  }, [sql]);

  // Resize functionality
  useEffect(() => {
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

  return (
    <div style={{ display: 'flex', height: '100vh', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
      <div style={{ width: `${editorWidth}%`, display: 'flex', flexDirection: 'column', background: '#23232b' }}>
      
        {/* Editor header with action buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#23232b',
          borderBottom: '1px solid #222',
          padding: '0.5rem 1rem'
        }}>
          <div style={{ fontSize: 14, color: '#bbb', fontWeight: 500 }}>
            SQL Editor
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* SQL Tools */}
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              title="SQL Templates"
              style={{
                background: showTemplates ? '#4f46e5' : 'none',
                border: 'none',
                color: showTemplates ? '#fff' : '#bbb',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => !showTemplates && (e.currentTarget.style.background = '#222')}
              onMouseOut={e => !showTemplates && (e.currentTarget.style.background = 'none')}
            >
              <CodeBracketIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDatabaseTools(!showDatabaseTools)}
              title="Database Tools"
              style={{
                background: showDatabaseTools ? '#4f46e5' : 'none',
                border: 'none',
                color: showDatabaseTools ? '#fff' : '#bbb',
                padding: 6,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseOver={e => !showDatabaseTools && (e.currentTarget.style.background = '#222')}
              onMouseOut={e => !showDatabaseTools && (e.currentTarget.style.background = 'none')}
            >
              <ServerIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowLoadModal(true)}
              title="Load saved code (Ctrl+O)"
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
              <FolderIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleQuickSave}
              title="Save code (Ctrl+S)"
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
              title="Run SQL (Ctrl+R)"
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
          </div>
        </div>

        {/* SQL Tools Panel */}
        {(showTemplates || showDatabaseTools) && (
          <div style={{
            background: '#18181b',
            borderBottom: '1px solid #222',
            padding: '1rem',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {showTemplates && (
              <div>
                <h3 style={{ color: '#fff', fontSize: 14, marginBottom: '0.5rem' }}>SQL Templates</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {Object.keys(sqlTemplates).map(template => (
                    <button
                      key={template}
                      onClick={() => insertTemplate(template)}
                      style={{
                        background: '#333',
                        border: '1px solid #444',
                        color: '#fff',
                        padding: '0.5rem',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12,
                        textAlign: 'left',
                        transition: 'background 0.15s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#444'}
                      onMouseOut={e => e.currentTarget.style.background = '#333'}
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {showDatabaseTools && (
              <div>
                <h3 style={{ color: '#fff', fontSize: 14, marginBottom: '0.5rem' }}>Database Tools</h3>
                <SQLTools 
                  code={sql} 
                  setCode={setSql}
                  onFormat={(formatted) => setSql(formatted)}
                  onValidate={(result) => console.log('SQL validation:', result)}
                />
                <DatabaseManager 
                  onExecuteQuery={(query) => setSql(query)}
                  showForAllLanguages={true}
                />
              </div>
            )}
          </div>
        )}

        {/* SQL Editor */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <MonacoEditor
            language="sql"
            value={sql || ""}
            onChange={setSql}
            theme="vs-dark"
            options={{
              ...monacoOptions,
              quickSuggestions: {
                other: true,
                comments: false,
                strings: false
              },
              suggestOnTriggerCharacters: true,
              acceptSuggestionOnEnter: "on",
              tabCompletion: "on",
              wordBasedSuggestions: true,
              parameterHints: {
                enabled: true
              }
            }}
            height="100%"
          />
        </div>
      </div>

      {/* Resize handle */}
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

      {/* Output Panel */}
      <div style={{ width: `${100 - editorWidth}%`, background: '#18181b', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Output Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#18181b',
          borderBottom: '1px solid #222',
          padding: '0.5rem 1rem'
        }}>
          <div style={{ fontSize: 14, color: '#bbb', fontWeight: 500 }}>
            Query Results
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 12, color: '#666' }}>
            {executionTime && <span>⏱️ {executionTime}ms</span>}
            {memoryUsed && <span>💾 {memoryUsed}KB</span>}
            {isRunning && <span>🔄 Running...</span>}
          </div>
        </div>

        {/* Output Content */}
        <div style={{
          flex: 1,
          background: '#18181b',
          color: '#0f0',
          fontFamily: 'monospace',
          padding: 16,
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          fontSize: 14
        }}>
          {output || 'No output yet. Run your SQL query to see results.'}
        </div>

        {/* Footer with shortcuts */}
        <div style={{
          background: '#18181b',
          borderTop: '1px solid #222',
          padding: '0.5rem 1rem',
          fontSize: 12,
          color: '#666',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>💡 SQL-focused editor with database tools</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <span>Ctrl+S: Save</span>
            <span>Ctrl+O: Load</span>
            <span>Ctrl+R: Run</span>
          </div>
        </div>
      </div>

      {/* Save/Load Modals */}
      <SaveLoadModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        code={sql}
        language="82"
        onLoadCode={handleLoadCode}
        mode="save"
        initialTitle={autoSaveTitle}
      />
      
      <SaveLoadModal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        code={sql}
        language="82"
        onLoadCode={handleLoadCode}
        mode="load"
      />
    </div>
  );
} 