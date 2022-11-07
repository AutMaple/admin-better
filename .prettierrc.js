module.exports = {
  // printWidth: 100, // 每行的单词数，不够智能，不建议使用
  tabWidth: 2, // tab 缩进的字符数
  useTabs: false, // 是否在按下 tab 键时，使用 tab 代替空格
  semi: true, // 是否在句末添加分号
  singleQuote: false, // 是否使用单引号代替双引号,
  quoteProps: "as-needed", // 是否使用双引号将对象的属性包起来
  trailingComma: "all", // 多行时尽可能打印尾随的逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  bracketSameLine: true, // 是否将 > 放在语句的最后，false 表示将 > 单独放在一行
  arrowParens: "always", //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  htmlWhitespaceSensitivity: "ignore", // 指定对标签内容中空格的敏感程度
  vueIndentScriptAndStyle: true, // 是否缩进 vue 文件中 <script> 标签和 <style> 标签中的内容
  embeddedLanguageFormatting: "auto", //对引用代码进行格式化
  singleAttributePerLine: false, // 是否让 HTML 标签中的每个属性单独的占一行
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "html",
      },
    },
    {
      files: "*.vue",
      options: {
        parser: "vue",
      },
    },
  ],
};
