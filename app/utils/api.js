import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_JUDGE0_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_JUDGE0_API_HOST;
console.log(API_KEY, API_HOST);

const api = axios.create({
  baseURL: "https://judge0-ce.p.rapidapi.com",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
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