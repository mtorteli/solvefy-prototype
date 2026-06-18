import { Trans, useTranslation } from "react-i18next";

export function SocialProofBanner() {
  const { t } = useTranslation("common");

  return (
    <div className="inline-flex items-center gap-3">
      <span className="text-sm font-medium text-foreground/75 whitespace-nowrap">
        <Trans
          i18nKey="socialProof.text"
          ns="common"
          components={{ strong: <strong className="text-foreground font-semibold" /> }}
        />
      </span>
    </div>
  );
}
