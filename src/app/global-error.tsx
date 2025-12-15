"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ padding: 24 }}>
        <h2>Erro</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {error?.message ?? "Erro inesperado"}
        </pre>
        <button onClick={() => reset()} style={{ marginTop: 12 }}>
          Recarregar
        </button>
      </body>
    </html>
  );
}
