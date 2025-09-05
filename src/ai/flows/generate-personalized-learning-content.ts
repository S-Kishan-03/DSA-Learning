'use server';

/**
 * @fileOverview Generates personalized learning content for a C# developer preparing for a DSA interview.
 *
 * - generatePersonalizedLearningContent - A function that generates learning content based on the topic's name, key patterns, and practice problems.
 */

import {genkit, type Genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {
  GeneratePersonalizedLearningContentInputSchema,
  LearningContentSchema,
  type GeneratePersonalizedLearningContentInput,
  type GeneratePersonalizedLearningContentOutput,
} from '@/types';

let ai: Genkit;

function initializeGenkit(apiKey: string) {
  if (ai) return;
  ai = genkit({
    plugins: [googleAI({apiKey})],
    model: 'googleai/gemini-2.5-flash',
  });
}

export async function generatePersonalizedLearningContent(
  input: GeneratePersonalizedLearningContentInput
): Promise<GeneratePersonalizedLearningContentOutput> {
  if (!input.apiKey) {
    throw new Error('API key is required.');
  }
  initializeGenkit(input.apiKey);

  const prompt = ai.definePrompt({
    name: 'generatePersonalizedLearningContentPrompt',
    input: {
      schema: GeneratePersonalizedLearningContentInputSchema,
    },
    output: {schema: LearningContentSchema},
    prompt: `You are an expert C# developer and world-class instructor creating a learning module for a developer preparing for a technical interview.
  The topic is: "{{{topicName}}}".
  Focus on these specific patterns: {{{topicPatterns}}}.
  Select this problem for the walkthrough: "{{{lookup topicPracticeProblems 0}}}".

  Generate a comprehensive guide based on the provided JSON schema. Ensure all fields are filled with high-quality, accurate, and easy-to-understand content.
  IMPORTANT: All text content you generate should be plain text. Do not use any Markdown formatting like asterisks for bolding or italics.
  The C# code you generate must be idiomatic, clean, and well-formatted. Specifically, use newline characters (\\n) and appropriate indentation within the code strings to ensure readability, mimicking the format of a well-structured C# file in Visual Studio.

  For the 'practiceProblems' section, provide 5-6 relevant problems from this list if appropriate, or other classic problems related to the topic: {{{topicPracticeProblems}}}.
  For each practice problem, create a LeetCode-style experience:
  1. Write a clear 'description' of the problem.
  2. Provide 1-2 'examples' with clear 'input' and 'output' values.
  3. Include a mix of difficulties ('Easy', 'Medium', 'Hard').
  4. Provide a concise 'hint' for each.
  This is like a homework assignment for the user.`,
  });

  const {output} = await prompt({
    topicName: input.topicName,
    topicPatterns: input.topicPatterns,
    topicPracticeProblems: input.topicPracticeProblems,
    apiKey: input.apiKey,
  });
  return output!;
}
