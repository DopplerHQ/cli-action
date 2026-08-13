import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["bin/**"],
  jsdoc: true,
  objectWrap: "collapse",
  printWidth: 130,
  sortImports: { newlinesBetween: false, internalPattern: ["#"] },
});
