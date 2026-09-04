export const aiCapabilities = [
  {
    index: "01",
    title: "Prompt & Context Engineering",
    description:
      "Designing instructions and context so model behaviour stays useful, predictable and aligned with the product workflow.",
    items: [
      "System prompt design",
      "Context engineering",
      "Reusable prompt structures",
      "Structured outputs",
      "Output constraints",
      "Multi-step prompt flows",
      "Guardrails",
    ],
  },
  {
    index: "02",
    title: "LLM Integration",
    description:
      "Connecting language models to real application logic rather than treating AI as a standalone chat interface.",
    items: [
      "Claude API",
      "Server-side integration",
      "Streaming",
      "Structured responses",
      "Application workflows",
      "Error handling",
      "AI features inside existing products",
    ],
  },
  {
    index: "03",
    title: "AI-Assisted Engineering",
    description:
      "Using AI as an engineering collaborator while keeping architectural decisions, validation and production responsibility human-controlled.",
    items: [
      "Claude Code",
      "Codebase exploration",
      "Implementation planning",
      "Debugging",
      "Refactoring",
      "Test generation",
      "Documentation",
      "Architecture analysis",
    ],
  },
  {
    index: "04",
    title: "Product AI",
    description:
      "Building AI features where the model helps the user complete a real task rather than adding AI simply because it is available.",
    items: [
      "Generation",
      "Summarisation",
      "Recommendations",
      "Workflow automation",
      "AI-assisted creation",
      "Editable AI output",
    ],
  },
] as const;

export const aiPipeline = [
  "User intent",
  "Context",
  "System instructions",
  "Claude API",
  "Structured output",
  "Application logic",
  "User experience",
] as const;

export const surveyAIInput = [
  ["Goal", "Workplace assessment"],
  ["Audience", "Employees"],
  ["Language", "Danish"],
  ["Privacy", "Confidential"],
] as const;

export const surveyAIPlan = [
  "Working environment",
  "Management",
  "Wellbeing",
  "Workload",
  "Open feedback",
] as const;
