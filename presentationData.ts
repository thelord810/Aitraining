import { SlideContent } from "./types";

export const presentationSlides: SlideContent[] = [
    {
        type: 'title',
        title: 'Agentic Coding',
        subtitle: 'Mastering the new era of autonomous development tools and architectures.',
    },
    {
        type: 'standard',
        title: 'What is an AI Agent?',
        subtitle: 'The loop of reasoning and action.',
        content: 'Unlike a standard chatbot that just predicts text, an Agent is a system capable of autonomous reasoning, tool usage, and environmental interaction to achieve a complex goal.',
        bulletPoints: [
            'Perception: Reading files, error logs, and user input.',
            'Reasoning (ReAct): Thinking about what to do next.',
            'Action: Executing terminal commands, writing files.',
            'Reflection: Analyzing the output of its actions.',
        ],
        imagePlaceholder: 'https://picsum.photos/600/400?grayscale&blur=2' 
    },
    {
        type: 'cards',
        title: 'The Evolution of AI Coding',
        subtitle: 'We are currently witnessing the shift from Level 2 to Level 3 autonomy.',
        bulletPoints: [
            'Copilot Era: Smart autocomplete. Context is limited to the open file or cursor position. Passive assistance.',
            'Chat Era: Conversational interfaces. Can explain code and generate snippets, but cannot interact with the environment directly.',
            'Agentic Era: Autonomous loops. "Fix this bug" -> Agent reads error, finds file, edits code, runs tests, verifies fix.'
        ]
    },
    {
        type: 'cards',
        title: 'Leading Agentic Tools',
        subtitle: 'The ecosystem is rapidly diverging into specialized workflows.',
        bulletPoints: [
            'IDE Natives: Cursor (Composer) & Windsurf (Cascade). Deeply integrated editors that maintain "Flow" with context-aware diffs and codebase indexing.',
            'CLI Autonomous: Aider, Goose & OpenHands. Terminal-based agents that are git-aware. They edit files directly, run builds, and auto-commit changes.',
            'Open Standard: Cline & Roo Code. VSCode extensions leveraging MCP. Bring Your Own Key (BYOK) architecture that connects any LLM to your workspace.'
        ]
    },
    {
        type: 'cards',
        title: 'Ecosystem Support',
        subtitle: 'Universal compatibility across modern stacks and enterprise platforms.',
        bulletPoints: [
            'Core Languages: Python, TypeScript, Java, Go, Rust, & C++. LLMs have seen billions of lines of these in training, ensuring high accuracy.',
            'Enterprise Platforms: Salesforce (Apex/LWC), ServiceNow, & SAP. Agents can read documentation via RAG to generate valid proprietary code.',
            'Infrastructure: Terraform, Kubernetes, & AWS CDK. Agents serve as force multipliers for DevOps, generating configs and debugging deployment logs.'
        ]
    },
    {
        type: 'cards',
        title: 'Model Selection Matrix',
        subtitle: 'Choosing the right engine: Balancing Intelligence, Speed, and Cost.',
        bulletPoints: [
            'Top-Tier Intelligence (SOTA): Claude 3.5 Sonnet & Gemini 1.5 Pro. Use these for complex reasoning, architectural changes, and debugging hard problems where accuracy is paramount.',
            'High Efficiency (Cheap): Gemini 2.5 Flash & DeepSeek V3. These models are 10-20x cheaper than SOTA. Perfect for high-volume loops, iterative editing, and verifying tests.',
            'Free & Local (Open Source): Qwen 2.5 Coder & Llama 3 via Ollama. Run these on your own hardware for zero cost. Great for learning the ropes without burning API credits.'
        ]
    },
    {
        type: 'split',
        title: 'The Agent Loop',
        subtitle: 'How Gemini models process complex tasks.',
        content: 'The core of an agent is the "ReAct" pattern: Reason + Act. The model first outputs a thought process (Reasoning), then decides which tool to call (Action), observes the tool output, and repeats.',
        codeSnippet: {
            language: 'typescript',
            code: `while (task.status !== 'COMPLETE') {
  // 1. Observe Environment
  const context = await getFileContext();

  // 2. Reason (Gemini 2.5 Thinking)
  const plan = await agent.think(task, context);
  
  // 3. Act
  if (plan.action === 'EDIT_FILE') {
    await fileSystem.write(plan.path, plan.content);
  } else if (plan.action === 'RUN_TEST') {
    const result = await terminal.exec('npm test');
    
    // 4. Reflect
    if (result.failed) {
        task.feedback = "Tests failed, try again.";
    }
  }
}`
        },
        bulletPoints: [
            'Continuous Context Updates',
            'Tool Definitions (Function Calling)',
            'Error Recovery Mechanisms'
        ]
    },
    {
        type: 'split',
        title: 'Context & Architecture',
        subtitle: 'Managing the "Brain" of the Agent.',
        content: 'LLMs have finite context windows (Tokens). Reading an entire repository is often too expensive or impossible. \n\nTo solve this, modern agents use **RAG (Retrieval Augmented Generation)** to semantically search for relevant code, and **MCP (Model Context Protocol)** to standardized how they connect to data.',
        codeSnippet: {
            language: 'json',
            code: `// MCP Configuration (e.g., cline_mcp_settings.json)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "salesforce": {
      "command": "uvx",
      "args": ["mcp-server-salesforce", "--org", "my-org"]
    }
  }
}
// The Agent can now query Salesforce metadata directly.`
        },
        bulletPoints: [
            'Tokens: The cost of intelligence. Optimized via Context Caching.',
            'RAG: Vector search to find the "needle in the haystack".',
            'MCP: The "USB-C" standard for connecting AI to DBs and APIs.'
        ]
    },
    {
        type: 'demo',
        title: 'Live Agent Demo',
        content: null // Handled by AgentDemo component
    },
    {
        type: 'split',
        title: 'Zero to Hero: Learning Plan',
        subtitle: 'A structured 4-week roadmap for new developers.',
        content: '**Week 1: Prompt Literacy**\nFocus on reading code. Use free tools like ChatGPT or Gemini to explain complex logic. Learn to write unambiguous instructions.\n\n**Week 2: The Cyborg Workflow**\nAdopt Cursor or GitHub Copilot. Learn to edit with inline chat (`Cmd+K`). Focus on reviewing diffs rather than typing syntax.\n\n**Week 3: Autonomous Agents**\nInstall Aider or Cline. Configure them with a cheap model (Gemini Flash/DeepSeek) or a free local model (via Ollama). Build a small project (e.g., "Todo App") without writing manual code.\n\n**Week 4: Custom Tooling**\nBuild an MCP server. Connect your agent to a real database or a Salesforce Org.',
        codeSnippet: {
            language: 'json',
            code: `{
  "learning_roadmap": {
    "beginner": {
      "goal": "Prompt Engineering",
      "tools": ["ChatGPT", "Gemini Studio"],
      "outcome": "Can explain and generate functions"
    },
    "intermediate": {
      "goal": "Hybrid Coding",
      "tools": ["Cursor", "VSCode Copilot"],
      "outcome": "30% faster development speed"
    },
    "advanced": {
      "goal": "Agent Orchestration",
      "tools": ["Aider", "Cline", "MCP", "Ollama"],
      "outcome": "Architecting systems, not just writing syntax"
    }
  }
}`
        },
        bulletPoints: [
            'Start with "Explanation", move to "Generation".',
            'Treat the Agent as a Junior Developer: Trust but Verify.',
            'Master the art of Context: Giving the AI the right files is 90% of the work.'
        ]
    },
    {
        type: 'standard',
        title: 'Best Practices',
        subtitle: 'Working effectively with Agentic Tools',
        content: 'To get the most out of agentic workflows, developers need to shift from "writing code" to "orchestrating intent".\n\nStart small, verify often, and treat the agent as a collaborative partner rather than a magic wand.',
        bulletPoints: [
            'Context is King: Be explicit about filenames, line numbers, and desired outcomes.',
            'Iterative Feedback: If the agent fails, paste the error message back. Don\'t fix it manually immediately.',
            'Sandboxing: Always run autonomous agents in Docker or DevContainers to prevent accidental deletions.',
            'Review Capability: Maintain a high standard for code review. Don\'t let "LGTM" become "Looks Good To Machine".'
        ],
        imagePlaceholder: 'https://picsum.photos/600/400?grayscale'
    },
    {
        type: 'title',
        title: 'Thank You',
        subtitle: 'Start building your agentic workflow today.',
    }
];