import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  titleAside,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  titleAside?: ReactNode;
}) {
  return <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16">
    {eyebrow && <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>}
    <div className="mt-4 grid grid-cols-1 items-start gap-5 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-8">
      <h1 className="font-display self-center text-4xl leading-[1.05] tracking-tight md:text-5xl">{title}</h1>
      {titleAside && <div className="md:self-center">{titleAside}</div>}
    </div>
    {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>}
    {children && <div className="mt-7">{children}</div>}
  </section>;
}

export function Panel({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "article" | "figure" | "li" }) {
  return <Tag className={`glass-panel rounded-3xl p-6 sm:p-7 ${className}`}>{children}</Tag>;
}
