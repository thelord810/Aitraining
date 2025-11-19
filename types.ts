import { ReactNode } from "react";

export interface SlideContent {
  title: string;
  subtitle?: string;
  content?: ReactNode; // Can be text strings or complex components
  bulletPoints?: string[];
  codeSnippet?: {
    language: string;
    code: string;
    description?: string;
  };
  imagePlaceholder?: string; // URL
  type: 'title' | 'standard' | 'split' | 'demo' | 'code' | 'cards';
}

export interface AgentMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  type?: 'thought' | 'code' | 'text';
  isThinking?: boolean;
}