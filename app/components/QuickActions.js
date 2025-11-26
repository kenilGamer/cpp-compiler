"use client";

import { useState } from "react";
import {CodeBracketIcon,DocumentTextIcon,CpuChipIcon,BeakerIcon,CogIcon,BoltIcon,AcademicCapIcon,PuzzlePieceIcon,WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default function QuickActions({ setCode, language }) {
  const quickTemplates = {
    54: [
      {
        name: "Hello World",
        description: "Basic C++ starter template",
        icon: CodeBracketIcon,
        category: "basics",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      },
      {
        name: "Input/Output",
        description: "User input and output handling",
        icon: DocumentTextIcon,
        category: "basics",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    
    cout << "Enter your name: ";
    getline(cin, name);
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Hello " << name << ", you are " << age << " years old!" << endl;
    return 0;
}`,
      },
      {
        name: "Array Operations",
        description: "Vector and array manipulation",
        icon: CpuChipIcon,
        category: "data-structures",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // Sort the array
    sort(numbers.begin(), numbers.end());
    
    // Print sorted array
    cout << "Sorted numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
      },
      {
        name: "Class Template",
        description: "Object-oriented programming example",
        icon: AcademicCapIcon,
        category: "oop",
        code: `#include <iostream>
#include <string>
using namespace std;

class MyClass {
private:
    string name;
    int value;
    
public:
    MyClass(string n, int v) : name(n), value(v) {}
    
    void display() {
        cout << "Name: " << name << ", Value: " << value << endl;
    }
    
    void setValue(int v) { value = v; }
    int getValue() { return value; }
};

int main() {
    MyClass obj("Test", 42);
    obj.display();
    return 0;
}`,
      },
      {
        name: "STL Containers",
        description: "Standard Template Library examples",
        icon: PuzzlePieceIcon,
        category: "data-structures",
        code: `#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <queue>
using namespace std;

int main() {
    // Vector
    vector<int> vec = {1, 2, 3, 4, 5};
    
    // Map
    map<string, int> myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    
    // Set
    set<int> mySet = {1, 2, 3, 4, 5};
    
    // Queue
    queue<int> myQueue;
    myQueue.push(1);
    myQueue.push(2);
    
    cout << "Vector size: " << vec.size() << endl;
    cout << "Map size: " << myMap.size() << endl;
    
    return 0;
}`,
      },
      {
        name: "Algorithms",
        description: "STL algorithm examples",
        icon: BeakerIcon,
        category: "algorithms",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Find element
    auto it = find(numbers.begin(), numbers.end(), 5);
    if (it != numbers.end()) {
        cout << "Found 5 at position: " << (it - numbers.begin()) << endl;
    }
    
    // Count even numbers
    int count = count_if(numbers.begin(), numbers.end(), 
                        [](int x) { return x % 2 == 0; });
    cout << "Even numbers: " << count << endl;
    
    // Sum all numbers
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "Sum: " << sum << endl;
    
    return 0;
}`,
      },
      {
        name: "Exception Handling",
        description: "Error handling with try-catch",
        icon: WrenchScrewdriverIcon,
        category: "advanced",
        code: `#include <iostream>
#include <stdexcept>
using namespace std;

int divide(int a, int b) {
    if (b == 0) {
        throw runtime_error("Division by zero!");
    }
    return a / b;
}

int main() {
    try {
        int result = divide(10, 0);
        cout << "Result: " << result << endl;
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
    }
    
    return 0;
}`,
      },
      {
        name: "Templates",
        description: "Generic programming with templates",
        icon: CogIcon,
        category: "advanced",
        code: `#include <iostream>
#include <vector>
using namespace std;

template<typename T>
T findMax(const vector<T>& vec) {
    if (vec.empty()) {
        throw runtime_error("Vector is empty");
    }
    
    T max = vec[0];
    for (const T& item : vec) {
        if (item > max) {
            max = item;
        }
    }
    return max;
}

int main() {
    vector<int> intVec = {1, 5, 3, 9, 2};
    vector<double> doubleVec = {1.1, 5.5, 3.3, 9.9, 2.2};
    
    cout << "Max int: " << findMax(intVec) << endl;
    cout << "Max double: " << findMax(doubleVec) << endl;
    
    return 0;
}`,
      },
    ],
    71: [
      {
        name: "Hello World",
        description: "Basic Python starter template",
        icon: CodeBracketIcon,
        category: "basics",
        code: `#!/usr/bin/env python3
"""
Main program file
"""

def main():
    """Main function"""
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
      },
      {
        name: "Input/Output",
        description: "User input and output handling",
        icon: DocumentTextIcon,
        category: "basics",
        code: `def main():
    name = input("Enter your name: ")
    age = int(input("Enter your age: "))
    
    print(f"Hello {name}, you are {age} years old!")

if __name__ == "__main__":
    main()`,
      },
      {
        name: "List Operations",
        description: "List manipulation and comprehensions",
        icon: CpuChipIcon,
        category: "data-structures",
        code: `def main():
    numbers = [5, 2, 8, 1, 9, 3]
    
    # Sort the list
    numbers.sort()
    print("Sorted numbers:", numbers)
    
    # List comprehension
    squares = [x**2 for x in numbers]
    print("Squares:", squares)
    
    # Filter even numbers
    evens = [x for x in numbers if x % 2 == 0]
    print("Even numbers:", evens)

if __name__ == "__main__":
    main()`,
      },
      {
        name: "Class Template",
        description: "Object-oriented programming example",
        icon: AcademicCapIcon,
        category: "oop",
        code: `class MyClass:
    def __init__(self, name, value):
        self.name = name
        self.value = value
    
    def display(self):
        print(f"Name: {self.name}, Value: {self.value}")
    
    def set_value(self, value):
        self.value = value
    
    def get_value(self):
        return self.value

def main():
    obj = MyClass("Test", 42)
    obj.display()

if __name__ == "__main__":
    main()`,
      },
      {
        name: "Data Structures",
        description: "Advanced data structures",
        icon: PuzzlePieceIcon,
        category: "data-structures",
        code: `from collections import defaultdict, Counter
from typing import Dict, Set

def main():
    # Dictionary
    my_dict = {"apple": 1, "banana": 2, "cherry": 3}
    
    # DefaultDict
    dd = defaultdict(list)
    dd["fruits"].append("apple")
    
    # Counter
    counter = Counter(["apple", "banana", "apple", "cherry"])
    print("Counter:", counter)
    
    # Set
    my_set = {1, 2, 3, 4, 5}
    my_set.add(6)
    print("Set:", my_set)

if __name__ == "__main__":
    main()`,
      },
      {
        name: "Decorators",
        description: "Function decorators example",
        icon: BeakerIcon,
        category: "advanced",
        code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done!"

def main():
    result = slow_function()
    print(result)

if __name__ == "__main__":
    main()`,
      },
      {
        name: "Exception Handling",
        description: "Error handling with try-except",
        icon: WrenchScrewdriverIcon,
        category: "advanced",
        code: `def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero!")
    return a / b

def main():
    try:
        result = divide(10, 0)
        print(f"Result: {result}")
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        print("Cleanup code")

if __name__ == "__main__":
    main()`,
      },
      {
        name: "Generators",
        description: "Generator functions and expressions",
        icon: CogIcon,
        category: "advanced",
        code: `def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

def main():
    # Using generator
    print("Fibonacci sequence:")
    for num in fibonacci_generator(10):
        print(num, end=" ")
    print()
    
    # Generator expression
    squares = (x**2 for x in range(10))
    print("Squares:", list(squares))

if __name__ == "__main__":
    main()`,
      },
    ],
    62: [
      {
        name: "Hello World",
        description: "Basic Java starter template",
        icon: CodeBracketIcon,
        category: "basics",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      },
      {
        name: "Input/Output",
        description: "User input and output handling",
        icon: DocumentTextIcon,
        category: "basics",
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        System.out.println("Hello " + name + ", you are " + age + " years old!");
        scanner.close();
    }
}`,
      },
      {
        name: "Array Operations",
        description: "Array and List manipulation",
        icon: CpuChipIcon,
        category: "data-structures",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9, 3};
        
        // Sort the array
        Arrays.sort(numbers);
        
        // Print sorted array
        System.out.print("Sorted numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Convert to List
        List<Integer> list = Arrays.stream(numbers)
                                  .boxed()
                                  .collect(Collectors.toList());
        System.out.println("List: " + list);
    }
}`,
      },
      {
        name: "Class Template",
        description: "Object-oriented programming example",
        icon: AcademicCapIcon,
        category: "oop",
        code: `public class MyClass {
    private String name;
    private int value;
    
    public MyClass(String name, int value) {
        this.name = name;
        this.value = value;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Value: " + value);
    }
    
    public void setValue(int value) {
        this.value = value;
    }
    
    public int getValue() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        MyClass obj = new MyClass("Test", 42);
        obj.display();
    }
}`,
      },
      {
        name: "Collections",
        description: "Java Collections Framework",
        icon: PuzzlePieceIcon,
        category: "data-structures",
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // ArrayList
        List<String> list = new ArrayList<>();
        list.add("apple");
        list.add("banana");
        list.add("cherry");
        
        // HashMap
        Map<String, Integer> map = new HashMap<>();
        map.put("apple", 1);
        map.put("banana", 2);
        map.put("cherry", 3);
        
        // HashSet
        Set<Integer> set = new HashSet<>();
        set.add(1);
        set.add(2);
        set.add(3);
        
        System.out.println("List: " + list);
        System.out.println("Map: " + map);
        System.out.println("Set: " + set);
    }
}`,
      },
      {
        name: "Streams",
        description: "Java 8 Stream API examples",
        icon: BeakerIcon,
        category: "advanced",
        code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filter and map
        List<Integer> doubledEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 2)
            .collect(Collectors.toList());
        
        // Reduce
        int sum = numbers.stream()
            .reduce(0, Integer::sum);
        
        System.out.println("Doubled evens: " + doubledEvens);
        System.out.println("Sum: " + sum);
    }
}`,
      },
      {
        name: "Exception Handling",
        description: "Error handling with try-catch",
        icon: WrenchScrewdriverIcon,
        category: "advanced",
        code: `public class Main {
    public static int divide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Division by zero!");
        }
        return a / b;
    }
    
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.err.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
        } finally {
            System.out.println("Cleanup code");
        }
    }
}`,
      },
      {
        name: "Generics",
        description: "Generic programming with type parameters",
        icon: CogIcon,
        category: "advanced",
        code: `import java.util.*;

public class Box<T> {
    private T content;
    
    public Box(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public static <E> void printArray(E[] array) {
        for (E element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>("Hello");
        Box<Integer> intBox = new Box<>(42);
        
        System.out.println("String box: " + stringBox.getContent());
        System.out.println("Integer box: " + intBox.getContent());
    }
}`,
      },
    ],
    63: [
      {
        name: "Hello World",
        description: "Basic JavaScript starter template",
        icon: CodeBracketIcon,
        category: "basics",
        code: `console.log("Hello, World!");`,
      },
      {
        name: "Array Operations",
        description: "Array methods like map, filter, reduce",
        icon: CpuChipIcon,
        category: "data-structures",
        code: `const numbers = [1, 2, 3, 4, 5];

// Map to get squares
const squares = numbers.map(n => n * n);
console.log("Squares:", squares);

// Filter for even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);

// Reduce to get sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);`,
      },
      {
        name: "Async/Await",
        description: "Asynchronous programming example",
        icon: BoltIcon,
        category: "advanced",
        code: `async function fetchData() {
  try {
    // Simulate fetching data
    const data = { id: 1, title: "Sample Todo", completed: false };
    // Simulate network delay
    await new Promise(res => setTimeout(res, 500));
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();`,
      },
    ],
    50: [
      {
        name: "Hello World",
        description: "Basic C starter template",
        icon: CodeBracketIcon,
        category: "basics",
        code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      },
      {
        name: "Input/Output",
        description: "User input and output handling",
        icon: DocumentTextIcon,
        category: "basics",
        code: `#include <stdio.h>

int main() {
    char name[50];
    int age;
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    printf("Enter your age: ");
    scanf("%d", &age);
    printf("Hello %s, you are %d years old!\\n", name, age);
    return 0;
}`,
      },
      {
        name: "Array Operations",
        description: "Array manipulation and sorting",
        icon: CpuChipIcon,
        category: "data-structures",
        code: `#include <stdio.h>

void sort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int numbers[] = {5, 2, 8, 1, 9, 3};
    int n = sizeof(numbers)/sizeof(numbers[0]);
    sort(numbers, n);
    printf("Sorted numbers: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }

    return 0;
}`,
      },
    ],
    82: [
      {
        name: "Hello World",
        description: "Basic SQL SELECT statement",
        icon: CodeBracketIcon,
        category: "basics",
        code: `SELECT 'Hello, World!' AS greeting;`,
      },
      {
        name: "Create Table & Select",
        description: "Create a table, insert data, and select from it",
        icon: DocumentTextIcon,
        category: "basics",
        code: `-- Create a simple users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER
);

-- Insert some sample data
INSERT INTO users (name, age) VALUES ('Alice', 30);
INSERT INTO users (name, age) VALUES ('Bob', 25);
INSERT INTO users (name, age) VALUES ('Charlie', 35);

-- Select all users
SELECT * FROM users;`,
      },
      {
        name: "Insert & Query",
        description: "Insert data and run a query on the table",
        icon: CpuChipIcon,
        category: "data-manipulation",
        code: `-- Create a products table
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT
);

-- Insert sample products
INSERT INTO products (name, price, category) VALUES ('Laptop', 999.99, 'Electronics');
INSERT INTO products (name, price, category) VALUES ('Book', 19.99, 'Education');
INSERT INTO products (name, price, category) VALUES ('Coffee', 4.99, 'Food');

-- Query products over $50
SELECT name, price FROM products WHERE price > 50;`,
      },
      {
        name: "Join Example",
        description: "Create two tables, insert data, and run a JOIN query",
        icon: PuzzlePieceIcon,
        category: "advanced",
        code: `-- Create customers table
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT
);

-- Create orders table
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product TEXT NOT NULL,
  amount REAL NOT NULL,
  order_date TEXT,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- Insert sample customers
INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com');
INSERT INTO customers (name, email) VALUES ('Jane Smith', 'jane@example.com');
INSERT INTO customers (name, email) VALUES ('Bob Wilson', 'bob@example.com');

-- Insert sample orders
INSERT INTO orders (customer_id, product, amount, order_date) VALUES (1, 'Laptop', 999.99, '2024-01-15');
INSERT INTO orders (customer_id, product, amount, order_date) VALUES (2, 'Book', 19.99, '2024-01-16');
INSERT INTO orders (customer_id, product, amount, order_date) VALUES (1, 'Mouse', 29.99, '2024-01-17');
INSERT INTO orders (customer_id, product, amount, order_date) VALUES (3, 'Keyboard', 79.99, '2024-01-18');

-- Join customers with their orders
SELECT 
  customers.name,
  customers.email,
  orders.product,
  orders.amount,
  orders.order_date
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
ORDER BY orders.order_date;`,
      },
      {
        name: "Aggregation Example",
        description: "Use GROUP BY and aggregate functions",
        icon: BeakerIcon,
        category: "advanced",
        code: `-- Create sales table
CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  sale_date TEXT
);

-- Insert sample sales data
INSERT INTO sales (product, quantity, price, sale_date) VALUES ('Laptop', 2, 999.99, '2024-01-01');
INSERT INTO sales (product, quantity, price, sale_date) VALUES ('Mouse', 5, 29.99, '2024-01-01');
INSERT INTO sales (product, quantity, price, sale_date) VALUES ('Laptop', 1, 999.99, '2024-01-02');
INSERT INTO sales (product, quantity, price, sale_date) VALUES ('Keyboard', 3, 79.99, '2024-01-02');
INSERT INTO sales (product, quantity, price, sale_date) VALUES ('Mouse', 2, 29.99, '2024-01-03');

-- Group by product and calculate totals
SELECT 
  product,
  COUNT(*) as sales_count,
  SUM(quantity) as total_quantity,
  SUM(quantity * price) as total_revenue,
  AVG(price) as avg_price
FROM sales
GROUP BY product
ORDER BY total_revenue DESC;`,
      },
    ],
  };

  const currentTemplates = quickTemplates[language] || quickTemplates["54"];

  const [showDropdown, setShowDropdown] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <div className="flex flex-row gap-2 items-center flex-wrap">
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-3 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-muted rounded-lg transition-colors focus-ring flex items-center gap-2"
        >
          <span>Templates</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-lg border border-border-light shadow-xl z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              {currentTemplates.map((template) => {
                const IconComponent = template.icon;
                return (
                  <button
                    key={template.name}
                    onClick={() => {
                      setCode(template.code);
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-start gap-3 p-3 hover:bg-secondary rounded-lg transition-colors text-left"
                  >
                    <IconComponent className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowShortcuts(!showShortcuts)}
        className="px-3 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-muted rounded-lg transition-colors focus-ring"
        title="Keyboard Shortcuts"
      >
        ⌘K
      </button>

      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowShortcuts(false)}>
          <div className="glass-strong w-full max-w-2xl mx-4 rounded-xl border border-border-light shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded">
                <span className="text-sm text-foreground">Run Code</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border">Ctrl+Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded">
                <span className="text-sm text-foreground">Format Code</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border">Shift+Alt+F</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded">
                <span className="text-sm text-foreground">Save</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border">Ctrl+S</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded">
                <span className="text-sm text-foreground">Command Palette</span>
                <kbd className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border">Ctrl+K</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentTemplates.slice(0, 3).map((template) => {
        const IconComponent = template.icon;
        return (
          <button
            key={template.name}
            onClick={() => setCode(template.code)}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
            title={`${template.name}: ${template.description}`}
            type="button"
          >
            <IconComponent className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
