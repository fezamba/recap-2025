import { formSchema } from "@/form/schema";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderPdfHtml(params: {
  email: string;
  answers: Record<string, string | undefined>;
}): string {
  const { email, answers } = params;
  const today = new Date().toLocaleDateString("pt-BR");

  const sections = formSchema
    .map((section) => {
      const items = section.questions
        .map((q) => {
          const a = (answers[q.id] ?? "").trim();
          return `
            <div class="qa">
              <div class="q">${esc(q.label)}</div>
              <div class="a">${esc(a || "—")}</div>
            </div>
          `;
        })
        .join("");

      return `
        <section class="section">
          <h2>${esc(section.title)}</h2>
          ${section.description ? `<p class="desc">${esc(section.description)}</p>` : ""}
          ${items}
        </section>
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html lang="pt-br">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Retrospectiva</title>
        <style>
          @page { margin: 18mm 16mm; }
          body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #111; }
          .cover { border: 1px solid #eee; padding: 18mm 14mm; border-radius: 10px; }
          .title { font-size: 28px; margin: 0 0 8px 0; }
          .subtitle { color: #666; margin: 0 0 18px 0; }
          .meta { color: #444; font-size: 13px; }
          .divider { height: 24px; }
          h2 { font-size: 18px; margin: 18px 0 10px; }
          .desc { margin: 0 0 10px; color: #666; }
          .section { page-break-inside: avoid; }
          .qa { margin: 0 0 14px; }
          .q { font-weight: 650; margin: 0 0 6px; }
          .a { white-space: pre-wrap; line-height: 1.5; color: #222; }
        </style>
      </head>
      <body>
        <div class="cover">
          <div class="title">Retrospectiva 2025 / Visão 2026</div>
          <div class="subtitle">Pergunta + resposta (literal)</div>
          <div class="meta">
            <div><strong>E-mail:</strong> ${esc(email)}</div>
            <div><strong>Data:</strong> ${esc(today)}</div>
          </div>
        </div>
        <div class="divider"></div>
        ${sections}
      </body>
    </html>
  `;
}
