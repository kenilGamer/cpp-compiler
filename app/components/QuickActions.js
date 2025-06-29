"use client";

export default function QuickActions({ setCode, language }) {
  const quickActions = {
    "54": { // C++
      "Format Code": `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}`,
      "Basic Input/Output": `#include <iostream>
using namespace std;

int main() {
    string name;
    int age;
    
    cout << "Enter your name: ";
    cin >> name;
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Hello " << name << ", you are " << age << " years old!" << endl;
    return 0;
}`,
      "Array Operations": `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // Sort the array
    sort(numbers.begin(), numbers.end());
    
    // Print sorted array
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
      "Class Template": `#include <iostream>
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
    
    void setValue(int v) {
        value = v;
    }
    
    int getValue() {
        return value;
    }
};

int main() {
    MyClass obj("Test", 42);
    obj.display();
    return 0;
}`,
      "File Operations": `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Writing to file
    ofstream outFile("output.txt");
    if (outFile.is_open()) {
        outFile << "Hello, File!" << endl;
        outFile.close();
    }
    
    // Reading from file
    ifstream inFile("output.txt");
    string line;
    if (inFile.is_open()) {
        while (getline(inFile, line)) {
            cout << line << endl;
        }
        inFile.close();
    }
    
    return 0;
}`,
      "STL Containers": `#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <queue>
#include <stack>
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
    
    // Stack
    stack<int> myStack;
    myStack.push(1);
    myStack.push(2);
    
    return 0;
}`,
      "Algorithm Examples": `#include <iostream>
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
    
    // Count elements
    int count = count_if(numbers.begin(), numbers.end(), [](int x) { return x % 2 == 0; });
    cout << "Even numbers: " << count << endl;
    
    // Transform
    vector<int> doubled;
    transform(numbers.begin(), numbers.end(), back_inserter(doubled), [](int x) { return x * 2; });
    
    // Accumulate
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "Sum: " << sum << endl;
    
    return 0;
}`,
      "Exception Handling": `#include <iostream>
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
      "Template Functions": `#include <iostream>
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
      "Smart Pointers": `#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Resource {
public:
    Resource() { cout << "Resource created" << endl; }
    ~Resource() { cout << "Resource destroyed" << endl; }
    void use() { cout << "Resource used" << endl; }
};

int main() {
    // Unique pointer
    unique_ptr<Resource> unique = make_unique<Resource>();
    unique->use();
    
    // Shared pointer
    shared_ptr<Resource> shared1 = make_shared<Resource>();
    shared_ptr<Resource> shared2 = shared1;
    cout << "Shared count: " << shared1.use_count() << endl;
    
    // Weak pointer
    weak_ptr<Resource> weak = shared1;
    
    return 0;
}`
    },
    "71": { // Python
      "Format Code": `#!/usr/bin/env python3
"""
Main program file
"""

def main():
    """Main function"""
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
      "Basic Input/Output": `def main():
    name = input("Enter your name: ")
    age = int(input("Enter your age: "))
    
    print(f"Hello {name}, you are {age} years old!")

if __name__ == "__main__":
    main()`,
      "List Operations": `def main():
    numbers = [5, 2, 8, 1, 9, 3]
    
    # Sort the list
    numbers.sort()
    
    # Print sorted list
    print("Sorted numbers:", numbers)
    
    # List comprehension
    squares = [x**2 for x in numbers]
    print("Squares:", squares)
    
    # Filter
    evens = [x for x in numbers if x % 2 == 0]
    print("Even numbers:", evens)

if __name__ == "__main__":
    main()`,
      "Class Template": `class MyClass:
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
      "File Operations": `def main():
    # Writing to file
    with open("output.txt", "w") as file:
        file.write("Hello, File!\n")
    
    # Reading from file
    with open("output.txt", "r") as file:
        content = file.read()
        print("File content:", content)
    
    # Reading line by line
    with open("output.txt", "r") as file:
        for line in file:
            print("Line:", line.strip())

if __name__ == "__main__":
    main()`,
      "Data Structures": `from collections import defaultdict, deque, Counter
from typing import List, Dict, Set

