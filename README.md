# 🐟 DemoYu  (上班摸鱼读书神器)

> **伪装成生产力工具的沉浸式阅读器。**  
> 在 VS Code 写代码？在 Word 写文档？不，其实你在看小说/刷视频。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)

## 📖 简介 | Introduction

呆摸鱼（Demoyu） 是一个专为“上班摸鱼”设计的 Web 应用程序。它将小说阅读界面完美伪装成 **VS Code** 或 **Microsoft Word** 的界面。

当你的老板或同事经过时，你看起来正在全神贯注地编写代码或撰写年度报告，但实际上你正在阅读精彩的小说章节，或者在悬浮小窗中偷偷浏览网页。

在线体验：https://daisir8.github.io/moyu

## ✨ 核心功能 | Features

### 1. 变色龙伪装模式 (Camouflage Modes)
- **VS Code 模式**: 完美复刻 VS Code 界面，包括侧边栏、底部状态栏和代码高亮配色。
- **Word 模式**: 模仿 Office Word 界面，带有功能区和典型的文档排版。

### 2. 沉浸式“打字”阅读 (Stealth Typing)
- 在 **VS Code 模式**下，你不需要盯着屏幕看，也不需要频繁滚动鼠标。
- **核心玩法**: 你只需要像写代码一样随意敲击键盘（任意键），小说内容就会随着你的敲击逐字逐句显示出来。看起来你正在疯狂输出代码！

### 3. 多功能悬浮窗 (Floating Window)
- **双开模式**: 按下 `Enter` 键开启悬浮窗。
- **网页浏览**: 内置浏览器功能，支持 Google/Bing 搜索。
- **视频防拦截**: 自动转化 Bilibili 和 YouTube 链接为嵌入式播放器，绕过部分防盗链限制。
- **强力防风控 (Anti-Block)**: 遇到拒绝连接的网站（如微信读书、知乎）？点击悬浮窗右上角的 **“防拦截跳转”** 按钮，开启原生无地址栏小窗，突破一切限制。

### 4. 老板键 (Boss Key)
- 按下 `Space` (空格键)：瞬间隐藏所有内容。
- 再次按下：恢复显示。
- 隐藏时，屏幕会显示极其硬核的 **“虚假工作内容”**（复杂的 Redux 代码或企业年度战略报告），绝无破绽。

### 5. 格式支持
- 支持 `.txt` 文件（自动解析章节）。
- 支持 `.pdf` 文件（内置 PDF 解析）。
- 自动保存阅读进度到本地存储。

## ⌨️ 快捷键指南 | Hotkeys

| 按键 | 功能 | 说明 |
| --- | --- | --- |
| **Space (空格)** | **老板键** | 瞬间切换“真/假”工作模式。隐藏时显示伪造代码/文档。 |
| **Enter (回车)** | **悬浮窗开关** | 开启或关闭右下角的悬浮阅读/浏览器窗口。 |
| **任意键** | **翻页/打字** | 仅在非悬浮窗模式下。随意敲击键盘即可推进小说进度。 |

## 🚀 快速开始 | Getting Started

### 安装依赖

```bash
npm install
```

### 启动项目

```bash
npm start
```

打开浏览器访问 `http://localhost:3000` (或控制台提示的端口)。

## 🛠️ 技术栈 | Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Processing**: PDF.js

## 📝 悬浮窗浏览器技巧

由于浏览器的安全策略（X-Frame-Options），很多网站（如百度、B站首页）无法在普通 `iframe` 中加载。本项目提供了三种解决方案：

1.  **Google/Bing 搜索**: 点击悬浮窗顶部的快捷按钮，使用经过特殊参数处理的 Google 链接 (`igu=1`)，可在小窗内完美运行。
2.  **智能转义**: 输入 Bilibili 视频地址（如 `bilibili.com/video/BV...`），会自动转换为无广告的播放器模式。
3.  **防拦截模式 (终极方案)**: 如果网页显示“拒绝了请求”，请点击右上角的 **↗ (External Link)** 图标。这会弹出一个**没有地址栏、工具栏**的独立原生小窗，看起来就像应用的一部分，但拥有完整的浏览器权限。

## ⚠️ 免责声明 | Disclaimer

本项目仅供技术研究与学习使用。请合理安排工作时间，**摸鱼有风险，使用需谨慎**。开发者不对因使用本软件导致的任何职业发展问题（如被解雇）负责。

---

*Enjoy your reading time!* 🐟