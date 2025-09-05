'use client';

import type { Day, Topic } from '@/types';
import { TopicCard } from './topic-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Star } from 'lucide-react';
import { dailyMicroRoutine } from '@/types';

interface DayViewProps {
  day: Day;
  onStartLearning: (topic: Topic) => void;
}

export function DayView({ day, onStartLearning }: DayViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Day {day.day}: {day.title}</h2>
        {day.notes && <p className="mt-2 text-lg text-muted-foreground">{day.notes}</p>}
      </div>
      
      {day.isReviewDay ? (
        <Card className="bg-yellow-400/10 border-yellow-400/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-300">
              <Star />
              Review & Consolidate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-200">
              Today is a review day! Use this opportunity to solidify your understanding of the topics covered so far. Revisit challenging problems, explain concepts out loud, and ensure you're comfortable with the key patterns.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {day.topics.map((topic) => (
            <TopicCard key={topic.name} topic={topic} onStartLearning={onStartLearning} />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Daily Micro-Routine</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {dailyMicroRoutine.map((task, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{task}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
