import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./CampanhaCpaas261.css";
import logoCpaas from "@/assets/logos/solvefy-cpaas.png";
import heroImg from "@/assets/cpaas261-hero.webp";
import { useRdStationLoader } from "@/lib/rdStation";
import { trackCampaignCta } from "@/lib/posthog";

const CAMPAIGN = "cpaas_261";
const FORM_URL = "https://solvefy.rds.land/sfy-formulario?utm_source=outro&utm_medium=cpc&utm_campaign=campanha-de-solvefy-cpaas";
const TARGET = new Date("2026-07-19T23:59:59-03:00").getTime();

const pad = (n: number) => String(n).padStart(2, "0");

function getCountdown() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
    days: Math.floor(diff / 86400000),
  };
}

const SoccerBall = ({ size, spin }: { size: number; spin: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", animation: `c261spin ${spin} linear infinite` }}>
    <defs>
      <radialGradient id={`c261bg${size}`} cx="37%" cy="30%" r="75%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.5" stopColor="#f4f4f4" />
        <stop offset="1" stopColor="#d2d2d2" />
      </radialGradient>
      <clipPath id={`c261cl${size}`}><circle cx="50" cy="50" r="46" /></clipPath>
    </defs>
    <circle cx="50" cy="50" r="46" fill={`url(#c261bg${size})`} stroke="#c4c4c4" strokeWidth="1" />
    <g clipPath={`url(#c261cl${size})`} stroke="#161616" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <polygon points="50,36 63.31,45.67 58.23,61.33 41.77,61.33 36.69,45.67" fill="#161616" />
      <polygon points="67.05,26.54 63.05,14.24 73.51,6.64 83.97,14.24 79.98,26.54" fill="#161616" />
      <polygon points="77.58,58.96 88.04,51.36 98.5,58.96 94.51,71.26 81.58,71.26" fill="#161616" />
      <polygon points="50,79 60.46,86.6 56.47,98.9 43.53,98.9 39.54,86.6" fill="#161616" />
      <polygon points="22.42,58.96 18.42,71.26 5.49,71.26 1.5,58.96 11.96,51.36" fill="#161616" />
      <polygon points="32.95,26.54 20.02,26.54 16.03,14.24 26.49,6.64 36.95,14.24" fill="#161616" />
    </g>
  </svg>
);

const Arrow = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function CampanhaCpaas261() {
  useRdStationLoader();
  const [cd, setCd] = useState(getCountdown());

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cpaas261">
      <Helmet>
        <title>Solvefy CPaaS · SMS a R$0,06 travado na Copa</title>
        <meta
          name="description"
          content="Deposite R$1.000 e trave o R$0,06 por SMS em massa durante a Copa: 40% mais barato que o mercado e mantido depois da final."
        />
      </Helmet>

      {/* ===== NAV ===== */}
      <nav className="c261-nav">
        <a href="https://solvefy.com" target="_blank" rel="noopener noreferrer" className="c261-nav__logo">
          <img src={logoCpaas} alt="Solvefy/CPaaS" />
        </a>
        <div className="c261-nav__right">
          <a href="#trava" className="c261-nav__link c261-nav__links-hide">A trava</a>
          <a href="#diffs" className="c261-nav__link c261-nav__links-hide">Por que Solvefy</a>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="c261-nav__cta" onClick={() => trackCampaignCta(CAMPAIGN, "nav")}>Travar meu R$0,06</a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="c261-hero">
        <div className="c261-hero__glow" />
        <div className="c261-hero__ring" />
        <div className="c261-hero__turf" />
        <div className="c261-flag"><span /><span /><span /></div>
        <div className="c261-hero__in">
          <div className="c261-hero__copy">
            <div className="c261-eyebrow">⚽ Promo Copa · preço travado</div>
            <h1 className="c261-hero__title">
              Todo mundo subiu o preço
              <div>do SMS.<br /><span className="pop">A gente travou.</span></div>
            </h1>
            <p className="c261-hero__lede">
              Menor preço pra você fazer um <strong>golaço</strong> nessa Copa. Deposite R$1.000 e trave o <strong>R$0,06 por SMS em massa</strong> no seu volume, mesmo depois que o mercado subir de novo.
            </p>
            <div className="c261-hero__cta-row">
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="c261-btn" onClick={() => trackCampaignCta(CAMPAIGN, "hero")}>
                Travar meu R$0,06 <Arrow />
              </a>
              <a href="#trava" className="c261-btn c261-btn--ghost">Como funciona a trava</a>
            </div>
          </div>
          <div className="c261-hero__art">
            <img className="c261-hero__img" src={heroImg} alt="SMS a R$0,06 travado na Copa, Solvefy CPaaS" />
            <div className="c261-ball"><SoccerBall size={58} spin="18s" /></div>
            <div className="c261-sticker">#OGOLAÇOÉSEU</div>
            <div className="c261-pricecard">
              <div className="c261-pricecard__tag">travado</div>
              <div className="c261-pricecard__val">R$0,06</div>
              <div className="c261-pricecard__sub">por SMS em massa</div>
            </div>
            <div className="c261-marketbadge">Mercado R$0,10 <span className="arrow">→</span> R$0,06</div>
          </div>
        </div>
      </header>

      {/* ===== STAT ROW ===== */}
      <section className="c261-stats">
        <div className="c261-stats__in">
          <div className="c261-stat">
            <div className="c261-stat__num is-purple">R$0,06</div>
            <div className="c261-stat__label">por SMS em massa, travado</div>
          </div>
          <div className="c261-stat__div" />
          <div className="c261-stat">
            <div className="c261-stat__num">−40<small>%</small></div>
            <div className="c261-stat__label">mais barato que o mercado hoje</div>
          </div>
          <div className="c261-stat__div" />
          <div className="c261-stat">
            <div className="c261-stat__num">{cd.days}</div>
            <div className="c261-stat__label">dias de Copa pra vender</div>
          </div>
          <div className="c261-stat__div" />
          <div className="c261-stat">
            <div className="c261-stat__num is-gold">R$1k</div>
            <div className="c261-stat__label">recarga pra travar o preço</div>
          </div>
        </div>
      </section>

      {/* ===== TRAVA ===== */}
      <section id="trava" className="c261-trava">
        <div className="c261-trava__in">
          <div className="c261-head rv">
            <div className="c261-kicker">Como a trava funciona</div>
            <h2 className="c261-h2">Trave hoje. Continue no R$0,06.</h2>
            <p>A trava não é só durante a Copa. Quem deposita R$1.000 ou mais garante a tarifa no volume contratado, mesmo quando o mercado subir de novo.</p>
          </div>
          <div className="c261-steps-shell rv">
            <div className="c261-steps-ball"><SoccerBall size={50} spin="16s" /></div>
            <div className="c261-steps">
              <div className="c261-step c261-step--1">
                <div className="c261-step__n">Passo 01</div>
                <div className="c261-step__big">R$1k+</div>
                <div className="c261-step__t">Deposite e garanta o volume</div>
                <div className="c261-step__d">Recarga a partir de R$1.000 ativa a trava no volume que você quer.</div>
              </div>
              <div className="c261-step--feature">
                <div className="c261-step__flag">A JOGADA</div>
                <div className="c261-step__lock">TRAVADO</div>
                <div className="c261-step__n">Passo 02</div>
                <div className="c261-step__big">R$0,06</div>
                <div className="c261-step__t">Trave o preço por SMS</div>
                <div className="c261-step__d">Congelado enquanto o Brasil joga, e até a final, em 19/07.</div>
              </div>
              <div className="c261-step c261-step--3">
                <div className="c261-step__n">Passo 03</div>
                <div className="c261-step__big">∞</div>
                <div className="c261-step__t">Continua travado</div>
                <div className="c261-step__d">Mesmo depois da final, o R$0,06 segue no volume que você garantiu.</div>
              </div>
            </div>
          </div>
          <p className="c261-trava__note">
            Preço de R$0,06 por SMS em massa garantido no volume contratado para recargas a partir de R$1.000.<br />
            Mantido após 19/07. Sujeito aos termos da campanha.
          </p>
        </div>
      </section>

      {/* ===== COMPARATIVO ===== */}
      <section className="c261-compare">
        <div className="c261-compare__in">
          <div className="c261-compare__copy rv">
            <div className="c261-compare__kicker">O preço por SMS</div>
            <h2 className="c261-compare__h2">O mercado subiu.<br />A gente travou.</h2>
            <p>Seu fornecedor de SMS aumentou? O nosso não.<br /><br />Mesma régua de envio, 40% mais barato, e a tarifa que você travar continua valendo depois da Copa.</p>
          </div>
          <div className="c261-compare__card rv">
            <svg className="c261-compare__pitch" viewBox="0 0 460 300" preserveAspectRatio="xMidYMid slice">
              <g fill="none" stroke="#ffffff" strokeWidth="2.4">
                <rect x="6" y="6" width="448" height="288" rx="4" />
                <line x1="42" y1="6" x2="42" y2="294" />
                <circle cx="42" cy="150" r="42" />
                <rect x="336" y="62" width="118" height="176" />
                <rect x="402" y="108" width="52" height="84" />
                <path d="M336 116 A44 44 0 0 0 336 184" />
              </g>
              <circle cx="372" cy="150" r="3.2" fill="#ffffff" />
            </svg>
            <div className="c261-compare__body">
              <div className="c261-compare__label">
                <svg width="17" height="17" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#c4c4c4" strokeWidth="2" /><polygon points="50,36 63.31,45.67 58.23,61.33 41.77,61.33 36.69,45.67" fill="#161616" /></svg>
                Preço por SMS · comparativo
              </div>
              <div className="c261-bar-row">
                <div className="c261-bar-head"><span className="name">Mercado hoje</span><span className="val">R$ 0,10</span></div>
                <div className="c261-bar"><div className="c261-bar__fill is-market" /></div>
              </div>
              <div className="c261-bar-row">
                <div className="c261-bar-head"><span className="name is-strong">Solvefy CPaaS</span><span><span className="pct">−40%</span><span className="val">R$ 0,06</span></span></div>
                <div className="c261-bar"><div className="c261-bar__fill is-solvefy" /></div>
              </div>
              <div className="c261-compare__foot">40% mais barato pela mesma régua de envio, e travado no seu volume durante toda a Copa.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section id="diffs" className="c261-diffs">
        <div className="c261-diffs__in">
          <div className="c261-diffs__head rv">
            <div className="c261-kicker">Por que Solvefy CPaaS</div>
            <h2 className="c261-h2">Comunicação que joga<br />a seu favor.</h2>
          </div>
          <div className="c261-diff-cards rv">
            <div className="c261-diff">
              <div className="c261-diff__ic">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#9c7bff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <h3>No ar em minutos</h3>
              <p>Sem setup e sem fidelidade. Sua operação de SMS sobe pela API em minutos, com rotas inteligentes e fallback de canal pra garantir a entrega.</p>
            </div>
            <div className="c261-diff">
              <div className="c261-diff__ic">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#9c7bff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3>Multicanal de verdade</h3>
              <p>SMS, WhatsApp, voz e e-mail transacional na mesma API. Cobrança por volume, sem mensalidade e sem custo por canal.</p>
            </div>
            <div className="c261-diff">
              <div className="c261-diff__ic">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#9c7bff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <h3>Preço travado</h3>
              <p>R$0,06 por SMS garantido no volume contratado, mesmo quando o mercado subir de novo depois da Copa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAINEL ===== */}
      <section className="c261-panel">
        <div className="c261-panel__in">
          <div className="c261-panel__copy rv">
            <div className="c261-kicker">Tudo num painel só</div>
            <h2 className="c261-h2">Acompanhe cada envio em campo.</h2>
            <p>Volume, preço travado, taxa de entrega e custo em tempo real. Você vê exatamente o que enviou e o que voltou.</p>
          </div>
          <div className="c261-console rv">
            <div className="c261-console__top">
              <span className="c261-console__dot" />
              <span className="c261-console__name">Solvefy CPaaS · Console</span>
              <span className="c261-console__upd">Atualizado agora</span>
            </div>
            <div className="c261-console__vol">
              <div><div className="lbl">Volume contratado</div><div className="big">1,2M SMS</div></div>
              <span className="c261-chip">R$0,06 travado</span>
            </div>
            <div className="c261-console__kpis">
              <div className="c261-kpi"><div className="lbl">Preço / SMS</div><div className="v">R$ 0,06</div><div className="d purple">↓ 40%</div></div>
              <div className="c261-kpi"><div className="lbl">Entrega</div><div className="v">99,2%</div><div className="d green">↑ 1,1</div></div>
              <div className="c261-kpi"><div className="lbl">Enviados</div><div className="v">842k</div><div className="d green">↑ 24%</div></div>
            </div>
            <div className="c261-bars">
              <span style={{ height: "38%", background: "#42346c" }} />
              <span style={{ height: "54%", background: "#594691" }} />
              <span style={{ height: "46%", background: "#42346c" }} />
              <span style={{ height: "70%", background: "#6f58b6" }} />
              <span style={{ height: "62%", background: "#594691" }} />
              <span style={{ height: "88%", background: "#8669da" }} />
              <span style={{ height: "100%", background: "#9c7bff" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section className="c261-cd">
        <svg className="c261-cd__pitch" viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="#ffffff" strokeWidth="2.6">
            <rect x="26" y="26" width="1148" height="388" rx="6" />
            <line x1="600" y1="26" x2="600" y2="414" />
            <circle cx="600" cy="220" r="82" />
            <rect x="26" y="110" width="124" height="220" />
            <rect x="1050" y="110" width="124" height="220" />
            <rect x="26" y="165" width="52" height="110" />
            <rect x="1122" y="165" width="52" height="110" />
          </g>
          <circle cx="600" cy="220" r="5" fill="#ffffff" />
        </svg>
        <div className="c261-cd__vignette" />
        <div className="c261-cd__in rv">
          <div className="c261-cd__kicker">Preço congelado por tempo limitado</div>
          <h2 className="c261-cd__h2">Quando o apito final tocar, o preço sobe.</h2>
          <p className="c261-cd__sub">Trave o R$0,06 enquanto o Brasil joga. A oferta expira em 19/07.</p>
          <div className="c261-cd__units">
            <span className="c261-cd__unit"><b>{cd.d}</b><span>DIAS</span></span>
            <span className="c261-cd__unit"><b>{cd.h}</b><span>HORAS</span></span>
            <span className="c261-cd__unit"><b>{cd.m}</b><span>MIN</span></span>
            <span className="c261-cd__unit is-sec"><b>{cd.s}</b><span>SEG</span></span>
          </div>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="c261-btn c261-btn--gold" onClick={() => trackCampaignCta(CAMPAIGN, "countdown")}>
            Travar meu R$0,06 <Arrow />
          </a>
        </div>
      </section>

      {/* ===== FORM / CTA FINAL ===== */}
      <section id="form" className="c261-form">
        <div className="c261-form__in">
          <div className="c261-form__head rv">
            <h2>Quero travar meu R$0,06</h2>
            <p>Deixe seus dados e um especialista Solvefy CPaaS ativa sua trava antes do apito final.</p>
          </div>
          <div className="c261-form__cta rv">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="c261-btn" onClick={() => trackCampaignCta(CAMPAIGN, "form")}>
              Travar meu R$0,06 <Arrow />
            </a>
            <p className="c261-form__fine">Abre o formulário seguro do Solvefy CPaaS em nova aba.</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="c261-footer">
        <div className="c261-footer__in">
          <img className="c261-footer__logo" src={logoCpaas} alt="Solvefy/CPaaS" />
          <p>Promoção "Menor preço pra você fazer um golaço nessa Copa". Preço de R$0,06 por SMS em massa garantido para recargas a partir de R$1.000, travado no volume contratado e mantido após 19/07/2026. Cobrança por volume, sem mensalidade. Sujeito aos termos da campanha. © 2026 Solvefy.</p>
        </div>
      </footer>
    </div>
  );
}
