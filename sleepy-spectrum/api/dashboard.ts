// api/dashboard.ts

export default async function handler(req: any, res: any) {
  try {
    const baseUrl = process.env.GOOGLE_SHEETS_URL;
    const secret = process.env.DASHBOARD_SECRET;

    if (!baseUrl || !secret) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: "Missing GOOGLE_SHEETS_URL or DASHBOARD_SECRET in environment variables",
        })
      );
      return;
    }

    // baseUrl should be like: https://script.google.com/macros/s/XXXXX/exec
    const url = `${baseUrl}?key=${encodeURIComponent(secret)}`;

    const r = await fetch(url, { headers: { Accept: "application/json" } });
    const text = await r.text();

    // safer JSON parse with readable errors
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          success: false,
          error: "Apps Script did not return valid JSON",
          raw: text.slice(0, 500),
        })
      );
      return;
    }

    res.statusCode = r.ok ? 200 : 500;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify(data));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: String(err) }));
  }
}
