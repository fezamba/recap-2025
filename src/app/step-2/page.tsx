"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { formSchema } from "@/form/schema";
import { normalizeEmail } from "@/form/normalize";
import { WizardHeader } from "@/components/WizardHeader";
import { SectionAccordion } from "@/components/SectionAccordion";
import { SaveIndicator } from "@/components/SaveIndicator";
import { DraftBanner } from "@/components/DraftBanner";

type SaveState = "idle" | "saving" | "saved";

function getDraftKey(email: string) {
  return `retrospectiva:draft:${normalizeEmail(email)}`;
}

export default function Step2Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hasDraft, setHasDraft] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [submitting, setSubmitting] = useState(false);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("retrospectiva:email");
    if (!stored) {
      router.replace("/step-1");
      return;
    }
    const e = normalizeEmail(stored);
    setEmail(e);

    const key = getDraftKey(e);
    const draft = localStorage.getItem(key);
    if (draft) setHasDraft(true);
  }, [router]);

  function loadDraft() {
    const key = getDraftKey(email);
    const draft = localStorage.getItem(key);
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft) as { answers?: Record<string, string> };
      setAnswers(parsed.answers ?? {});
    } catch {
      // ignore
    }
    setHasDraft(false);
  }

  function discardDraft() {
    const key = getDraftKey(email);
    localStorage.removeItem(key);
    setAnswers({});
    setHasDraft(false);
  }

  function scheduleSave(nextAnswers: Record<string, string>) {
    if (!email) return;
    setSaveState("saving");
    if (saveTimer.current) window.clearTimeout(saveTimer.current);

    saveTimer.current = window.setTimeout(() => {
      const key = getDraftKey(email);
      localStorage.setItem(
        key,
        JSON.stringify({ email, answers: nextAnswers, updatedAt: new Date().toISOString() })
      );
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1200);
    }, 650);
  }

  function onSetAnswer(id: string, value: string) {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      scheduleSave(next);
      return next;
    });
  }

  const totalQuestions = useMemo(
    () => formSchema.reduce((acc, s) => acc + s.questions.length, 0),
    []
  );

  async function onSubmit() {
    setSubmitting(true);
    try {
      const resp = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, confirmEmail: email, answers }),
      });

      if (!resp.ok) {
        let message = "Falha ao enviar. Tente novamente.";

        try {
          const data = await resp.json();

          if (typeof data?.error === "string") {
            message = data.error;
          } else if (typeof data?.error?.message === "string") {
            message = data.error.message;
          } else if (data) {
            message = JSON.stringify(data);
          }
        } catch {
          // ignore parse error
        }

        alert(message);
        return;
      }

      localStorage.removeItem(getDraftKey(email));
      router.push("/success");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="py-8">
      <WizardHeader
        title="Formulário"
        subtitle={`Responda com calma. (${totalQuestions} perguntas).`}
      />

      {hasDraft ? <DraftBanner onContinue={loadDraft} onDiscard={discardDraft} /> : null}

      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs text-zinc-600">E-mail: {email}</div>
        <SaveIndicator state={saveState} />
      </div>

      <div className="flex flex-col gap-4">
        {formSchema.map((section) => (
          <SectionAccordion
            key={section.id}
            section={section}
            answers={answers}
            onSetAnswer={onSetAnswer}
          />
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {submitting ? "Gerando PDF e enviando…" : "Finalizar e receber por e-mail"}
      </button>

      <p className="mt-2 text-xs text-zinc-500">
        Pode levar alguns segundos.
      </p>
    </div>
  );
}
