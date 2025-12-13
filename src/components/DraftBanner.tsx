export function DraftBanner(props: { onContinue: () => void; onDiscard: () => void }) {
  return (
    <div className="mb-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-sm font-medium">Encontramos um rascunho salvo.</div>
      <div className="mt-1 text-sm text-zinc-600">Quer continuar de onde parou?</div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={props.onContinue}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white"
        >
          Continuar
        </button>
        <button
          onClick={props.onDiscard}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        >
          Descartar
        </button>
      </div>
    </div>
  );
}
