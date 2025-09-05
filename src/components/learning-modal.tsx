'use client';

import * as React from 'react';
import type { LearningContent, Topic, PracticeProblem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from './code-block';
import { DoubtSolver } from './doubt-solver';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal, Lightbulb, BarChart3, Puzzle, BookOpen, AlertCircle, Key, Check, Bot, RefreshCw, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';


interface LearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: () => void;
  topic: Topic | null;
  content: LearningContent | null;
  isLoading: boolean;
  error: string | null;
}

const difficultyColors: Record<PracticeProblem['difficulty'], string> = {
  Easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const createDoubtContext = (topic: Topic | null, content: LearningContent | null): string => {
    if (!topic || !content) return '';
    return `
Topic: ${topic.name}

Key Takeaways:
${content.keyTakeaways}

Core Concept:
${content.coreConcept}

Key Patterns:
${content.keyPatterns}

C# Implementation:
${content.csharpImplementation}

Problem Walkthrough:
${content.problemWalkthrough}

Complexity Analysis:
${content.complexityAnalysis}
    `.trim();
};

export function LearningModal({ isOpen, onClose, topic, content, isLoading, error, onRegenerate }: LearningModalProps) {
  const doubtContext = React.useMemo(() => createDoubtContext(topic, content), [topic, content]);
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2 border-b">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <DialogTitle className="text-2xl text-primary flex items-center gap-2">
                <Bot /> Learning Module: {topic?.name}
              </DialogTitle>
              <DialogDescription>
                An AI-generated guide to master this topic.
              </DialogDescription>
            </div>
            {!isLoading && !error && content && (
              <Button variant="outline" size="sm" onClick={onRegenerate} disabled={isLoading}>
                <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                Regenerate
              </Button>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6 pt-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your personalized learning guide...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {content && (
              <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                <Section icon={<Key />} title="Key Takeaways" content={content.keyTakeaways} />
                <Section icon={<BookOpen />} title="Core Concept" content={content.coreConcept} />
                <Section icon={<Puzzle />} title="Key Patterns" content={content.keyPatterns} />
                <Section icon={<Terminal />} title="C# Implementation">
                  <CodeBlock code={content.csharpImplementation} language="csharp" />
                </Section>
                <Section icon={<Check />} title="Problem Walkthrough" content={content.problemWalkthrough} />
                <Section icon={<BarChart3 />} title="Complexity Analysis" content={content.complexityAnalysis} />
                
                <Section icon={<Lightbulb />} title="Practice Problems">
                    <div className="space-y-4">
                        {content.practiceProblems.map((problem, index) => (
                            <details key={index} className="bg-card/50 border border-border rounded-lg p-4 open:ring-2 open:ring-primary/50 transition-all">
                                <summary className="cursor-pointer font-semibold text-foreground flex justify-between items-center">
                                    <span>{problem.description}</span>
                                    <Badge className={cn(difficultyColors[problem.difficulty], 'ml-4')}>
                                        {problem.difficulty}
                                    </Badge>
                                </summary>
                                <div className="mt-4 space-y-3 text-sm">
                                    <h5 className='font-semibold'>Examples:</h5>
                                    {problem.examples.map((ex, i) => (
                                        <div key={i} className="bg-background/50 p-3 rounded-md font-code text-xs">
                                            <p><strong>Input:</strong> {ex.input}</p>
                                            <p><strong>Output:</strong> {ex.output}</p>
                                        </div>
                                    ))}
                                    <h5 className='font-semibold pt-2'>Hint:</h5>
                                    <p className="italic text-muted-foreground">{problem.hint}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </Section>
                <Section icon={<HelpCircle />} title="Doubt Solver">
                    <DoubtSolver context={doubtContext} />
                </Section>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface SectionProps {
    icon: React.ReactNode;
    title: string;
    content?: string | React.ReactNode;
    children?: React.ReactNode;
}

const Section = ({ icon, title, content, children }: SectionProps) => (
    <div className="space-y-2">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground border-b border-border pb-2">
            {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5 text-accent' })}
            {title}
        </h3>
        {content && <p className="text-muted-foreground whitespace-pre-line">{content}</p>}
        {children}
    </div>
);
