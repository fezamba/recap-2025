export function WizardHeader(props: { title: string; subtitle?: string }) {
  return (
    <header className="py-6">
      <h1 className="text-2xl font-semibold">{props.title}</h1>
      {props.subtitle ? (
        <p className="mt-2 text-sm text-zinc-600">{props.subtitle}</p>
      ) : null}
    </header>
  );
}
