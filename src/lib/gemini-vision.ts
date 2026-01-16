"use server";

import { genAI, MODEL_NAME } from "./gemini";

export type ExtractedPerson = {
  fullName: string;
  nickname: string | null;
  age: number;
  gender: "MALE" | "FEMALE";
};

export type ExtractionResult = {
  success: true;
  data: ExtractedPerson[];
} | {
  success: false;
  error: string;
};

/**
 * Extract persons (delegates, siblings, or cooks) from an image using Gemini Vision
 *
 * Expected format in image:
 * - Delegates: "Rogene Carl Rosalijos, Bajig, 21, Male"
 * - Siblings: "Airah Bangay, Kakay, 21, Female"
 * - Cook: "Sheyza May Toledo, Sheng, 28, Female"
 *
 * Format: Fullname, Nickname, Age, Gender
 */
export async function extractPersonsFromImage(
  base64Image: string,
  mimeType: string,
  personType: "delegate" | "sibling" | "cook"
): Promise<ExtractionResult> {
  try {
    // Remove data URL prefix if present
    const base64Content = base64Image.includes(",")
      ? base64Image.split(",")[1]
      : base64Image;

    const prompt = `You are extracting person information from a ${personType === "cook" ? "cook" : personType === "sibling" ? "sibling" : "delegate"} registration list.

The image contains a list of people with their information in this format:
Full Name, Nickname, Age, Gender

For example:
- "Juan Dela Cruz, Jun, 25, Male"
- "Maria Santos, Mari, 30, Female"

IMPORTANT RULES:
1. Extract ALL people from the image
2. If nickname is missing or empty, use null
3. Age must be a positive number (1-120)
4. Gender must be exactly "MALE" or "FEMALE" (uppercase)
5. Clean up any OCR artifacts or typos in names if obvious
6. If a field is unclear, make your best guess based on context
7. Filipino names are common - handle them properly

Return ONLY a valid JSON array with this exact structure (no markdown, no explanation):
[
  {
    "fullName": "Full Name Here",
    "nickname": "Nickname or null",
    "age": 25,
    "gender": "MALE"
  }
]

If you cannot extract any valid person data from the image, return an empty array: []`;

    const result = await genAI.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Content,
              },
            },
          ],
        },
      ],
    });

    const text = result.text?.trim() ?? "";

    // Clean up the response - remove markdown code blocks if present
    let jsonText = text;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.slice(7);
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith("```")) {
      jsonText = jsonText.slice(0, -3);
    }
    jsonText = jsonText.trim();

    // Parse the JSON response
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      console.error("Failed to parse Gemini response:", text);
      return {
        success: false,
        error: "Failed to parse the extracted data. Please try with a clearer image.",
      };
    }

    // Validate the parsed data
    if (!Array.isArray(parsed)) {
      return {
        success: false,
        error: "Invalid response format from AI. Please try again.",
      };
    }

    // Validate and clean each person
    const validatedPersons: ExtractedPerson[] = [];
    for (const person of parsed) {
      if (typeof person !== "object" || person === null) continue;

      const p = person as Record<string, unknown>;

      // Validate required fields
      if (typeof p.fullName !== "string" || !p.fullName.trim()) continue;
      if (typeof p.age !== "number" || p.age < 1 || p.age > 120) continue;
      if (p.gender !== "MALE" && p.gender !== "FEMALE") continue;

      validatedPersons.push({
        fullName: p.fullName.trim(),
        nickname: typeof p.nickname === "string" && p.nickname.trim()
          ? p.nickname.trim()
          : null,
        age: Math.round(p.age),
        gender: p.gender,
      });
    }

    if (validatedPersons.length === 0) {
      return {
        success: false,
        error: "Could not extract any valid person data from the image. Please ensure the image clearly shows names, ages, and genders.",
      };
    }

    return {
      success: true,
      data: validatedPersons,
    };
  } catch (error) {
    console.error("Gemini Vision extraction error:", error);

    if (error instanceof Error) {
      // Handle rate limiting
      if (error.message.includes("429") || error.message.includes("quota")) {
        return {
          success: false,
          error: "Daily extraction limit reached. Please try again tomorrow or enter data manually.",
        };
      }
      // Handle other API errors
      if (error.message.includes("API")) {
        return {
          success: false,
          error: "AI service temporarily unavailable. Please try again later or enter data manually.",
        };
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again or enter data manually.",
    };
  }
}
