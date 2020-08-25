module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true,
    "node": true
  },
  "extends": [
    "airbnb-typescript",
    /*    "plugin:@typescript-eslint/eslint-recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "airbnb"*/
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": "./",
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "settings": {
    "react": {
      "version": "999.999.999" //"detect"
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "wrap-iife": ["error", "inside"],
    "no-console": "off",
    "linebreak-style": [
      "error",
      "windows"
    ],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "max-classes-per-file": ["error", 5],
    "react/jsx-one-expression-per-line": ["off", { "allow": "single-child" }],
    "no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: ""
      }
    ],
    "@typescript-eslint/no-unused-vars": "off",
  }
}
