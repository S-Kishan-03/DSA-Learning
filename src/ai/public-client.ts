import type {
  AnswerDoubtInput,
  GeneratePersonalizedLearningContentInput,
  GeneratePersonalizedLearningContentOutput,
  AnswerDoubtOutput,
} from '@/types';
import {generatePersonalizedLearningContent as generatePersonalizedLearningContentFlow} from '@/ai/flows/generate-personalized-learning-content';
import {answerDoubt as answerDoubtFlow} from '@/ai/flows/answer-doubt-flow';

export async function generatePersonalizedLearningContent(
  input: GeneratePersonalizedLearningContentInput
): Promise<GeneratePersonalizedLearningContentOutput> {
  return generatePersonalizedLearningContentFlow(input);
}

export async function answerDoubt(
  input: AnswerDoubtInput
): Promise<AnswerDoubtOutput> {
  return answerDoubtFlow(input);
}
