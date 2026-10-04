import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/page-header";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/la-dependencia")({
  head: () =>
    pageHead({
      path: "/la-dependencia",
      title: "La Dependencia",
      description:
        "Qué es la dependencia, cómo funciona el sistema de atención en España y por qué hace falta un Pacto de Estado.",
    }),
  component: Page,
});

const blocks = [
  [
    "¿Qué es la dependencia?",
    "Es la situación de las personas que, por edad, enfermedad o discapacidad, necesitan ayuda de otras para realizar actividades básicas de la vida diaria.",
  ],
  [
    "¿Cómo funciona el sistema?",
    "La persona solicita una valoración, recibe un grado de dependencia y, después, un plan con servicios o prestaciones. Cada paso puede tardar meses.",
  ],
  [
    "El problema",
    "Listas de espera largas, diferencias entre territorios y familias —sobre todo mujeres— que cuidan sin apoyo suficiente.",
  ],
  [
    "La propuesta",
    "Un Pacto de Estado: financiación estable, plazos garantizados, igualdad territorial y reconocimiento de quienes cuidan.",
  ],
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Entender el problema"
        title="La Dependencia"
        lead="Una explicación clara del sistema de atención a la dependencia y de por qué necesita un acuerdo de todos."
      />
      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-10 sm:px-6 md:grid-cols-2">
        {blocks.map(([t, d]) => (
          <Panel key={t}>
            <h2 className="font-display text-xl font-semibold">{t}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d}</p>
          </Panel>
        ))}
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <Panel>
          <p className="text-muted-foreground">
            Las cifras detalladas están en{" "}
            <Link to="/datos" className="font-semibold text-primary underline">
              Datos e indicadores
            </Link>
            . Todas se publicarán con su fuente verificada.
          </p>
        </Panel>
      </section>
    </>
  );
}
