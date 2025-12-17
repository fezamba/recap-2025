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
    <div className="py-12 flex flex-col min-h-[80vh] justify-center">
      <WizardHeader
        title="Seu e-mail"
        subtitle="Confirme corretamente: é para lá que vamos enviar o PDF."
      />

      <div className="flex flex-col gap-6 mt-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">E-mail</label>
          <input
            className="w-full rounded-2xl border-none bg-white p-4 text-base shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1">Confirmar e-mail</label>
          <input
            className="w-full rounded-2xl border-none bg-white p-4 text-base shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            inputMode="email"
            placeholder="repita seuemail@exemplo.com"
          />
        </div>

        {error ? <div className="text-sm text-red-500 text-center font-medium">{error}</div> : null}

        <div className="flex justify-center mt-4">
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className="w-full max-w-xs rounded-full bg-indigo-600 px-8 py-4 text-base font-bold text-white 
                       shadow-lg shadow-indigo-200 transition-all 
                       hover:bg-indigo-700 active:scale-95 
                       disabled:opacity-40 disabled:shadow-none"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
