import React, { useState, useEffect, useCallback, useRef } from 'react';
import { presentationSlides } from './presentationData';
import { SlideLayout } from './components/SlideLayout';
import { AgentDemo } from './components/AgentDemo';
import { ChevronLeft, ChevronRight, Brain, MonitorPlay } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

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

  // Reset scroll position when slide changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSlideIndex]);

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
    <div className="fixed inset-0 bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Fixed Background decorative elements - z-0 */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Fixed Header - z-50 - Fixed height h-20 */}
      <header className="fixed top-0 left-0 right-0 h-20 px-6 flex justify-between items-center z-50 glass-panel border-b border-slate-800/50">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <span className="font-semibold text-slate-200 tracking-tight">DevTrain<span className="text-blue-400">.ai</span></span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <span className="hidden lg:inline text-slate-300 font-medium">By Sumit Pathak</span>
          <span className="hidden lg:inline text-slate-700">|</span>
          <span className="hidden md:inline">Agentic Coding Masterclass</span>
          <span className="px-2 py-1 bg-slate-800 rounded text-xs font-mono">v2.5</span>
        </div>
      </header>

      {/* Main Scrollable Area - z-10 - Positioned between Header and Footer */}
      <main 
        ref={mainContentRef}
        className="fixed top-20 bottom-20 left-0 right-0 overflow-y-auto overflow-x-hidden z-10"
      >
        {/* 
          Container for centering content. 
          min-h-full ensures it takes full height for centering small content,
          but allows expansion for tall content.
        */}
        <div className="min-h-full flex flex-col justify-center p-8 w-full max-w-6xl mx-auto">
          <div 
            className={`w-full transition-all duration-300 transform ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {currentSlide.type === 'demo' ? (
              <AgentDemo />
            ) : (
              <SlideLayout slide={currentSlide} />
            )}
          </div>
        </div>
      </main>

      {/* Fixed Footer - z-50 - Fixed height h-20 */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 px-6 flex justify-between items-center z-50 glass-panel border-t border-slate-800/50">
        <div className="text-slate-500 text-sm font-mono w-16">
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
          <div className="w-32 md:w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
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
        
        <div className="flex items-center space-x-2 text-xs text-slate-600 w-16 justify-end">
          <MonitorPlay className="w-3 h-3 hidden md:block" />
          <span className="hidden md:inline">Keys</span>
        </div>
      </footer>
    </div>
  );
};

export default App;