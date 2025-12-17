export function WizardHeader(props: { title: string; subtitle?: string }) {
  return (
    <header className="py-6 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{props.title}</h1>
      {props.subtitle ? (
        <p className="mt-3 text-base text-slate-600 leading-relaxed">{props.subtitle}</p>
      ) : null}
    </header>
  );
}
