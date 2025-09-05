'use client';

import type { Topic } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Code, ListChecks, Rocket } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onStartLearning: (topic: Topic) => void;
}

export function TopicCard({ topic, onStartLearning }: TopicCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Brain className="text-primary" />
            {topic.name}
        </CardTitle>
        <CardDescription>Focus on these key areas.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            Key Patterns
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {topic.patterns.map((pattern) => (
              <li key={pattern}>{pattern}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            Practice Problems
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {topic.practice.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onStartLearning(topic)} className="w-full bg-primary/20 text-primary hover:bg-primary/30">
          <Rocket className="mr-2 h-4 w-4" />
          Start Learning Module
        </Button>
      </CardFooter>
    </Card>
  );
}
