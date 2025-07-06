# Database and SQL Features

This document describes the database functionality and SQL tools that have been added to the C++ Compiler application.

## Overview

The application now includes comprehensive database functionality for saving, loading, and managing SQL code snippets. All data is stored locally using the browser's localStorage, making it perfect for personal use and development.

## Features

### 1. Code Snippet Management

#### Save Code Snippets

- Save any code snippet with metadata (title, description, tags)
- Automatic categorization by programming language
- Support for all supported languages (C++, C, Java, Python, JavaScript, C#, SQL)

#### Load Code Snippets

- Browse saved snippets by language
- Search functionality across titles, descriptions, and code content
- Filter by categories and tags
- Quick load with one click

#### Edit and Delete

- Edit existing snippets (title, description, tags, code)
- Delete snippets with confirmation
- Bulk operations support

### 2. SQL-Specific Tools

#### SQL Validation

- Basic SQL syntax validation
- Checks for required SQL keywords
- Validates code structure

#### SQL Formatting

- Automatic SQL code formatting
- Keyword capitalization
- Proper spacing and indentation
- Consistent formatting across different SQL dialects

#### Quick SQL Queries

- Pre-built SQL templates for common operations:
  - SELECT statements
  - INSERT operations
  - UPDATE operations
  - DELETE operations
  - CREATE TABLE statements
  - JOIN queries
  - GROUP BY aggregations

### 3. Database Manager

#### Database Structure

- Visual database schema management
- Table creation wizard
- Column definition with data types
- Primary key and constraint management

#### Sample Databases

- Pre-loaded sample database with users and orders tables
- Realistic table structures for learning
- Example queries and relationships

#### Table Operations

- View table structure
- Generate sample queries
- Quick SELECT statements
- Table creation with visual interface

## Usage

### Saving Code

1. **Using the Save Button**: Click the save button (document icon) in the editor toolbar
2. **Keyboard Shortcut**: Press `Ctrl+S` (or `Cmd+S` on Mac)
3. **Fill in Metadata**:
   - Title: Required field for snippet identification
   - Description: Optional description of the code
   - Tags: Comma-separated tags for organization

### Loading Code

1. **Using the Load Button**: Click the folder icon in the editor toolbar
2. **Keyboard Shortcut**: Press `Ctrl+O` (or `Cmd+O` on Mac)
3. **Browse and Search**: Use the search and filter options to find your snippet
4. **Load**: Click "Load Snippet" to load the code into the editor

### SQL Tools (SQL Language Only)

When using SQL language (language ID: 82), additional tools become available:

#### SQL Tools Panel

- **Validate SQL**: Check if your SQL code is syntactically correct
- **Format SQL**: Automatically format your SQL code for better readability
- **Quick Queries**: Insert common SQL patterns with one click

#### Database Manager Panel

- **Select Database**: Choose from available sample databases
- **View Tables**: See table structures and relationships
- **Create Tables**: Use the visual table creation wizard
- **Generate Queries**: Get sample queries for any table

## Data Storage

### Local Storage

- All snippets are stored in the browser's localStorage
- Data persists between browser sessions
- No external database required
- Works offline

### Export/Import

- Export all snippets as JSON file
- Import snippets from JSON files
- Merge functionality to avoid duplicates
- Backup and restore capabilities

### Storage Statistics

- View total number of snippets
- Check storage size
- Monitor language distribution
- Track categories and tags

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save current code snippet |
| `Ctrl+O` | Load saved code snippet |
| `Ctrl+C` | Copy code to clipboard |
| `Ctrl+Enter` | Run code |

## SQL Language Support

### Supported SQL Features

- Basic SQL syntax (SELECT, INSERT, UPDATE, DELETE)
- Table creation and modification
- JOIN operations
- Aggregation functions
- Subqueries
- Constraints and indexes

### SQL Validation Rules

- Must contain SQL keywords
- Proper statement termination
- Basic syntax checking
- Keyword capitalization

### SQL Formatting Features

- Automatic keyword capitalization
- Consistent spacing
- Proper indentation
- Statement alignment

## Technical Implementation

### Database Layer

- `CodeDatabase` class for general snippet management
- `SQLCodeManager` class for SQL-specific operations
- localStorage-based persistence
- JSON data format

### Components

- `SaveLoadModal`: Main save/load interface
- `SQLTools`: SQL-specific tools and validation
- `DatabaseManager`: Database structure management
- Integration with existing `CodeEditor` component

### Data Structure

```javascript
{
  id: "unique_id",
  title: "Snippet Title",
  description: "Snippet description",
  code: "actual code content",
  languageId: "82", // SQL language ID
  category: "sql",
  tags: ["sql", "query", "database"],
  type: "snippet",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## Future Enhancements

### Planned Features

- Cloud storage integration
- Collaborative sharing
- Version control for snippets
- Advanced SQL parsing and validation
- Database connection management
- Query optimization suggestions

### Potential Improvements

- Real-time collaboration
- Snippet templates and libraries
- Advanced search and filtering
- Code analysis and suggestions
- Integration with external databases

## Troubleshooting

### Common Issues

1. **Snippets not saving**: Check if localStorage is enabled in your browser
2. **Import fails**: Ensure the JSON file is properly formatted
3. **SQL validation errors**: Check for proper SQL syntax and keywords
4. **Storage full**: Export and clear old snippets to free up space

### Browser Compatibility

- Modern browsers with localStorage support
- Chrome, Firefox, Safari, Edge
- Mobile browsers may have limited functionality

## Contributing

To contribute to the database features:

1. Follow the existing code structure
2. Add proper error handling
3. Include unit tests for new functionality
4. Update documentation for new features
5. Ensure backward compatibility

## License

This database functionality is part of the C++ Compiler application and follows the same licensing terms.
