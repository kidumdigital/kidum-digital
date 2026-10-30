import { NextResponse } from "next/server";
import { leadConfig, toFixCrmPayload, type Lead } from "@/lib/lead-config";
import { validateLead } from "@/lib/validate-lead";

const clip = (v: unknown, n = 300) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "בקשה לא תקינה" }, { status: 400 });
  }

  // Honeypot – בוטים ממלאים את השדה הנסתר הזה
  if (clip(body.website)) return NextResponse.json({ ok: true });

  const lead: Lead = {
    name: clip(body.name, 80),
    phone: clip(body.phone, 20).replace(/[\s()]/g, ""),
    email: clip(body.email, 120),
    service: clip(body.service, 80),
    message: clip(body.message, 2000),
    source_page: clip(body.source_page, 200),
    utm_source: clip(body.utm_source, 100),
    utm_medium: clip(body.utm_medium, 100),
    utm_campaign: clip(body.utm_campaign, 150),
    utm_term: clip(body.utm_term, 150),
    utm_content: clip(body.utm_content, 150),
  };

  const errors = validateLead(lead);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const results = await Promise.allSettled([saveToSupabase(lead), sendToFixCrm(lead)]);
  const [db, crm] = results;
  const dbOk = db.status === "fulfilled" && db.value !== false;
  const crmOk = crm.status === "fulfilled" && crm.value !== false;

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(i === 0 ? "[lead] supabase failed" : "[lead] fix crm failed", r.reason);
  });

  // הליד נחשב התקבל אם נשמר לפחות ביעד אחד
  if (!dbOk && !crmOk) {
    return NextResponse.json({ ok: false, error: "שגיאה בשליחה. נסו שוב או התקשרו אלינו." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

// מחזיר null אם היעד לא מוגדר, true בהצלחה, זורק שגיאה בכישלון
async function saveToSupabase(lead: Lead) {
  const { url, key, table } = leadConfig.supabase;
  if (!url || !key) return false;
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      // מפתחות legacy (JWT) נשלחים גם כ-Bearer; מפתח sb_publishable_ מספיק ב-apikey
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`);
  return true;
}

async function sendToFixCrm(lead: Lead) {
  const { webhookUrl, apiKey, format } = leadConfig.fixCrm;
  if (!webhookUrl) return false; // Fix CRM עדיין לא חובר – ראו lib/lead-config.ts
  const payload = toFixCrmPayload(lead);
  const headers: Record<string, string> = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  let body: string;
  if (format === "form") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = new URLSearchParams(payload).toString();
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }
  const res = await fetch(webhookUrl, { method: "POST", headers, body });
  if (!res.ok) throw new Error(`fix crm ${res.status}: ${await res.text()}`);
  return true;
}
