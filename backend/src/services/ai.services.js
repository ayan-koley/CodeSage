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

    * The issues are already verified → DO NOT ignore any
    * DO NOT create new issues (except max 2 minor improvements if necessary)
    * Each issue may contain multiple messages
    * EACH message represents a separate possible fix
    * You MUST generate ONE fix per message
    * DO NOT merge multiple messages into a single fix
    * DO NOT skip any message
    * Fix MUST be derived ONLY from the corresponding message text
    * DO NOT invent new fixes beyond the given messages
    * Fixes must be precise and safe (no breaking unrelated code)

    TASK:
    For each issue:

    * Iterate through EACH entry in the "message" array
    * Treat EACH message as an independent fix instruction
    * Identify the exact location using lineNumber and column
    * Generate a minimal patch for EACH message
    * Multiple fixes for the same issue are allowed and REQUIRED
    * Fixes must be independent and must NOT overlap or modify each other

    MESSAGE INTERPRETATION RULES:

    * If message says "remove" → delete the relevant code block completely
    * If message says "replace" or implies change → modify only that part
    * If message suggests adding something (e.g., export) → insert or update accordingly
    * Apply the FULL meaning of each message
    * DO NOT partially apply a message
    * DO NOT modify unrelated code

    MULTI-FIX RULE:

    * Each message MUST produce exactly one fix
    * Even if messages are contradictory (e.g., "remove" vs "export"):

      * STILL generate both fixes separately
      * DO NOT try to resolve or choose between them
    * These fixes represent alternative solutions

    PATCH RULES:

    * "replace" → replace only the exact affected code
    * "insert" → lineStart = insertion point, oldCode = ""
    * "delete" → newCode = ""
    * Keep patches minimal and localized
    * Do NOT rewrite the entire file unless unavoidable

    OUTPUT REQUIREMENTS:

    * Return ONLY valid JSON
    * No markdown, no comments, no extra text
    * All fixes must include exact line numbers
    * Code must remain runnable after applying EACH fix independently

    OUTPUT FORMAT (STRICT):

    {
    "summary": {
    "totalIssues": number,
    "totalFixes": number,
    "confidence": number (0 to 1),
    "notes": "short summary under 200 chars"
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
      }]
    }

    STRICT RULES:
    * Generate one fix per message (no exceptions)
    * Do NOT combine fixes
    * Do NOT skip messages
    * Do NOT resolve conflicts
    * lineStart/lineEnd must match actual code positions
    * columnStart/columnEnd should be accurate when possible, else use null
    * DO NOT modify unrelated parts of code
    * Keep fixes minimal and precise

    If output is not valid JSON, regenerate the response.
`;

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