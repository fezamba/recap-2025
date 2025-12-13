"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { WizardHeader } from "@/components/WizardHeader";
import { normalizeEmail } from "@/form/normalize";

export default function Step1Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canContinue = useMemo(() => {
    const e = normalizeEmail(email);
    const c = normalizeEmail(confirmEmail);
    return e.length > 5 && e.includes("@") && e === c;
  }, [email, confirmEmail]);

  function onContinue() {
    const e = normalizeEmail(email);
    const c = normalizeEmail(confirmEmail);
    if (!e || !c || e !== c) {
      setError("Os e-mails não conferem.");
      return;
    }
    localStorage.setItem("retrospectiva:email", e);
    router.push("/step-2");
  }

  return (
    <div className="py-8">
      <WizardHeader
        title="Seu e-mail"
        subtitle="Confirme corretamente: é para lá que vamos enviar o PDF."
      />

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            className="mt-2 w-full rounded-lg border border-zinc-200 p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            autoComplete="email"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirmar e-mail</label>
          <input
            className="mt-2 w-full rounded-lg border border-zinc-200 p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            inputMode="email"
            autoComplete="email"
            placeholder="repita seuemail@exemplo.com"
          />
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
