import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/** Eenvoudige tekstpagina (privacy, voorwaarden) in de huisstijl. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="bg-navy pb-24">
        <SiteHeader />
        <section className="mx-auto max-w-3xl px-5 pt-12 sm:pt-16">
          <h1 className="font-display text-[2.2rem] font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-haze">Laatst bijgewerkt: {updated}</p>
        </section>
      </div>
      <section className="relative mx-auto -mt-16 max-w-3xl px-4 sm:px-6">
        <article className="space-y-5 rounded-[28px] border border-line bg-white p-6 text-[15px] leading-relaxed text-slate-700 shadow-float sm:p-9 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_a]:font-semibold [&_a]:text-brand [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </article>
      </section>
      <SiteFooter />
    </div>
  );
}
