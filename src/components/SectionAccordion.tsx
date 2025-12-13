import type { Section } from "@/form/schema";
import { QuestionField } from "@/components/QuestionField";

export function SectionAccordion(props: {
  section: Section;
  answers: Record<string, string>;
  onSetAnswer: (id: string, value: string) => void;
}) {
  const { section } = props;

  return (
    <details className="rounded-xl border border-zinc-200 p-4">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">{section.title}</div>
            {section.description ? (
              <div className="mt-1 text-xs text-zinc-600">{section.description}</div>
            ) : null}
          </div>
          <span className="text-xs text-zinc-500">abrir</span>
        </div>
      </summary>

      <div className="mt-4 flex flex-col gap-3">
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
