import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./CampanhaAds261.css";
import logoAds from "@/assets/ads261-logo.png";
import heroImg from "@/assets/ads261-hero.webp";
import { useRdStationLoader } from "@/lib/rdStation";
import { trackCampaignCta, useCampaignAnalytics } from "@/lib/posthog";

const CAMPAIGN = "ads_261";
const FORM_URL = "https://solvefy.rds.land/sfy-formulario?utm_source=outro&utm_medium=cpc&utm_campaign=campanha-de-solvefy-ads";
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
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", animation: `a261spin ${spin} linear infinite` }}>
    <defs>
      <radialGradient id={`a261bg${size}`} cx="37%" cy="30%" r="75%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="0.5" stopColor="#f4f4f4" />
        <stop offset="1" stopColor="#d2d2d2" />
      </radialGradient>
      <clipPath id={`a261cl${size}`}><circle cx="50" cy="50" r="46" /></clipPath>
    </defs>
    <circle cx="50" cy="50" r="46" fill={`url(#a261bg${size})`} stroke="#c4c4c4" strokeWidth="1" />
    <g clipPath={`url(#a261cl${size})`} stroke="#161616" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
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

export default function CampanhaAds261() {
  useRdStationLoader();
  useCampaignAnalytics();
  const [cd, setCd] = useState(getCountdown());

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ads261">
      <Helmet>
        <title>Solvefy Ads · Brasil na Copa, o gol é seu</title>
        <meta
          name="description"
          content="Deposite saldo no Solvefy/Ads até 19/07 e ganhe até 100% de bônus de tráfego, com CPC até 20% mais barato que o leilão. O gol é seu."
        />
      </Helmet>

      {/* ===== NAV ===== */}
      <nav className="a261-nav">
        <a href="#/" target="_blank" rel="noopener noreferrer" className="a261-nav__logo">
          <img src={logoAds} alt="Solvefy/Ads" />
        </a>
        <div className="a261-nav__right">
          <a href="#bonus" className="a261-nav__link a261-nav__links-hide">O bônus</a>
          <a href="#diffs" className="a261-nav__link a261-nav__links-hide">Por que Solvefy</a>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="a261-nav__cta" onClick={() => trackCampaignCta(CAMPAIGN, "nav")}>Quero entrar em campo</a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="a261-hero">
        <div className="a261-hero__glow" />
        <div className="a261-hero__ring" />
        <div className="a261-hero__turf" />
        <div className="a261-hero__in">
          <div className="a261-hero__copy">
            <div className="a261-eyebrow">⚽ Promo Copa · saldo dobrado</div>
            <h1 className="a261-hero__title">
              Brasil na Copa.<br /><span className="pop">O gol é seu.</span>
            </h1>
            <p className="a261-hero__lede">
              Cada real que você joga em tráfego, a <strong>Solvefy joga junto</strong>. Deposite saldo no Solvefy/Ads até 19/07 e dobre sua munição na reta mais quente do ano.
            </p>
            <div className="a261-hero__cta-row">
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="a261-btn" onClick={() => trackCampaignCta(CAMPAIGN, "hero")}>Quero entrar em campo <Arrow /></a>
              <a href="#bonus" className="a261-btn a261-btn--ghost">Ver como funciona o bônus</a>
            </div>
          </div>
          <div className="a261-hero__art">
            <img className="a261-hero__img" src={heroImg} alt="Brasil na Copa, bônus de tráfego Solvefy/Ads" />
            <div className="a261-ball"><SoccerBall size={58} spin="18s" /></div>
            <div className="a261-sticker">#OGOLÉSEU</div>
            <div className="a261-bonuscard">
              <div className="a261-bonuscard__tag">até</div>
              <div className="a261-bonuscard__val">+100<small>%</small></div>
              <div className="a261-bonuscard__sub">de bônus no seu saldo</div>
            </div>
            <div className="a261-marketbadge">R$10k <span className="muted">vira</span> R$17,5k</div>
          </div>
        </div>
      </header>

      {/* ===== STAT ROW ===== */}
      <section className="a261-stats">
        <div className="a261-stats__in">
          <div className="a261-stat">
            <div className="a261-stat__num is-gold">+100<small>%</small></div>
            <div className="a261-stat__label">bônus máximo no seu saldo</div>
          </div>
          <div className="a261-stat__div" />
          <div className="a261-stat">
            <div className="a261-stat__num">−20<small>%</small></div>
            <div className="a261-stat__label">CPC mais barato que o leilão</div>
          </div>
          <div className="a261-stat__div" />
          <div className="a261-stat">
            <div className="a261-stat__num">{cd.days}</div>
            <div className="a261-stat__label">dias de Copa pra vender</div>
          </div>
          <div className="a261-stat__div" />
          <div className="a261-stat">
            <div className="a261-stat__num is-green">R$0</div>
            <div className="a261-stat__label">sem mensalidade</div>
          </div>
        </div>
      </section>

      {/* ===== BONUS LADDER ===== */}
      <section id="bonus" className="a261-bonus">
        <div className="a261-bonus__in">
          <div className="a261-head rv">
            <div className="a261-kicker">A escada do bônus</div>
            <h2 className="a261-h2">Cada real, dobrado.</h2>
            <p>Escolha seu saldo de entrada. O bônus entra como saldo de tráfego: quanto mais você joga, mais a gente joga junto.</p>
          </div>
          <div className="a261-ladder-shell rv">
            <div className="a261-ladder-ball"><SoccerBall size={50} spin="16s" /></div>
            <div className="a261-ladder">
              <div className="a261-tier a261-tier--1">
                <div className="a261-tier__dep">Deposite R$5.000</div>
                <div className="a261-tier__pct">+50<small>%</small></div>
                <div className="a261-tier__chip">Joga com <b>R$7.500</b></div>
              </div>
              <div className="a261-tier--feature">
                <div className="a261-tier__flag">MELHOR JOGADA</div>
                <div className="a261-tier__dobra">DOBRA</div>
                <div className="a261-tier__dep">Deposite R$20.000+</div>
                <div className="a261-tier__pct">+100<small>%</small></div>
                <div className="a261-tier__chip">Joga com <b>o dobro</b></div>
              </div>
              <div className="a261-tier a261-tier--3">
                <div className="a261-tier__dep">Deposite R$10.000</div>
                <div className="a261-tier__pct">+75<small>%</small></div>
                <div className="a261-tier__chip">Joga com <b>R$17.500</b></div>
              </div>
            </div>
          </div>
          <p className="a261-bonus__note">
            O bônus é creditado como saldo de tráfego e consumido <b>após</b> o seu saldo pago.<br />
            Pool global fechado, vale enquanto houver vaga. Expira em 19/07.
          </p>
        </div>
      </section>

      {/* ===== CPC COMPARE ===== */}
      <section className="a261-cpc">
        <div className="a261-cpc__in">
          <div className="a261-cpc__copy rv">
            <div className="a261-cpc__kicker">O custo por clique</div>
            <h2 className="a261-cpc__h2">Custo até 20%<br />mais barato.</h2>
            <p>Tráfego direto, sem leilão inflacionado e sem intermediário comendo a sua margem. Mesmo orçamento, mais cliques e mais venda durante a Copa.</p>
          </div>
          <div className="a261-cpc__card rv">
            <svg className="a261-cpc__pitch" viewBox="0 0 460 300" preserveAspectRatio="xMidYMid slice">
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
            <div className="a261-cpc__body">
              <div className="a261-cpc__label">
                <svg width="17" height="17" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#c4c4c4" strokeWidth="2" /><polygon points="50,36 63.31,45.67 58.23,61.33 41.77,61.33 36.69,45.67" fill="#161616" /></svg>
                Custo por clique · comparativo
              </div>
              <div className="a261-lane">
                <div className="a261-lane-head"><span className="name">Leilão tradicional</span><span className="val">R$ 1,00</span></div>
                <div className="a261-bar"><div className="a261-bar__fill is-leilao" /></div>
              </div>
              <div className="a261-lane">
                <div className="a261-lane-head"><span className="name is-strong">Solvefy/Ads</span><span><span className="pct">−20%</span><span className="val">R$ 0,80</span></span></div>
                <div className="a261-bar"><div className="a261-bar__fill is-solvefy" /></div>
              </div>
              <div className="a261-cpc__foot">CPC 20% menor pela mesma verba, mais cliques e mais chances de gol durante a Copa.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section id="diffs" className="a261-diffs">
        <div className="a261-diffs__in">
          <div className="a261-diffs__head rv">
            <div className="a261-kicker">Por que Solvefy/Ads</div>
            <h2 className="a261-h2">Tráfego que joga<br />a seu favor.</h2>
          </div>
          <div className="a261-diff-cards rv">
            <div className="a261-diff">
              <div className="a261-diff__ic">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#00df71" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M7.5 6H15a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h0" /></svg>
              </div>
              <h3>Tráfego direto</h3>
              <p>Sua verba vai direto pra mídia, sem leilão inflacionado e sem intermediário comendo a sua margem.</p>
            </div>
            <div className="a261-diff">
              <div className="a261-diff__ic">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#00df71" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" /></svg>
              </div>
              <h3>CPC até 20% menor</h3>
              <p>Comparado aos leilões tradicionais. Mais cliques e mais conversão pelo mesmo real investido na Copa.</p>
            </div>
            <div className="a261-diff">
              <div className="a261-diff__ic">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#00df71" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z" /><polyline points="9 12 11 14 15 9.5" /></svg>
              </div>
              <h3>Zero bloqueio</h3>
              <p>Sem refém de plataforma, sem conta derrubada no meio da Copa. Operação no ar do início à final.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAINEL ===== */}
      <section className="a261-panel">
        <div className="a261-panel__in">
          <div className="a261-panel__copy rv">
            <div className="a261-kicker">Tudo num painel só</div>
            <h2 className="a261-h2">Acompanhe cada real em campo.</h2>
            <p>Saldo, bônus, CPC e ROAS em tempo real. Você vê exatamente pra onde a verba foi e o que ela trouxe de volta.</p>
          </div>
          <div className="a261-console rv">
            <div className="a261-console__top">
              <span className="a261-console__dot" />
              <span className="a261-console__name">Solvefy/Ads · Painel</span>
              <span className="a261-console__upd">Atualizado agora</span>
            </div>
            <div className="a261-console__bal">
              <div><div className="lbl">Saldo disponível</div><div className="big">R$ 17.500</div></div>
              <span className="a261-chip">+R$ 7.500 bônus</span>
            </div>
            <div className="a261-console__kpis">
              <div className="a261-kpi"><div className="lbl">CPC</div><div className="v">R$ 0,80</div><div className="d">↓ 20%</div></div>
              <div className="a261-kpi"><div className="lbl">ROAS</div><div className="v">4,2x</div><div className="d">↑ 0,6</div></div>
              <div className="a261-kpi"><div className="lbl">Cliques</div><div className="v">38,2k</div><div className="d">↑ 24%</div></div>
            </div>
            <div className="a261-bars">
              <span style={{ height: "38%", background: "#0a4a28" }} />
              <span style={{ height: "54%", background: "#007f40" }} />
              <span style={{ height: "46%", background: "#0a4a28" }} />
              <span style={{ height: "70%", background: "#009f51" }} />
              <span style={{ height: "62%", background: "#007f40" }} />
              <span style={{ height: "88%", background: "#00bf61" }} />
              <span style={{ height: "100%", background: "#00df71" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section className="a261-cd">
        <svg className="a261-cd__pitch" viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid slice">
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
        <div className="a261-cd__vignette" />
        <div className="a261-cd__in rv">
          <div className="a261-cd__kicker">Pool global fechado</div>
          <h2 className="a261-cd__h2">Quando o apito final tocar, acabou.</h2>
          <p className="a261-cd__sub">Dobre seu saldo de tráfego enquanto há vaga no pool. A oferta expira em 19/07.</p>
          <div className="a261-cd__units">
            <span className="a261-cd__unit"><b>{cd.d}</b><span>DIAS</span></span>
            <span className="a261-cd__unit"><b>{cd.h}</b><span>HORAS</span></span>
            <span className="a261-cd__unit"><b>{cd.m}</b><span>MIN</span></span>
            <span className="a261-cd__unit is-sec"><b>{cd.s}</b><span>SEG</span></span>
          </div>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="a261-btn a261-btn--gold" onClick={() => trackCampaignCta(CAMPAIGN, "countdown")}>Quero entrar em campo <Arrow /></a>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section id="form" className="a261-form">
        <div className="a261-form__in">
          <div className="a261-form__head rv">
            <h2>Quero entrar em campo</h2>
            <p>Deixe seus dados e um especialista Solvefy/Ads ativa seu bônus antes do apito final.</p>
          </div>
          <div className="a261-form__cta rv">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="a261-btn" onClick={() => trackCampaignCta(CAMPAIGN, "form")}>
              Quero entrar em campo <Arrow />
            </a>
            <p className="a261-form__fine">Abre o formulário seguro do Solvefy/Ads em nova aba.</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="a261-footer">
        <div className="a261-footer__in">
          <img className="a261-footer__logo" src={logoAds} alt="Solvefy/Ads" />
          <p>Promoção "Brasil na Copa, o gol é seu". Bônus de até 100% sobre o saldo depositado no Solvefy/Ads até 19/07/2026. Pool global limitado e fechado, válido enquanto houver vaga. Bônus creditado como saldo de tráfego, consumido após o saldo pago, não resgatável em dinheiro. Sujeito aos termos da campanha. © 2026 Solvefy.</p>
        </div>
      </footer>
    </div>
  );
}
