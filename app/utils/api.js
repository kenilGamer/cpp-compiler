import axios from "axios";

// Piston public API endpoints
const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";
const PISTON_RUNTIMES_URL = "https://emkc.org/api/v2/piston/runtimes";

// Language mapping from Judge0 IDs to Piston language names
const LANGUAGE_MAP = {
  "54": "c++",      // C++ (Piston uses "c++" not "cpp")
  "50": "c",        // C
  "62": "java",     // Java
  "71": "python",   // Python
  "63": "javascript", // JavaScript
  "51": "csharp",   // C# (Mono runtime)
};

// Cache for runtimes
let runtimesCache = null;

// Fetch available runtimes from Piston
export const fetchRuntimes = async () => {
  if (runtimesCache) return runtimesCache;
  
  try {
    const response = await axios.get(PISTON_RUNTIMES_URL);
    runtimesCache = response.data;
    return runtimesCache;
  } catch (error) {
    console.error("Error fetching runtimes:", error);
    return [];
  }
};

// Get the latest version for a language
export const getLatestVersion = async (language) => {
  const runtimes = await fetchRuntimes();
  const languageRuntimes = runtimes.filter(runtime => runtime.language === language);
  
  if (languageRuntimes.length === 0) {
    throw new Error(`No runtime found for language: ${language}`);
  }
  
  // Return the latest version (first in the list)
  return languageRuntimes[0].version;
};

export const submitCode = async (languageId, source, stdin = "") => {
  // Convert Judge0 language ID to Piston language name
  const pistonLanguage = LANGUAGE_MAP[languageId];
  
  if (!pistonLanguage) {
    throw new Error(`Unsupported language ID: ${languageId}`);
  }
  
  // Get the latest version for this language
  const version = await getLatestVersion(pistonLanguage);
  
  // Determine file extension based on language
  const fileExtensions = {
    "c++": "cpp",
    "c": "c", 
    "java": "java",
    "python": "py",
    "javascript": "js",
    "csharp": "cs"
  };
  
  const fileExtension = fileExtensions[pistonLanguage];
  const fileName = `main.${fileExtension}`;
  
  const response = await axios.post(PISTON_API_URL, {
    language: pistonLanguage,
    version: version,
    files: [
      {
        name: fileName,
        content: source
      }
    ],
    stdin: stdin,
  });
  
  return response.data;
};

export const getSubmissionResult = async (token) => {
  // Piston returns the result immediately, so this is not needed.
  return null;
};

export const decodeBase64 = (str) => {
  // Not needed for Piston, but kept for compatibility
  return str || "";
};

// Estimate memory usage based on code complexity
export const estimateMemoryUsage = (code, language) => {
  if (!code) return null;
  
  const lines = code.split('\n').length;
  const characters = code.length;
  
  // Base memory estimation (in bytes)
  let baseMemory = 1024; // 1KB base
  
  // Add memory based on code size
  baseMemory += characters * 2; // ~2 bytes per character
  
  // Add memory based on lines (for variables, functions, etc.)
  baseMemory += lines * 64; // ~64 bytes per line
  
  // Language-specific adjustments
  const languageMultipliers = {
    "c++": 1.2,    // C++ can be memory intensive
    "c": 1.0,      // C is efficient
    "java": 1.5,   // Java has overhead
    "python": 1.8, // Python has more overhead
    "javascript": 1.3, // JavaScript has some overhead
    "csharp": 1.4  // C# has some overhead
  };
  
  const multiplier = languageMultipliers[LANGUAGE_MAP[language]] || 1.0;
  const estimatedMemory = Math.round(baseMemory * multiplier);
  
  return estimatedMemory;
}; 