"use client";

import { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { TrashIcon, DocumentDuplicateIcon, PlayIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { languageMap, languages } from "../utils/constants";
import QuickActions from "./QuickActions";
import LanguageSelector from "./LanguageSelector";


// Map Judge0 language IDs to Monaco languages is now handled by the import

// --- Custom suggestion logic (from CodeSuggestions.js, simplified) ---
const getSuggestions = (language, currentWord) => {
  const allSuggestions = {
    "54": {
      keywords: ["#include", "using", "namespace", "std", "int", "main", "cout", "cin", "endl", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "class", "struct", "public", "private", "protected", "const", "static", "virtual", "template", "typename", "auto", "nullptr", "override", "final", "explicit", "friend", "inline", "mutable", "operator", "typedef", "union", "volatile"],
      snippets: {
        main: `int main() {\n    // Your code here\n    return 0;\n}`,
        for: `for (int i = 0; i < n; i++) {\n    // Loop body\n}`,
        if: `if (condition) {\n    // True block\n} else {\n    // False block\n}`
      }
    },
    "82": {
      keywords: [
        "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES", "DROP", "ALTER", "ADD", "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "DISTINCT", "AS", "AND", "OR", "NOT", "NULL", "IS", "IN", "EXISTS", "BETWEEN", "LIKE", "UNION", "ALL", "VIEW","select","from","where","insert","into","values","update","set","delete","create","table","primary key","foreign key","references","drop","alter","add","join","inner join","left join","right join","on","group by","having","order by","limit","offset","distinct","as","and","or","not","null","is","in","exists","between","like","union","all","view"
      ],
      snippets: {
        select: `SELECT column1, column2 FROM table WHERE condition;`,
        insert: `INSERT INTO table (column1, column2) VALUES (value1, value2);`,
        create_table: `CREATE TABLE table_name (\n  id INTEGER PRIMARY KEY,\n  column1 TEXT,\n  column2 INTEGER\n);`,
        join: `SELECT a.col1, b.col2 FROM table1 a\nINNER JOIN table2 b ON a.id = b.fk_id;`,
        group_by: `SELECT column, COUNT(*) FROM table\nGROUP BY column\nHAVING COUNT(*) > 1;`
      }
    },
    // Add more languages if needed
  };
  const lang = allSuggestions[language] || allSuggestions["54"];
  const currentWordLower = currentWord.toLowerCase();
  let filtered = [];
  filtered.push(...lang.keywords.filter(k => k.toLowerCase().includes(currentWordLower)).map(k => ({ type: "keyword", text: k })));
  Object.entries(lang.snippets).forEach(([key, snippet]) => {
    if (key.toLowerCase().includes(currentWordLower)) {
      filtered.push({ type: "snippet", text: key, snippet });
    }
  });
  // If nothing matches, show all suggestions
  if (filtered.length === 0) {
    filtered.push(...lang.keywords.map(k => ({ type: "keyword", text: k })));
    Object.entries(lang.snippets).forEach(([key, snippet]) => {
      filtered.push({ type: "snippet", text: key, snippet });
    });
  }
  return filtered.slice(0, 10);
};
// --- End custom suggestion logic ---

export default function CodeEditor({ 
  code, 
  setCode, 
  clearCode, 
  language, 
  setLanguage,
  runCode,
  isFullScreen,
  onFullScreenToggle
}) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
  const monacoLang = languageMap[language] || "plaintext";

  // Register Monaco completion provider
  useEffect(() => {
    let disposable;
    if (window.monaco && monacoLang !== "plaintext") {
      disposable = window.monaco.languages.registerCompletionItemProvider(monacoLang, {
        provideCompletionItems: (model, position) => {
          const textUntilPosition = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });
          const match = textUntilPosition.match(/[a-zA-Z0-9_#]+$/);
          const currentWord = match ? match[0] : "";
          if (currentWord.length < 2) return { suggestions: [] };
          const suggestions = getSuggestions(language, currentWord).map((s, i) => {
            if (s.type === "snippet") {
              return {
                label: s.text,
                kind: window.monaco.languages.CompletionItemKind.Snippet,
                insertText: s.snippet,
                insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: s.snippet,
                range: null
              };
            } else {
              return {
                label: s.text,
                kind: window.monaco.languages.CompletionItemKind.Keyword,
                insertText: s.text,
                range: null
              };
            }
          });
          return { suggestions };
        }
      });
    }
    return () => {
      if (disposable) disposable.dispose();
    };
  }, [monacoLang, language]);

  const handleEditorChange = (value) => {
    setCode(value || "");
    setCharCount(value?.length || 0);
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const pos = editorRef.current.getPosition();
      if (model && pos) {
        setCursorPosition(model.getOffsetAt(pos));
        setLineCount(model.getLineCount());
      }
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeCursorPosition(() => {
      const model = editor.getModel();
      const pos = editor.getPosition();
      if (model && pos) {
        setCursorPosition(model.getOffsetAt(pos));
        setLineCount(model.getLineCount());
      }
    });
    // Set initial counts
    const model = editor.getModel();
    if (model) {
      setLineCount(model.getLineCount());
      setCharCount(model.getValue().length);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Helper to get language display name and version
  const getLanguageInfo = () => {
    const langObj = languages.find(l => l.id === language);
    if (!langObj) return { name: "Unknown", version: "" };
    return { name: langObj.name, version: langObj.version || "" };
  };
  const langInfo = getLanguageInfo();

  return (
    <div ref={editorContainerRef} className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 card-hover flex flex-col h-screen">
      {/* Language Info Bar */}
      <LanguageSelector 
        language={language} 
        setLanguage={setLanguage} 
        languages={languages} 
      />

      {/* Quick Templates */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/40">
        <QuickActions setCode={setCode} language={language} />
      </div>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Source Code</span>
            <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-md font-mono">
              {monacoLang.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
            <span>{lineCount} lines</span>
            <span>{charCount} chars</span>
            <span>Ln {editorRef.current?.getPosition()?.lineNumber || 1}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onFullScreenToggle}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors focus-ring"
              title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
            >
              {isFullScreen ? (
                <ArrowsPointingInIcon className="w-5 h-5" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors focus-ring"
              title="Copy code"
            >
              <DocumentDuplicateIcon className="w-4 h-4" />
            </button>
            <button
              onClick={runCode}
              className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-colors focus-ring"
              title="Run code"
            >
              <PlayIcon className="w-4 h-4" />
            </button>
            <button
              onClick={clearCode}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors focus-ring"
              title="Clear code"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {/* Code Editor */}
      <div className="relative flex-grow">
        <MonacoEditor
          key={monacoLang}
          height="100%"
          language={monacoLang}
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
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
          }}
        />
      </div>
      {/* Enhanced Footer */}
      <div className="flex items-center justify-between p-3 bg-gray-800/30 border-t border-gray-700">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Ready
          </span>
          <span>💡 Type 2+ characters for suggestions</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">S</kbd>
          <span>to save</span>
        </div>
      </div>
    
    </div>
  );
}
