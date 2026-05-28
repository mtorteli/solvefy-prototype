import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./locales";

import ptCommon from "./locales/pt/common.json";
import ptHome from "./locales/pt/home.json";
import ptContato from "./locales/pt/contato.json";
import ptQuemSomos from "./locales/pt/quemSomos.json";
import ptCpaas from "./locales/pt/cpaas.json";
import ptCpaasVoz from "./locales/pt/cpaasVoz.json";
import ptCpaasComingSoon from "./locales/pt/cpaasComingSoon.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enContato from "./locales/en/contato.json";
import enQuemSomos from "./locales/en/quemSomos.json";
import enCpaas from "./locales/en/cpaas.json";
import enCpaasVoz from "./locales/en/cpaasVoz.json";
import enCpaasComingSoon from "./locales/en/cpaasComingSoon.json";
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esContato from "./locales/es/contato.json";
import esQuemSomos from "./locales/es/quemSomos.json";
import esCpaas from "./locales/es/cpaas.json";
import esCpaasVoz from "./locales/es/cpaasVoz.json";
import esCpaasComingSoon from "./locales/es/cpaasComingSoon.json";

const resources = {
  "pt-BR": {
    common: ptCommon,
    home: ptHome,
    contato: ptContato,
    quemSomos: ptQuemSomos,
    cpaas: ptCpaas,
    cpaasVoz: ptCpaasVoz,
    cpaasComingSoon: ptCpaasComingSoon,
  },
  en: {
    common: enCommon,
    home: enHome,
    contato: enContato,
    quemSomos: enQuemSomos,
    cpaas: enCpaas,
    cpaasVoz: enCpaasVoz,
    cpaasComingSoon: enCpaasComingSoon,
  },
  es: {
    common: esCommon,
    home: esHome,
    contato: esContato,
    quemSomos: esQuemSomos,
    cpaas: esCpaas,
    cpaasVoz: esCpaasVoz,
    cpaasComingSoon: esCpaasComingSoon,
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    ns: [
      "common",
      "home",
      "contato",
      "quemSomos",
      "cpaas",
      "cpaasVoz",
      "cpaasComingSoon",
    ],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
