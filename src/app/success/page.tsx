import Link from "next/link";
import { WizardHeader } from "@/components/WizardHeader";

export default function SuccessPage() {
  return (
    <div className="py-10">
      <WizardHeader
        title="Enviado!"
        subtitle="Confira seu e-mail (e a caixa de spam, se necessário)."
      />
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg border border-zinc-300 px-4 py-2 text-sm"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