def main():
    # Dictionary
    my_dict = {"apple": 1, "banana": 2, "cherry": 3}
    
    # DefaultDict
    dd = defaultdict(list)
    dd["fruits"].append("apple")
    
    # Counter
    counter = Counter(["apple", "banana", "apple", "cherry"])
    print("Counter:", counter)
    
    # Deque
    dq = deque([1, 2, 3])
    dq.append(4)
    dq.appendleft(0)
    print("Deque:", list(dq))
    
    # Set
    my_set = {1, 2, 3, 4, 5}
    my_set.add(6)
    print("Set:", my_set)

if __name__ == "__main__":
    main()`,
      "Decorators": `import time
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
      "Exception Handling": `def divide(a, b):
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
      "Generators": `def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

def main():
    # Using generator
    for num in fibonacci_generator(10):
        print(num, end=" ")
    print()
    
    # Generator expression
    squares = (x**2 for x in range(10))
    print("Squares:", list(squares))

if __name__ == "__main__":
    main()`,
      "Context Managers": `class DatabaseConnection:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.connection = None
    
    def __enter__(self):
        print(f"Connecting to {self.host}:{self.port}")
        self.connection = "Connected"
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        self.connection = None

def main():
    with DatabaseConnection("localhost", 5432) as db:
        print("Using database connection")
        print("Connection status:", db.connection)

if __name__ == "__main__":
    main()`,
      "Async/Await": `import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
        "https://httpbin.org/delay/3"
    ]
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        
        for i, result in enumerate(results):
            print(f"URL {i+1} length: {len(result)}")

if __name__ == "__main__":
    asyncio.run(main())`
    },
    "62": { // Java
      "Format Code": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      "Basic Input/Output": `import java.util.Scanner;

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
      "Array Operations": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9, 3};
        
        // Sort the array
        Arrays.sort(numbers);
        
        // Print sorted array
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
      "Class Template": `public class MyClass {
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
      "File Operations": `import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        // Writing to file
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
            writer.write("Hello, File!");
            writer.newLine();
        } catch (IOException e) {
            System.err.println("Error writing file: " + e.getMessage());
        }
        
        // Reading from file
        try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Line: " + line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}`,
      "Collections": `import java.util.*;

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
        
        // Queue
        Queue<String> queue = new LinkedList<>();
        queue.offer("first");
        queue.offer("second");
        
        // Stack
        Stack<Integer> stack = new Stack<>();
        stack.push(1);
        stack.push(2);
        
        System.out.println("List: " + list);
        System.out.println("Map: " + map);
        System.out.println("Set: " + set);
    }
}`,
      "Streams": `import java.util.*;
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
        
        // Group by
        Map<Boolean, List<Integer>> grouped = numbers.stream()
            .collect(Collectors.groupingBy(n -> n % 2 == 0));
        
        System.out.println("Doubled evens: " + doubledEvens);
        System.out.println("Sum: " + sum);
        System.out.println("Grouped: " + grouped);
    }
}`,
      "Exception Handling": `public class Main {
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
      "Generics": `import java.util.*;

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
        
        String[] strings = {"Hello", "World"};
        Integer[] integers = {1, 2, 3};
        
        Box.printArray(strings);
        Box.printArray(integers);
    }
}`,
      "Threading": `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        // Using ExecutorService
        ExecutorService executor = Executors.newFixedThreadPool(2);
        
        Future<String> future1 = executor.submit(() -> {
            Thread.sleep(1000);
            return "Task 1 completed";
        });
        
        Future<String> future2 = executor.submit(() -> {
            Thread.sleep(500);
            return "Task 2 completed";
        });
        
        try {
            System.out.println(future1.get());
            System.out.println(future2.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
    }
}`
    }
  };

  const currentActions = quickActions[language] || quickActions["54"];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Quick Actions:</label>
      <div className="flex gap-2 flex-wrap">
        {Object.entries(currentActions).map(([actionName, code]) => (
          <button
            key={actionName}
            onClick={() => setCode(code)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
          >
            {actionName}
          </button>
        ))}
      </div>
    </div>
  );
} 