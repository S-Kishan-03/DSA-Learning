import type { AnswerDoubtInput, LearningContent } from '@/types';

export async function generatePersonalizedLearningContent(_: {
  topicName: string;
  topicPatterns: string[];
  topicPracticeProblems: string[];
}): Promise<LearningContent> {
  throw new Error('AI content generation is disabled on static hosting (GitHub Pages).');
}

export async function answerDoubt(_: AnswerDoubtInput): Promise<{ answer: string }> {
  throw new Error('Doubt answering is disabled on static hosting (GitHub Pages).');
}


