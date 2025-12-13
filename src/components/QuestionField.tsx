import type { Question } from "@/form/schema";

export function QuestionField(props: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) {
  const q = props.question;
  return (
    <div className="rounded-xl border border-zinc-200 p-4">
      <label className="block text-sm font-medium">{q.label}</label>
      <textarea
        className="mt-2 w-full resize-y rounded-lg border border-zinc-200 p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
        rows={q.rows ?? 4}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
