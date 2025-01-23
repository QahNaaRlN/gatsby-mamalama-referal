module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'react-hooks',
    'boundaries',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'boundaries/elements': [
      {
        type: 'app',
        pattern: 'app/*',
      },
      {
        type: 'processes',
        pattern: 'processes/*',
      },
      {
        type: 'pages',
        pattern: 'pages/*',
      },
      {
        type: 'widgets',
        pattern: 'widgets/*',
      },
      {
        type: 'features',
        pattern: 'features/*',
      },
      {
        type: 'entities',
        pattern: 'entities/*',
      },
      {
        type: 'shared',
        pattern: 'shared/*',
      },
    ],
  },
  rules: {
    // FSD-specific rules
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'app',
            allow: ['processes', 'pages', 'widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'processes',
            allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'pages',
            allow: ['widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'widgets',
            allow: ['features', 'entities', 'shared'],
          },
          {
            from: 'features',
            allow: ['entities', 'shared'],
          },
          {
            from: 'entities',
            allow: ['shared'],
          },
          {
            from: 'shared',
            allow: ['shared'],
          },
        ],
      },
    ],

    // React rules
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/named': 'error',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
  ignorePatterns: [
    'node_modules',
    'public',
    '.cache',
    '*.js',
    '*.jsx',
  ],
}