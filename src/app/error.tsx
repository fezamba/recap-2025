"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Deu um erro</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>
        {error?.message ?? "Erro inesperado"}
      </p>

      <button onClick={() => reset()} style={{ marginTop: 12 }}>
        Tentar novamente
      </button>
    </div>
  );
}
