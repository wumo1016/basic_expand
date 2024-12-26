# 快捷键

- `ctrl + i`: 调起行内提问
- `Tab`: 接受建议
- `Esc`: 拒绝建议
- `alt + \`: 主动触发提示
- `alt + ]`: 下一条建议
- `alt + [`: 上一条建议
- `ctrl + →`: 一步步补全
- `ctrl + enter`: 十种代码实现

## q/a 对话

- 在任意代码文件中输入类似这种格式得代码: `// q: xx问题` 就可以进行提问
- 在下一行输入: `// a:`, copilot 就会给出简短的回答

## 快捷命令

- `@workspace` - 询问工作区
  - `/explain` - 说明活动编辑器中代码的工作原理
  - `/tests` - 为所选代码生成单元测试
  - `/fix` - 对所选代码中的问题提出修复建议
  - `/new` - 工作区中的新文件或项目的基架代码
  - `/newNotebook` - 创建新 Jupyter Notebook
  - `/fixTestFailure` - 针对失败的测试建议修补程序
  - `/setupTests` - 在项目中设置测试(实验性)
- `@vscode` - 询问有关 VS Code 的问题
  - `/search` - 为工作区搜索生成查询参数
  - `/startDebugging` - 生成启动配置并在 VS Code 中开始调试(实验性)
- `@terminal` - 询问如何在终端中执行某项操作
  - `/explain` - 解释终端中的内容
- `@github` - 获取基于 Web 搜索、代码搜索和企业知识库的答案
