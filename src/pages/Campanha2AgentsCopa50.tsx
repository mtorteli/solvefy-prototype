import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Campanha2AgentsCopa50.css";
import logoSolvefy from "@/assets/logo-solvefy-white.png";
import mulherImg from "@/assets/lp2-mulher.png";
import { Footer } from "@/components/Footer";
import { useRdStationLoader } from "@/lib/rdStation";

const UTM_URL =
  "https://agents.solvefy.com/cadastro?utm_source=outro&utm_medium=cpc&utm_campaign=campanha-agents-copa&utm_content=campannhacopa50";

const TARGET = new Date("2026-07-19T23:59:59-03:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getCountdown() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  };
}

export default function Campanha2AgentsCopa50() {
  useRdStationLoader();
  const [cd, setCd] = useState(getCountdown());

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="lp2">
      <Helmet>
        <title>Solvefy Agents com 90% de Desconto</title>
      </Helmet>
      {/* ── Icon Sprite ── */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="lp2-i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </symbol>
          <symbol id="lp2-i-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </symbol>
          <symbol id="lp2-i-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </symbol>
          <symbol id="lp2-i-bot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 2v6" /><circle cx="9" cy="14" r="1.2" /><circle cx="15" cy="14" r="1.2" /><path d="M7 20v2" /><path d="M17 20v2" />
          </symbol>
          <symbol id="lp2-i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </symbol>
          <symbol id="lp2-i-cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
          </symbol>
          <symbol id="lp2-i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" />
          </symbol>
          <symbol id="lp2-i-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" />
          </symbol>
          <symbol id="lp2-i-pen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
          </symbol>
          <symbol id="lp2-i-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </symbol>
          <symbol id="lp2-i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
          </symbol>
        </defs>
      </svg>

      {/* ════════════ TOP BAR ════════════ */}
      <header className="topbar">
        <div className="topbar__in">
          <a href="https://solvefy.com" target="_blank" rel="noopener noreferrer" className="topbar__logo-link">
            <img src={logoSolvefy} alt="Solvefy" className="topbar__logo" />
          </a>
          <span className="topbar__tag">Oferta de lançamento · 90% OFF</span>
          <span className="topbar__spacer"></span>
          <a href={UTM_URL} target="_blank" rel="noopener noreferrer" className="topbar__cta">
            Garantir 90% OFF{" "}
            <svg width="14" height="14"><use href="#lp2-i-arr" /></svg>
          </a>
        </div>
      </header>

      {/* ════════════ HERO ════════════ */}
      <section className="hero" data-screen-label="Hero">
        <div className="hero__grid"></div>
        <div className="kinetic" aria-hidden="true">
          <div className="kinetic__row kinetic__row--1">
            <div className="kinetic__track">
              <span>PROSPECTAR · QUALIFICAR · PROPOSTA · FOLLOW-UP · DISCOVERY · CONTEÚDO · LINKEDIN · OUTREACH · </span>
              <span>PROSPECTAR · QUALIFICAR · PROPOSTA · FOLLOW-UP · DISCOVERY · CONTEÚDO · LINKEDIN · OUTREACH · </span>
            </div>
          </div>
          <div className="kinetic__row kinetic__row--2">
            <div className="kinetic__track">
              <span>15 AGENTES · 15 AGENTES · 15 AGENTES · </span>
              <span>15 AGENTES · 15 AGENTES · 15 AGENTES · </span>
            </div>
          </div>
          <div className="kinetic__row kinetic__row--3">
            <div className="kinetic__track">
              <span>SEM CONTRATAR · EM PORTUGUÊS · MULTI-MODELO · PRONTO HOJE · </span>
              <span>SEM CONTRATAR · EM PORTUGUÊS · MULTI-MODELO · PRONTO HOJE · </span>
            </div>
          </div>
        </div>

        <div className="hero__top">
          <div className="statusbar">
            <span className="live">15 agentes prontos</span>
            <span className="sep">·</span>
            <span>SDR</span><span className="sep">·</span>
            <span>Proposta</span><span className="sep">·</span>
            <span>Discovery</span><span className="sep">·</span>
            <span>Conteúdo</span><span className="sep">·</span>
            <span>em português</span>
          </div>
        </div>

        <div className="hero__in">
          <div className="hero__copy">
            <span className="eyebrow"><span className="bar"></span>Oferta de lançamento</span>
            <h1 className="hero__title">
              Multiplique<br />
              seu time<br />
              sem contratar.
            </h1>
            <p className="hero__lede">
              15 agentes de IA especializados em{" "}
              <b>prospecção, propostas, follow-up e conteúdo</b>{" "}
              entram em ação pelo seu time comercial e de marketing,
              24h por dia, em português, por menos de R$ 200 por mês.
            </p>

            <div className="hero__cta-row">
              <a href={UTM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Garantir 90% OFF agora{" "}
                <svg width="20" height="20"><use href="#lp2-i-arr" /></svg>
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
              <svg width="16" height="16"><use href="#lp2-i-bolt" /></svg>
              Para os <b>50 primeiros</b> assinantes: <b>90% OFF</b> nos 3 primeiros meses.
            </p>
          </div>

          {/* ── 50% Disc Badge ── */}
          <div className="hero__badge">
            <div className="disc">
              <div className="disc__card">
                <span className="disc__tag">oferta de lançamento</span>
                <div className="disc__num">
                  <span className="fifty">90</span>
                  <span className="disc__stack">
                    <span className="pct">%</span>
                    <span className="disc__off">OFF</span>
                  </span>
                </div>
                <p className="disc__sub">
                  nos 3 primeiros meses, para os 50 primeiros assinantes.
                </p>
                <div className="disc__rule"></div>
                <div className="disc__price">
                  <span className="disc__from">
                    <span className="disc__currency">R$</span> 195,80
                  </span>
                  <span className="disc__now">
                    <span className="disc__currency">R$</span> 19,00<small>/mês</small>
                  </span>
                </div>
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
              <span className="eyebrow">O que é o Solvefy Agents</span>
              <h2>
                Um time de <em>especialistas</em> de IA<br />
                dentro da sua operação
              </h2>
              <p>
                Agentes prontos para prospectar, qualificar, escrever propostas,
                preparar discovery e produzir conteúdo, cada um com a expertise
                de um especialista, rodando no seu workspace, em português. Você
                alimenta com o contexto do negócio; eles entregam em minutos o
                que levava horas.
              </p>
            </div>

            {/* Orbit */}
            <div
              className="orbit"
              role="img"
              aria-label="Você no centro, cercado por agentes de IA trabalhando ao redor"
            >
              <div className="orbit__glow"></div>
              <div className="orbit__track orbit__track--1"></div>
              <div className="orbit__track orbit__track--2"></div>

              {/* Chat bubbles */}
              <div className="bubble bubble--you">
                <div className="bubble__head">
                  <span className="bubble__ic">
                    <svg><use href="#lp2-i-users" /></svg>
                  </span>
                  <span className="bubble__who">Você</span>
                </div>
                <p className="bubble__txt">Preciso criar uma proposta para um cliente.</p>
                <div className="bubble__meta">10:29</div>
              </div>
              <div className="bubble bubble--agents">
                <div className="bubble__head">
                  <span className="bubble__ic">
                    <svg><use href="#lp2-i-bolt" /></svg>
                  </span>
                  <span className="bubble__who">Agents</span>
                </div>
                <p className="bubble__txt">Proposta criada em 30s.</p>
                <div className="bubble__meta">
                  10:29{" "}
                  <span className="bubble__check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 13 5 17 12 8" />
                      <polyline points="11 17 15 17 22 8" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Inner ring satellites */}
              <div className="sat" style={{ "--r": "var(--r1)", "--dur": "30s", "--p": "0" } as React.CSSProperties}>
                <div className="sat__arm"><div className="sat__card">
                  <span className="node node--steel">
                    <span className="node__ic"><svg><use href="#lp2-i-search" /></svg></span>
                    <span className="node__t">Prospecção</span>
                  </span>
                </div></div>
              </div>
              <div className="sat" style={{ "--r": "var(--r1)", "--dur": "30s", "--p": ".34" } as React.CSSProperties}>
                <div className="sat__arm"><div className="sat__card">
                  <span className="node node--green">
                    <span className="node__ic"><svg><use href="#lp2-i-doc" /></svg></span>
                    <span className="node__t">Propostas</span>
                  </span>
                </div></div>
              </div>
              <div className="sat" style={{ "--r": "var(--r1)", "--dur": "30s", "--p": ".67" } as React.CSSProperties}>
                <div className="sat__arm"><div className="sat__card">
                  <span className="node node--purple">
                    <span className="node__ic"><svg><use href="#lp2-i-pen" /></svg></span>
                    <span className="node__t">Conteúdo</span>
                  </span>
                </div></div>
              </div>

              {/* Outer ring satellites (reverse) */}
              <div className="sat sat--rev" style={{ "--r": "var(--r2)", "--dur": "48s", "--p": ".12" } as React.CSSProperties}>
                <div className="sat__arm"><div className="sat__card">
                  <span className="node node--pink">
                    <span className="node__ic"><svg><use href="#lp2-i-msg" /></svg></span>
                    <span className="node__t">Discovery</span>
                  </span>
                </div></div>
              </div>
              <div className="sat sat--rev" style={{ "--r": "var(--r2)", "--dur": "48s", "--p": ".46" } as React.CSSProperties}>
                <div className="sat__arm"><div className="sat__card">
                  <span className="node node--cyan">
                    <span className="node__ic"><svg><use href="#lp2-i-bolt" /></svg></span>
                    <span className="node__t">Follow-up</span>
                  </span>
                </div></div>
              </div>
              <div className="sat sat--rev" style={{ "--r": "var(--r2)", "--dur": "48s", "--p": ".79" } as React.CSSProperties}>
                <div className="sat__arm"><div className="sat__card">
                  <span className="node node--amber">
                    <span className="node__ic"><svg><use href="#lp2-i-chart" /></svg></span>
                    <span className="node__t">Analytics</span>
                  </span>
                </div></div>
              </div>

              {/* Center person */}
              <div className="orbit__core">
                <img
                  className="orbit__person"
                  src={mulherImg}
                  alt="Profissional usando o Solvefy Agents"
                />
              </div>
            </div>
          </div>

          <div className="feat-grid">
            <article className="feat">
              <span className="feat__num">01</span>
              <svg className="feat__icon"><use href="#lp2-i-bot" /></svg>
              <h3>Prontos para rodar hoje</h3>
              <p>
                SDR, Proposta, Discovery e Squad de Conteúdo já configurados.
                Sem projeto de implantação de 3 semanas: alimente com o contexto do negócio
                e o primeiro output útil sai em 10 minutos.
              </p>
            </article>
            <article className="feat">
              <span className="feat__num">02</span>
              <svg className="feat__icon"><use href="#lp2-i-users" /></svg>
              <h3>O time inteiro no mesmo workspace</h3>
              <p>
                Usuários ilimitados, sem custo por assento.
                Histórico de conversas compartilhado e analytics que mostram quais agentes
                o time mais usa e onde está a produtividade real.
              </p>
            </article>
            <article className="feat">
              <span className="feat__num">03</span>
              <svg className="feat__icon"><use href="#lp2-i-cpu" /></svg>
              <h3>Multi-modelo e transparente</h3>
              <p>
                Escolha Gemini, Claude ou GPT por agente. Pricing em português e crédito
                transparente: <b>1 crédito = 1.000 tokens</b>. Sem surpresa no fim do mês.
              </p>
            </article>
          </div>

          <div className="stats">
            <div className="stat"><b>15</b><span>especialistas de IA, prontos para rodar</span></div>
            <div className="stat"><b>60%</b><span>menos tempo em tarefas operacionais</span></div>
            <div className="stat"><b>30min</b><span>proposta com win themes (era 3 horas)</span></div>
            <div className="stat"><b>2×</b><span>volume de outreach personalizado por SDR</span></div>
          </div>
        </div>
      </section>

      {/* ════════════ PRICING ════════════ */}
      <section className="pricing" id="planos" data-screen-label="Planos">
        <div className="hero__grid"></div>
        <div className="wrap pricing__inner">
          <div className="sec-head">
            <span className="eyebrow"><span className="bar"></span>Planos de lançamento</span>
            <h2>
              Escolha seu plano<br />
              com 90% OFF
            </h2>
            <p>
              90% de desconto nos 3 primeiros meses, exclusivo para os primeiros assinantes
              do lançamento. O decisor é você: assine com cartão e comece hoje.
            </p>
          </div>

          <div className="scarcity" style={{ maxWidth: "560px", margin: "30px auto 40px" }}>
            <div className="scarcity__top">
              <span className="mono">Vagas Limitadas</span>
              <b>50 vagas disponíveis</b>
            </div>
            <div className="scarcity__bar">
              <div className="scarcity__fill" style={{ width: "76%" }}></div>
            </div>
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
                <span className="plan__from">
                  <span className="plan__currency">R$</span> 195,80
                </span>
                <span className="plan__now">
                  <span className="plan__currency">R$</span> 19,00<small>/mês</small>
                </span>
              </div>
              <p className="plan__per">por workspace · nos 3 primeiros meses · com cupom</p>
              <span className="plan__badge">
                <svg width="14" height="14"><use href="#lp2-i-check" /></svg>{" "}
                90% OFF aplicado
              </span>
              <ul>
                <li><svg><use href="#lp2-i-check" /></svg> 50 créditos / mês inclusos</li>
                <li><svg><use href="#lp2-i-check" /></svg> Agentes pré-configurados (15+)</li>
                <li><svg><use href="#lp2-i-check" /></svg> Usuários ilimitados no workspace</li>
                <li><svg><use href="#lp2-i-check" /></svg> Analytics, histórico e anexos</li>
                <li><svg><use href="#lp2-i-check" /></svg> Modelo de IA padrão (Gemini)</li>
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
                <span className="plan__from">
                  <span className="plan__currency">R$</span> 375,80
                </span>
                <span className="plan__now">
                  <span className="plan__currency">R$</span> 37,00<small>/mês</small>
                </span>
              </div>
              <p className="plan__per">por workspace · nos 3 primeiros meses · com cupom</p>
              <span className="plan__badge">
                <svg width="14" height="14"><use href="#lp2-i-check" /></svg>{" "}
                90% OFF aplicado
              </span>
              <ul>
                <li><svg><use href="#lp2-i-check" /></svg> Tudo do Basic</li>
                <li><svg><use href="#lp2-i-check" /></svg> 100 créditos / mês inclusos</li>
                <li><svg><use href="#lp2-i-check" /></svg> Squads pré-prontas</li>
                <li><svg><use href="#lp2-i-check" /></svg> Criação ilimitada de agentes próprios</li>
                <li><svg><use href="#lp2-i-check" /></svg> Criação ilimitada de squads próprias</li>
                <li><svg><use href="#lp2-i-check" /></svg> Multi-modelo (Gemini, Claude, GPT)</li>
                <li><svg><use href="#lp2-i-check" /></svg> Analytics, histórico e anexos</li>
              </ul>
              <a
                href={UTM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="plan__cta plan__cta--primary"
              >
                Garantir 90% OFF
              </a>
            </article>
          </div>

          <p className="pricing__note">
            <b>1 crédito = 1.000 tokens.</b> Sem fidelidade, cancele quando quiser.
            Promo de lançamento válida para os 50 primeiros assinantes.
          </p>
        </div>
      </section>

      {/* ════════════ FINALE ════════════ */}
      <section className="finale" data-screen-label="CTA final">
        <div className="hero__grid"></div>
        <div className="wrap finale__inner">
          <span className="eyebrow">
            <span className="bar"></span>O relógio está correndo
          </span>
          <h2>
            Enquanto você decide, o concorrente já{" "}
            <span className="pop">automatizou</span>.
          </h2>
          <p>
            As 50 licenças com 90% OFF acabam quando o cronômetro zerar. Coloque 15
            especialistas de IA no seu time hoje, por menos do que custa um estagiário.
          </p>

          <div className="countdown">
            <span className="countdown__label">Oferta encerra em</span>
            <div className="cd-group">
              <div className="cd-unit"><b>{cd.d}</b><span>dias</span></div>
              <div className="cd-unit"><b>{cd.h}</b><span>hrs</span></div>
              <div className="cd-unit"><b>{cd.m}</b><span>min</span></div>
              <div className="cd-unit"><b>{cd.s}</b><span>seg</span></div>
            </div>
          </div>

          <div className="finale__cta-wrap">
            <a href={UTM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Garantir 90% OFF agora{" "}
              <svg width="22" height="22"><use href="#lp2-i-arr" /></svg>
            </a>
          </div>
          <p className="finale__fineprint">
            90% OFF · 3 primeiros meses · 50 primeiros assinantes · sem fidelidade
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
