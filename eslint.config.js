import js from '@eslint/js'
import boundaries from 'eslint-plugin-boundaries'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

const LAYERS = ['shared', 'entities', 'widgets', 'pages', 'app']

export default tseslint.config(
  { ignores: ['dist', '.ssr', 'coverage', 'playwright-report', 'test-results', 'node_modules'] },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: {
      'boundaries/elements': LAYERS.map((layer) => ({
        type: layer,
        pattern: `src/${layer}/*`,
        mode: 'folder',
        capture: ['slice'],
      })),
      'boundaries/include': ['src/**/*'],
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      boundaries,
      perfectionist,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.strict.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            ['internal-type', 'internal'],
            ['parent-type', 'parent', 'sibling-type', 'sibling', 'index-type', 'index'],
            'style',
          ],
          internalPattern: ['^@/.+'],
          newlinesBetween: 'always',
          order: 'asc',
          type: 'natural',
        },
      ],

      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: LAYERS.map((layer, index) => ({
            from: layer,
            allow: LAYERS.slice(0, index),
          })),
        },
      ],
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [{ target: LAYERS, allow: 'index.ts' }],
        },
      ],
    },
  },

  {
    files: ['src/*/*/**/*.{ts,tsx}'],
    rules: { 'boundaries/entry-point': 'off' },
  },

  {
    files: ['**/*.{js,mjs}'],
    languageOptions: { globals: { ...globals.node } },
    extends: [tseslint.configs.disableTypeChecked],
    rules: { 'boundaries/element-types': 'off', 'boundaries/entry-point': 'off' },
  },

  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  {
    files: ['**/*.test.{ts,tsx}', 'e2e/**/*.ts', '*.config.{ts,js}', 'scripts/**/*', 'build/**/*'],
    rules: {
      'boundaries/element-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },

  prettier,
)
