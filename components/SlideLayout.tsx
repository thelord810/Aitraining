import React from 'react';
import { SlideContent } from '../types';
import { CheckCircle2, Code2, Cpu, Sparkles, Brain, Terminal, Database, Network } from 'lucide-react';

interface SlideLayoutProps {
  slide: SlideContent;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ slide }) => {
  
  // Title Slide
  if (slide.type === 'title') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-20 rounded-full"></div>
          <Cpu className="w-24 h-24 text-blue-400 relative z-10" />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          {slide.title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
          {slide.subtitle}
        </p>
        <div className="mt-12 flex items-center space-x-4 text-sm font-mono text-slate-500">
            <span className="flex items-center"><Sparkles className="w-4 h-4 mr-2 text-yellow-500" /> AI-Powered</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>Interactive Training</span>
        </div>
      </div>
    );
  }

  // Standard Slide with Bullets
  if (slide.type === 'standard') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        <div>
          <h2 className="text-4xl font-bold mb-2 text-white">{slide.title}</h2>
          {slide.subtitle && <h3 className="text-xl text-blue-400 mb-8">{slide.subtitle}</h3>}
          
          <div className="space-y-6">
            {typeof slide.content === 'string' ? (
                <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">{slide.content}</p>
            ) : (
                slide.content
            )}

            {slide.bulletPoints && (
              <ul className="space-y-4 mt-6">
                {slide.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 text-lg group-hover:text-white transition-colors">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="relative h-full min-h-[300px] flex items-center justify-center">
            {slide.imagePlaceholder ? (
                 <img src={slide.imagePlaceholder} alt="Illustration" className="rounded-xl shadow-2xl border border-slate-800" />
            ) : (
                <div className="w-full h-64 bg-slate-800/50 rounded-xl border border-slate-700 flex items-center justify-center text-slate-500">
                    Graphic Visualization
                </div>
            )}
        </div>
      </div>
    );
  }
  
  // Card Grid Slide
  if (slide.type === 'cards') {
      return (
          <div className="flex flex-col h-full justify-center">
              <div className="mb-12 text-center">
                  <h2 className="text-4xl font-bold mb-4 text-white">{slide.title}</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto">{slide.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slide.bulletPoints?.map((point, idx) => {
                      // Safely split only on the first colon to preserve colons in description
                      const firstColonIndex = point.indexOf(':');
                      const title = firstColonIndex !== -1 ? point.substring(0, firstColonIndex) : point;
                      const desc = firstColonIndex !== -1 ? point.substring(firstColonIndex + 1).trim() : '';
                      
                      // Dynamic icons based on card content implication or index fallback
                      let Icon = idx === 0 ? Brain : idx === 1 ? Code2 : Terminal;
                      if (title.toLowerCase().includes('context')) Icon = Database;
                      if (title.toLowerCase().includes('standard')) Icon = Network;
                      if (title.toLowerCase().includes('intelligence')) Icon = Sparkles;
                      
                      return (
                        <div key={idx} className="glass-panel p-6 rounded-xl hover:bg-slate-800/40 transition-all hover:-translate-y-1 border border-slate-700/50 flex flex-col">
                            <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 text-blue-400 border border-blue-500/20">
                                <Icon className="w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-200">{title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm flex-grow">{desc}</p>
                        </div>
                      )
                  })}
              </div>
          </div>
      )
  }

  // Split Code Slide
  if (slide.type === 'split' || slide.type === 'code') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 text-white">{slide.title}</h2>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">{slide.subtitle}</p>
          <div className="prose prose-invert text-slate-300 mb-6 whitespace-pre-line">
             {slide.content}
          </div>
          {slide.bulletPoints && (
               <ul className="space-y-3 mt-6">
               {slide.bulletPoints.map((point, idx) => (
                 <li key={idx} className="flex items-center space-x-2 text-slate-300">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                   <span>{point}</span>
                 </li>
               ))}
             </ul>
          )}
        </div>
        
        <div className="flex items-center justify-center w-full">
            {slide.codeSnippet && (
                <div className="w-full bg-[#0d1117] rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="flex items-center px-4 py-2 bg-slate-900 border-b border-slate-800 justify-between">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{slide.codeSnippet.language === 'json' ? 'config.json' : 'agent_logic.ts'}</span>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="text-sm font-mono leading-relaxed text-slate-300">
                            <code>{slide.codeSnippet.code}</code>
                        </pre>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
  }

  return <div>Unknown Slide Type</div>;
};