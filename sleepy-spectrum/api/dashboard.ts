import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check dashboard password
  const { key } = req.query;
  const dashboardSecret = process.env.DASHBOARD_SECRET;

  if (!key || key !== dashboardSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Fetch data from Google Sheets via Apps Script
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    return res.status(500).json({ error: 'Google Sheets URL not configured' });
  }

  try {
    const response = await fetch(sheetsUrl, {
      method: 'GET',
      redirect: 'follow',
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(500).json({ error: 'Failed to fetch sheet data' });
    }

    // Set cache for 5 minutes so you don't hit Apps Script too often
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to connect to Google Sheets' });
  }
}