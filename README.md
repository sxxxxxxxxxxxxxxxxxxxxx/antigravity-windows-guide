# Antigravity Windows Guide

面向 Windows 用户的 Antigravity 网络配置与登录排障指南。这是一个独立静态网页项目，可直接部署到 Vercel 或其他静态网站托管平台。

## 项目概述

本指南提供了完整的 Antigravity Windows 配置教程，包括：
- Tun 模式配置
- 局部代理设置
- 桥接方案
- 账号注入与验证流程
- 常见问题排查

项目采用单页面设计，所有样式和渲染逻辑都内嵌在 HTML 文件中，无需额外的构建步骤。

## 文件结构

```
antigravity-windows-guide/
├── index.html          # 主页面文件，包含完整的 HTML、CSS 和 JavaScript
├── article.md          # 文章正文内容（Markdown 格式）
├── README.md           # 项目说明文件
├── .gitignore          # Git 忽略配置
└── assets/
    └── antigravity/    # 教程图片资源目录
        ├── cover.png   # 封面图片
        └── ...         # 其他教程截图
```

### 文件说明

- **index.html**: 完整的网页文件，集成了：
  - 响应式布局设计
  - 现代化 UI 样式
  - 目录导航功能
  - 代码高亮显示
  - 图片懒加载
  
- **article.md**: 原始 Markdown 文档，便于内容维护和更新

- **assets/antigravity/**: 包含教程中使用的所有截图和示例图片

## 部署指南

### Vercel 部署（推荐）

1. 访问 [Vercel](https://vercel.com) 并登录账号
2. 点击 "Add New" → "Project"
3. 导入此 GitHub 仓库
4. 保持默认配置（Framework Preset: Other）
5. 点击 "Deploy" 按钮
6. 等待部署完成（通常 1-2 分钟）

### GitHub Pages 部署

1. 进入仓库的 Settings 页面
2. 在左侧菜单中选择 "Pages"
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 目录
5. 点击 "Save" 按钮
6. 等待 GitHub 自动构建完成

### 其他静态托管平台

本项目也可以部署到以下平台：
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- 阿里云 OSS
- 腾讯云 COS

## 本地预览

由于项目是纯静态 HTML 文件，你可以直接在浏览器中打开 `index.html` 文件进行预览。

或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需先安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 功能特性

- ✅ 完全响应式设计，支持移动端和桌面端
- ✅ 快速加载，无外部依赖
- ✅ 现代化 UI 设计，提升阅读体验
- ✅ 内置目录导航，方便快速定位内容
- ✅ 代码块语法高亮
- ✅ 支持深色/浅色主题切换
- ✅ 图片懒加载优化性能

## 技术栈

- 纯 HTML5 + CSS3 + JavaScript
- 无外部框架依赖
- 无构建工具要求
- 零配置部署

## 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari
- 其他现代浏览器

## 许可证

本项目内容仅供学习交流使用。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进本项目。

## 相关链接

- [MacOS 版本指南](https://github.com/LuN3cy/antigravity-macos-guide)
- [Antigravity 官方文档](https://example.com)

## 售后支持

如有任何问题或需要技术支持，请扫描下方二维码加入售后群：

![售后群二维码](assets/antigravity/qrcode.jpg)
