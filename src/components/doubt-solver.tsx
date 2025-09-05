'use client';

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { answerDoubt } from '@/ai/public-client';
import type { AnswerDoubtInput } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DoubtSolverProps {
  context: string;
  apiKey: string | null;
}

export function DoubtSolver({ context, apiKey }: DoubtSolverProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !apiKey) return;

    setIsLoading(true);
    setError(null);
    setAnswer('');

    try {
      const input: AnswerDoubtInput = {
        question,
        context,
        apiKey,
      };
      const result = await answerDoubt(input);
      setAnswer(result.answer);
    } catch (err) {
      console.error('Failed to get answer:', err);
      setError('Sorry, I couldn\'t get an answer for that. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [question, context, apiKey]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Explain the time complexity of the implementation."
          className="flex-1"
          disabled={isLoading || !apiKey}
        />
        <Button type="submit" disabled={isLoading || !question.trim() || !apiKey}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Sparkles className="mr-2" />
          )}
          Ask
        </Button>
      </form>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {answer && (
        <div className="bg-muted/50 p-4 rounded-md border text-sm">
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}