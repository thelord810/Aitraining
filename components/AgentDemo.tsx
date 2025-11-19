import React, { useState, useRef, useEffect } from 'react';
import { generateAgentResponse } from '../services/geminiService';
import { AgentMessage } from '../types';
import { Send, Bot, User, Loader2, TerminalSquare, Play } from 'lucide-react';

export const AgentDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>([
    { role: 'system', text: 'Agent initialized. I have access to: \n- File System (Read/Write)\n- Terminal (Execute)\n- Browser (Search)\n\nHow can I help you today?', type: 'text' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: AgentMessage = { role: 'user', text: input, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        // Construct context from previous messages for continuity
        const context = messages.map(m => `${m.role}: ${m.text}`).join('\n');
        const response = await generateAgentResponse(userMsg.text, context);
        
        // Simple parser to separate Plan vs Action if the model followed instructions
        // (The prompt in geminiService asks for [PLAN] and [ACTION])
        let formattedResponse = response;
        
        // We can split the response into two messages for visual flair if it contains the markers
        if (response.includes('[PLAN]') && response.includes('[ACTION]')) {
            const parts = response.split('[ACTION]');
            const planPart = parts[0].replace('[PLAN]', '').trim();
            const actionPart = parts[1].trim();
            
            setMessages(prev => [
                ...prev, 
                { role: 'model', text: planPart, type: 'thought' },
                { role: 'model', text: actionPart, type: 'code' }
            ]);
        } else {
            setMessages(prev => [...prev, { role: 'model', text: response, type: 'text' }]);
        }

    } catch (error) {
        setMessages(prev => [...prev, { role: 'system', text: 'Error connecting to Agent.', type: 'text' }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="h-[600px] w-full flex flex-col md:flex-row gap-6">
        {/* Left Panel: Context/Controls */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 h-full">
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <TerminalSquare className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Agent Environment</h3>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                    This demo connects to <strong>Gemini 2.5 Flash</strong>. It simulates an agentic loop where the model "Thinks" (Plans) before it "Acts" (Coding).
                </p>
                
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Available Tools</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-950 p-2 rounded border border-slate-900">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        fs.readFile(path)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-950 p-2 rounded border border-slate-900">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        fs.writeFile(path, content)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-950 p-2 rounded border border-slate-900">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        terminal.exec(cmd)
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Try asking:</h4>
                    <button 
                        onClick={() => setInput("Refactor the LoginButton component to use a loading state.")}
                        className="w-full text-left text-xs p-2 text-blue-400 hover:bg-blue-900/20 rounded transition-colors truncate"
                    >
                        "Refactor LoginButton to use loading state..."
                    </button>
                    <button 
                        onClick={() => setInput("Create a Python script to scrape stock prices.")}
                        className="w-full text-left text-xs p-2 text-blue-400 hover:bg-blue-900/20 rounded transition-colors truncate"
                    >
                        "Create a Python script to scrape..."
                    </button>
                </div>
            </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <div className="w-full md:w-2/3 flex flex-col bg-[#0d1117] rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
                <span className="font-mono text-sm text-slate-400">agent_session_1024.log</span>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 font-mono text-sm">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                            msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-900/50'
                        }`}>
                            {msg.role === 'user' ? <User className="w-5 h-5 text-slate-300"/> : <Bot className="w-5 h-5 text-blue-400"/>}
                        </div>
                        
                        <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            {/* Label */}
                            <span className="text-xs text-slate-500 mb-1 uppercase">
                                {msg.role === 'model' && msg.type === 'thought' ? 'Thinking Process' : 
                                 msg.role === 'model' && msg.type === 'code' ? 'Action / Output' : 
                                 msg.role}
                            </span>

                            {/* Content Bubble */}
                            <div className={`p-3 rounded-lg whitespace-pre-wrap ${
                                msg.role === 'user' 
                                    ? 'bg-slate-800 text-slate-200' 
                                    : msg.type === 'thought'
                                        ? 'bg-yellow-900/10 text-yellow-200/80 border border-yellow-900/30 italic' // Thought bubble style
                                        : msg.type === 'code'
                                            ? 'bg-black/50 text-green-400 border border-slate-800 w-full' // Code style
                                            : 'bg-slate-900/50 text-slate-300 border border-slate-800' // Standard response
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5 text-blue-400"/>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 italic">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Agent is reasoning...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Instruct the agent (e.g., 'Read the file data.json and summarize it')..."
                        disabled={isLoading}
                        className="flex-1 bg-[#0d1117] border border-slate-700 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        <span className="hidden md:inline">Run</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
