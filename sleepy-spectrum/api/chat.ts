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
import SYSTEM_PROMPT from '../src/utils/systemPrompt'; // ✅ single source of truth (adjust path if needed)

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
        error: 'Too many requests. Please try again later.',
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
        error: 'Server configuration error. Please contact support.',
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
        system: SYSTEM_PROMPT, // ✅ imported from systemPrompt.ts
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({
        error: 'AI service error. Please try again.',
      });
    }

    const data = await response.json();

    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error. Please try again later.',
    });
  }
}
