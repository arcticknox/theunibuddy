module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'valid-jsdoc': 'off',
    'require-jsdoc': 'warn',
    'max-len': 'off',
    'new-cap': 'off',
    'object-curly-spacing': ['error', 'always'],
  },
};
