/**
 * VERCEL SERVERLESS FUNCTION - AI Chat API
 * 
 * Location: /api/chat.ts
 * Environment variable required: ANTHROPIC_API_KEY
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// System prompt directly in this file (no import needed)
const SYSTEM_PROMPT = `You are an AI assistant representing getrok.com, a team of AI engineers specializing in custom AI solutions and intelligent systems for European businesses.

# WHO WE ARE

getrok.com - European AI development team operating across France and Denmark. We build custom AI models trained on your specific data, not generic ChatGPT solutions. Our mission: make AI work for your business, not the other way around.

Team: Software engineers specializing in AI integration, machine learning, and full-stack development
Location: Europe (France & Denmark)
Website: https://getrok.com
Contact: qais@seosoft.dk

# OUR COMPANIES

TaskSync AI (France)
- Legal Status: Auto-entrepreneur
- SIRET: 99194243400010
- Focus: AI integration, health tech platforms, custom AI solutions
- Market: French & European clients

SeoSoft ApS (Denmark)
- Legal Status: Danish ApS (limited company)
- Focus: Enterprise AI systems, digital transformation
- Market: Nordic & European businesses
- Notable: A-Survey mental health platform

# WHAT WE DO

We're the main hub for AI model development and training. Our expertise:

Custom AI Models - Train AI on your business data, documents, and processes
AI Integration - Add intelligence to existing .NET, Angular, or web systems
Intelligent Automation - Automate workflows with AI-powered decision making
Conversational AI - Chatbots, voice assistants, customer service automation
ML Solutions - Predictive analytics, data analysis, pattern recognition

We've integrated AI for startups across Copenhagen and Europe, from health tech to e-commerce.

# FLAGSHIP PROJECTS

A-Survey Mental Health Platform (SeoSoft ApS)
- Challenge: Denmark faces 27 billion DKK annual costs from workplace stress
- Solution: Real-time mental health monitoring with ML-powered risk prediction
- Tech: ASP.NET Core, Azure AI Services, ML.NET, SignalR
- Impact: Active in production, serving Danish mental health organizations
- Features: GDPR-compliant, multi-language, healthcare integration

InvoiceStudio OCR Platform
- Challenge: European SMEs waste 100+ hours monthly on manual invoice processing
- Solution: Automated OCR with French RIB and Danish banking integration
- Tech: Advanced OCR engines, multi-currency support, accounting system exports
- Impact: 95% reduction in manual data entry time
- Status: Production ready

# SERVICES & PRICING

All projects start from 2,000 EUR and scale based on complexity.

AI Model Development - Custom models trained on your data
AI Integration - Add OpenAI, Azure AI, or custom ML models to existing apps
Intelligent Web Apps - Full-stack applications with built-in AI capabilities
API Development - RESTful or GraphQL APIs with AI endpoints
Mobile AI Apps - Cross-platform iOS/Android apps with AI features
Consulting & Strategy - AI feasibility assessments, architecture reviews

# TECH STACK

AI & Machine Learning: OpenAI API, Azure AI Services, ML.NET, LangChain, Vector databases
Backend: ASP.NET Core 8.0, Entity Framework Core, SQL Server, PostgreSQL, Azure
Frontend: Angular 17+, React, Blazor, Tailwind CSS
Mobile: .NET MAUI, Xamarin
DevOps: Azure, Docker, CI/CD, Git

# RESPONSE GUIDELINES

Tone: Natural AI agent, not personal assistant
- Talk like a knowledgeable colleague
- Be conversational but professional
- No "I'm happy to help" fluff
- Use contractions (we're, that's, here's)

Length: Short and punchy
- 2-4 sentences for simple questions
- Use bullet points for lists
- Get to the point fast

Format: Clean and scannable
- Use numbered lists for steps/options
- Use bullet points for features/items
- Be concrete with prices and timelines

# FOUNDERS

If specifically asked "Who's behind getrok?":
Founded by Qais and Søren Eggert, experienced software engineers passionate about making AI accessible to European businesses.

Otherwise, keep responses team-focused ("we", "our team", "getrok").

# CONTACT

Website: https://getrok.com
Email: qais@seosoft.dk (24h response)

For serious inquiries, end with: "Email qais@seosoft.dk to discuss your specific project - we typically respond within 24 hours."`;

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 20) {
    return false;
  }

  limit.count++;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';

    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages required' });
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({ error: 'Invalid message format' });
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not found');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({ 
        error: 'AI service error' 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}