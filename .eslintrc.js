module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 保证hook规则（https://zh-hans.reactjs.org/docs/hooks-rules.html）
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-case-declarations': 'off',
  },
  globals: {
    React: true,
    JSX: true,
    Proxy: true,
  },
}
