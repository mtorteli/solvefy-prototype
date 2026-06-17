import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./CampanhaAgentsCopa50.css";
import logoSolvefy from "@/assets/logo-solvefy-white.png";
import { Footer } from "@/components/Footer";

interface Countdown {
  d: string;
  h: string;
  m: string;
  s: string;
}

const UTM_URL =
  "https://agents.solvefy.com/cadastro?utm_source=outro&utm_medium=cpc&utm_campaign=campanha-agents-copa&utm_content=campannhacopa50";

const CampanhaAgentsCopa50 = () => {
  const [countdown, setCountdown] = useState<Countdown>({
    d: "00",
    h: "00",
    m: "00",
    s: "00",
  });

  useEffect(() => {
    const target = new Date("2026-07-19T23:59:59-03:00").getTime();
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="copa50">
      <Helmet>
        <title>Solvefy Agents com 90% de Desconto</title>
      </Helmet>
      {/* ── Icon sprite ── */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </symbol>
          <symbol id="i-bot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <path d="M12 2v6" />
            <circle cx="9" cy="14" r="1.2" />
            <circle cx="15" cy="14" r="1.2" />
            <path d="M7 20v2" />
            <path d="M17 20v2" />
          </symbol>
          <symbol id="i-net" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
          </symbol>
          <symbol id="i-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </symbol>
          <symbol id="i-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </symbol>
        </defs>
      </svg>

      {/* ════════════ TOP BAR ════════════ */}
      <header className="topbar">
        <div className="topbar__in">
          <a
            href="https://solvefy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar__logo-link"
          >
            <img
              src={logoSolvefy}
              alt="Solvefy"
              className="topbar__logo"
            />
          </a>
          <span className="topbar__spacer"></span>
          <a
            href={UTM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar__cta"
          >
            Garanta os 90% OFF{" "}
            <svg width="14" height="14">
              <use href="#i-arr" />
            </svg>
          </a>
        </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section className="hero" data-screen-label="Hero">
        <div className="halftone"></div>
        <div className="stripes"></div>

        <div className="kinetic" aria-hidden="true">
          <div className="kinetic__burst"></div>
          <div className="kinetic__burst kinetic__burst--2"></div>
          <div className="kinetic__row kinetic__row--1">
            <div className="kinetic__track">
              <span>GOL GOL GOL </span>
              <span>GOL GOL GOL </span>
              <span>GOL GOL GOL </span>
            </div>
          </div>
          <div className="kinetic__row kinetic__row--2">
            <div className="kinetic__track">
              <span>GOOOL GOOOL </span>
              <span>GOOOL GOOOL </span>
              <span>GOOOL GOOOL </span>
            </div>
          </div>
          <div className="kinetic__row kinetic__row--3">
            <div className="kinetic__track">
              <span>BRASIL BRASIL </span>
              <span>BRASIL BRASIL </span>
              <span>BRASIL BRASIL </span>
            </div>
          </div>
          <div className="kinetic__row kinetic__row--4">
            <div className="kinetic__track">
              <span>COPA 50 COPA 50 </span>
              <span>COPA 50 COPA 50 </span>
              <span>COPA 50 COPA 50 </span>
            </div>
          </div>
          <div className="kinetic__row kinetic__row--5">
            <div className="kinetic__track">
              <span>GOL GOL GOL </span>
              <span>GOL GOL GOL </span>
              <span>GOL GOL GOL </span>
            </div>
          </div>
        </div>

        <div className="hero__top">
          <div className="scorebar">
            <span className="stars">★ ★ ★ ★ ★</span>
            <span>BRA</span>
            <span className="sep">·</span>
            <span>COPA 50</span>
            <span className="sep">·</span>
            <span>SOLVEFY AGENTS</span>
            <span className="sep">·</span>
            <span>EDIÇÃO 2026</span>
            <span className="stars">★ ★ ★ ★ ★</span>
          </div>
        </div>

        <div className="hero__in">
          <div className="hero__copy">
            <span className="eyebrow">
              <span className="bar"></span>Convocação oficial
            </span>
            <h1 className="hero__title">
              Escale a <span className="pop">seleção</span>
              <br />
              de agentes
              <br />
              <span className="out">de IA</span>
            </h1>
            <p className="hero__lede">
              O mercado não perdoa time sem estratégia. Tire sua operação da
              zona de rebaixamento: os agentes do Solvefy entram em campo,
              dominam as tarefas repetitivas e deixam você livre para levantar
              a taça do crescimento.
            </p>

            <div className="hero__cta-row">
              <a
                href={UTM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Garanta os 90% OFF agora{" "}
                <span className="arr">
                  <svg width="20" height="20" style={{ verticalAlign: "-3px" }}>
                    <use href="#i-arr" />
                  </svg>
                </span>
              </a>
              <div className="scarcity scarcity--hero">
                <div className="scarcity__top">
                  <span className="mono">Vagas Limitadas</span>
                  <b>50 vagas disponíveis</b>
                </div>
                <div className="scarcity__bar">
                  <div className="scarcity__fill" style={{ width: "76%" }}></div>
                </div>
              </div>
            </div>

            <p className="hero__meta">
              <svg width="16" height="16" style={{ color: "var(--hero-accent)" }}>
                <use href="#i-bolt" />
              </svg>
              Oferta com <b>Vagas Limitadas,</b> <b>90% OFF</b> nos 3 primeiros meses.
            </p>
          </div>

          {/* ── 50% Badge ── */}
          <div className="hero__badge">
            <div className="badge">
              <span className="badge__ribbon">
                Convocados Limitados e Exclusivos
              </span>
              <div className="badge__shape">
                <div className="badge__fifty">
                  90<span className="pct">%</span>
                </div>
                <div className="badge__off">OFF</div>
                <div className="badge__sub">nos 3 primeiros meses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="features" data-screen-label="O que é o Agents">
        <div className="wrap">
          <div className="features__intro">
            <div className="sec-head">
              <span className="eyebrow">
                <span className="bar"></span>Escalação titular
              </span>
              <h2>
                O que é o <em>Solvefy Agents?</em>
              </h2>
              <p>
                Prospectar, qualificar, escrever propostas e criar conteúdo
                consome horas preciosas que deveriam ser dedicadas a construir
                relacionamentos com os clientes. O Solvefy/Agents age como um
                copiloto lado a lado com os seus colaboradores. Ele assume o
                trabalho manual e repetitivo para que a sua equipe possa
                produzir mais, focar na estratégia e multiplicar os resultados.
              </p>
            </div>

            <div className="tactic">
              <div className="tactic__board">
                <svg
                  className="tactic__svg"
                  viewBox="0 0 680 440"
                  role="img"
                  aria-label="Lousa tática: escalação 4-3-3 do Solvefy Agents"
                >
                  <defs>
                    <linearGradient id="pitchG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#10b863" />
                      <stop offset="1" stopColor="#018a47" />
                    </linearGradient>
                    <marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                      <path d="M0,0 L10,5 L0,10 z" fill="#ffd400" />
                    </marker>
                  </defs>
                  <rect x="16" y="16" width="648" height="408" rx="12" fill="url(#pitchG)" />
                  <g fill="#ffffff" opacity="0.05">
                    <rect x="16" y="16" width="81" height="408" />
                    <rect x="178" y="16" width="81" height="408" />
                    <rect x="340" y="16" width="81" height="408" />
                    <rect x="502" y="16" width="81" height="408" />
                  </g>
                  <g fill="none" stroke="#ffffff" strokeWidth={2.5} opacity="0.9">
                    <rect x="16" y="16" width="648" height="408" rx="12" />
                    <line x1="340" y1="16" x2="340" y2="424" />
                    <circle cx="340" cy="220" r="58" />
                    <rect x="16" y="104" width="104" height="232" />
                    <rect x="16" y="160" width="44" height="120" />
                    <rect x="560" y="104" width="104" height="232" />
                    <rect x="620" y="160" width="44" height="120" />
                    <path d="M120,170 A60,60 0 0,1 120,270" />
                    <path d="M560,170 A60,60 0 0,0 560,270" />
                  </g>
                  <g fill="#ffffff">
                    <circle cx="340" cy="220" r="3.5" />
                    <circle cx="92" cy="220" r="3.5" />
                    <circle cx="588" cy="220" r="3.5" />
                  </g>
                  <g fill="none" stroke="#ffd400" strokeWidth={3.5} strokeDasharray="2 9" markerEnd="url(#ah)">
                    <path d="M345,210 Q420,165 482,130" />
                    <path d="M512,220 Q600,214 630,250" />
                    <path d="M338,308 Q420,330 484,332" />
                  </g>
                  <g stroke="#ffffff" strokeWidth={3.5} opacity="0.8" strokeLinecap="round">
                    <path d="M250,150 l18,18 M268,150 l-18,18" />
                    <path d="M250,290 l18,18 M268,290 l-18,18" />
                  </g>
                  <g className="tactic__players" fontFamily="'Pacaembu','Inter',sans-serif" fontWeight="900" fontSize="17">
                    <g><circle cx="64" cy="220" r="15" fill="#ffd400" stroke="#0b1142" strokeWidth={2.5} /><text x="64" y="220" dy=".35em" textAnchor="middle" fill="#0b1142">1</text></g>
                    <g><circle cx="168" cy="90" r="15" fill="#ffd400" stroke="#0b1142" strokeWidth={2.5} /><text x="168" y="90" dy=".35em" textAnchor="middle" fill="#0b1142">2</text></g>
                    <g><circle cx="168" cy="178" r="15" fill="#ffd400" stroke="#0b1142" strokeWidth={2.5} /><text x="168" y="178" dy=".35em" textAnchor="middle" fill="#0b1142">3</text></g>
                    <g><circle cx="168" cy="262" r="15" fill="#ffd400" stroke="#0b1142" strokeWidth={2.5} /><text x="168" y="262" dy=".35em" textAnchor="middle" fill="#0b1142">4</text></g>
                    <g><circle cx="168" cy="350" r="15" fill="#ffd400" stroke="#0b1142" strokeWidth={2.5} /><text x="168" y="350" dy=".35em" textAnchor="middle" fill="#0b1142">6</text></g>
                    <g><circle cx="322" cy="130" r="15" fill="#ffffff" stroke="#0b1142" strokeWidth={2.5} /><text x="322" y="130" dy=".35em" textAnchor="middle" fill="#0b1142">5</text></g>
                    <g><circle cx="322" cy="220" r="15" fill="#ffffff" stroke="#0b1142" strokeWidth={2.5} /><text x="322" y="220" dy=".35em" textAnchor="middle" fill="#0b1142">8</text></g>
                    <g><circle cx="322" cy="310" r="15" fill="#ffffff" stroke="#0b1142" strokeWidth={2.5} /><text x="322" y="310" dy=".35em" textAnchor="middle" fill="#0b1142">10</text></g>
                    <g><circle cx="498" cy="108" r="15" fill="#1a2bb0" stroke="#ffffff" strokeWidth={2.5} /><text x="498" y="108" dy=".35em" textAnchor="middle" fill="#ffffff">7</text></g>
                    <g><circle cx="498" cy="220" r="15" fill="#1a2bb0" stroke="#ffffff" strokeWidth={2.5} /><text x="498" y="220" dy=".35em" textAnchor="middle" fill="#ffffff">9</text></g>
                    <g><circle cx="498" cy="332" r="15" fill="#1a2bb0" stroke="#ffffff" strokeWidth={2.5} /><text x="498" y="332" dy=".35em" textAnchor="middle" fill="#ffffff">11</text></g>
                  </g>
                </svg>
              </div>

              <svg className="tactic__chalk" viewBox="0 0 600 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <marker id="ah2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="#ffd400" />
                  </marker>
                </defs>
                <g stroke="#ffffff" strokeWidth={6} fill="none" opacity="0.85">
                  <path d="M64,116 l34,34 M98,116 l-34,34" />
                  <circle cx="170" cy="116" r="17" />
                  <path d="M58,476 q22,-30 44,0 t44,0" />
                </g>
                <g stroke="#ffd400" strokeWidth={6} fill="none" strokeDasharray="2 16" opacity="0.95">
                  <path d="M372,508 q150,28 196,-44" markerEnd="url(#ah2)" />
                </g>
              </svg>

              <span className="tactic__tag">★ Escalação titular · 4-3-3</span>
            </div>
          </div>

          <div className="feat-grid">
            <article className="feat">
              <span className="feat__num">01</span>
              <svg className="feat__icon"><use href="#i-bot" /></svg>
              <h3>Entram em campo por você</h3>
              <p>Atendimento no WhatsApp, qualificação de leads, cobrança amigável e suporte N1. As jogadas repetitivas saem do seu time e vão para os agentes.</p>
            </article>
            <article className="feat">
              <span className="feat__num">02</span>
              <svg className="feat__icon"><use href="#i-net" /></svg>
              <h3>Dominam o meio-campo</h3>
              <p>Conectam WhatsApp, CRM, bases de conhecimento e ferramentas. Os agentes orquestram a jogada de ponta a ponta, sem perder a posse de bola.</p>
            </article>
            <article className="feat">
              <span className="feat__num">03</span>
              <svg className="feat__icon"><use href="#i-bolt" /></svg>
              <h3>Jogam com qualquer modelo</h3>
              <p>GPT-4o, Claude e outros craques disponíveis. Você escala, monitora e troca o esquema tático em segundos pelo painel do Solvefy.</p>
            </article>
          </div>

          <div className="stats">
            <div className="stat"><b>1.847</b><span>conversas resolvidas por dia</span></div>
            <div className="stat"><b>87%</b><span>taxa de resolução automática</span></div>
            <div className="stat"><b>2,3s</b><span>tempo médio de resposta</span></div>
            <div className="stat"><b>+18%</b><span>de conversões em 30 dias</span></div>
          </div>
        </div>
      </section>

      {/* ════════════ PRICING ════════════ */}
      <section className="pricing" id="planos" data-screen-label="Planos">
        <div className="halftone"></div>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">
              <span className="bar"></span>Tabela de classificação
            </span>
            <h2>ENTRE EM CAMPO COM 90% OFF</h2>
            <p>
              90% de desconto nos 3 primeiros meses, exclusivo para os primeiros
              assinantes da Copa 50.
            </p>
          </div>

          {/* ── Cupom ── */}
          <div className="coupon-box">
            <span className="coupon-label">🏷️ Adicione o cupom ao assinar para ativar o desconto:</span>
            <span className="coupon-code">SELECAOAGENTS50</span>
          </div>

          <div className="plans">
            {/* ── Basic ── */}
            <article className="plan">
              <h3 className="plan__name">Basic</h3>
              <p className="plan__tier">Para times que buscam uma IA pronta para uso.</p>
              <div className="plan__price">
                <span className="plan__from"><span className="plan__currency">R$</span> 195,80</span>
                <span className="plan__now"><span className="plan__currency">R$</span> 19,00<small>/mês</small></span>
              </div>
              <p className="plan__per">por workspace · nos 3 primeiros meses · com cupom</p>
              <span className="plan__badge">
                <svg width="14" height="14"><use href="#i-check" /></svg>{" "}
                90% OFF aplicado
              </span>
              <ul>
                <li><svg><use href="#i-check" /></svg> 50 créditos / mês inclusos</li>
                <li><svg><use href="#i-check" /></svg> Agentes pré-configurados (15+)</li>
                <li><svg><use href="#i-check" /></svg> Usuários ilimitados no workspace</li>
                <li><svg><use href="#i-check" /></svg> Analytics, histórico e anexos</li>
                <li><svg><use href="#i-check" /></svg> Modelo de IA padrão (Gemini)</li>
              </ul>
              <a
                href={UTM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="plan__cta plan__cta--ghost"
              >
                Assinar Basic
              </a>
            </article>

            {/* ── Pro (featured) ── */}
            <article className="plan plan--feature">
              <span className="plan__flag">★ Mais popular</span>
              <h3 className="plan__name">Pro</h3>
              <p className="plan__tier">Para times que precisam de IA sob medida e automação.</p>
              <div className="plan__price">
                <span className="plan__from"><span className="plan__currency">R$</span> 375,80</span>
                <span className="plan__now"><span className="plan__currency">R$</span> 37,00<small>/mês</small></span>
              </div>
              <p className="plan__per">por workspace · nos 3 primeiros meses · com cupom</p>
              <span className="plan__badge">
                <svg width="14" height="14"><use href="#i-check" /></svg>{" "}
                90% OFF aplicado
              </span>
              <ul>
                <li><svg><use href="#i-check" /></svg> Tudo do Basic</li>
                <li><svg><use href="#i-check" /></svg> 100 créditos / mês inclusos</li>
                <li><svg><use href="#i-check" /></svg> Squads pré-prontas</li>
                <li><svg><use href="#i-check" /></svg> Criação ilimitada de agentes próprios</li>
                <li><svg><use href="#i-check" /></svg> Criação ilimitada de squads próprias</li>
                <li><svg><use href="#i-check" /></svg> Multi-modelo (Gemini, Claude, GPT)</li>
                <li><svg><use href="#i-check" /></svg> Analytics, histórico e anexos</li>
              </ul>
              <a
                href={UTM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="plan__cta plan__cta--primary"
              >
                Garanta 90% OFF
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="finale" data-screen-label="CTA final">
        <div className="halftone"></div>
        <div className="wrap">
          <span className="eyebrow">
            <span className="bar"></span>Apito final se aproxima
          </span>
          <h2>
            Não fique no <span className="pop">banco</span>.
          </h2>
          <p>
            As vagas com 90% OFF acabam quando o relógio zerar. Convoque seus
            agentes antes do apito final.
          </p>

          <div className="countdown">
            <span className="countdown__label">Oferta encerra em</span>
            <div className="cd-group">
              <div className="cd-unit"><b>{countdown.d}</b><span>dias</span></div>
              <div className="cd-unit"><b>{countdown.h}</b><span>hrs</span></div>
              <div className="cd-unit"><b>{countdown.m}</b><span>min</span></div>
              <div className="cd-unit"><b>{countdown.s}</b><span>seg</span></div>
            </div>
          </div>

          <div className="finale__cta-wrap">
            <a
              href={UTM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Garanta os 90% OFF agora{" "}
              <span className="arr">
                <svg width="22" height="22" style={{ verticalAlign: "-4px" }}>
                  <use href="#i-arr" />
                </svg>
              </span>
            </a>
          </div>
          <p className="finale__fineprint">
            <small>90% OFF</small>
            {" · "}
            <small>3 primeiros meses</small>
            {" · "}
            <small>vagas limitadas</small>
            {" · "}
            <small>sem fidelidade</small>
          </p>
        </div>
      </section>

      {/* ════════════ SITE FOOTER ════════════ */}
      <Footer />
    </div>
  );
};

export default CampanhaAgentsCopa50;
