"use client";

import { 
  CodeBracketIcon, 
  DocumentTextIcon, 
  CpuChipIcon, 
  BeakerIcon,
  CogIcon,
  SparklesIcon,
  BoltIcon,
  AcademicCapIcon,
  PuzzlePieceIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";

export default function QuickActions({ setCode, language }) {
  const quickTemplates = {
    "54": [
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
      }
    ],
    "71": [
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
    main()`
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
    main()`
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
    main()`
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
    main()`
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
    main()`
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
    main()`
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
    main()`
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
    main()`
      }
    ],
    "62": [
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
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
}`
      }
    ]
  };

  const currentTemplates = quickTemplates[language] || quickTemplates["54"];
  const categories = [...new Set(currentTemplates.map(t => t.category))];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <SparklesIcon className="w-5 h-5 text-accent-color" />
        <h3 className="text-lg font-semibold">Quick Templates</h3>
      </div>
      
      {categories.map(category => (
        <div key={category} className="space-y-1">
          <h4 className="text-sm font-medium text-secondary capitalize">
            {category.replace('-', ' ')} Templates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {currentTemplates
              .filter(template => template.category === category)
              .map((template) => {
                const IconComponent = template.icon;
                return (
                  <button
                    key={template.name}
                    onClick={() => setCode(template.code)}
                    className="group p-4 bg-secondary/50 hover:bg-secondary border border-border-color rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus-ring"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 bg-accent-color/10 rounded-lg group-hover:bg-accent-color/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-accent-color" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h5 className="font-medium text-sm mb-1 group-hover:text-accent-color transition-colors">
                          {template.name}
                        </h5>
                        <p className="text-xs text-muted leading-relaxed">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
} 