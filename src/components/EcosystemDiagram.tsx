import { motion } from "framer-motion";
import { Heading } from "@/components/ui/Typography";
import rawHtml from "@/data/ecosystem-diagram.html?raw";

export const EcosystemDiagram = ({ accent = "#00de71" }: { accent?: string }) => {
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
            srcDoc={rawHtml}
            title="Ecossistema Solvefy — fluxo animado"
            className="w-full border-0 rounded-2xl"
            style={{ height: "720px" }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};
