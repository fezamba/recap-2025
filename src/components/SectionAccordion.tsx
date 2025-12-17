import type { Section } from "@/form/schema";
import { QuestionField } from "@/components/QuestionField";

export function SectionAccordion(props: {
  section: Section;
  answers: Record<string, string>;
  onSetAnswer: (id: string, value: string) => void;
}) {
  const { section } = props;

  return (
    <details className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 open:shadow-md">
      <summary className="flex cursor-pointer list-none items-center justify-between p-5 select-none">
        <div className="flex flex-col gap-1">
          <span className="text-base font-bold tracking-tight text-zinc-900">{section.title}</span>
          {section.description && (
            <span className="text-xs text-zinc-500">{section.description}</span>
          )}
        </div>
        <div className="rounded-full bg-zinc-100 p-2 group-open:rotate-180 transition-transform">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </summary>

      <div className="flex flex-col gap-6 border-t border-zinc-100 p-5 bg-zinc-50/50">
        {section.questions.map((q) => (
          <QuestionField
            key={q.id}
            question={q}
            value={props.answers[q.id] ?? ""}
            onChange={(v) => props.onSetAnswer(q.id, v)}
          />
        ))}
      </div>
    </details>
  );
}
