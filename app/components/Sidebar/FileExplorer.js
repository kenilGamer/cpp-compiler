"use client";

import { useState } from "react";
import {
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function FileExplorer({ 
  files = [],
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  className = "" 
}) {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");

  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFile = () => {
    const name = prompt("Enter file name:");
    if (name && onFileCreate) {
      onFileCreate(name);
    }
  };

  const handleDeleteFile = (filePath, e) => {
    e.stopPropagation();
    if (confirm(`Delete ${filePath}?`)) {
      onFileDelete && onFileDelete(filePath);
    }
  };

  const handleRenameFile = (filePath, e) => {
    e.stopPropagation();
    setEditingFile(filePath);
    setNewFileName(filePath.split('/').pop());
  };

  const handleRenameSubmit = (oldPath) => {
    if (newFileName && onFileRename) {
      onFileRename(oldPath, newFileName);
    }
    setEditingFile(null);
    setNewFileName("");
  };

  const renderFileTree = (items, path = "") => {
    return items.map((item, index) => {
      const itemPath = path ? `${path}/${item.name}` : item.name;
      const isExpanded = expandedFolders.has(itemPath);

      if (item.type === "folder") {
        return (
          <div key={index} className="select-none">
            <div
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-secondary rounded cursor-pointer transition-colors"
              onClick={() => toggleFolder(itemPath)}
            >
              {isExpanded ? (
                <FolderOpenIcon className="w-4 h-4 text-primary" />
              ) : (
                <FolderIcon className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm text-foreground flex-1">{item.name}</span>
            </div>
            {isExpanded && item.children && (
              <div className="ml-4 mt-1">
                {renderFileTree(item.children, itemPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={index}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-secondary rounded cursor-pointer transition-colors group"
            onClick={() => onFileSelect && onFileSelect(itemPath)}
          >
            <DocumentIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {editingFile === itemPath ? (
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onBlur={() => handleRenameSubmit(itemPath)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRenameSubmit(itemPath);
                  } else if (e.key === "Escape") {
                    setEditingFile(null);
                    setNewFileName("");
                  }
                }}
                className="flex-1 text-sm bg-background border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <span className="text-sm text-foreground flex-1">{item.name}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleRenameFile(itemPath, e)}
                    className="p-1 rounded hover:bg-secondary"
                    title="Rename"
                  >
                    <PencilIcon className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteFile(itemPath, e)}
                    className="p-1 rounded hover:bg-secondary"
                    title="Delete"
                  >
                    <TrashIcon className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      }
    });
  };

  return (
    <div className={`card-glass rounded-lg overflow-hidden flex flex-col ${className}`}>
      <div className="flex items-center justify-between p-3 border-b border-border-light">
        <span className="text-sm font-medium text-foreground">Explorer</span>
        <button
          onClick={handleCreateFile}
          className="p-1.5 rounded hover:bg-secondary transition-colors"
          title="New File"
        >
          <PlusIcon className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {files.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            No files
          </div>
        ) : (
          renderFileTree(files)
        )}
      </div>
    </div>
  );
}

