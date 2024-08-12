/** @typedef {import('prettier').config} PrettierConfig */

/** @type { PrettierConfig } */

const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  backetSpacing: true,
  arrowParens: "always",
  endOfLine: "auto",
  bracketSameLine: false,
};

export default config;
