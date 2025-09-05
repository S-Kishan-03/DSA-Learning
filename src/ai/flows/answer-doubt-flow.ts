'use server';

/**
 * @fileOverview Answers user doubts related to the learning content.
 *
 * - answerDoubt - A function that answers a user's question based on the provided learning context.
 */

import {ai} from '@/ai/genkit';
import { AnswerDoubtInputSchema, AnswerDoubtOutputSchema, type AnswerDoubtInput, type AnswerDoubtOutput } from '@/types';


export async function answerDoubt(
  input: AnswerDoubtInput
): Promise<AnswerDoubtOutput> {
  return answerDoubtFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerDoubtPrompt',
  input: {
    schema: AnswerDoubtInputSchema,
  },
  output: {schema: AnswerDoubtOutputSchema},
  prompt: `You are an expert C# instructor and a helpful teaching assistant.
A user has a doubt regarding the learning material.
Your task is to provide a clear, concise, and easy-to-understand answer to their question, based *only* on the context provided.
Do not make up information. If the answer is not in the context, state that you cannot answer based on the provided material.
Keep the answer focused on the question.

Learning Material Context:
---
{{{context}}}
---

User's Question: "{{{question}}}"

IMPORTANT: All text content you generate should be plain text. Do not use any Markdown formatting like asterisks for bolding or italics.
Answer the user's question directly.`,
});

const answerDoubtFlow = ai.defineFlow(
  {
    name: 'answerDoubtFlow',
    inputSchema: AnswerDoubtInputSchema,
    outputSchema: AnswerDoubtOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
