"use client";

import { useState, useEffect } from "react";
import { 
  XMarkIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FolderIcon,
  DocumentTextIcon,
  TagIcon,
  CalendarIcon,
  TrashIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/outline";
import { codeDB, sqlManager } from "../utils/database";

export default function SaveLoadModal({ 
  isOpen, 
  onClose, 
  code, 
  language, 
  onLoadCode,
  mode = "save", // "save" or "load"
  initialTitle = ""
}) {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Load snippets on mount
  useEffect(() => {
    if (isOpen) {
      loadSnippets();
    }
  }, [isOpen, language]);

  // Set initial title when modal opens
  useEffect(() => {
    if (isOpen && mode === "save" && initialTitle) {
      setTitle(initialTitle);
    }
  }, [isOpen, mode, initialTitle]);

  // Filter snippets based on search and category
  useEffect(() => {
    let filtered = snippets;
    
    // Filter by language
    filtered = filtered.filter(s => s.languageId === language);
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.code.toLowerCase().includes(query) ||
        s.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredSnippets(filtered);
  }, [snippets, searchQuery, selectedCategory, language]);

  const loadSnippets = () => {
    const allSnippets = codeDB.getAllSnippets();
    setSnippets(allSnippets);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please enter a title for your code snippet");
      return;
    }

    setIsSaving(true);
    
    try {
      const snippetData = {
        title: title.trim(),
        description: description.trim(),
        code,
        languageId: language,
        category: "custom",
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        type: "snippet"
      };

      const savedSnippet = codeDB.saveSnippet(snippetData);
      
      if (savedSnippet) {
        alert("Code snippet saved successfully!");
        setTitle("");
        setDescription("");
        setTags("");
        loadSnippets();
        onClose();
      } else {
        alert("Failed to save code snippet");
      }
    } catch (error) {
      console.error("Error saving snippet:", error);
      alert("Error saving code snippet");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = (snippet) => {
    onLoadCode(snippet.code);
    onClose();
  };

  const handleDelete = (snippetId) => {
    if (codeDB.deleteSnippet(snippetId)) {
      loadSnippets();
      setShowDeleteConfirm(null);
    } else {
      alert("Failed to delete snippet");
    }
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setTitle(snippet.title);
    setDescription(snippet.description);
    setTags(snippet.tags.join(', '));
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("Please enter a title for your code snippet");
      return;
    }

    setIsSaving(true);
    
    try {
      const updates = {
        title: title.trim(),
        description: description.trim(),
        code,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const updatedSnippet = codeDB.updateSnippet(editingSnippet.id, updates);
      
      if (updatedSnippet) {
        alert("Code snippet updated successfully!");
        setEditingSnippet(null);
        setTitle("");
        setDescription("");
        setTags("");
        loadSnippets();
      } else {
        alert("Failed to update code snippet");
      }
    } catch (error) {
      console.error("Error updating snippet:", error);
      alert("Error updating code snippet");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    codeDB.exportSnippets();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      codeDB.importSnippets(file)
        .then(result => {
          alert(`Import successful! ${result.imported} snippets imported, ${result.skipped} skipped.`);
          loadSnippets();
        })
        .catch(error => {
          alert(`Import failed: ${error.message}`);
        });
    }
  };

  const getCategories = () => {
    const categories = [...new Set(snippets.filter(s => s.languageId === language).map(s => s.category))];
    return categories.filter(Boolean);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <FolderIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              {mode === "save" ? "Save Code Snippet" : "Load Code Snippet"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
              title="Export all snippets"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            <label className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
              <ArrowUpTrayIcon className="w-5 h-5" />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Save Form or Snippet List */}
          <div className="w-1/2 border-r border-gray-700 p-6 overflow-y-auto">
            {mode === "save" ? (
              // Save Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter snippet title..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter snippet description..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags separated by commas..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={editingSnippet ? handleUpdate : handleSave}
                    disabled={isSaving}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    {isSaving ? "Saving..." : (editingSnippet ? "Update" : "Save")}
                  </button>
                  {editingSnippet && (
                    <button
                      onClick={() => {
                        setEditingSnippet(null);
                        setTitle("");
                        setDescription("");
                        setTags("");
                      }}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            ) : (
              // Load Snippet List
              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search snippets..."
                      className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {getCategories().map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Snippet List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredSnippets.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <DocumentTextIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No snippets found</p>
                    </div>
                  ) : (
                    filteredSnippets.map(snippet => (
                      <div
                        key={snippet.id}
                        className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-white">{snippet.title}</h3>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEdit(snippet)}
                              className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"
                              title="Edit"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(snippet.id)}
                              className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                              title="Delete"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {snippet.description && (
                          <p className="text-sm text-gray-400 mb-2">{snippet.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {formatDate(snippet.createdAt)}
                          </span>
                          {snippet.tags.length > 0 && (
                            <span className="flex items-center gap-1">
                              <TagIcon className="w-3 h-3" />
                              {snippet.tags.slice(0, 3).join(', ')}
                              {snippet.tags.length > 3 && '...'}
                            </span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleLoad(snippet)}
                          className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                        >
                          Load Snippet
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <h3 className="text-lg font-medium text-white mb-4">Code Preview</h3>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                {code || "No code to preview"}
              </pre>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-medium text-white mb-4">Delete Snippet</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete this snippet? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 