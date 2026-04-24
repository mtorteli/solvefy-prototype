import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    portal: "Acontecendo Aqui",
    title: "Disparo Pro acelera entregas e reduz gargalos com agentes de IA",
    href: "https://acontecendoaqui.com.br/tech/disparo-pro-acelera-entregas-e-reduz-gargalos-com-agentes-de-ia/",
  },
  {
    portal: "Mobile Time",
    title: "Ativos Capital incrementa Disparo Pro com APIs de WhatsApp e RCS",
    href: "https://www.mobiletime.com.br/noticias/19/09/2025/ativos-capital-incrementa-disparo-pro-com-apis-de-whatsapp-e-rcs/",
  },
  {
    portal: "Mobile Time",
    title: "Ativos Capital projeta receita de R$ 350 milhões no biênio 2026/27",
    href: "https://www.mobiletime.com.br/noticias/09/02/2026/ativos-capital-receita/",
  },
];

export const PressMedia = () => {
  return (
    <section className="bg-[hsl(var(--solve-green))] py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
            O que a mídia fala sobre nós?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <a
              key={a.href}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-2xl bg-black p-6 md:p-7 min-h-[200px] transition-colors duration-300 hover:bg-black/90"
            >
              <div>
                <span className="text-xs font-normal uppercase tracking-[0.18em] text-[hsl(var(--solve-green))]">
                  {a.portal}
                </span>
                <h3 className="mt-4 text-base md:text-lg font-normal leading-snug text-white text-balance">
                  {a.title}
                </h3>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <ArrowUpRight
                  className="h-5 w-5 text-[hsl(var(--solve-green))] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
