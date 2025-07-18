import { NextRequest, NextResponse } from "next/server";
import { generateAIChatCompletion } from "@/lib/google-ai-model";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const result = await generateAIChatCompletion(prompt);
  return NextResponse.json({ result });
} 