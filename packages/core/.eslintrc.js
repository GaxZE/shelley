module.exports = {
  extends: ["@actionishope/eslint-config-shelley"],
  // Point to the project local tsconfig.json file.
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
