import { defineConfig } from 'rolldown'

export default defineConfig({
  input: "src/index.js",
  platform: "node",
  output: {
    esModule: true,
    file: "bin/index.js",
    format: "es",
    sourcemap: false,
  },
});