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

export interface PracticeProblemExample {
  input: string;
  output: string;
}

export interface PracticeProblem {
  description: string;
  examples: PracticeProblemExample[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
}

export interface LearningContent {
  keyTakeaways: string;
  coreConcept: string;
  keyPatterns: string;
  csharpImplementation: string;
  problemWalkthrough: string;
  complexityAnalysis: string;
  practiceProblems: PracticeProblem[];
}

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
});
export type AnswerDoubtInput = z.infer<typeof AnswerDoubtInputSchema>;

export const AnswerDoubtOutputSchema = z.object({
  answer: z
    .string()
    .describe("The AI-generated answer to the user's question."),
});
export type AnswerDoubtOutput = z.infer<typeof AnswerDoubtOutputSchema>;
