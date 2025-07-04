export const languages = [
  { id: "54", name: "C++ (GCC 9.2.0)" },
  { id: "50", name: "C (GCC 9.2.0)" },
  { id: "62", name: "Java (OpenJDK 13.0.1)" },
  { id: "71", name: "Python (3.8.1)" },
  { id: "63", name: "JavaScript (Node.js 12.14.0)" },
  { id: "51", name: "C# (Mono 6.6.0.161)" },
  { id: "82", name: "SQL (SQLite 3.27.2)" },
];

export const examples = {
  cpp: `#include<iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;
    cout << "You entered: " << n << endl;
    return 0;
}`,
  python: `print("Hello from Python!")
name = input("Enter your name: ")
print(f"Hello, {name}!")`,
  java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Hello from Java!");
        System.out.print("Enter a number: ");
        int n = scanner.nextInt();
        System.out.println("You entered: " + n);
    }
}`,
  javascript: `// Modern JavaScript Example\nfunction greet(name) {\n  console.log('Hello, ' + name + '!');\n}\ngreet('World');`,
  csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello from C#!");
        Console.Write("Enter your name: ");
        string name = Console.ReadLine();
        Console.WriteLine($"Hello, {name}!");
    }
}`,
};

export const languageMap = {
  "54": "cpp",
  "71": "python",
  "62": "java",
  "63": "javascript",
  "50": "c",
  "51": "csharp",
  "82": "sql",
}; 