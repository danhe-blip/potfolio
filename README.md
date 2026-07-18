# 桌面拟物作品集

一个跑在浏览器里的"桌面拟物"作品集网站:开机 ASCII 动画 → 双主题桌面 → agent 终端 + 访达 + 浏览器 + 聊天。

## 跑起来
```
npm install
npm run dev
```

## 怎么改成"你的"
所有内容都集中在 `src/config.js` 一个文件里,不用碰逻辑代码:
- `PROFILE` —— 你的名字、tagline
- `ASCII_LOGO` —— 开机图形(整段替换即可,可用图转 ASCII 工具)
- `AGENT_QA` —— agent 终端的预设问答(最该写出"你的味道"的地方)
- `LINKS` —— 浏览器里的真实链接
- `PROJECTS` —— 访达里的项目
- `THEMES` —— 两套皮(Minimal / Aqua),想加 Windows XP / System 7 就再加一组

## 文件结构
- `config.js` —— 所有内容与主题(改这里)
- `App.jsx` —— 开机 → 桌面 切换
- `BootScreen.jsx` —— ASCII 开机动画
- `Desktop.jsx` —— 菜单栏 / 主题切换 / Dock / 窗口管理
- `Window.jsx` —— 可拖动窗口
- `AgentTerminal.jsx` —— Claude Code 风预设问答终端

## 下一步可以加
- agent 终端接真 LLM(把 AGENT_QA 换成 API 调用)
- 窗口缩放 / 最小化
- 移动端适配
- Dock 图标换成真图标(现在用 emoji 占位)
- 项目文件夹双击打开详情窗
