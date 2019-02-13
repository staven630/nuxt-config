module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: ['standard', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  plugins: ['vue'],
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
