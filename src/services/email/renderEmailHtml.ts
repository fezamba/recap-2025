import { formSchema } from "@/form/schema";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderEmailHtml(params: {
  email: string;
  answers: Record<string, string | undefined>;
}): string {
  const { email, answers } = params;

  const sectionsHtml = formSchema
    .map((section) => {
      const qs = section.questions
        .map((q) => {
          const a = (answers[q.id] ?? "").trim();
          return `
            <div style="margin: 0 0 18px 0;">
              <div style="font-weight:600;margin:0 0 6px 0;">${esc(q.label)}</div>
              <div style="white-space:pre-wrap;line-height:1.5;">${esc(a || "—")}</div>
            </div>
          `;
        })
        .join("");

      return `
        <div style="margin: 22px 0 0 0;">
          <h2 style="font-size:18px;margin:0 0 10px 0;">${esc(section.title)}</h2>
          ${section.description ? `<div style="color:#666;margin:0 0 12px 0;">${esc(section.description)}</div>` : ""}
          ${qs}
        </div>
      `;
    })
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif; color:#111;">
      <h1 style="font-size:22px;margin:0 0 6px 0;">Sua Retrospectiva 2025 / Visão 2026</h1>
      <div style="color:#666;margin:0 0 18px 0;">Enviado para: ${esc(email)}</div>
      ${sectionsHtml}
      <hr style="margin:28px 0;border:none;border-top:1px solid #eee;" />
      <div style="color:#888;font-size:12px;">Gerado automaticamente. Guarde este e-mail como registro.</div>
    </div>
  `;
}
