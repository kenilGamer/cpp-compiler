"use client";

import { useState } from "react";
import { 
  WrenchScrewdriverIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  TableCellsIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { sqlManager } from "../utils/database";

export default function SQLTools({ code, setCode, onFormat, onValidate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [formatResult, setFormatResult] = useState(null);

  const handleValidate = () => {
    const result = sqlManager.validateSQLCode(code);
    setValidationResult(result);
    if (onValidate) onValidate(result);
  };

  const handleFormat = () => {
    const formatted = sqlManager.formatSQLCode(code);
    setFormatResult(formatted);
    setCode(formatted);
    if (onFormat) onFormat(formatted);
  };

  const quickQueries = [
    {
      name: "Complete Example",
      query: `-- Create and populate a complete example
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT,
  salary REAL
);

INSERT INTO employees (name, department, salary) VALUES ('Alice', 'Engineering', 75000);
INSERT INTO employees (name, department, salary) VALUES ('Bob', 'Marketing', 65000);
INSERT INTO employees (name, department, salary) VALUES ('Charlie', 'Engineering', 80000);
INSERT INTO employees (name, department, salary) VALUES ('Diana', 'Sales', 70000);

SELECT * FROM employees;`,
      description: "Complete working example with table creation and data"
    },
    {
      name: "Basic SELECT",
      query: `-- Create a simple table first
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER
);

INSERT INTO users (name, age) VALUES ('John', 25);
INSERT INTO users (name, age) VALUES ('Jane', 30);
INSERT INTO users (name, age) VALUES ('Mike', 35);

-- Then select all records
SELECT * FROM users;`,
      description: "Create table and select all records"
    },
    {
      name: "WHERE Clause",
      query: `-- Create products table
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL,
  category TEXT
);

INSERT INTO products (name, price, category) VALUES ('Laptop', 999.99, 'Electronics');
INSERT INTO products (name, price, category) VALUES ('Book', 19.99, 'Education');
INSERT INTO products (name, price, category) VALUES ('Coffee', 4.99, 'Food');

-- Filter expensive products
SELECT name, price FROM products WHERE price > 50;`,
      description: "Filter records with WHERE clause"
    },
    {
      name: "JOIN Example",
      query: `-- Create two related tables
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product TEXT,
  amount REAL,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- Insert sample data
INSERT INTO customers (name, email) VALUES ('Alice', 'alice@email.com');
INSERT INTO customers (name, email) VALUES ('Bob', 'bob@email.com');

INSERT INTO orders (customer_id, product, amount) VALUES (1, 'Laptop', 999.99);
INSERT INTO orders (customer_id, product, amount) VALUES (2, 'Book', 19.99);
INSERT INTO orders (customer_id, product, amount) VALUES (1, 'Mouse', 29.99);

-- Join the tables
SELECT customers.name, orders.product, orders.amount
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id;`,
      description: "Join two tables with relationship"
    },
    {
      name: "Aggregation",
      query: `-- Create sales data
CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  quantity INTEGER,
  price REAL
);

INSERT INTO sales (product, quantity, price) VALUES ('Laptop', 2, 999.99);
INSERT INTO sales (product, quantity, price) VALUES ('Mouse', 5, 29.99);
INSERT INTO sales (product, quantity, price) VALUES ('Laptop', 1, 999.99);
INSERT INTO sales (product, quantity, price) VALUES ('Keyboard', 3, 79.99);

-- Group and aggregate
SELECT 
  product,
  COUNT(*) as sales_count,
  SUM(quantity) as total_quantity,
  SUM(quantity * price) as total_revenue
FROM sales
GROUP BY product;`,
      description: "Group by and aggregate functions"
    },
    {
      name: "Subquery",
      query: `-- Create departments and employees
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  budget REAL
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER,
  salary REAL,
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

-- Insert data
INSERT INTO departments (name, budget) VALUES ('Engineering', 1000000);
INSERT INTO departments (name, budget) VALUES ('Marketing', 500000);

INSERT INTO employees (name, department_id, salary) VALUES ('Alice', 1, 75000);
INSERT INTO employees (name, department_id, salary) VALUES ('Bob', 1, 80000);
INSERT INTO employees (name, department_id, salary) VALUES ('Charlie', 2, 65000);

-- Use subquery to find employees in high-budget departments
SELECT name, salary
FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE budget > 750000
);`,
      description: "Use subquery to filter data"
    }
  ];

  const insertQuickQuery = (query) => {
    setCode(query);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <WrenchScrewdriverIcon className="w-5 h-5 text-blue-400" />
          <span className="font-medium text-white">SQL Tools</span>
        </div>
        <div className="flex items-center gap-2">
          {validationResult && (
            <div className="flex items-center gap-1">
              {validationResult.isValid ? (
                <CheckCircleIcon className="w-4 h-4 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />
              )}
            </div>
          )}
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-700">
          {/* Validation and Formatting */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex gap-2 mb-4">
              <button
                onClick={handleValidate}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Validate SQL
              </button>
              <button
                onClick={handleFormat}
                className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <DocumentTextIcon className="w-4 h-4" />
                Format SQL
              </button>
            </div>

            {/* Validation Result */}
            {validationResult && (
              <div className={`p-3 rounded-lg text-sm ${
                validationResult.isValid 
                  ? 'bg-green-900/30 border border-green-700 text-green-300' 
                  : 'bg-red-900/30 border border-red-700 text-red-300'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {validationResult.isValid ? (
                    <CheckCircleIcon className="w-4 h-4" />
                  ) : (
                    <ExclamationTriangleIcon className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {validationResult.isValid ? 'Valid SQL' : 'Invalid SQL'}
                  </span>
                </div>
                {validationResult.error && (
                  <p className="text-xs">{validationResult.error}</p>
                )}
              </div>
            )}
          </div>

          {/* Quick Queries */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
              <TableCellsIcon className="w-4 h-4" />
              Quick SQL Queries
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => insertQuickQuery(query.query)}
                  className="text-left p-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors group"
                >
                  <div className="font-medium text-white text-sm mb-1 group-hover:text-blue-400 transition-colors">
                    {query.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {query.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SQL Tips */}
          <div className="p-4 bg-gray-800/30 border-t border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <MagnifyingGlassIcon className="w-4 h-4" />
              SQL Tips
            </h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>• Use <code className="bg-gray-700 px-1 rounded">SELECT</code> to retrieve data</p>
              <p>• Use <code className="bg-gray-700 px-1 rounded">WHERE</code> to filter results</p>
              <p>• Use <code className="bg-gray-700 px-1 rounded">JOIN</code> to combine tables</p>
              <p>• Use <code className="bg-gray-700 px-1 rounded">GROUP BY</code> to aggregate data</p>
              <p>• Always end statements with semicolon (;)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 