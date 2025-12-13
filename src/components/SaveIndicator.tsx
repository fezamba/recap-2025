export function SaveIndicator(props: { state: "idle" | "saving" | "saved" }) {
  const text =
    props.state === "saving" ? "Salvando…" : props.state === "saved" ? "Salvo ✓" : "";
  if (!text) return null;

  return (
    <div className="text-xs text-zinc-600" aria-live="polite">
      {text}
    </div>
  );
}
