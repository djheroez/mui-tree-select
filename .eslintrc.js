module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["react", "prettier", "react-hooks", "import", "babel"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "react/forbid-prop-types": [
      "error",
      {
        forbid: ["any"],
        checkContextTypes: false,
        checkChildContextTypes: false
      }
    ],
    "react/display-name": ["error", { ignoreTranspilerName: true }],
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "max-len": ["error", { code: 120 }],
    "no-underscore-dangle": "off",
    "no-unexpected-multiline": "off",
    "import/first": 2,
    "import/exports-last": 2,
    "import/newline-after-import": 2,
    "import/no-duplicates": 2,
    "import/no-namespace": 2,
    "import/no-named-default": 2,
    "import/no-extraneous-dependencies": "off",
    "react/no-multi-comp": "warn",
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/sort-prop-types": "error",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-spacing": "off",
    "prettier/prettier": "error",
    "react/jsx-sort-default-props": [
      "error",
      {
        ignoreCase: true
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", "jsx"]
      }
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always"
      }
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"]
      },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" }
    ]
  }
};
