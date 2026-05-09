import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
      <div className="container mx-auto">
        <div className="max-w-[960px] mx-auto text-left mb-10">
          <Heading className="text-balance">
            Tecnologia que <span style={{ color: accent }}>simplifica</span>,
            <br />
            integração que gera{" "}
            <span style={{ color: accent }}>resultado</span>.
          </Heading>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <iframe
            ref={iframeRef}
            src="/ecosystem-diagram.html"
            title="Ecossistema Solvefy — fluxo animado"
            onLoad={handleLoad}
            scrolling="no"
            className="w-full border-0"
            style={{ height: `${iframeHeight}px`, background: "transparent", overflow: "hidden", display: "block" }}
          />
        </motion.div>
      </div>
    </section>
  );
};
