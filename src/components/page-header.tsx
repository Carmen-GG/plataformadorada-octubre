import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      )}
      <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
      )}
      {children && <div className="mt-7">{children}</div>}
    </section>
  );
}

export function Panel({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "li";
}) {
  return <Tag className={`glass-panel rounded-3xl p-6 sm:p-7 ${className}`}>{children}</Tag>;
}
