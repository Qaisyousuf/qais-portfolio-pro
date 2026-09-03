export const navigation = ["Work", "Skills", "Tools", "Solutions", "About", "Process", "Contact"] as const;

export const projects = [
  {
    id: "staky",
    index: "01",
    category: "European software",
    market: "Live",
    title: "Staky",
    status: "Live / Production",
    description:
      "A platform that helps Danish companies discover European alternatives, build an EU software stack, connect with verified migration partners and manage the move in one workspace.",
    tags: ["EU alternatives", "Migration", "Partners", "Workspace"],
    href: "https://staky.dk/",
    linkLabel: "Visit live product",
  },
  {
    id: "paywatan",
    index: "02",
    category: "Mobile top-up",
    market: "Live",
    title: "PayWatan",
    status: "Live / Production",
    description:
      "A mobile-first service for people in Europe to send airtime and internet packages to Afghanistan through operator detection, secure payment and instant delivery.",
    tags: ["Airtime", "Data", "Payments", "Afghanistan"],
    href: "https://paywatan.com/",
    linkLabel: "Visit live product",
  },
  {
    id: "a-survey",
    index: "03",
    category: "Survey infrastructure",
    market: "Nordic",
    title: "A Survey",
    status: "70–75% built / In development",
    description:
      "A Nordic-first, multi-tenant survey platform for municipalities, HR teams, researchers and companies—with EU data residency, four languages and WCAG 2.2 guardrails built into the product.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "WCAG 2.2"],
    href: "https://asurvey.dk/",
    linkLabel: "Product in development",
  },
  {
    id: "engineering",
    index: "04",
    category: "Engineering depth",
    market: "10+ years",
    title: "Beyond the UI",
    description:
      "The production systems underneath the interface: identity, permissions, billing, data, APIs, queues, integrations, testing, infrastructure and deployment.",
    tags: [".NET", "SQL", "Architecture", "Systems"],
    href: "#skills",
    linkLabel: "Explore capabilities",
  },
] as const;

export const skills = [
  {
    index: "01",
    title: "Backend",
    description: "C#, ASP.NET Core, REST APIs, authentication, authorization, background jobs and integrations.",
  },
  {
    index: "02",
    title: "Frontend",
    description: "Next.js, React, TypeScript, responsive application UI, complex workflows and design systems.",
  },
  {
    index: "03",
    title: "Data",
    description: "PostgreSQL, SQL Server, Prisma, EF Core, relational modelling, performance and tenant isolation.",
  },
  {
    index: "04",
    title: "Architecture",
    description: "SaaS architecture, multi-tenancy, permissions, billing, integrations and production systems.",
  },
] as const;

export const tools = [
  { name: ".NET", category: "Backend", logo: "/tools/dotnet.svg" },
  { name: "C#", category: "Language", logo: "/tools/csharp.svg" },
  { name: "Next.js", category: "Web platform", logo: "/tools/nextjs.svg", monochrome: true },
  { name: "TypeScript", category: "Language", logo: "/tools/typescript.svg" },
  { name: "React", category: "Frontend", logo: "/tools/react.svg" },
  { name: "PostgreSQL", category: "Database", logo: "/tools/postgresql.svg" },
  { name: "Supabase", category: "Data platform", logo: "/tools/supabase.svg" },
  { name: "Prisma", category: "ORM", logo: "/tools/prisma.svg", monochrome: true },
  { name: "Redis", category: "Cache", logo: "/tools/redis.svg" },
  { name: "Docker", category: "Infrastructure", logo: "/tools/docker.svg" },
  { name: "Git", category: "Version control", logo: "/tools/git.svg" },
  { name: "Tailwind CSS", category: "Interface", logo: "/tools/tailwindcss.svg" },
  { name: "Playwright", category: "Testing", logo: "/tools/playwright.svg" },
] as const;
