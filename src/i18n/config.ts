import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./locales";

import ptCommon from "./locales/pt/common.json";
import ptHome from "./locales/pt/home.json";
import ptContato from "./locales/pt/contato.json";
import ptQuemSomos from "./locales/pt/quemSomos.json";
import ptCpaas from "./locales/pt/cpaas.json";
import ptCrm from "./locales/pt/crm.json";
import ptAds from "./locales/pt/ads.json";
import ptMarketing from "./locales/pt/marketing.json";
import ptAgents from "./locales/pt/agents.json";
import ptCloud from "./locales/pt/cloud.json";
import ptBlog from "./locales/pt/blog.json";
import ptNotFound from "./locales/pt/notFound.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enContato from "./locales/en/contato.json";
import enQuemSomos from "./locales/en/quemSomos.json";
import enCpaas from "./locales/en/cpaas.json";
import enCrm from "./locales/en/crm.json";
import enAds from "./locales/en/ads.json";
import enMarketing from "./locales/en/marketing.json";
import enAgents from "./locales/en/agents.json";
import enCloud from "./locales/en/cloud.json";
import enBlog from "./locales/en/blog.json";
import enNotFound from "./locales/en/notFound.json";
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esContato from "./locales/es/contato.json";
import esQuemSomos from "./locales/es/quemSomos.json";
import esCpaas from "./locales/es/cpaas.json";
import esCrm from "./locales/es/crm.json";
import esAds from "./locales/es/ads.json";
import esMarketing from "./locales/es/marketing.json";
import esAgents from "./locales/es/agents.json";
import esCloud from "./locales/es/cloud.json";
import esBlog from "./locales/es/blog.json";
import esNotFound from "./locales/es/notFound.json";

const resources = {
  "pt-BR": {
    common: ptCommon,
    home: ptHome,
    contato: ptContato,
    quemSomos: ptQuemSomos,
    cpaas: ptCpaas,
    crm: ptCrm,
    ads: ptAds,
    marketing: ptMarketing,
    agents: ptAgents,
    cloud: ptCloud,
    blog: ptBlog,
    notFound: ptNotFound,
  },
  en: {
    common: enCommon,
    home: enHome,
    contato: enContato,
    quemSomos: enQuemSomos,
    cpaas: enCpaas,
    crm: enCrm,
    ads: enAds,
    marketing: enMarketing,
    agents: enAgents,
    cloud: enCloud,
    blog: enBlog,
    notFound: enNotFound,
  },
  es: {
    common: esCommon,
    home: esHome,
    contato: esContato,
    quemSomos: esQuemSomos,
    cpaas: esCpaas,
    crm: esCrm,
    ads: esAds,
    marketing: esMarketing,
    agents: esAgents,
    cloud: esCloud,
    blog: esBlog,
    notFound: esNotFound,
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
      "crm",
      "ads",
      "marketing",
      "agents",
      "cloud",
      "blog",
      "notFound",
    ],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
