'use server';

/**
 * @fileOverview Generates personalized learning content for a C# developer preparing for a DSA interview.
 *
 * - generatePersonalizedLearningContent - A function that generates learning content based on the topic's name, key patterns, and practice problems.
 * - GeneratePersonalizedLearningContentInput - The input type for the generatePersonalizedLearningContent function.
 * - GeneratePersonalizedLearningContentOutput - The return type for the generatePersonalizedLearningContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedLearningContentInputSchema = z.object({
  topicName: z.string().describe('The name of the topic.'),
  topicPatterns: z.array(z.string()).describe('Key patterns for the topic.'),
  topicPracticeProblems: z.array(z.string()).describe('Practice problems for the topic.'),
});
export type GeneratePersonalizedLearningContentInput = z.infer<typeof GeneratePersonalizedLearningContentInputSchema>;

const LearningContentSchema = z.object({
  keyTakeaways: z.string().describe('The key takeaways from the topic.'),
  coreConcept: z.string().describe('The core concept of the topic.'),
  keyPatterns: z.string().describe('Key patterns related to the topic.'),
  csharpImplementation: z.string().describe('C# implementation of the topic.'),
  problemWalkthrough: z.string().describe('A detailed walkthrough of a practice problem.'),
  complexityAnalysis: z.string().describe('The time and space complexity analysis of the implementation.'),
  practiceProblems: z.array(z.object({
    description: z.string().describe('A clear description of the problem.'),
    examples: z.array(z.object({
      input: z.string().describe('Example input for the problem.'),
      output: z.string().describe('Expected output for the problem.'),
    })).describe('Example inputs and outputs for the problem.'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the problem.'),
    hint: z.string().describe('A concise hint for the problem.'),
  })).describe('Practice problems for the user to solve.'),
});
export type GeneratePersonalizedLearningContentOutput = z.infer<typeof LearningContentSchema>;

export async function generatePersonalizedLearningContent(
  input: GeneratePersonalizedLearningContentInput
): Promise<GeneratePersonalizedLearningContentOutput> {
  return generatePersonalizedLearningContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedLearningContentPrompt',
  input: {
    schema: GeneratePersonalizedLearningContentInputSchema,
  },
  output: {schema: LearningContentSchema},
  prompt: `You are an expert C# developer and world-class instructor creating a learning module for a developer preparing for a technical interview.\n  The topic is: "{{{topicName}}}".
  Focus on these specific patterns: {{{topicPatterns}}}.\n  Select this problem for the walkthrough: "{{{topicPracticeProblems.[0]}}}".

  Generate a comprehensive guide based on the provided JSON schema. Ensure all fields are filled with high-quality, accurate, and easy-to-understand content.
  The C# code you generate must be idiomatic, clean, and well-formatted. Specifically, use newline characters (\\n) and appropriate indentation within the code strings to ensure readability, mimicking the format of a well-structured C# file in Visual Studio.

  For the 'practiceProblems' section, provide 3-4 relevant problems from this list if appropriate, or other classic problems related to the topic: {{{topicPracticeProblems}}}. 
  For each practice problem, create a LeetCode-style experience:\n  1. Write a clear 'description' of the problem.\n  2. Provide 1-2 'examples' with clear 'input' and 'output' values.\n  3. Include a mix of difficulties ('Easy', 'Medium', 'Hard').\n  4. Provide a concise 'hint' for each.\n  This is like a homework assignment for the user.`,
});

const generatePersonalizedLearningContentFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedLearningContentFlow',
    inputSchema: GeneratePersonalizedLearningContentInputSchema,
    outputSchema: LearningContentSchema,
  },
  async input => {
    const {output} = await prompt( {
      topicName: input.topicName,
      topicPatterns: input.topicPatterns,
      topicPracticeProblems: input.topicPracticeProblems,
    });
    return output!;
  }
);
