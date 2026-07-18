import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Projeto pessoal de portfólio publicado em GitHub Pages sob
  // https://mtorteli.github.io/solvefy-prototype/ — precisa do base path
  // do repo em produção; em dev continua servindo da raiz.
  base: mode === "production" ? "/solvefy-prototype/" : "/",
  server: {
    host: "127.0.0.1",
    port: 3000,
    open: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
    }),
    // rollup-plugin-visualizer fica como devDep instalada; ativar manualmente
    // via `import { visualizer } from "rollup-plugin-visualizer"` quando for
    // auditar bundle. Não plugamos no build padrão para não brigar com o
    // pipeline do react-snap.
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // es2017 garante compatibilidade com o Chromium antigo que o react-snap
    // (Puppeteer 1.x) usa no postbuild de pré-renderização. Sem isso o bundle
    // contém optional chaining (?.) que o Chrome 73 não parseia → SyntaxError.
    target: "es2017",
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'tailwind-merge', 'clsx'],
          // @supabase/supabase-js intencionalmente fora do manualChunks: src/components/Blog.tsx
          // faz dynamic import, então o cliente vira um chunk próprio que só baixa quando
          // a seção de blog da home renderiza. Mantemos só react-query aqui.
          'vendor-utils': ['@tanstack/react-query'],
        }
      }
    }
  }
}));
