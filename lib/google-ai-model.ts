import OpenAI from "openai";

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateAIChatCompletion(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // يمكنك تغييرها إلى gpt-4 إذا كان متاح لديك
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    max_tokens: 1024,
    temperature: 1,
    top_p: 0.95,
  });
  return response.choices[0].message?.content || "";
}
