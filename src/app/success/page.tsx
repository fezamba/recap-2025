import Link from "next/link";
import { WizardHeader } from "@/components/WizardHeader";

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-12">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-inner">
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <WizardHeader
        title="Tudo pronto!"
        subtitle="Sua retrospectiva foi gerada com sucesso."
      />
      
      <div className="mt-2 max-w-sm space-y-4">
        <p className="text-slate-600 leading-relaxed">
          Enviamos um e-mail para você com o resumo em HTML e o <span className="font-bold text-indigo-600">PDF em anexo</span>.
        </p>
        
        <p className="text-sm text-slate-400 italic">
          Não esqueça de conferir a caixa de spam se não chegar em 2 minutos.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-700 transition-all hover:border-indigo-600 hover:text-indigo-600 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}