import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        OnResponse: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'error',
      'no-empty': 'warn',
      'no-undef': 'error'
    },
    plugins: {
      prettier
    }
  },
  {
    // files: ['src/**/*']
  }
]
