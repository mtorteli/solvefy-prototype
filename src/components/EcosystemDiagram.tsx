import { useRef, useState } from "react";
import { Heading } from "@/components/ui/Typography";

export const EcosystemDiagram = ({ accent = "#00de71" }: { accent?: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  const handleLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      const h = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
      if (h > 100) setIframeHeight(h + 4);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl text-left mb-1">
          <Heading className="text-balance">
            Tecnologia que <span style={{ color: accent }}>simplifica</span>,
            <br />
            integração que gera{" "}
            <span style={{ color: accent }}>resultado</span>.
          </Heading>
        </div>

        <div
          className="w-full overflow-hidden"
          style={{ height: `${iframeHeight - 108}px` }}
        >
          <iframe
            ref={iframeRef}
            src="/ecosystem-diagram.html"
            title="Ecossistema Solvefy — fluxo animado"
            onLoad={handleLoad}
            scrolling="no"
            className="w-full border-0"
            style={{
              height: `${iframeHeight}px`,
              marginTop: "-108px",
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
