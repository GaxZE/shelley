let OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = {
  // Global ESLint Settings
  // =================================
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: { React: "writable", JSX: true },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
      "babel-module": {
        allowExistingDirectories: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  // ===========================================
  // Set up ESLint for .js / .jsx files
  // ===========================================
  // .js / .jsx uses babel-eslint
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    allowImportExportEverywhere: true,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "import", "prettier", "jsx-a11y", "jest", "stylable"],
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
  ],
  rules: {
    "prettier/prettier": ERROR,
    "no-var": ERROR,
    "no-undef": WARN,
    "no-use-before-define": OFF,
    "prefer-const": WARN,
    "no-empty": WARN,
    "arrow-body-style": [WARN, "as-needed"],
    "react/jsx-filename-extension": [
      ERROR,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/display-name": OFF,
    "react/prop-types": OFF,
    "react/react-in-jsx-scope": OFF,
    // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    "react/jsx-uses-react": OFF,
    "react/no-render-return-value": WARN,
    // JEST Rules
    "jest/no-disabled-tests": WARN,
    "jest/no-focused-tests": ERROR,
    "jest/no-identical-title": ERROR,
    "jest/prefer-to-have-length": WARN,
    // We seem to be using this quite a lot
    "jest/no-conditional-expect": WARN,
    "jest/valid-expect": ERROR,
    "jest/prefer-expect-assertions": [
      WARN,
      { onlyFunctionsWithAsyncKeyword: true },
    ],
    // A11Y RULES
    // This rule is not compatible with Next.js"s <Link /> components
    "jsx-a11y/anchor-is-valid": OFF,
    // Last time we tried to change it to onBlur it caused problems with toggle
    "jsx-a11y/no-onchange": WARN,
    "jsx-a11y/label-has-associated-control": WARN,
  },
  ignorePatterns: [
    "**/node_modules/",
    "**/dist/",
    "**/st-types/",
    "storybook-static/",
    "cypress/",
    "**/_codux/",
  ],
  // Typescript files
  overrides: [
    {
      // Match TypeScript Files
      // =================================
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint"],
      extends: [
        // "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        // "prettier",
        "plugin:jest/recommended",
        // Adds Stylable lint rules (doesn't really do much).
        "plugin:stylable/recommended",
      ],

      // Parser Settings
      // =================================
      // allow ESLint to understand TypeScript syntax
      // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js#L10
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
        tsconfigRootDir: __dirname,
      },
      rules: {
        "prettier/prettier": ERROR,
        "no-var": ERROR,
        "no-undef": ERROR,
        "no-use-before-define": OFF,
        "prefer-const": WARN,
        "no-empty": WARN,

        // React
        "react/jsx-filename-extension": [
          ERROR,
          { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        ],
        "react/display-name": OFF,
        "react/prop-types": OFF,
        "react/react-in-jsx-scope": OFF,
        "react/no-render-return-value": WARN,
        // https://ru.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
        "react/jsx-uses-react": OFF,

        // TS rules
        "@typescript-eslint/interface-name-prefix": OFF,
        "@typescript-eslint/no-explicit-any": OFF,
        "@typescript-eslint/ban-ts-ignore": OFF,
        "@typescript-eslint/no-empty-function": OFF,
        "@typescript-eslint/no-unused-vars": [WARN],
        // I suggest this setting for requiring return types on functions only where useful
        "@typescript-eslint/explicit-function-return-type": [
          WARN,
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        // TODO: FIX THIS ONES IN CODE FIRST.
        "@typescript-eslint/no-unsafe-member-access": WARN,
        "@typescript-eslint/no-unsafe-return": WARN,
        "@typescript-eslint/no-unsafe-assignment": WARN,
        "@typescript-eslint/no-unsafe-call": WARN,
        "@typescript-eslint/restrict-template-expressions": WARN,
        "@typescript-eslint/no-var-requires": WARN,
        // in index.tsx file
        "@typescript-eslint/no-floating-promises": WARN,
        "@typescript-eslint/ban-ts-comment": WARN,
        // Conversation about this in https://github.com/britishcouncil/aws-zoo/issues/358
        "@typescript-eslint/no-empty-interface": OFF,

        // JEST Rules
        "jest/no-disabled-tests": WARN,
        "jest/no-focused-tests": ERROR,
        "jest/no-identical-title": ERROR,
        "jest/prefer-to-have-length": WARN,
        // We seem to be using this quite a lot
        "jest/no-conditional-expect": WARN,
        "jest/valid-expect": ERROR,
        "jest/prefer-expect-assertions": [
          WARN,
          { onlyFunctionsWithAsyncKeyword: true },
        ],

        // A11Y RULES
        // This rule is not compatible with Next.js"s <Link /> components
        "jsx-a11y/anchor-is-valid": OFF,
        // Last time we tried to change it to onBlur it caused problems with toggle
        "jsx-a11y/no-onchange": WARN,
        "jsx-a11y/label-has-associated-control": WARN,
      },
    },
  ],
};
