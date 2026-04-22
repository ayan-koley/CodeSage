import { gemini } from "../config/gemini.config.js";

export const getImprovements = async(code, issues) => {
    console.log('flow came into the ai services')
    const prompt = `
    You are a senior software engineer performing a professional code review.

    INPUT:
    1. CODE:
    ${code}
    2. VERIFIED ISSUES (from ESLint + AST):
    ${JSON.stringify(issues, null, 2)}

    IMPORTANT:
    - The issues provided are REAL and must be addressed
    - Do NOT ignore any issue
    - Do NOT invent fake issues
    - Each issue MUST produce exactly one improvement

    TASK:
    For EACH issue:
    - Explain the issue clearly
    - Suggest how to fix it
    - Provide improved/refactored code

    Additionally:
    - You may add up to 2 extra improvements (only if meaningful)

    RULES:
    - Return ONLY valid JSON
    - No markdown (no \`\`\`)
    - No extra text outside JSON
    - Refactored code must be complete and runnable
    - Keep explanations concise and practical

    OUTPUT FORMAT (STRICT):
    {
      "improvements": [
        {
          "source": "eslint | ast | ai",
          "title": "Short title of issue",
          "explanation": "Clear explanation",
          "suggestion": "How to fix",
          "refactoredCode": "Full improved code",
          "impact": "low | medium | high"
        }
      ]
    }
    If output is not valid JSON, regenerate the response.`;

    try {
      const response = await gemini.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      })
  
      return {response, responseText: response.text};
    } catch (e) {
      console.error(`gemini error :: `, e.message);
    }
} 