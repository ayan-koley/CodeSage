import { gemini } from "../config/gemini.config.js";

export const getImprovements = async(code, issues) => {
    const prompt = `
    You are a senior software engineer and static analysis expert.

    INPUT:
    1. CODE:
    ${code}

    2. VERIFIED ISSUES (from ESLint + AST):
    ${JSON.stringify(issues, null, 2)}

    IMPORTANT:
    - The issues are already verified → DO NOT ignore any
    - DO NOT create new issues (except max 2 minor improvements if necessary)
    - Each issue MUST map to exactly ONE fix
    - Fix MUST be derived from the "suggestions" field of the issue
    - DO NOT invent new fixes beyond the given suggestions
    - Fixes must be precise and safe (no breaking unrelated code)

    TASK:
    For each issue:
    - Read the "suggestions" array carefully
    - Select the most appropriate suggestion (usually the first one)
    - Apply that suggestion directly to the code
    - Identify the exact location in the code using lineNumber and column
    - Generate a minimal patch (not full rewrite unless necessary)
    - Keep fixes independent and non-overlapping

    SUGGESTION INTERPRETATION RULES:
    - If suggestion says "remove" → delete the relevant code block completely
    - If suggestion says "replace" or implies change → modify only that part
    - If suggestion suggests adding something (e.g., export) → insert or update accordingly
    - Do NOT partially apply a suggestion (apply it fully and correctly)
    - Do NOT modify unrelated code

    OUTPUT REQUIREMENTS:
    - Return ONLY valid JSON
    - No markdown, no comments, no extra text
    - All fixes must include exact line numbers
    - Code must remain runnable after applying fixes

    OUTPUT FORMAT (STRICT):

    {
      "summary": {
        "totalIssues": number,
        "totalFixes": number,
        "confidence": number (0 to 1),
        "notes": "short summary of overall code quality under 200 chars"
      },
      "fixes": [
        {
          "issueId": "string (must match input issue id)",

          "type": "replace | insert | delete",

          "lineStart": number,
          "lineEnd": number,

          "columnStart": number,
          "columnEnd": number,

          "oldCode": "exact original code snippet",
          "newCode": "updated code snippet",

          "confidence": number (0 to 1)
        }
      ]
    }

    RULES:
    - lineStart/lineEnd must match actual code positions
    - columnStart/columnEnd should be accurate when possible, else use null
    - "replace" → replace existing code
    - "insert" → lineStart = insertion point, oldCode = ""
    - "delete" → newCode = ""
    - DO NOT return full file unless absolutely required
    - DO NOT modify unrelated parts of code
    - Keep fixes minimal and precise

    If output is not valid JSON, regenerate the response.`;

    try {
      const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      })
  
      return response.text;
    } catch (e) {
      console.error(`gemini error :: `, e.message);
    }
} 