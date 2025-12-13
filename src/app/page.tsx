import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold">Retrospectiva 2025 / Visão 2026</h1>
      <p className="mt-2 text-zinc-600">
        Preencha o formulário e receba por e-mail um HTML com suas respostas + um PDF bonitinho.
      </p>

      <Link
        href="/step-1"
        className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-white"
      >
        Começar
      </Link>
    </div>
  );
}
