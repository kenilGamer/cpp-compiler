import { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function OutputTabs({ output, error, log }) {
  const [tab, setTab] = useState("output");
  const [copied, setCopied] = useState(false);

  const getContent = () => {
    if (tab === "output") return output;
    if (tab === "error") return error;
    if (tab === "log") return log;
    return "";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="bg-black rounded-lg border border-gray-700 shadow-inner flex flex-col h-64">
      <div className="flex items-center border-b border-gray-700 bg-gray-900 rounded-t-lg">
        <button onClick={() => setTab("output")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors ${tab === "output" ? "bg-gray-800 text-blue-400" : "text-gray-400 hover:text-blue-300"}`}>Output</button>
        <button onClick={() => setTab("error")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors ${tab === "error" ? "bg-gray-800 text-red-400" : "text-gray-400 hover:text-red-300"}`}>Errors</button>
        <button onClick={() => setTab("log")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors ${tab === "log" ? "bg-gray-800 text-green-400" : "text-gray-400 hover:text-green-300"}`}>Log</button>
        <div className="flex-1" />
        <button onClick={handleCopy} className="p-2 mr-2 text-gray-400 hover:text-blue-400 transition-colors" title="Copy">
          {copied ? <CheckIcon className="h-5 w-5" /> : <ClipboardIcon className="h-5 w-5" />}
        </button>
      </div>
      <pre className="flex-1 overflow-auto p-4 text-xs text-gray-100 font-mono bg-black rounded-b-lg">
        {getContent() || <span className="text-gray-500">No output.</span>}
      </pre>
    </div>
  );
} 