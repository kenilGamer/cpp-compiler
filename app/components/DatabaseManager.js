"use client";

import { useState, useEffect } from "react";
import { 
  ServerIcon, 
  TableCellsIcon, 
  PlusIcon, 
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { sqlManager } from "../utils/database";

export default function DatabaseManager({ onExecuteQuery, showForAllLanguages = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [databases, setDatabases] = useState([]);
  const [selectedDB, setSelectedDB] = useState(null);
  const [tables, setTables] = useState([]);
  const [showCreateTable, setShowCreateTable] = useState(false);
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "TEXT", nullable: true }]);

  // Sample database structure (in a real app, this would come from actual database)
  const sampleDatabases = [
    {
      name: "sample_db",
      tables: [
        {
          name: "users",
          columns: [
            { name: "id", type: "INTEGER", nullable: false, primary: true },
            { name: "name", type: "TEXT", nullable: false },
            { name: "email", type: "TEXT", nullable: false },
            { name: "created_at", type: "TIMESTAMP", nullable: true }
          ]
        },
        {
          name: "orders",
          columns: [
            { name: "id", type: "INTEGER", nullable: false, primary: true },
            { name: "user_id", type: "INTEGER", nullable: false },
            { name: "product", type: "TEXT", nullable: false },
            { name: "amount", type: "REAL", nullable: false },
            { name: "order_date", type: "TIMESTAMP", nullable: true }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    setDatabases(sampleDatabases);
  }, []);

  useEffect(() => {
    if (selectedDB) {
      const db = databases.find(d => d.name === selectedDB);
      setTables(db ? db.tables : []);
    }
  }, [selectedDB, databases]);

  const handleCreateTable = () => {
    if (!tableName.trim()) {
      alert("Please enter a table name");
      return;
    }

    const validColumns = columns.filter(col => col.name.trim());
    if (validColumns.length === 0) {
      alert("Please add at least one column");
      return;
    }

    const createTableSQL = `CREATE TABLE ${tableName} (
  ${validColumns.map(col => {
    let def = `${col.name} ${col.type}`;
    if (!col.nullable) def += " NOT NULL";
    if (col.primary) def += " PRIMARY KEY";
    return def;
  }).join(",\n  ")}
);`;

    if (onExecuteQuery) {
      onExecuteQuery(createTableSQL);
    }

    setShowCreateTable(false);
    setTableName("");
    setColumns([{ name: "", type: "TEXT", nullable: true }]);
  };

  const addColumn = () => {
    setColumns([...columns, { name: "", type: "TEXT", nullable: true }]);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const updateColumn = (index, field, value) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
  };

  const getTableStructure = (table) => {
    const nonPrimaryColumns = table.columns.filter(c => !c.primary);
    const columnNames = nonPrimaryColumns.map(c => c.name).join(', ');
    const sampleValues = nonPrimaryColumns.map(col => {
      switch (col.type) {
        case 'INTEGER': return '1';
        case 'REAL': return '99.99';
        case 'TEXT': return "'Sample Text'";
        case 'TIMESTAMP': return "'2024-01-01'";
        default: return "'value'";
      }
    }).join(', ');

    return `-- Table: ${table.name}
-- Columns:
${table.columns.map(col => `--   ${col.name}: ${col.type}${col.nullable ? '' : ' NOT NULL'}${col.primary ? ' PRIMARY KEY' : ''}`).join('\n')}

-- Create the table:
CREATE TABLE ${table.name} (
  ${table.columns.map(col => {
    let def = `  ${col.name} ${col.type}`;
    if (!col.nullable) def += " NOT NULL";
    if (col.primary) def += " PRIMARY KEY";
    return def;
  }).join(",\n  ")}
);

-- Sample INSERT:
INSERT INTO ${table.name} (${columnNames}) VALUES (${sampleValues});

-- Sample SELECT:
SELECT * FROM ${table.name};
SELECT COUNT(*) FROM ${table.name};`;
  };

  const dataTypes = [
    "INTEGER", "REAL", "TEXT", "BLOB", "TIMESTAMP", "BOOLEAN"
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <ServerIcon className="w-5 h-5 text-green-400" />
          <span className="font-medium text-white">
            {showForAllLanguages ? "Code Snippets Manager" : "Database Manager"}
          </span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-700">
          {/* Database Selection */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              {showForAllLanguages ? "Select Code Category" : "Select Database"}
            </h4>
            <select
              value={selectedDB || ""}
              onChange={(e) => setSelectedDB(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a {showForAllLanguages ? "category" : "database"}...</option>
              {databases.map(db => (
                <option key={db.name} value={db.name}>{db.name}</option>
              ))}
            </select>
          </div>

          {/* Tables List */}
          {selectedDB && (
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-300">
                  {showForAllLanguages ? "Code Templates" : "Tables"}
                </h4>
                <button
                  onClick={() => setShowCreateTable(true)}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                >
                  <PlusIcon className="w-3 h-3" />
                  {showForAllLanguages ? "New Template" : "New Table"}
                </button>
              </div>
              
              <div className="space-y-2">
                {tables.map(table => (
                  <div key={table.name} className="p-3 bg-gray-700/50 border border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TableCellsIcon className="w-4 h-4 text-blue-400" />
                        <span className="font-medium text-white">{table.name}</span>
                        <span className="text-xs text-gray-400">({table.columns.length} columns)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onExecuteQuery && onExecuteQuery(getTableStructure(table))}
                          className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-600 rounded transition-colors"
                          title="View structure"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onExecuteQuery && onExecuteQuery(`SELECT * FROM ${table.name};`)}
                          className="p-1 text-gray-400 hover:text-green-400 hover:bg-gray-600 rounded transition-colors"
                          title="Select all"
                        >
                          <DocumentTextIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {table.columns.slice(0, 3).map(col => col.name).join(', ')}
                      {table.columns.length > 3 && '...'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Table Form */}
          {showCreateTable && (
            <div className="p-4 bg-gray-800/30 border-t border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Create New Table</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Table Name</label>
                  <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="Enter table name..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-2">Columns</label>
                  <div className="space-y-2">
                    {columns.map((column, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={column.name}
                          onChange={(e) => updateColumn(index, 'name', e.target.value)}
                          placeholder="Column name"
                          className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                        <select
                          value={column.type}
                          onChange={(e) => updateColumn(index, 'type', e.target.value)}
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                          {dataTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <label className="flex items-center gap-1 text-xs text-gray-400">
                          <input
                            type="checkbox"
                            checked={!column.nullable}
                            onChange={(e) => updateColumn(index, 'nullable', !e.target.checked)}
                            className="rounded"
                          />
                          NOT NULL
                        </label>
                        <label className="flex items-center gap-1 text-xs text-gray-400">
                          <input
                            type="checkbox"
                            checked={column.primary}
                            onChange={(e) => updateColumn(index, 'primary', e.target.checked)}
                            className="rounded"
                          />
                          PK
                        </label>
                        <button
                          onClick={() => removeColumn(index)}
                          className="p-1 text-red-400 hover:bg-red-900/30 rounded"
                        >
                          <TrashIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addColumn}
                    className="mt-2 flex items-center gap-1 px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                  >
                    <PlusIcon className="w-3 h-3" />
                    Add Column
                  </button>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleCreateTable}
                    className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Create Table
                  </button>
                  <button
                    onClick={() => setShowCreateTable(false)}
                    className="flex-1 py-2 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 