"use client";

import { useState } from "react";
import { 
  BoltIcon, 
  ChevronDownIcon, 
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function QuickActions({ setCode, language }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = {
    "54": { // C++
      "Format Code": {
        code: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}`,
        description: "Basic formatted C++ template",
        icon: "📝"
      },
      "Basic Input/Output": {
        code: `#include <iostream>
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
        description: "User input and output handling",
        icon: "💬"
      },
      "Array Operations": {
        code: `#include <iostream>
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
        description: "Vector operations and sorting",
        icon: "📊"
      },
      "Class Template": {
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
        description: "Object-oriented programming example",
        icon: "🏗️"
      },
      "STL Containers": {
        code: `#include <iostream>
#include <vector>
#include <map>
#include <set>
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
    
    cout << "Vector size: " << vec.size() << endl;
    cout << "Map size: " << myMap.size() << endl;
    cout << "Set size: " << mySet.size() << endl;
    
    return 0;
}`,
        description: "Standard Template Library examples",
        icon: "📚"
      },
      "Algorithm Examples": {
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
    
    // Count elements
    int count = count_if(numbers.begin(), numbers.end(), [](int x) { return x % 2 == 0; });
    cout << "Even numbers: " << count << endl;
    
    // Accumulate
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "Sum: " << sum << endl;
    
    return 0;
}`,
        description: "STL algorithms and lambda functions",
        icon: "⚡"
      }
    }
  };

  const actions = quickActions[language] || quickActions["54"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Quick Actions</label>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronDownIcon className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(actions).slice(0, isExpanded ? undefined : 3).map(([title, action], index) => (
          <button
            key={title}
            onClick={() => setCode(action.code)}
            className="group p-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 transition-all duration-300 focus-ring card-hover text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-lg text-lg">
                {action.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-white group-hover:text-blue-400 transition-colors text-sm">
                  {title}
                </div>
              </div>
              <SparklesIcon className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {action.description}
            </p>
          </button>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg">
            <BoltIcon className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-white mb-1">Pro Tips</div>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Use <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Ctrl+S</kbd> to save your code</div>
              <div>• Press <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">F5</kbd> to run code quickly</div>
              <div>• Click any quick action to load pre-written templates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 