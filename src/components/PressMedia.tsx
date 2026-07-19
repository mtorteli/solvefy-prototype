import { useTranslation } from "react-i18next";

// Protótipo de portfólio: manchetes ilustrativas, sem links externos.
const articles = [
  {
    portal: "Portal de Notícias",
    title: "Solvefy investe em IA para integrar operações digitais",
  },
  {
    portal: "Portal de Notícias",
    title: "Plataforma incrementa disparos com APIs de WhatsApp e RCS",
  },
  {
    portal: "Portal de Notícias",
    title: "Comunicação multicanal em alta entre empresas B2B",
  },
];

export const PressMedia = () => {
  const { t } = useTranslation("home");
  return (
    <section className="bg-[hsl(var(--solve-green))] py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-14">
          <h2 className="tracking-tight">{t("press.title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-2xl bg-black p-6 md:p-7 min-h-[200px]"
            >
              <div>
                <span className="text-xs font-normal uppercase tracking-[0.18em] text-[#f8fafc99]">
                  {a.portal}
                </span>
                <h3 className="mt-4 text-base md:text-lg font-normal leading-snug text-white text-balance">
                  {a.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
