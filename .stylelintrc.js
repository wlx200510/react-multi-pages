module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: [
    'stylelint-scss'
    // 'stylelint-order', // 指定规则顺序
  ],
  rules: {
    'max-empty-lines': 1,
    'max-nesting-depth': null, // 选择器层级
    'selector-max-compound-selectors': null, // 复合选择器数量限制
    'font-family-no-missing-generic-family-keyword': null, // 设置通用字体
    'length-zero-no-unit': null, // '0'的单位
    'no-empty-source': null,
    "at-rule-no-unknown": null
  },
};
