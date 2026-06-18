import { useRef, useState, useEffect } from "react";
import { Trans } from "react-i18next";
import { Heading } from "@/components/ui/Typography";

export const EcosystemDiagram = ({ accent = "#00de71" }: { accent?: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);
  const [cropOffset, setCropOffset] = useState(108);

  useEffect(() => {
    const updateCrop = () => {
      setCropOffset(window.innerWidth < 768 ? 40 : 108);
    };
    updateCrop();
    window.addEventListener("resize", updateCrop);
    return () => window.removeEventListener("resize", updateCrop);
  }, []);

  const handleLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
      if (h > 100) setIframeHeight(h + 4);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl text-left mb-1">
          <Heading className="text-balance">
            <Trans
              i18nKey="ecosystem.title.full"
              ns="home"
              components={{
                accent: <span style={{ color: accent }} />,
                br: <br />,
              }}
            />
          </Heading>
        </div>

        <div
          className="w-full overflow-x-auto overflow-y-hidden"
          style={{ height: `${iframeHeight - cropOffset}px` }}
        >
          <iframe
            ref={iframeRef}
            src="/ecosystem-diagram.html"
            title="Ecossistema Solvefy"
            onLoad={handleLoad}
            scrolling="no"
            loading="lazy"
            className="border-0"
            style={{
              height: `${iframeHeight}px`,
              width: "100%",
              minWidth: "680px",
              marginTop: `-${cropOffset}px`,
              background: "transparent",
              overflow: "hidden",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
};
