// אימות שדות – משותף לצד הלקוח ולצד השרת

export const phoneRegex = /^(?:\+?972-?|0)(?:[23489]|5\d|7\d)-?\d{3}-?\d{4}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LeadInput = { name?: string; phone?: string; email?: string; message?: string; consent?: boolean };

export function validateLead(v: LeadInput) {
  const errors: Partial<Record<"name" | "phone" | "email" | "message" | "consent", string>> = {};
  const name = (v.name || "").trim();
  const phone = (v.phone || "").replace(/[\s()]/g, "");
  const email = (v.email || "").trim();

  if (name.length < 2) errors.name = "נא להזין שם מלא";
  else if (name.length > 80) errors.name = "השם ארוך מדי";
  if (!phoneRegex.test(phone)) errors.phone = "נא להזין מספר טלפון תקין";
  if (email && !emailRegex.test(email)) errors.email = "כתובת המייל אינה תקינה";
  if ((v.message || "").length > 2000) errors.message = "ההודעה ארוכה מדי";
  if (v.consent === false) errors.consent = "יש לאשר את מדיניות הפרטיות";
  return errors;
}
