'use client';

import type { Day } from '@/types';
import { Bot } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SidebarProps {
  plan: Day[];
  selectedDay: Day;
  onSelectDay: (day: Day) => void;
}

export function Sidebar({ plan, selectedDay, onSelectDay }: SidebarProps) {
  const progressValue = (selectedDay.day / plan.length) * 100;

  return (
    <aside className="w-full md:w-72 flex flex-col bg-card border-r h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Bot size={28} />
          CodePath C#
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your AI-Powered DSA Interview Plan
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-1">
          {plan.map((day) => (
            <li key={day.day}>
              <button
                onClick={() => onSelectDay(day)}
                className={cn(
                  'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors flex justify-between items-center',
                  selectedDay.day === day.day
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <span>Day {day.day}: {day.title}</span>
                {day.isReviewDay && <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">Review</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground">{selectedDay.day} / {plan.length} Days</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>
    </aside>
  );
}
