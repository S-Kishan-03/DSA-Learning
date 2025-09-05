import { z } from 'zod';

export interface Topic {
  name: string;
  patterns: string[];
  practice: string[];
}

export interface Day {
  day: number;
  title: string;
  isReviewDay: boolean;
  topics: Topic[];
  notes?: string;
}

export const PracticeProblemExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
});
export type PracticeProblemExample = z.infer<typeof PracticeProblemExampleSchema>;

export const PracticeProblemSchema = z.object({
  description: z.string(),
  examples: z.array(PracticeProblemExampleSchema),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  hint: z.string(),
});
export type PracticeProblem = z.infer<typeof PracticeProblemSchema>;


export const LearningContentSchema = z.object({
    keyTakeaways: z.string().describe("A bulleted list of the most important points from the learning module."),
    coreConcept: z.string().describe("A detailed explanation of the core concept of the topic."),
    keyPatterns: z.string().describe("An explanation of the key patterns associated with this topic."),
    csharpImplementation: z.string().describe("A complete C# code sample demonstrating the implementation of the core concept."),
    problemWalkthrough: z.string().describe("A step-by-step walkthrough of a common problem related to this topic."),
    complexityAnalysis: z.string().describe("An analysis of the time and space complexity of the C# implementation."),
    practiceProblems: z.array(PracticeProblemSchema).describe("A list of practice problems for the user to solve."),
});
export type LearningContent = z.infer<typeof LearningContentSchema>;

export const dailyMicroRoutine = [
  'Review one past problem (15-20 mins)',
  'Solve one new medium problem (30-45 mins)',
  'Read about one new pattern/concept (10-15 mins)',
];

// Schema for the AnswerDoubt flow
export const AnswerDoubtInputSchema = z.object({
  question: z.string().describe("The user's question or doubt."),
  context: z
    .string()
    .describe('The learning material context to use for answering the question.'),
  apiKey: z.string().optional().describe('The user-provided Gemini API key.'),
});
export type AnswerDoubtInput = z.infer<typeof AnswerDoubtInputSchema>;

export const AnswerDoubtOutputSchema = z.object({
  answer: z
    .string()
    .describe("The AI-generated answer to the user's question."),
});
export type AnswerDoubtOutput = z.infer<typeof AnswerDoubtOutputSchema>;


// Schema for the GeneratePersonalizedLearningContent flow
export const GeneratePersonalizedLearningContentInputSchema = z.object({
    topicName: z.string(),
    topicPatterns: z.array(z.string()),
    topicPracticeProblems: z.array(z.string()),
    apiKey: z.string().optional().describe('The user-provided Gemini API key.'),
});
export type GeneratePersonalizedLearningContentInput = z.infer<typeof GeneratePersonalizedLearningContentInputSchema>;
export type GeneratePersonalizedLearningContentOutput = LearningContent;