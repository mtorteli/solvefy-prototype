/**
 * Gera os 4 mockups de canal para o carrossel da hero Marketing.
 *
 * Canvas:  580 × 760 px  (portrait)
 * Phone:   320 × 620 px  (55 % da largura do canvas)
 * DPR:     2×  → PNG final: 1160 × 1520 px  (alta resolução)
 * Fundo:   transparente
 *
 * Com o carrossel exibindo a imagem em ~500 px de largura CSS,
 * o phone renderizará com ~276 px → texto dentro do phone legível.
 */
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../src/assets/marketing-channels");

/* ─── cart SVG (provided by user) ───────────────────────────── */
const CART_SVG_PATH = "/Users/cristinapesente/Downloads/26921931_Hand on shopping cart with different groceries or products.svg";
let cartImgSrc = "";
try {
  const raw = fs.readFileSync(CART_SVG_PATH, "utf8");
  // Remove white background rect so the card background shows through
  const cleaned = raw.replace(/<rect[^>]*fill:#FFFFFF[^>]*\/>/g, "");
  cartImgSrc = `data:image/svg+xml;base64,${Buffer.from(cleaned).toString("base64")}`;
} catch (e) {
  console.warn("Cart SVG not found:", e.message);
}

/* ─── RCS fashion SVG (provided by user) ────────────────────── */
const RCS_SVG_PATH = "/Users/cristinapesente/Downloads/36242417_8401872.svg";
let rcsImgSrc = "";
try {
  const raw = fs.readFileSync(RCS_SVG_PATH, "utf8");
  rcsImgSrc = `data:image/svg+xml;base64,${Buffer.from(raw).toString("base64")}`;
} catch (e) {
  console.warn("RCS SVG not found:", e.message);
}

/* ─── dimensões ─────────────────────────────────────────────── */
const CW = 580, CH = 760;   // canvas
const PW = 320, PH = 620;   // phone shell
const PX = (CW - PW) / 2;  // phone left = 130
const PY = (CH - PH) / 2;  // phone top  =  70

/* ─── base CSS ──────────────────────────────────────────────── */
const BASE = `
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:${CW}px; height:${CH}px;
  background:transparent;
  display:flex; align-items:center; justify-content:center;
  font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif;
  overflow:hidden;
}
.scene { position:relative; width:${CW}px; height:${CH}px; }

/* blob rosa da marca atrás do phone */
.blob {
  position:absolute;
  width:420px; height:420px;
  border-radius:50%;
  background:radial-gradient(circle at 44% 46%, #f472b6 0%, #E64499 52%, #be185d 100%);
  top:${PY + PH/2}px; left:${PX + PW/2}px;
  transform:translate(-50%,-50%);
}

/* phone shell */
.phone {
  position:absolute;
  top:${PY}px; left:${PX}px;
  width:${PW}px; height:${PH}px;
  background:#0d0d0d;
  border-radius:44px;
  box-shadow:0 0 0 1.5px #2e2e2e, 0 28px 80px rgba(0,0,0,.55), inset 0 0 0 1px #3c3c3c;
  display:flex; flex-direction:column; align-items:center;
  padding:12px 7px;
  z-index:3;
}
.notch {
  position:absolute; top:0; left:50%; transform:translateX(-50%);
  width:88px; height:24px;
  background:#0d0d0d;
  border-radius:0 0 14px 14px;
  z-index:4;
}
.screen {
  width:100%; flex:1;
  border-radius:34px;
  overflow:hidden;
  display:flex; flex-direction:column;
}

/* labels */
.lbl {
  position:absolute; z-index:10;
  font-size:15px; font-weight:700; color:#111;
  line-height:1.3;
}
`;

/* ─── helper: arco SVG com seta ─────────────────────────────── */
function svg(paths) {
  return `<svg style="position:absolute;top:0;left:0;z-index:5;overflow:visible;pointer-events:none"
    width="${CW}" height="${CH}">
    <defs>
      <marker id="ah" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#E64499"/>
      </marker>
    </defs>
    ${paths}
  </svg>`;
}
function arc(x1, y1, x2, y2, cx, cy) {
  return `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}"
    stroke="#E64499" stroke-width="3" fill="none" stroke-linecap="round"
    marker-end="url(#ah)"/>`;
}

/* ══════════════════════════════════════════════════════════════
   WHATSAPP — dark, E-commerce 3D illustration + CARRINHO15
══════════════════════════════════════════════════════════════ */
const WPP = {
  key: "whatsapp",
  bg: "#0b141a",
  labels: ``,
  arrows: svg(``),
  screen: `
    <div style="height:32px;background:#0b141a;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:11px;font-weight:600;color:#fff">
      <span>9:45</span>
      <div style="display:flex;align-items:center;gap:5px">
        <svg width="14" height="10" viewBox="0 0 18 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="#fff"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
        <svg width="13" height="10" viewBox="0 0 16 12"><path d="M8 2 Q1 6 1 9 Q1 11 3 11 Q5 11 6 9 Q8 7 8 7 Q8 7 10 9 Q11 11 13 11 Q15 11 15 9 Q15 6 8 2Z" fill="#fff"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 12"><rect x="0" y="1" width="18" height="10" rx="2" fill="none" stroke="#fff" stroke-width="1.2"/><rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="#fff"/><path d="M19 4 Q22 5.5 22 6 Q22 6.5 19 8Z" fill="#fff"/></svg>
      </div>
    </div>
    <div style="background:#1f2c34;padding:7px 10px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #2a3942">
      <span style="font-size:22px;color:#e9edef;font-weight:200;line-height:1">&#8592;</span>
      <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#ffeaa7,#fdcb6e);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0">
        <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect x="7" y="13" width="18" height="18" fill="#fff" rx="2"/>
          <path d="M4 13 Q16 8 28 13 L26 18 Q16 13 6 18 Z" fill="#e03030"/>
          <path d="M6 18 L4 13 L7.5 13 L9.5 18 Z" fill="#fff" opacity="0.55"/>
          <path d="M13 18 L11 13 L14 13 L16 18 Z" fill="#fff" opacity="0.55"/>
          <path d="M20 18 L18 13 L21 13 L23 18 Z" fill="#fff" opacity="0.55"/>
          <path d="M27 18 L25 13 L28 13 L28 15 Z" fill="#fff" opacity="0.55"/>
          <rect x="10" y="18" width="5" height="5" fill="#7abef8" rx="1"/>
          <rect x="18" y="18" width="5" height="5" fill="#7abef8" rx="1"/>
          <rect x="13" y="23" width="6" height="8" fill="#c8855e" rx="1"/>
        </svg>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13.5px;font-weight:600;color:#e9edef">E-commerce</div>
        <div style="font-size:10px;color:#25d366;font-weight:500">online</div>
      </div>
      <!-- video call icon -->
      <svg width="22" height="16" viewBox="0 0 24 18" fill="none" stroke="#e9edef" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="14" height="12" rx="2"/><path d="M16 7l5-3v10l-5-3V7z"/></svg>
      <!-- phone icon -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e9edef" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
      <span style="color:#8ca0ac;font-size:22px;line-height:1;margin-left:2px">&#8942;</span>
    </div>
    <div style="flex:1;background:#0b141a;padding:10px;overflow:hidden">
      <div style="background:#fff;border-radius:4px 14px 14px 14px;overflow:hidden;width:240px;box-shadow:0 1px 6px rgba(0,0,0,0.4)">
        <div style="height:115px;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;">
          <img src="${cartImgSrc}" style="width:240px;height:115px;object-fit:contain;object-position:center;" />
        </div>
        <div style="padding:11px 14px 5px;font-size:13px;color:#111;line-height:1.55">
          Ol&#225;, Jo&#227;o! Finalize sua compra com <strong>15% de desconto</strong> com o cupom <strong>CARRINHO15</strong>.
        </div>
        <div style="padding:0 14px 9px;display:flex;align-items:center;justify-content:flex-end;gap:4px">
          <span style="font-size:10.5px;color:#999">10:35</span>
          <!-- blue double ticks -->
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <path d="M1 5.5 L3.5 8.5 L8 2" stroke="#53bdeb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 5.5 L8.5 8.5 L16.5 1" stroke="#53bdeb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    <!-- compose bar -->
    <div style="height:54px;background:#1f2c34;display:flex;align-items:center;gap:8px;padding:0 10px;border-top:.5px solid #2a3942;flex-shrink:0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696a0" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
      <div style="flex:1;background:#2a3942;border-radius:22px;padding:9px 14px;font-size:12.5px;color:#8696a0">Mensagem</div>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8696a0" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <div style="width:40px;height:40px;border-radius:50%;background:#00a884;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════
   RCS — dark E-commerce, fashion card + "Comprar Agora"
══════════════════════════════════════════════════════════════ */
const RCS = {
  key: "rcs",
  bg: "#1c1c1e",
  labels: ``,
  arrows: svg(``),
  screen: `
    <div style="height:32px;background:#000;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:11px;font-weight:600;color:#fff">
      <span>9:45</span>
      <div style="display:flex;align-items:center;gap:5px">
        <svg width="14" height="10" viewBox="0 0 18 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="#fff"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
        <svg width="13" height="10" viewBox="0 0 16 12"><path d="M8 2 Q1 6 1 9 Q1 11 3 11 Q5 11 6 9 Q8 7 8 7 Q8 7 10 9 Q11 11 13 11 Q15 11 15 9 Q15 6 8 2Z" fill="#fff"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 12"><rect x="0" y="1" width="18" height="10" rx="2" fill="none" stroke="#fff" stroke-width="1.2"/><rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="#fff"/><path d="M19 4 Q22 5.5 22 6 Q22 6.5 19 8Z" fill="#fff"/></svg>
      </div>
    </div>
    <div style="background:#1c1c1e;padding:8px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #2c2c2e">
      <span style="font-size:22px;color:#fff;font-weight:200;line-height:1">&#8592;</span>
      <div style="width:38px;height:38px;border-radius:50%;background:#3a3a3c;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      </div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600;color:#fff">E-commerce</div>
      </div>
      <svg width="16" height="18" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span style="color:#aeaeb2;font-size:22px;margin-left:4px">&#8942;</span>
    </div>
    <div style="flex:1;background:#1c1c1e;padding:12px 12px">
      <div style="background:#2c2c2e;border-radius:14px;overflow:hidden;width:254px;box-shadow:0 4px 16px rgba(0,0,0,0.5)">
        <div style="height:128px;overflow:hidden;">
          <img src="${rcsImgSrc}" style="width:254px;height:128px;object-fit:cover;object-position:center;" />
        </div>
        <div style="padding:13px 15px 10px;font-size:13px;color:#fff;line-height:1.65">
          Confira nossas ofertas exclusivas de primavera! &#127800; Aproveite descontos especiais e compre direto pelo bot&#227;o abaixo.
        </div>
        <div style="height:.5px;background:#3a3a3c;margin:0 15px"></div>
        <div style="padding:13px;text-align:center;color:#0a84ff;font-size:14px;font-weight:500">Comprar Agora</div>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════
   SMS — dark Android, short-code 123456, sports betting message
══════════════════════════════════════════════════════════════ */
const SMS = {
  key: "sms",
  bg: "#000000",
  labels: ``,
  arrows: svg(``),
  screen: `
    <div style="height:32px;background:#000;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:11px;font-weight:600;color:#fff">
      <span>9:45</span>
      <div style="display:flex;align-items:center;gap:5px">
        <svg width="14" height="10" viewBox="0 0 18 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="#fff"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
        <svg width="13" height="10" viewBox="0 0 16 12"><path d="M8 2 Q1 6 1 9 Q1 11 3 11 Q5 11 6 9 Q8 7 8 7 Q8 7 10 9 Q11 11 13 11 Q15 11 15 9 Q15 6 8 2Z" fill="#fff"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 12"><rect x="0" y="1" width="18" height="10" rx="2" fill="none" stroke="#fff" stroke-width="1.2"/><rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="#fff"/><path d="M19 4 Q22 5.5 22 6 Q22 6.5 19 8Z" fill="#fff"/></svg>
      </div>
    </div>
    <div style="background:#1c1c1e;padding:8px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #2c2c2e">
      <span style="font-size:22px;color:#fff;font-weight:200;line-height:1">&#8592;</span>
      <div style="width:38px;height:38px;border-radius:50%;background:#3a3a3c;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#aeaeb2"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
      </div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600;color:#fff">123456</div>
      </div>
      <span style="color:#aeaeb2;font-size:22px;line-height:1">&#8942;</span>
    </div>
    <div style="flex:1;background:#000;padding:14px 12px">
      <div style="background:#1c1c1e;border-radius:18px 18px 18px 4px;padding:14px 16px;max-width:260px;box-shadow:0 2px 8px rgba(0,0,0,0.5)">
        <div style="font-size:13.5px;color:#fff;line-height:1.65">
          [SUA MARCA] Aposte no seu time do cora&#231;&#227;o agora: <span style="color:#0a84ff">www.seulink.com</span>
        </div>
      </div>
    </div>
  `,
};

/* ══════════════════════════════════════════════════════════════
   VOZ — light iPhone, SMS + VOZ combinado (OFF15 + waveform)
══════════════════════════════════════════════════════════════ */
const VOZ = {
  key: "voz",
  bg: "#f2f2f7",
  labels: ``,
  arrows: svg(``),
  screen: `
    <div style="height:32px;background:#f2f2f7;display:flex;align-items:center;justify-content:space-between;padding:0 18px;font-size:11.5px;font-weight:600;color:#000">
      <span>23:59</span>
      <div style="display:flex;align-items:center;gap:4px">
        <svg width="14" height="10" viewBox="0 0 18 12"><rect x="0" y="3" width="3" height="9" rx="1" fill="#000"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#000"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#000"/></svg>
        <svg width="13" height="10" viewBox="0 0 16 12"><path d="M8 2 Q1 6 1 9 Q1 11 3 11 Q5 11 6 9 Q8 7 8 7 Q8 7 10 9 Q11 11 13 11 Q15 11 15 9 Q15 6 8 2Z" fill="#000"/></svg>
        <span style="font-size:9px;font-weight:700">100</span>
        <svg width="22" height="11" viewBox="0 0 22 12"><rect x="0" y="1" width="18" height="10" rx="2" fill="none" stroke="#000" stroke-width="1.2"/><rect x="1.5" y="2.5" width="17" height="7" rx="1" fill="#000"/></svg>
      </div>
    </div>
    <div style="background:#f2f2f7;padding:14px 16px 8px;display:flex;flex-direction:column;align-items:center;gap:5px">
      <div style="width:48px;height:48px;border-radius:50%;background:#c7c7cc;display:flex;align-items:center;justify-content:center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
      </div>
      <div style="font-size:12px;font-weight:600;color:#333;letter-spacing:0.4px">SMS + VOZ</div>
    </div>
    <div style="height:.5px;background:#c6c6c8;margin:4px 0"></div>
    <div style="padding:10px 18px 8px">
      <div style="font-size:13.5px;color:#000;line-height:1.65">
        [SUA MARCA] Ol&#225;, Jo&#227;o! Use o cupom <strong>OFF15</strong> e aproveite seus produtos favoritos com <strong>15% OFF</strong>:<br>
        <span style="color:#007AFF">www.seulink.com</span>
      </div>
    </div>
    <div style="text-align:center;font-size:26px;color:#aaa;line-height:1;padding:4px 0">+</div>
    <div style="margin:0 16px;background:#fff;border-radius:16px;padding:14px 18px;display:flex;align-items:center;gap:14px;box-shadow:0 2px 12px rgba(0,0,0,0.1);border:.5px solid #e5e5ea">
      <div style="width:44px;height:44px;border-radius:50%;background:#E64499;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 8px rgba(230,68,153,0.35)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:8px">Voz</div>
        <svg viewBox="0 0 158 28" width="158" height="28" style="display:block">
          ${(()=>{const h=[4,7,12,18,24,28,24,18,14,8,13,20,28,26,19,13,8,12,22,14];return h.map((v,i)=>`<rect x="${i*8.4}" y="${14-v/2}" width="5.5" height="${v}" rx="2.5" fill="#1c1c1e" opacity="${(0.5+(i%5)*0.1).toFixed(2)}"/>`).join('');})()}
        </svg>
      </div>
    </div>
  `,
};

/* ─── runner ─────────────────────────────────────────────────── */
async function generate() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: CW, height: CH, deviceScaleFactor: 2 });

  for (const ch of [WPP, RCS, SMS, VOZ]) {
    const sceneHtml = ch.customHtml
      ? ch.customHtml
      : `<div class="scene">
  <div class="blob"></div>
  <div class="phone">
    <div class="notch"></div>
    <div class="screen" style="background:${ch.bg}">${ch.screen}</div>
  </div>
</div>`;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>${BASE}</style></head>
<body>${sceneHtml}</body></html>`;

    await page.setContent(html, { waitUntil: "load" });
    const out = path.join(OUT, `${ch.key}.png`);
    await page.screenshot({ path: out, type: "png", omitBackground: true });
    console.log(`✓ ${ch.key}.png`);
  }

  await browser.close();
  console.log("Done!");
}

generate().catch(console.error);
