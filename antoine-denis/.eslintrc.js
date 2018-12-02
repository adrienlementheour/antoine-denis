module.exports = {
  root: true,
  env: {
      browser: true,
      node: true
  },
  parserOptions: {
      parser: 'babel-eslint'
  },
  extends: [
      "eslint:recommended",
      "plugin:vue/recommended",
      "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
      'vue'
  ],
  // add your custom rules here
  rules: {
      "trailingComma": "es5",
      "singleQuote": true,
      "tabWidth": 4,
      "bracketSpacing": true,
      "vue/max-attributes-per-line": "off",
      "no-console": 0
  }
}