import type { Question } from "@/form/schema";

export function QuestionField(props: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) {
  const q = props.question;
  return (
    <div className="group flex flex-col gap-2">
      <label className="text-sm font-semibold text-zinc-700 group-focus-within:text-zinc-900 transition-colors">
        {q.label}
      </label>
      <textarea
        className="w-full resize-none rounded-2xl border border-zinc-200 bg-white p-4 text-base 
                   shadow-sm ring-zinc-900/5 transition-all
                   placeholder:text-zinc-400
                   focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 outline-none"
        rows={q.rows ?? 4}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Escreva seus pensamentos aqui..."
      />
    </div>
  );
}
