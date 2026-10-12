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
    "Es la situación de las personas que, por edad, enfermedad o discapacidad, necesitan ayuda para realizar actividades básicas de la vida diaria. Recibir los cuidados necesarios es un derecho.",
  ],
  [
    "¿Cómo funciona el sistema?",
    "La persona solicita la valoración a través del servicio social de base o centro de salud que le corresponda, inicia un proceso de meses, incluso años para que, primero le hagan una valoración del grado y, posteriormente, una vez obtenido el grado, le hagan una valoración económica y le ofrezcan las diferentes opciones de prestaciones y servicios a los que puede acceder y entre los que puede elegir.",
  ],
  [
    "El problema",
    "La falta de recursos accesibles limita la libertad real para elegir entre servicios y prestaciones. Las diferencias entre comunidades autónomas generan desigualdades en el acceso y la atención. Además, la falta de calidad de algunos servicios y la precariedad laboral de sus profesionales comprometen la continuidad de los cuidados y repercuten directamente en la calidad asistencial.",
  ],
  [
    "La propuesta",
    "Un Pacto de Estado por la Dependencia y los Cuidados que garantice financiación estable y suficiente, igualdad territorial, libertad real de elección, servicios accesibles y de calidad, condiciones laborales dignas para profesionales y cuidadores y transparencia en la gestión, los recursos y los resultados del sistema.",
  ],
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Entender el problema"
        title="La Dependencia"
        lead="Qué es la dependencia, cómo funciona el sistema, cuáles son sus principales problemas y qué proponemos."
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
