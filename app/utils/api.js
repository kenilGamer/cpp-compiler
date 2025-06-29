import axios from "axios";

// Note: NEXT_PUBLIC_ variables are exposed to the browser. Only use for public keys/hosts.
const API_KEY = process.env.NEXT_PUBLIC_JUDGE0_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_JUDGE0_API_HOST;

const api = axios.create({
  baseURL: API_HOST ? `https://${API_HOST}` : "https://judge0-ce.p.rapidapi.com",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST || "judge0-ce.p.rapidapi.com",
  },
});

export const submitCode = async (languageId, sourceCode, stdin) => {
  const response = await api.post("/submissions", {
    language_id: languageId,
    source_code: sourceCode,
    stdin: stdin,
  });
  return response.data;
};

export const getSubmissionResult = async (token) => {
  const response = await api.get(`/submissions/${token}?base64_encoded=true`);
  return response.data;
};

export const decodeBase64 = (str) => {
  if (!str) return "";
  try {
    return atob(str);
  } catch (e) {
    return str;
  }
}; 