import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // TypeScript specific rules - More relaxed
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off', // Allow implicit return types
      '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      // Code quality rules - More relaxed
      'no-console': 'off', // Allow console.log for development
      'no-debugger': 'warn', // Warn instead of error
      'no-alert': 'warn',
      'no-eval': 'error', // Keep this strict for security
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',
      'no-script-url': 'warn',
      'no-sequences': 'warn',
      'no-throw-literal': 'warn',
      'no-unmodified-loop-condition': 'warn',
      'no-unused-expressions': 'warn',
      'no-useless-call': 'warn',
      'no-useless-concat': 'warn',
      'no-useless-return': 'warn',
      'prefer-const': 'warn', // Warn instead of error
      'prefer-template': 'warn',
      'require-await': 'warn',

      // Best practices - More relaxed
      'eqeqeq': ['warn', 'always'], // Warn instead of error
      'curly': ['warn', 'all'], // Warn instead of error
      'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 1 }],
      'no-trailing-spaces': 'warn',
      'eol-last': 'warn',
      'comma-dangle': ['warn', 'always-multiline'],
      'semi': ['warn', 'always'], // Warn instead of error
      'quotes': ['warn', 'single', { avoidEscape: true }], // Warn instead of error
    },
  },
  {
    ignores: [
      'dist/',
      'build/',
      'node_modules/',
      '*.js',
      '*.d.ts',
      'logs/',
      '.env*',
      'coverage/',
      '.nyc_output/',
    ],
  },
  prettierConfig,
];
