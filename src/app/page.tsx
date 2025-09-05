'use client';

import type { Day, Topic, LearningContent } from '@/types';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { dsaPlan } from '@/data/plan';
import { generatePersonalizedLearningContent } from '@/ai/flows/generate-personalized-learning-content';

import { Sidebar } from '@/components/sidebar';
import { DayView } from '@/components/day-view';
import { LearningModal } from '@/components/learning-modal';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

type ModalState = {
  isOpen: boolean;
  topic: Topic | null;
  content: LearningContent | null;
  isLoading: boolean;
  error: string | null;
};

const CACHE_KEY = 'learningContentCache';

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<Day>(dsaPlan[0]);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    topic: null,
    content: null,
    isLoading: false,
    error: null,
  });
  const [learningContentCache, setLearningContentCache] = useState<Map<string, LearningContent>>(new Map());
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Load cache from localStorage on initial render
  useEffect(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const cacheArray = JSON.parse(cachedData);
        setLearningContentCache(new Map(cacheArray));
      }
    } catch (error) {
      console.error("Failed to load learning content cache from localStorage", error);
    }
  }, []);

  const handleSelectDay = useCallback((day: Day) => {
    setSelectedDay(day);
    if(isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const handleCloseModal = useCallback(() => {
    setModalState({
      isOpen: false,
      topic: null,
      content: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const handleStartLearning = useCallback((topic: Topic) => {
    const cachedContent = learningContentCache.get(topic.name);
    setModalState({
      isOpen: true,
      topic,
      content: cachedContent || null,
      isLoading: !cachedContent,
      error: null,
    });
  }, [learningContentCache]);
  
  const handleRegenerate = useCallback(() => {
    if (!modalState.topic) return;
    
    const topic = modalState.topic;

    // Invalidate cache for the specific topic
    setLearningContentCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.delete(topic.name);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(newCache.entries())));
      } catch (error) {
        console.error("Failed to update learning content in localStorage", error);
      }
      return newCache;
    });

    // Set loading state to trigger re-fetch
    setModalState(prevState => ({
      ...prevState,
      content: null,
      isLoading: true,
      error: null,
    }));
  }, [modalState.topic]);


  useEffect(() => {
    if (modalState.isOpen && modalState.topic && !modalState.content && modalState.isLoading) {
      const topic = modalState.topic;

      const fetchContent = async () => {
        try {
          const content = await generatePersonalizedLearningContent({
            topicName: topic.name,
            topicPatterns: topic.patterns,
            topicPracticeProblems: topic.practice,
          });

          setLearningContentCache(prevCache => {
            const newCache = new Map(prevCache).set(topic.name, content);
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(newCache.entries())));
            } catch (error) {
              console.error("Failed to save learning content to localStorage", error);
            }
            return newCache;
          });
          
          setModalState(prevState => ({
            ...prevState,
            content,
            isLoading: false,
          }));
        } catch (err) {
          console.error('Failed to generate learning content:', err);
          const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
          setModalState(prevState => ({
            ...prevState,
            isLoading: false,
            error: `Failed to load learning module. Please try again.`,
          }));
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not generate the learning content. Please check the console for details.",
          });
        }
      };

      fetchContent();
    }
  }, [modalState, toast]);

  const sidebarComponent = useMemo(() => (
    <Sidebar
      plan={dsaPlan}
      selectedDay={selectedDay}
      onSelectDay={handleSelectDay}
    />
  ), [selectedDay, handleSelectDay]);

  return (
    <>
      <div className="flex min-h-screen w-full">
        {isMobile ? (
          <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
             <Button variant="outline" size="icon" className="shrink-0 md:hidden fixed top-3 left-4 z-20" onClick={() => setSidebarOpen(true)}>
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            <SheetContent side="left" className="p-0 w-[300px] bg-card border-r-0">
              {sidebarComponent}
            </SheetContent>
          </Sheet>
        ) : (
          <div className="hidden md:flex">
            {sidebarComponent}
          </div>
        )}

        <main className="flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 md:hidden">
              {/* This space is intentionally left blank for mobile header but trigger is outside */}
          </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <DayView day={selectedDay} onStartLearning={handleStartLearning} />
          </div>
        </main>
      </div>
      <LearningModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        topic={modalState.topic}
        content={modalState.content}
        isLoading={modalState.isLoading}
        error={modalState.error}
        onRegenerate={handleRegenerate}
      />
    </>
  );
}
