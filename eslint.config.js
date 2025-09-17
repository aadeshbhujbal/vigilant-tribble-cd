const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname // Remove comma here (line 17)
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
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        Express: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier // Remove comma here (line 28)
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // TypeScript specific rules - More relaxed
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off', // Turn off base rule as it can conflict with @typescript-eslint/no-unused-vars
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

      // Code complexity and size limits
      'max-lines': ['warn', { max: 250, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 25, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', { max: 5 }],

      // Security rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-alert': 'warn',
      'no-console': 'off', // Allow console in development
      'no-debugger': 'warn',

      // Code quality rules
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'prefer-destructuring': ['warn', { object: true, array: false }],
      'object-shorthand': 'warn',
      'no-duplicate-imports': 'error',
      'no-useless-return': 'warn',
      'no-useless-concat': 'warn',
      'no-useless-call': 'warn',
      'no-param-reassign': 'warn',
      'no-return-assign': 'error',
      'no-sequences': 'warn',
      'no-throw-literal': 'warn',
      'no-unmodified-loop-condition': 'warn',
      'no-unused-expressions': 'warn',
      'no-useless-escape': 'warn',
      'no-void': 'warn',
      'no-with': 'error',
      'radix': 'warn',
      'yoda': 'warn',

      // Naming conventions
      'camelcase': ['warn', { properties: 'never', ignoreDestructuring: true }],
      'new-cap': 'warn',
      'no-new-object': 'warn',
      'no-array-constructor': 'warn',

      // TypeScript specific security and quality rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/method-signature-style': ['warn', 'property'],
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unsafe-declaration-merging': 'warn',
      '@typescript-eslint/prefer-enum-initializers': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': 'warn',
      '@typescript-eslint/prefer-namespace-keyword': 'warn',
      '@typescript-eslint/triple-slash-reference': 'warn',
      '@typescript-eslint/unified-signatures': 'warn'
    }
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
      '.nyc_output/'
    ]
  },
  prettierConfig
];
