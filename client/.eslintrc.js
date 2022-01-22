module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'no-shadow': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/alt-text': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'func-names': 'off',
    'no-console': 'off',
  },
};
