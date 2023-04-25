module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply'],
      },
    ],
  },
};
