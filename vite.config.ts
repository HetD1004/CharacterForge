
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // This provides a fallback for the process.env that Excalidraw is looking for
    'process.env': {
      NODE_ENV: mode,
    },
    // For direct process access
    'process': {
      env: {
        NODE_ENV: mode
      }
    }
  }
}));
