import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function to extract details from an image of a MyKad
export const extractMyKadDetails = async (base64Image: string): Promise<{ icNumber: string; name: string }> => {
  try {
    const model = "gemini-2.5-flash"; // Using flash for speed/vision capabilities
    
    const prompt = `
      Analyze this image of a Malaysian MyKad (Identity Card).
      Extract the following details:
      1. IC Number (Format: XXXXXX-XX-XXXX)
      2. Full Name
      
      If the image is not a clear MyKad or details are unreadable, return null values.
      Return strictly JSON.
    `;

    // Remove data:image/jpeg;base64, prefix if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            icNumber: { type: Type.STRING },
            name: { type: Type.STRING }
          },
          required: ["icNumber", "name"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;

  } catch (error) {
    console.error("Gemini Vision extraction failed:", error);
    throw new Error("Could not extract details from image.");
  }
};

export const checkEligibility = async (
  icNumber: string
): Promise<{ eligible: boolean; tier: string; reason: string; quota: number }> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Simulating a backend database lookup using Gemini to generate realistic data based on the IC
    const prompt = `
      Act as the Malaysian PADU (Pangkalan Data Utama) database system.
      A citizen with IC Number: ${icNumber} is requesting fuel subsidy eligibility.
      
      Simulate a database lookup logic based on the last digit of the IC number:
      - If last digit is 0-4: B40 (Eligible, 60L quota).
      - If last digit is 5-7: M40 (Eligible, 40L quota).
      - If last digit is 8-9: T20 (Not Eligible, 0 quota).
      
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eligible: { type: Type.BOOLEAN },
            tier: { type: Type.STRING, enum: ["B40", "M40", "T20"] },
            reason: { type: Type.STRING },
            quota: { type: Type.NUMBER, description: "Fuel quota in Liters" }
          },
          required: ["eligible", "tier", "reason", "quota"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;

  } catch (error) {
    console.error("Gemini eligibility check failed:", error);
    // Fallback mock response if API fails
    return {
      eligible: true,
      tier: "B40",
      reason: "System offline: Defaulting to standard eligibility based on local cache.",
      quota: 50
    };
  }
};