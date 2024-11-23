import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key presence
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing Gemini API key. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function getSmartSchedule(tasks: any[]) {
  // Validate API key before making request
  if (!apiKey) {
    throw new Error("Gemini API key is not configured");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const incompleteTasks = tasks.filter(task => !task.completed);
    
    if (incompleteTasks.length === 0) {
      return { scheduledTasks: [] };
    }

    const currentTime = new Date().toISOString();
    const taskList = incompleteTasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || "",
    }));

    const prompt = `You are a task scheduling AI. Given these tasks, create an optimal schedule starting from ${currentTime}.

Tasks to schedule:
${JSON.stringify(taskList, null, 2)}

Create a schedule that:
1. Assigns realistic start times
2. Sets appropriate priorities (1-5, where 5 is highest)
3. Estimates task duration in minutes
4. Provides brief reasoning for each scheduling decision

Return ONLY a JSON object with this EXACT structure (no markdown, no additional text):
{
  "scheduledTasks": [
    {
      "id": "task-id",
      "title": "task-title",
      "suggestedStartTime": "ISO-8601-timestamp",
      "estimatedDuration": number,
      "priority": number,
      "reasoning": "string"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Remove any potential markdown formatting and validate JSON structure
      const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
      let parsed;
      
      try {
        parsed = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", parseError);
        console.error("Raw response:", text);
        throw new Error("Invalid JSON response from Gemini API");
      }
      
      if (!parsed.scheduledTasks || !Array.isArray(parsed.scheduledTasks)) {
        throw new Error("Invalid response structure: missing scheduledTasks array");
      }

      // Validate and sanitize each task
      parsed.scheduledTasks = parsed.scheduledTasks.map((task: any) => {
        if (!task.id || !task.title) {
          throw new Error("Invalid task data: missing required fields");
        }

        try {
          const startTime = new Date(task.suggestedStartTime).toISOString();
          return {
            id: task.id,
            title: task.title,
            suggestedStartTime: startTime,
            estimatedDuration: Math.max(1, Math.min(480, parseInt(task.estimatedDuration) || 30)),
            priority: Math.max(1, Math.min(5, parseInt(task.priority) || 1)),
            reasoning: task.reasoning || "Automatically scheduled"
          };
        } catch (dateError) {
          throw new Error(`Invalid date format for task: ${task.title}`);
        }
      });

      return parsed;
    } catch (e) {
      console.error("Failed to process Gemini response:", e);
      throw new Error(`Failed to process schedule: ${e.message}`);
    }
  } catch (error: any) {
    console.error("Gemini API error:", error);
    throw new Error(error.message || "Failed to generate schedule");
  }
}