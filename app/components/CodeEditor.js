"use client";

import { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { TrashIcon, DocumentDuplicateIcon, PlayIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, FolderIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { languageMap, languages } from "../utils/constants";
import QuickActions from "./QuickActions";
import LanguageSelector from "./LanguageSelector";
import { useTheme } from "@/app/contexts/ThemeContext";


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
  const [lineCount, setLineCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [tabs, setTabs] = useState([{ id: 1, name: "main", code, language }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
  const monacoLang = languageMap[language] || "plaintext";
  const { theme } = useTheme();

  // Define custom Monaco theme
  useEffect(() => {
    if (window.monaco) {
      window.monaco.editor.defineTheme('premium-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
          { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
          { token: 'type', foreground: '4EC9B0' },
          { token: 'function', foreground: 'DCDCAA' },
          { token: 'variable', foreground: '9CDCFE' },
        ],
        colors: {
          'editor.background': '#0a0a0a',
          'editor.foreground': '#ededed',
          'editor.lineHighlightBackground': '#1a1a1a',
          'editor.selectionBackground': '#264f78',
          'editor.inactiveSelectionBackground': '#3a3d41',
          'editorCursor.foreground': '#3b82f6',
          'editorWhitespace.foreground': '#3a3d41',
          'editorIndentGuide.background': '#3a3d41',
          'editorIndentGuide.activeBackground': '#707070',
          'editor.lineNumber.foreground': '#858585',
          'editor.lineNumber.activeForeground': '#c6c6c6',
          'editorGutter.background': '#0a0a0a',
          'editorWidget.background': '#252526',
          'editorWidget.border': '#454545',
          'editorSuggestWidget.background': '#252526',
          'editorSuggestWidget.border': '#454545',
          'editorSuggestWidget.selectedBackground': '#2a2d2e',
        }
      });

      window.monaco.editor.defineTheme('premium-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
          { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
          { token: 'string', foreground: 'A31515' },
          { token: 'number', foreground: '098658' },
          { token: 'type', foreground: '267F99' },
          { token: 'function', foreground: '795E26' },
          { token: 'variable', foreground: '001080' },
        ],
        colors: {
          'editor.background': '#ffffff',
          'editor.foreground': '#000000',
          'editor.lineHighlightBackground': '#f0f0f0',
          'editor.selectionBackground': '#add6ff',
          'editorCursor.foreground': '#3b82f6',
        }
      });
    }
  }, []);

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
        setLineCount(model.getLineCount());
      }
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Apply custom theme
    const themeName = theme === 'dark' ? 'premium-dark' : 'premium-light';
    monaco.editor.setTheme(themeName);
    
    editor.onDidChangeCursorPosition(() => {
      const model = editor.getModel();
      const pos = editor.getPosition();
      if (model && pos) {
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

  // Tab management
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const activeTabCode = activeTab?.code || code;

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      name: `file-${tabs.length + 1}`,
      code: '',
      language
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabId) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (tabId === activeTabId) {
      setActiveTabId(newTabs[0].id);
      setCode(newTabs[0].code);
    }
  };

  const switchTab = (tabId) => {
    setActiveTabId(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setCode(tab.code);
      setLanguage(tab.language);
    }
  };

  // Update active tab code when code changes
  useEffect(() => {
    setTabs(prev => prev.map(t => 
      t.id === activeTabId ? { ...t, code } : t
    ));
  }, [code, activeTabId]);

  // --- UI/UX ENHANCEMENTS START ---
  return (
    <div ref={editorContainerRef} className="flex flex-col h-full bg-background-secondary rounded-lg overflow-hidden border border-border card-glass">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-background-tertiary border-b border-border overflow-x-auto">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer transition-colors ${
              tab.id === activeTabId
                ? 'bg-background-secondary border-t border-l border-r border-border text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-background-secondary/50'
            }`}
            onClick={() => switchTab(tab.id)}
          >
            <span className="text-sm font-medium whitespace-nowrap">{tab.name}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="p-0.5 rounded hover:bg-secondary"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addTab}
          className="px-2 py-2 text-muted-foreground hover:text-foreground hover:bg-background-secondary/50 rounded transition-colors"
          title="New tab"
        >
          +
        </button>
      </div>

      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background-tertiary border-b border-border">
        <LanguageSelector 
          language={language} 
          setLanguage={setLanguage} 
          languages={languages} 
        />
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors focus-ring"
            title="Copy code"
            aria-label="Copy code"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
          </button>
          <button
            onClick={runCode}
            className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-colors focus-ring"
            title="Run code"
            aria-label="Run code"
          >
            <PlayIcon className="w-4 h-4" />
          </button>
          <button
            onClick={clearCode}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors focus-ring"
            title="Clear code"
            aria-label="Clear code"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onFullScreenToggle}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors focus-ring"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
            aria-label={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? (
              <ArrowsPointingInIcon className="w-5 h-5" />
            ) : (
              <ArrowsPointingOutIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="p-4 border-b border-border bg-background-tertiary/50">
        <QuickActions setCode={setCode} language={language} />
      </div>

      {/* Editor */}
      <div className="relative flex-grow">
        <MonacoEditor
          key={monacoLang}
          height="100%"
          language={monacoLang}
          value={code}
          theme={theme === 'dark' ? 'premium-dark' : 'premium-light'}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "JetBrains Mono, Fira Code, Cascadia Code, monospace",
            minimap: { 
              enabled: true,
              side: 'right',
              size: 'proportional',
              showSlider: 'always',
            },
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
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
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

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background-tertiary border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{lineCount} lines</span>
          <span>{charCount} chars</span>
          <span>Ln {editorRef.current?.getPosition()?.lineNumber || 1}</span>
          <span className="text-primary">{langInfo.name}</span>
        </div>
      </div>

      {/* Footer with Shortcuts */}
      <div className="flex items-center justify-between px-4 py-2 bg-background-tertiary border-t border-border text-xs text-muted-foreground">
        <span>💡 Type 2+ characters for suggestions</span>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">S</kbd>
          <span>Save</span>
          <span className="mx-2">|</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">O</kbd>
          <span>Load</span>
          <span className="mx-2">|</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Enter</kbd>
          <span>Run</span>
        </div>
      </div>
    </div>
  );
  // --- UI/UX ENHANCEMENTS END ---
}
