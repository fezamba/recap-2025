import Link from "next/link";

export default function HomePage() {
return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center py-12">
      <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-6">
        Reflexão de Final de Ano
      </span>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
        Retrospectiva 2025 <br />
        <span className="text-indigo-600">Visão 2026</span>
      </h1>

      <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
        Reserve um momento para você. Preencha o formulário e receba um 
        <span className="font-semibold text-slate-900"> PDF exclusivo</span> com suas respostas direto no seu e-mail.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <Link
          href="/step-1"
          className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-bold text-white 
                     shadow-lg shadow-indigo-200 transition-all 
                     hover:bg-indigo-700 hover:shadow-xl active:scale-95 text-center"
        >
          Começar Jornada
        </Link>
        
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 py-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Gratuito e Privado
        </div>
      </div>

      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50" />
    </div>
  );
}
