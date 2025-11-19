import React, { useState, useEffect, useCallback } from 'react';
import { presentationSlides } from './presentationData';
import { SlideLayout } from './components/SlideLayout';
import { AgentDemo } from './components/AgentDemo';
import { ChevronLeft, ChevronRight, Terminal, Brain, MonitorPlay } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < presentationSlides.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlideIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentSlideIndex, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlideIndex(prev => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentSlideIndex, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = presentationSlides[currentSlideIndex];

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white overflow-hidden flex flex-col relative">
      {/* Background decorative elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center z-10 glass-panel border-b border-slate-800/50">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-semibold text-slate-200 tracking-tight">DevTrain<span className="text-blue-400">.ai</span></span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <span>Agentic Coding Masterclass</span>
          <span className="px-2 py-1 bg-slate-800 rounded text-xs font-mono">v2.5</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 p-8">
        <div 
          className={`w-full max-w-6xl transition-all duration-300 transform ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {currentSlide.type === 'demo' ? (
            <AgentDemo />
          ) : (
            <SlideLayout slide={currentSlide} />
          )}
        </div>
      </main>

      {/* Footer / Controls */}
      <footer className="w-full p-6 flex justify-between items-center z-10">
        <div className="text-slate-500 text-sm font-mono">
          {currentSlideIndex + 1} / {presentationSlides.length}
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`p-3 rounded-full transition-all duration-200 ${
              currentSlideIndex === 0 
                ? 'text-slate-700 cursor-not-allowed' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white active:scale-95'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentSlideIndex + 1) / presentationSlides.length) * 100}%` }}
            />
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === presentationSlides.length - 1}
            className={`p-3 rounded-full transition-all duration-200 ${
              currentSlideIndex === presentationSlides.length - 1
                ? 'text-slate-700 cursor-not-allowed'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white active:scale-95'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <MonitorPlay className="w-3 h-3" />
          <span>Use Arrow Keys to Navigate</span>
        </div>
      </footer>
    </div>
  );
};

export default App;