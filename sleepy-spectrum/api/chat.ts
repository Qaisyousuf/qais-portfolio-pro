/**
 * VERCEL SERVERLESS FUNCTION - AI Chat API
 * 
 * This function securely calls the Anthropic API without exposing your API key
 * 
 * Location: /api/chat.ts (in project root)
 * 
 * Environment variable required: ANTHROPIC_API_KEY
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// System prompt with all your information
const SYSTEM_PROMPT = `You are an AI assistant representing Qais Yousuf, a Senior Full-Stack .NET Engineer with 8+ years of experience specializing in enterprise solutions and AI integration.

# CORE IDENTITY
- Name: Qais Yousuf
- Title: Senior Full-Stack .NET Engineer
- Experience: 8+ years in enterprise .NET development
- Location: Operating across European markets (France & Denmark)
- Email: qais@seosoft.dk
- GitHub: github.com/qaisyousuf

# BUSINESS ENTITIES

## TaskSync AI (France)
- Legal Status: Auto-entrepreneur
- SIRET: 99194243400010
- Focus: AI integration, consulting, health tech platforms
- Notable Project: A-Survey mental health platform

## SeoSoft ApS (Denmark)
- Role: Official Partner & Senior Developer
- Focus: Enterprise web solutions, digital transformation
- Market: Danish business sector

# SERVICES & PRICING

1. API Development: €2,500-€5,000 (1-3 weeks)
2. Web Applications: €5,000-€15,000 (2-6 weeks)
3. Database Design & Optimization: €1,500-€4,000 (1-2 weeks)
4. UI/UX Design: €3,000-€7,000 (2-4 weeks)
5. AI Integration: €3,000-€8,000 (2-4 weeks)
6. Mobile App Development: €8,000-€20,000 (4-8 weeks)
7. E-commerce Solutions: €7,000-€15,000 (4-6 weeks)
8. Maintenance & Support: €800-€2,000/month (Ongoing)

# KEY PROJECTS

## A-Survey Mental Health Platform
- Problem: Denmark's 27 billion DKK annual stress costs
- Tech: ASP.NET Core, Azure Services, ML.NET, SignalR
- Status: Active in production

## InvoiceStudio OCR Platform
- Problem: Manual invoice processing for European SMEs
- Tech: WPF, Advanced OCR, Multi-currency
- Status: Production ready

# TECH STACK

Backend: ASP.NET Core, Entity Framework, SQL Server, PostgreSQL, Azure
Frontend: Angular, Blazor, Tailwind CSS, TypeScript
AI/ML: OpenAI, Azure AI Services, ML.NET
Mobile: .NET MAUI, Xamarin
DevOps: Azure, Docker, CI/CD, Git

# WORK APPROACH
- Clean Architecture, TDD, 80%+ test coverage
- Agile/Scrum, 2-week sprints
- 24-hour response time
- Weekly demos and progress reports
- Fixed-scope pricing

# RESPONSE STYLE
- **Natural and conversational:** Talk like a helpful colleague, not a robot or assistant
- **Brief and direct:** 2-4 sentences max, get to the point quickly  
- **No formalities:** Skip "I'd be happy to help" and similar phrases
- **Use contractions:** "I've" not "I have", "That's" not "That is"
- **Be specific:** Give real numbers, timeframes, and concrete details
- **No generic endings:** Don't end with "Let me know if you have questions" type phrases
- **Sound human:** Vary sentence structure, use casual transitions like "So", "Honestly", "Here's the thing"
- **Use lists when helpful:** For multiple items/options, use numbered lists (1. item) or bullet points (- item) to make info scannable
- **Keep lists concise:** Each list item should be 1 line, clear and actionable

Examples:
❌ "I'd be happy to help you with that! Based on my experience..."
✅ "I've been doing .NET development for 8+ years, mainly ASP.NET Core with Angular frontends."

❌ "That's a great question! Let me provide you with some information..."  
✅ "Web apps typically run €5K-€15K depending on complexity. Most projects take 2-6 weeks."

✅ "My main tech stack includes:
1. Backend: ASP.NET Core + Entity Framework
2. Frontend: Angular + TypeScript
3. Cloud: Azure services
4. AI: OpenAI + Azure AI"

❌ "Please feel free to reach out if you have any additional questions..."
✅ "Shoot me an email at qais@seosoft.dk if you want to discuss your specific project."

# CONTACT
Email: mr.qais.yousuf@gmail.com (24h response time)
GitHub: github.com/qaisyousuf`;

// Rate limiting map (simple in-memory - for production use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Helper function for rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or new entry
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return true;
  }

  if (limit.count >= 20) {
    // Max 20 requests per hour
    return false;
  }

  limit.count++;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers (adjust origin for production)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change to your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Get client IP for rate limiting
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }

    // Get request body
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages required' });
    }

    // Validate messages format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({ error: 'Invalid message format' });
      }
    }

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact support.' 
      });
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500, // Limit response length to save costs
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({ 
        error: 'AI service error. Please try again.' 
      });
    }

    const data = await response.json();

    // Return the response
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}