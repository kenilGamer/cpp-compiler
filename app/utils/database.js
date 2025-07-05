// Database utilities for saving and loading code snippets
// Using localStorage as the backend storage

export class CodeDatabase {
  constructor() {
    this.storageKey = 'cpp_compiler_snippets';
    this.ensureStorage();
  }

  // Ensure storage is initialized
  ensureStorage() {
    if (typeof window !== 'undefined' && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Get all snippets
  getAllSnippets() {
    if (typeof window === 'undefined') return [];
    
    try {
      const snippets = localStorage.getItem(this.storageKey);
      return snippets ? JSON.parse(snippets) : [];
    } catch (error) {
      console.error('Error loading snippets:', error);
      return [];
    }
  }

  // Save a new snippet
  saveSnippet(snippet) {
    if (typeof window === 'undefined') return false;
    
    try {
      const snippets = this.getAllSnippets();
      const newSnippet = {
        id: this.generateId(),
        ...snippet,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      snippets.push(newSnippet);
      localStorage.setItem(this.storageKey, JSON.stringify(snippets));
      return newSnippet;
    } catch (error) {
      console.error('Error saving snippet:', error);
      return false;
    }
  }

  // Update an existing snippet
  updateSnippet(id, updates) {
    if (typeof window === 'undefined') return false;
    
    try {
      const snippets = this.getAllSnippets();
      const index = snippets.findIndex(s => s.id === id);
      
      if (index === -1) return false;
      
      snippets[index] = {
        ...snippets[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(snippets));
      return snippets[index];
    } catch (error) {
      console.error('Error updating snippet:', error);
      return false;
    }
  }

  // Delete a snippet
  deleteSnippet(id) {
    if (typeof window === 'undefined') return false;
    
    try {
      const snippets = this.getAllSnippets();
      const filteredSnippets = snippets.filter(s => s.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredSnippets));
      return true;
    } catch (error) {
      console.error('Error deleting snippet:', error);
      return false;
    }
  }

  // Get snippets by language
  getSnippetsByLanguage(languageId) {
    const snippets = this.getAllSnippets();
    return snippets.filter(s => s.languageId === languageId);
  }

  // Get snippets by category
  getSnippetsByCategory(category) {
    const snippets = this.getAllSnippets();
    return snippets.filter(s => s.category === category);
  }

  // Search snippets
  searchSnippets(query) {
    const snippets = this.getAllSnippets();
    const lowerQuery = query.toLowerCase();
    
    return snippets.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.code.toLowerCase().includes(lowerQuery) ||
      s.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Export all snippets
  exportSnippets() {
    const snippets = this.getAllSnippets();
    const dataStr = JSON.stringify(snippets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `code-snippets-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  // Import snippets
  importSnippets(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedSnippets = JSON.parse(e.target.result);
          const existingSnippets = this.getAllSnippets();
          
          // Merge snippets, avoiding duplicates by ID
          const existingIds = new Set(existingSnippets.map(s => s.id));
          const newSnippets = importedSnippets.filter(s => !existingIds.has(s.id));
          
          const mergedSnippets = [...existingSnippets, ...newSnippets];
          localStorage.setItem(this.storageKey, JSON.stringify(mergedSnippets));
          
          resolve({
            total: mergedSnippets.length,
            imported: newSnippets.length,
            skipped: importedSnippets.length - newSnippets.length
          });
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  // Get storage statistics
  getStorageStats() {
    const snippets = this.getAllSnippets();
    const totalSize = new Blob([JSON.stringify(snippets)]).size;
    
    return {
      totalSnippets: snippets.length,
      totalSize: totalSize,
      sizeInKB: Math.round(totalSize / 1024 * 100) / 100,
      languages: [...new Set(snippets.map(s => s.languageId))],
      categories: [...new Set(snippets.map(s => s.category).filter(Boolean))]
    };
  }

  // Clear all snippets
  clearAllSnippets() {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(this.storageKey);
      this.ensureStorage();
      return true;
    } catch (error) {
      console.error('Error clearing snippets:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const codeDB = new CodeDatabase();

// SQL-specific utilities
export class SQLCodeManager {
  constructor() {
    this.db = codeDB;
  }

  // Save SQL code with metadata
  saveSQLCode(code, title, description = '', tags = []) {
    return this.db.saveSnippet({
      title: title || 'SQL Query',
      description,
      code,
      languageId: '82', // SQL language ID
      category: 'sql',
      tags: ['sql', ...tags],
      type: 'query'
    });
  }

  // Get all SQL snippets
  getSQLSnippets() {
    return this.db.getSnippetsByLanguage('82');
  }

  // Get SQL snippets by category
  getSQLSnippetsByCategory(category) {
    const sqlSnippets = this.getSQLSnippets();
    return sqlSnippets.filter(s => s.category === category);
  }

  // Search SQL snippets
  searchSQLSnippets(query) {
    const sqlSnippets = this.getSQLSnippets();
    const lowerQuery = query.toLowerCase();
    
    return sqlSnippets.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.code.toLowerCase().includes(lowerQuery) ||
      s.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Get SQL snippet categories
  getSQLCategories() {
    const sqlSnippets = this.getSQLSnippets();
    return [...new Set(sqlSnippets.map(s => s.category).filter(Boolean))];
  }

  // Validate SQL code (basic validation)
  validateSQLCode(code) {
    if (!code || code.trim().length === 0) {
      return { isValid: false, error: 'SQL code cannot be empty' };
    }

    const trimmedCode = code.trim();
    
    // Check for basic SQL keywords
    const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER'];
    const hasKeyword = sqlKeywords.some(keyword => 
      trimmedCode.toUpperCase().includes(keyword)
    );

    if (!hasKeyword) {
      return { isValid: false, error: 'Code must contain SQL keywords' };
    }

    return { isValid: true };
  }

  // Format SQL code (basic formatting)
  formatSQLCode(code) {
    if (!code) return code;
    
    // Basic SQL formatting
    let formatted = code
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*,\s*/g, ', ') // Format commas
      .replace(/\s*=\s*/g, ' = ') // Format equals
      .replace(/\s*\(\s*/g, ' (') // Format opening parentheses
      .replace(/\s*\)\s*/g, ') ') // Format closing parentheses
      .trim();

    // Capitalize SQL keywords
    const keywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'DROP', 'ALTER', 'ADD', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'ON', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'DISTINCT', 'AS', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'UNION', 'ALL', 'VIEW'];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword);
    });

    return formatted;
  }
}

// Create SQL manager instance
export const sqlManager = new SQLCodeManager(); 