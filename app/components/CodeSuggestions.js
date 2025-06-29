"use client";

import { useState, useEffect, useRef } from "react";

export default function CodeSuggestions({ code, setCode, language, cursorPosition }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);

  // Language-specific suggestions
  const getSuggestions = (language, currentWord) => {
    const allSuggestions = {
      "54": { // C++
        keywords: ["#include", "using", "namespace", "std", "int", "main", "cout", "cin", "endl", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "class", "struct", "public", "private", "protected", "const", "static", "virtual", "template", "typename", "auto", "nullptr", "override", "final", "explicit", "friend", "inline", "mutable", "operator", "typedef", "union", "volatile"],
        functions: ["cout <<", "cin >>", "endl", "printf", "scanf", "malloc", "free", "strlen", "strcpy", "strcmp", "strcat", "strstr", "atoi", "atof", "itoa", "sprintf", "sscanf", "getline", "getchar", "putchar", "tolower", "toupper", "isalpha", "isdigit", "isspace"],
        libraries: ["#include <iostream>", "#include <string>", "#include <vector>", "#include <map>", "#include <set>", "#include <algorithm>", "#include <cmath>", "#include <cstring>", "#include <cstdlib>", "#include <ctime>", "#include <fstream>", "#include <sstream>", "#include <queue>", "#include <stack>", "#include <deque>", "#include <list>", "#include <unordered_map>", "#include <unordered_set>", "#include <bits/stdc++.h>"],
        snippets: {
          "main": `int main() {
    // Your code here
    return 0;
}`,
          "for": `for (int i = 0; i < n; i++) {
    // Loop body
}`,
          "forr": `for (int i = n - 1; i >= 0; i--) {
    // Reverse loop body
}`,
          "fori": `for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        // Nested loop body
    }
}`,
          "while": `while (condition) {
    // Loop body
}`,
          "dowhile": `do {
    // Loop body
} while (condition);`,
          "if": `if (condition) {
    // True block
} else {
    // False block
}`,
          "ifelse": `if (condition1) {
    // Block 1
} else if (condition2) {
    // Block 2
} else {
    // Default block
}`,
          "switch": `switch (variable) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Default code
        break;
}`,
          "class": `class MyClass {
private:
    // Private members
    int privateVar;
    
public:
    // Constructor
    MyClass() {
        // Constructor body
    }
    
    // Destructor
    ~MyClass() {
        // Destructor body
    }
    
    // Methods
    void myMethod() {
        // Method body
    }
};`,
          "struct": `struct MyStruct {
    // Member variables
    int x;
    string name;
    
    // Constructor
    MyStruct(int x, string name) : x(x), name(name) {}
};`,
          "template": `template<typename T>
class TemplateClass {
private:
    T data;
    
public:
    TemplateClass(T value) : data(value) {}
    
    T getData() const {
        return data;
    }
};`,
          "function": `returnType functionName(parameterType parameter) {
    // Function body
    return returnValue;
}`,
          "lambda": `auto lambda = [](parameters) -> returnType {
    // Lambda body
    return value;
};`,
          "trycatch": `try {
    // Code that might throw exception
} catch (const exception& e) {
    // Exception handling
    cerr << "Error: " << e.what() << endl;
}`,
          "vector": `vector<type> vec = {1, 2, 3, 4, 5};
for (const auto& item : vec) {
    // Process item
}`,
          "map": `map<keyType, valueType> myMap;
myMap[key] = value;
for (const auto& pair : myMap) {
    // Process pair.first and pair.second
}`,
          "sort": `sort(container.begin(), container.end());
sort(container.begin(), container.end(), greater<type>());`,
          "binary_search": `if (binary_search(container.begin(), container.end(), value)) {
    // Value found
}`,
          "gcd": `int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`,
          "lcm": `int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}`,
          "fibonacci": `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}`,
          "factorial": `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}`,
          "prime": `bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`,
          "dfs": `void dfs(int node, vector<bool>& visited, vector<vector<int>>& graph) {
    visited[node] = true;
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}`,
          "bfs": `void bfs(int start, vector<vector<int>>& graph) {
    queue<int> q;
    vector<bool> visited(graph.size(), false);
    
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
          "dijkstra": `vector<int> dijkstra(int start, vector<vector<pair<int, int>>>& graph) {
    int n = graph.size();
    vector<int> distance(n, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    distance[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int dist = pq.top().first;
        int node = pq.top().second;
        pq.pop();
        
        if (dist > distance[node]) continue;
        
        for (auto& [neighbor, weight] : graph[node]) {
            if (distance[node] + weight < distance[neighbor]) {
                distance[neighbor] = distance[node] + weight;
                pq.push({distance[neighbor], neighbor});
            }
        }
    }
    return distance;
}`
        }
      },
      "71": { // Python
        keywords: ["def", "class", "if", "else", "elif", "for", "while", "try", "except", "finally", "with", "as", "import", "from", "return", "yield", "lambda", "True", "False", "None", "and", "or", "not", "in", "is", "pass", "break", "continue", "raise", "assert", "del", "global", "nonlocal"],
        functions: ["print()", "input()", "len()", "range()", "list()", "dict()", "set()", "str()", "int()", "float()", "bool()", "type()", "id()", "hash()", "abs()", "max()", "min()", "sum()", "sorted()", "reversed()", "enumerate()", "zip()", "map()", "filter()", "reduce()", "open()", "read()", "write()", "close()"],
        libraries: ["import os", "import sys", "import json", "import datetime", "import random", "import math", "import re", "import collections", "import itertools", "import functools", "import threading", "import multiprocessing", "import asyncio", "import aiohttp", "import requests", "import numpy", "import pandas", "import matplotlib", "import seaborn", "from typing import", "from dataclasses import", "from enum import"],
        snippets: {
          "main": `if __name__ == "__main__":
    # Your code here
    pass`,
          "for": `for item in items:
    # Loop body
    pass`,
          "fori": `for i in range(len(items)):
    # Loop with index
    pass`,
          "forr": `for i in range(len(items) - 1, -1, -1):
    # Reverse loop
    pass`,
          "while": `while condition:
    # Loop body
    pass`,
          "if": `if condition:
    # True block
    pass
else:
    # False block
    pass`,
          "ifelse": `if condition1:
    # Block 1
    pass
elif condition2:
    # Block 2
    pass
else:
    # Default block
    pass`,
          "class": `class MyClass:
    def __init__(self, param1, param2):
        self.param1 = param1
        self.param2 = param2
    
    def my_method(self):
        # Method body
        pass
    
    @property
    def my_property(self):
        return self.param1
    
    @my_property.setter
    def my_property(self, value):
        self.param1 = value`,
          "dataclass": `from dataclasses import dataclass

@dataclass
class MyDataClass:
    field1: str
    field2: int
    field3: float = 0.0`,
          "function": `def function_name(parameter1, parameter2=None):
    """
    Function docstring
    """
    # Function body
    return value`,
          "lambda": `lambda x: x * 2`,
          "trycatch": `try:
    # Code that might raise exception
    pass
except Exception as e:
    # Exception handling
    print(f"Error: {e}")
finally:
    # Cleanup code
    pass`,
          "with": `with open(filename, 'r') as file:
    # File operations
    content = file.read()`,
          "list_comp": `[expression for item in items if condition]`,
          "dict_comp": `{key: value for key, value in items if condition}`,
          "set_comp": `{expression for item in items if condition}`,
          "generator": `def generator_function():
    for item in items:
        yield item`,
          "decorator": `def my_decorator(func):
    def wrapper(*args, **kwargs):
        # Pre-processing
        result = func(*args, **kwargs)
        # Post-processing
        return result
    return wrapper`,
          "property": `@property
def my_property(self):
    return self._value

@my_property.setter
def my_property(self, value):
    self._value = value`,
          "staticmethod": `@staticmethod
def static_method():
    # Static method body
    pass`,
          "classmethod": `@classmethod
def class_method(cls):
    # Class method body
    pass`,
          "enum": `from enum import Enum

class MyEnum(Enum):
    VALUE1 = 1
    VALUE2 = 2
    VALUE3 = 3`,
          "gcd": `import math

def gcd(a, b):
    return math.gcd(a, b)`,
          "lcm": `import math

def lcm(a, b):
    return abs(a * b) // math.gcd(a, b)`,
          "fibonacci": `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
          "factorial": `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)`,
          "prime": `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True`,
          "dfs": `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
          "bfs": `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
          "dijkstra": `import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
            
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances`
        }
      },
      "62": { // Java
        keywords: ["public", "private", "protected", "static", "final", "abstract", "class", "interface", "extends", "implements", "import", "package", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "return", "try", "catch", "finally", "throw", "throws", "new", "this", "super", "synchronized", "volatile", "transient", "native", "strictfp", "enum", "assert", "default"],
        functions: ["System.out.println()", "System.out.print()", "Scanner", "nextInt()", "nextLine()", "nextDouble()", "nextFloat()", "nextBoolean()", "nextLong()", "nextShort()", "nextByte()", "hasNext()", "hasNextInt()", "hasNextLine()", "close()"],
        libraries: ["import java.util.*;", "import java.io.*;", "import java.lang.*;", "import java.math.*;", "import java.text.*;", "import java.time.*;", "import java.nio.*;", "import java.net.*;", "import java.sql.*;", "import java.security.*;", "import java.util.concurrent.*;", "import java.util.stream.*;", "import java.util.function.*;"],
        snippets: {
          "main": `public static void main(String[] args) {
    // Your code here
}`,
          "for": `for (int i = 0; i < n; i++) {
    // Loop body
}`,
          "forr": `for (int i = n - 1; i >= 0; i--) {
    // Reverse loop body
}`,
          "fori": `for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        // Nested loop body
    }
}`,
          "foreach": `for (Type item : collection) {
    // Loop body
}`,
          "while": `while (condition) {
    // Loop body
}`,
          "dowhile": `do {
    // Loop body
} while (condition);`,
          "if": `if (condition) {
    // True block
} else {
    // False block
}`,
          "ifelse": `if (condition1) {
    // Block 1
} else if (condition2) {
    // Block 2
} else {
    // Default block
}`,
          "switch": `switch (variable) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    default:
        // Default code
        break;
}`,
          "class": `public class MyClass {
    // Instance variables
    private String name;
    private int value;
    
    // Constructor
    public MyClass(String name, int value) {
        this.name = name;
        this.value = value;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getValue() {
        return value;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    public void setValue(int value) {
        this.value = value;
    }
    
    // Other methods
    public void display() {
        System.out.println("Name: " + name + ", Value: " + value);
    }
}`,
          "interface": `public interface MyInterface {
    // Abstract methods
    void method1();
    int method2(String param);
    
    // Default method (Java 8+)
    default void defaultMethod() {
        // Default implementation
    }
    
    // Static method (Java 8+)
    static void staticMethod() {
        // Static implementation
    }
}`,
          "enum": `public enum MyEnum {
    VALUE1("Description 1"),
    VALUE2("Description 2"),
    VALUE3("Description 3");
    
    private final String description;
    
    MyEnum(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
}`,
          "method": `public returnType methodName(parameterType parameter) {
    // Method body
    return returnValue;
}`,
          "constructor": `public ClassName(parameterType parameter) {
    // Constructor body
    this.field = parameter;
}`,
          "getter": `public returnType getFieldName() {
    return fieldName;
}`,
          "setter": `public void setFieldName(parameterType fieldName) {
    this.fieldName = fieldName;
}`,
          "trycatch": `try {
    // Code that might throw exception
} catch (Exception e) {
    // Exception handling
    System.err.println("Error: " + e.getMessage());
} finally {
    // Cleanup code
}`,
          "scanner": `Scanner scanner = new Scanner(System.in);
// Use scanner methods
scanner.close();`,
          "array": `Type[] array = new Type[size];
for (int i = 0; i < array.length; i++) {
    // Process array[i]
}`,
          "arraylist": `ArrayList<Type> list = new ArrayList<>();
list.add(item);
for (Type item : list) {
    // Process item
}`,
          "hashmap": `HashMap<KeyType, ValueType> map = new HashMap<>();
map.put(key, value);
for (Map.Entry<KeyType, ValueType> entry : map.entrySet()) {
    // Process entry.getKey() and entry.getValue()
}`,
          "hashset": `HashSet<Type> set = new HashSet<>();
set.add(item);
for (Type item : set) {
    // Process item
}`,
          "queue": `Queue<Type> queue = new LinkedList<>();
queue.offer(item);
while (!queue.isEmpty()) {
    Type item = queue.poll();
    // Process item
}`,
          "stack": `Stack<Type> stack = new Stack<>();
stack.push(item);
while (!stack.isEmpty()) {
    Type item = stack.pop();
    // Process item
}`,
          "gcd": `public static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`,
          "lcm": `public static int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}`,
          "fibonacci": `public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}`,
          "factorial": `public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}`,
          "prime": `public static boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`,
          "dfs": `public static void dfs(int node, boolean[] visited, List<List<Integer>> graph) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}`,
          "bfs": `public static void bfs(int start, List<List<Integer>> graph) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    queue.offer(start);
    visited[start] = true;
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}`,
          "dijkstra": `public static int[] dijkstra(int start, List<List<int[]>> graph) {
    int n = graph.size();
    int[] distances = new int[n];
    Arrays.fill(distances, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    
    distances[start] = 0;
    pq.offer(new int[]{0, start});
    
    while (!pq.isEmpty()) {
        int[] current = pq.poll();
        int dist = current[0];
        int node = current[1];
        
        if (dist > distances[node]) continue;
        
        for (int[] edge : graph.get(node)) {
            int neighbor = edge[0];
            int weight = edge[1];
            
            if (distances[node] + weight < distances[neighbor]) {
                distances[neighbor] = distances[node] + weight;
                pq.offer(new int[]{distances[neighbor], neighbor});
            }
        }
    }
    return distances;
}`
        }
      }
    };

    const langSuggestions = allSuggestions[language] || allSuggestions["54"];
    const currentWordLower = currentWord.toLowerCase();
    
    let filteredSuggestions = [];
    
    // Add keywords
    filteredSuggestions.push(...langSuggestions.keywords
      .filter(keyword => keyword.toLowerCase().includes(currentWordLower))
      .map(keyword => ({ type: "keyword", text: keyword })));
    
    // Add functions
    filteredSuggestions.push(...langSuggestions.functions
      .filter(func => func.toLowerCase().includes(currentWordLower))
      .map(func => ({ type: "function", text: func })));
    
    // Add libraries
    filteredSuggestions.push(...langSuggestions.libraries
      .filter(lib => lib.toLowerCase().includes(currentWordLower))
      .map(lib => ({ type: "library", text: lib })));
    
    // Add snippets
    Object.entries(langSuggestions.snippets).forEach(([key, snippet]) => {
      if (key.toLowerCase().includes(currentWordLower)) {
        filteredSuggestions.push({ type: "snippet", text: key, snippet });
      }
    });
    
    return filteredSuggestions.slice(0, 10); // Limit to 10 suggestions
  };

  const getCurrentWord = (text, position) => {
    const beforeCursor = text.substring(0, position);
    // Find the start of the current word
    let start = position - 1;
    while (start >= 0 && /[a-zA-Z0-9_#]/.test(text[start])) {
      start--;
    }
    start++;
    return text.substring(start, position);
  };

  const insertSuggestion = (suggestion) => {
    const beforeCursor = code.substring(0, cursorPosition);
    const afterCursor = code.substring(cursorPosition);
    const currentWord = getCurrentWord(code, cursorPosition);
    
    let newText;
    if (suggestion.type === "snippet") {
      // Insert snippet
      const wordStart = cursorPosition - currentWord.length;
      newText = code.substring(0, wordStart) + suggestion.snippet + afterCursor;
    } else {
      // Insert text
      const wordStart = cursorPosition - currentWord.length;
      newText = code.substring(0, wordStart) + suggestion.text + afterCursor;
    }
    
    setCode(newText);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        insertSuggestion(suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Dismiss on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  useEffect(() => {
    const currentWord = getCurrentWord(code, cursorPosition);
    if (currentWord.length >= 2) {
      const newSuggestions = getSuggestions(language, currentWord);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [code, cursorPosition, language]);

  if (!showSuggestions) return null;

  return (
    <div
      ref={dropdownRef}
      tabIndex={-1}
      className="absolute z-20 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto min-w-64 mt-2 left-0"
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)", width: 340 }}
      onKeyDown={handleKeyDown}
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => insertSuggestion(suggestion)}
          className={`px-4 py-2 flex items-center gap-2 border-b border-gray-800 last:border-b-0 cursor-pointer transition-colors ${
            index === selectedIndex ? "bg-blue-800/80" : "hover:bg-gray-700"
          }`}
          style={{ userSelect: "none" }}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <span className={`text-xs px-2 py-1 rounded ${
            suggestion.type === "keyword" ? "bg-blue-600" :
            suggestion.type === "function" ? "bg-green-600" :
            suggestion.type === "library" ? "bg-purple-600" :
            "bg-orange-600"
          }`}>
            {suggestion.type}
          </span>
          <span className="text-sm">{suggestion.text}</span>
        </div>
      ))}
      <div className="px-4 py-1 text-xs text-gray-400 border-t border-gray-800 bg-gray-900">Use <b>Tab</b>/<b>Enter</b> to accept, <b>↑</b>/<b>↓</b> to navigate, <b>Esc</b> to close</div>
    </div>
  );
}