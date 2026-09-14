/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      { message: 'CSS Module class names are camelCase, so they read as identifiers in TSX' },
    ],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'custom-property-pattern': '^[a-z][a-zA-Z0-9-]+$',
    'custom-property-empty-line-before': null,
    'declaration-property-value-no-unknown': null,
    'no-descending-specificity': null,
    'media-feature-range-notation': 'prefix',
    'import-notation': 'string',
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer'] }],
    'property-no-vendor-prefix': [true, { ignoreProperties: ['text-size-adjust'] }],
  },
}
