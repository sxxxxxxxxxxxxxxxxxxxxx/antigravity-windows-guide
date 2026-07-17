---
title: Antigravity IDE / 2.0 (Windows) 终极网络配置与登录排障指南
date: 2026-04-21
tags:
  - 工具
  - 教程
  - 网络配置
  - Antigravity
  - Antigravity IDE
  - Antigravity 2.0
image: /articles/antigravity/cover.png
---

## 🚑 先看这里：遇到问题先看图对号入座

目前大家遇到的绝大多数问题，都是下面这三种情况。**请直接看图，遇到一模一样的报错，点击下方对应链接直接跳转到解决办法：**

| 🛑 **账号地区/资格不符** | ⚠️ **网络超时/未接管** | 🛂 **人机/年龄验证** |
| :---: | :---: | :---: |
| [![账号没资格](/articles/antigravity/auth-ineligible-account.png)](#faq-auth-ineligible) | [![网络超时](/articles/antigravity/auth-oauth-network-timeout.jpeg)](#network-config) | [![人机验证](/articles/antigravity/fatmouse/verify-sign-in-again.jpg)](#human-verify) |
| **Sorry, this account is ineligible** | **oauth2.googleapis.com 连接失败** | **Further action is required** |
| [👉 点击查看解决方案](#faq-auth-ineligible) | [👉 点击查看解决方案](#network-config) | [👉 点击查看扫码验证流程](#human-verify) |

> 💡 **其他常见排雷提示：**
> * **如果您只想要原来 VS Code 那种界面**：请下载 **Antigravity IDE**，不要只点官网页面最上面的 **Antigravity 2.0**。
> * **如果发消息一直转圈、模型刷不出来**：优先判断为网络没有真正接管到 Antigravity，不要先反复注入账号。

---



## 一、 环境配置与准备工作

在正式使用 Antigravity IDE 或 Antigravity 2.0 前，请务必完成以下自检，这是保证软件正常运行的基石：

1. **基础网络通畅**：请确保您的设备已开启有效的代理工具，且能够顺畅访问 Google 等海外服务。（注：本指南不包含基础代理节点的搭建教学）。
2. **账号状态健康**：准备一个状态正常的 Gemini Pro/Ultra 账号。
   * *注：免费账号可作为测试使用，但存在较高的不可用率。如果您的账号已出现 `403 Forbidden` 报错或已被 Google 封禁，将无法登入。*

> ⚠️ **【风控与防封号指南】**
> 如果您的 Gemini Pro/Ultra 订阅是通过非官方常规渠道（大幅低于官方 $20/月 售价）获取的，请注意随时可能面临被取消订阅的风险。
> 此外，在日常使用中，**切忌频繁切换跨国节点 IP**。频繁的地理位置跳跃极易触发 Google 的安全风控机制，导致账号掉权。建议固定使用长期稳定的优质节点。

---

## 二、必看：先分清 Antigravity IDE 与 Antigravity 2.0

Google 更新后，Antigravity 已经不再只有一个客户端。请先确认您正在使用的是哪一个版本，否则后面的路径和界面对不上，会直接影响排障判断。

1. **Antigravity IDE**：这才是原教程里那个接近 VS Code 的版本，有侧边栏、扩展面板、SSH、语言服务等结构。旧版 Antigravity 更新后，如果仍保留 VS Code 风格界面，通常就按 Antigravity IDE 处理。
2. **Antigravity 2.0**：这是新的独立桌面应用，界面和旧版 IDE 已经不是一回事，主打项目与 Agent 编排，不再是 VS Code 那套界面。它的安装目录和后台进程路径也发生了变化。
3. **Antigravity CLI / SDK**：它们属于命令行和开发者工具链，不在本篇图形客户端教程范围内。

> **关键结论：** 本教程仍然覆盖 Antigravity IDE 和 Antigravity 2.0 的网络、登录与验证问题，但涉及“程序路径”“ProxyBridge 规则”“扩展/SSH”的步骤时，必须按自己实际使用的版本选择对应路径。

> **给老用户的重要提醒：** 如果您原来安装的是旧版 Antigravity，它更新后可能会变成 Antigravity 2.0；这是官方的新产品方向，不是安装包损坏。大多数想继续使用原来 VS Code 风格界面的用户，请安装或保留 **Antigravity IDE**。官方更新流程中可能会提示是否重新安装 IDE，建议需要旧界面的用户选择保留/安装 IDE。

> 如果您想要原来 VS Code 那种编辑器界面，请下载 **Antigravity IDE**，不要只点官网页面最上面的 **Antigravity 2.0**。2.0 是新的独立桌面应用，不再是传统 IDE。

官方下载入口：[https://antigravity.google/download](https://antigravity.google/download)。进入页面后不要只点最上面的 Antigravity 2.0，请向下找到 **Antigravity IDE** 区域，再选择 Windows 对应版本下载：

* 普通 Intel / AMD 电脑：选择 **Windows - Download for x64**。
* ARM 设备：选择 **Windows - Download for ARM64**。

如果您只是想跟着本教程原来的截图操作，或者需要扩展面板、SSH、ProxyBridge 旧路径，请优先安装 **Antigravity IDE**，不要误装成只面向新界面的 Antigravity 2.0。

常见 Windows 安装路径参考：

| 版本 | 常见安装根目录 | 语言服务进程路径 |
| --- | --- | --- |
| Antigravity IDE | `E:\Antigravity` 或您自定义的安装目录 | `resources\app\extensions\antigravity\bin\language_server_windows_x64.exe` |
| Antigravity 2.0 | `C:\Users\你的用户名\AppData\Local\Programs\antigravity` | `resources\bin\language_server.exe` |

**👀 最简单的辨别方法：看颜色和界面！**
如果不确定自己安装了哪个版本，请直接看软件默认界面：
* ⬜ **如果是白色的**：那是新出的 **Antigravity 2.0**（新式独立 Agent 项目界面）。
* ⬛ **如果是黑色的**：并且有 VS Code 风格编辑器和扩展面板，那就是 **Antigravity IDE**。

---

## 三、必做：核心网络配置（三选一） {#network-config}

**📌 为什么必须要单独配置网络？**
Antigravity IDE 和 Antigravity 2.0 的底层网络请求都可能不会完整遵循 Windows 的系统代理规则（常规代理软件无法稳定接管它们的流量）。如果不进行额外配置，软件会出现"无网络"、模型无法加载、消息一直转圈等问题。

请根据您的实际情况，在以下三种方案中选择一种。**强烈建议直接使用"首选方案"**，仅在遇到冲突时再尝试进阶方案。

### 🌟 首选方案：Tun 模式虚拟网卡（最稳定、最快捷）

**原理简介**：Tun 模式会在您的电脑上创建一张"虚拟网卡"，强制接管所有软件的底层网络流量，完美解决 Antigravity 不走代理的问题。

1. **开启 Tun 模式**（以主流的 小猫Verge 为例）：
   * 打开代理软件，找到并开启"**虚拟网卡模式（Tun模式）**"。
   * **关闭**常规的"系统代理"。
   * 路由规则请选择"**规则 (Rule)**"。
   * *补充说明：如果您使用的是其他版本（如 X Pro），请寻找对应的"增强模式"或"服务模式"并开启。*
2. **安装网卡依赖**：如果开启失败，通常是因为缺少虚拟网卡驱动。点击 Tun 模式旁边的"扳手/齿轮"图标，按照提示一键安装依赖。
   * *排错技巧：如果下载依赖卡住，请先用其他方式翻墙后再试。如果有多个代理软件在后台运行，请务必全部退出，只保留一个，避免网卡冲突。*
3. **连通性验证**：配置完成后，打开浏览器访问 Google 首页。如果能秒开，说明底层网络已接管成功，可以进入下一步登录。

---

### 🔧 进阶备选一：ProxyBridge 桥接（底层系统代理）

**适用场景**：适用于 Antigravity IDE 和 Antigravity 2.0，可按应用和后台进程设置代理规则。需注意该方案可能会被"火绒"等安全杀毒软件误拦截。

1. **前置网络设置**：需**关闭** Tun 模式，**开启**"系统代理"及"**规则**"模式。
2. **下载桥接软件**：前往 [ProxyBridge Releases](https://github.com/InterceptSuite/ProxyBridge/releases)，在 Assets 处下载 `.exe` 结尾的安装包并完成安装。

   ![ProxyBridge Assets 下载截图](/articles/antigravity/image7.png)

3. **软件汉化**：打开 ProxyBridge，点击上方菜单栏的 **Settings**，将 Language 修改为中文。

   ![ProxyBridge 语言设置](/articles/antigravity/image8.png)

4. **配置代理信息**：
   * 点击左上角"代理" -> "代理设置"。

   ![代理菜单（汉化后）](/articles/antigravity/image9.png)

   * IP 地址固定填写：`127.0.0.1`。
   * 端口号：填写您代理软件的实际端口。常见端口为 Clash `7890`、Clash Verge `7897`、v2rayN `10808`；也可参考下方进阶备选二的步骤 5 查看系统代理端口。

   ![填写 127.0.0.1 及对应端口](/articles/antigravity/image10.png)

   * *（如果后续连接失败，可在此处的 http 和 socks5 协议之间来回切换排查）。*

```copy-dashboard
本机代理地址 (Host): 127.0.0.1
常见代理端口 (Port): 7897
备用代理端口 (Port): 7890
```

5. 点击下方"测试代理连接"，日志出现 `SUCCESS` 提示后保存。

   ![测试连接提示 SUCCESS](/articles/antigravity/image11.png)

6. **添加路由规则**：
   * 回到主界面，点击"代理" -> "代理规则" -> 点击右上角"添加" -> "浏览"。

   ![代理规则页面](/articles/antigravity/image12.png)

   ![点击"添加"按钮](/articles/antigravity/image13.png)

   ![点击"浏览"选择程序](/articles/antigravity/image14.png)

   * 第一次添加：选择当前客户端根目录下的主程序。Antigravity IDE 通常是 `Antigravity.exe`；Antigravity 2.0 通常位于 `C:\Users\你的用户名\AppData\Local\Programs\antigravity`，进入该目录后选择主程序。

   ![选中 Antigravity.exe](/articles/antigravity/image15.png)

   * 第二次添加：再次点击"添加"和"浏览"，按您使用的版本选择语言服务进程：
     * **Antigravity IDE**：选择 `Antigravity\resources\app\extensions\antigravity\bin\language_server_windows_x64.exe`。例如安装在 `E:\Antigravity` 时，完整路径通常是 `E:\Antigravity\resources\app\extensions\antigravity\bin\language_server_windows_x64.exe`。
     * **Antigravity 2.0**：选择 `antigravity\resources\bin\language_server.exe`。默认安装时，完整路径通常是 `C:\Users\你的用户名\AppData\Local\Programs\antigravity\resources\bin\language_server.exe`。

   ![选中 language_server_windows_x64.exe](/articles/antigravity/image16.png)

   * 如果 ProxyBridge 支持添加多个规则，建议把主程序和对应的 `language_server` 都加入；如果仍然无法联网，再打开任务管理器观察 Antigravity 正在运行的子进程，把可疑的 `antigravity` / `language_server` 相关 `.exe` 一并加入规则。
   * **不要误选 `webm_encoder.exe`**：新版 Antigravity 2.0 的 `resources\bin` 里可能会出现 `webm_encoder.exe`，它更像是官方用于录制/视频编码的辅助组件，不是 ProxyBridge 的主要代理目标。ProxyBridge 仍然优先添加主程序和对应的 `language_server.exe`。
   * 滑动到页面底部点击**保存**，配置即刻生效。

   ![点击"保存规则"](/articles/antigravity/image17.png)

---

### 🔧 进阶备选二：Antigravity-Proxy 插件（局部代理）

**适用场景**：主要适用于 Antigravity IDE 或旧版 VS Code 风格 Antigravity。由于电脑环境复杂（如存在安全软件拦截、企业内网限制）导致 Tun 模式无法使用时，可采用此插件方案。

> 💡 **提示：** Antigravity 2.0 的内部结构已经变化，不建议优先使用 `version.dll` 这类旧版补丁方案。2.0 用户请优先使用 Tun 模式；Tun 无法使用时，再尝试 ProxyBridge。若您曾安装过此插件，后续出现启动极慢、空白或模型异常，请进入软件根目录删除 `version.dll` 文件，并切回其他方案。

1. **前置网络设置**：打开您的代理软件，**关闭** Tun 模式，**开启**"系统代理"，路由同样选择"**规则**"。
2. **下载核心插件**：访问开源仓库 [Antigravity-Proxy Releases](https://github.com/yuaotian/antigravity-proxy/releases)。
3. 在页面的 **Assets** 区域，下载最新的压缩包（如 `antigravity-proxy-v1.8-win-x64.zip`）。

   ![GitHub Assets 下载区域](/articles/antigravity/image1.png)

4. **放置补丁文件**：解压后，将 `config.json` 和 `version.dll` 两个文件移动到 Antigravity 的安装根目录。
   * *定位根目录捷径：在开始菜单或桌面上找到 Antigravity IDE 快捷方式 -> 右键选择"打开文件所在位置"。如果您打开后看到的是 Antigravity 2.0 的新目录，请不要强行套用本插件方案。*

   ![解压出的 config.json 和 version.dll](/articles/antigravity/image2.png)

   ![右键"打开文件所在位置"](/articles/antigravity/image3.png)

   ![根目录下 config.json 所在位置](/articles/antigravity/image4.png)

5. **修改代理端口**：用记事本打开刚放进去的 `config.json` 文件，定位到最下方的端口号（默认可能是 `7890`）。

   ![config.json 内部 type/host/port 字段](/articles/antigravity/image5.png)

   * **获取端口号方法**：右键点击 Windows 任务栏空白处 -> `任务栏设置` -> 搜索并进入 `代理服务器设置` -> 找到 `手动设置代理`，点击右侧的 `编辑`。弹窗中显示的端口数字即为您当前软件的代理端口。

   ![Windows 系统代理设置查看端口](/articles/antigravity/image6.png)

   * 将获取到的端口号填入 `config.json` 并保存。**注意：不要改动系统自身的代理设置，只改 json 文件。**
   * *（如遇协议不兼容，可尝试将 `type` 后的 `socks5` 更改为 `http` 或 `https`）。*

   常见代理软件默认端口极速复制：
```copy-dashboard
Clash默认端口 (Port): 7890
Clash Verge默认端口 (Port): 7897
v2rayN默认端口 (Port): 10808
```

---

## 四、 账号登录与授权流程

网络打通后，即可启动 Antigravity IDE 或 Antigravity 2.0 进行授权。两个版本的入口界面不同，但底层逻辑一致：先尝试标准浏览器授权，失败后再考虑 Cockpit Tools 本地授权辅助。

### 4.1 标准网页登录

1. 直接运行当前使用的客户端：Antigravity IDE 或 Antigravity 2.0。
2. 按照界面提示，软件会拉起您的默认浏览器。使用已开通服务的 Google 账号完成 OAuth 授权。
3. 若跳转后提示成功，说明授权完毕，可直接进入下一部分的验证与对话测试。

*如果在此步骤页面无响应、反复报错，请先分清是网络未接管、账号地区资格不通过，还是本地授权状态异常。不要反复点登录，以免触发更严格的风控。*

> 如果点击登录后长时间没有任何反应，通常不是账号问题，而是 Antigravity 客户端请求超时，说明网络还没有真正接管到软件流量。请先停止反复点击登录，回到第三章检查 Tun 是否开启、ProxyBridge 规则是否包含主程序与 `language_server`，以及代理端口是否填对（常见如 `7890`、`7897`）。

### 4.2 Cockpit Tools 本地授权辅助（状态注入方案）

> 🛡️ **【技术原理解析：Cockpit Tools 现在的定位】**
> 目前 Google 官方风控严格，Cockpit Tools **不再是用来绕过“账号没资格”的强登工具**。如果官方判定您的账号地区、年龄或资格不符，强行注入 Token 也无法绕过服务端校验。
> 目前它的核心实用价值在于**极其方便的多账号切换与管理**，以及处理浏览器跳转无响应、客户端状态错乱、授权写入失败等本地问题。只要您是亲自在本地客户端正常使用，这就属于本地授权辅助操作，非常安全。

> 🔄 **新版工具说明：** Cockpit Tools v0.24.0 起已明确对齐官方 **Antigravity IDE** 客户端，会按官方重命名后的路径、用户数据目录、进程识别和 Language Server 元数据处理 IDE，并改为读写官方 `antigravityUnifiedStateSync.oauthToken` 状态。请务必下载最新版再操作。想沿用本教程原截图和 VS Code 风格界面的用户，优先选择 **Antigravity IDE**；不要把它和新的 Antigravity 2.0 混在一起操作。

1. **下载工具**：前往 [Cockpit Tools 开源页面](https://github.com/jlcodes99/cockpit-tools/releases)，点击 **Show all assets**，下载 `Cockpit.Tools_0.24.0_x64-setup.exe` 这类 Windows x64 安装包；如果后续版本号变化，请选择最新版对应的 `x64-setup.exe`。

   ![Cockpit Tools Windows x64 setup 下载位置](/articles/antigravity/cockpit-tools-windows-x64-setup.png)

2. **安装说明**：因开源软件缺乏微软签名，浏览器或 Windows Defender 可能会提示"未知风险"。请在弹窗中点击"**更多信息**" -> "**仍要运行**"，一路 Next 完成安装。
3. **基础设置**：打开 Cockpit Tools，点击左下角的齿轮/设置图标，将语言切换为**中文**。

   ![Cockpit Tools 设置图标](/articles/antigravity/image18.png)

4. **绑定账号**：在左侧导航栏找到 `Antigravity IDE` 或 `Antigravity` 图标并点击，点击页面中央的"**添加账号**"按钮（或蓝色加号）。新版 Cockpit Tools 的 Antigravity 集成主要面向官方 **Antigravity IDE**；如果您的目标是新式 Antigravity 2.0，请不要套用旧版 IDE 的截图和路径判断。

   ![点击左侧 Antigravity 图标](/articles/antigravity/image19.png)

   ![点击蓝色加号添加账号](/articles/antigravity/image20.png)

5. 点击"**开始 OAuth 授权**"，在弹出的浏览器沙盒中登录您的 Google 账号。

   ![点击"开始 OAuth 授权"](/articles/antigravity/image21.png)

6. **本地状态写入**：登录成功后返回软件，会显示已绑定的账号卡片。点击账号卡片下方的"**▶ 播放**"按钮，把本地授权状态写入 Antigravity IDE。

   ![点击账号卡片下方的播放按钮](/articles/antigravity/image22.png)

7. 在弹出的路径确认窗口中，点击路径框右侧的"**刷新/选择**"图标，确认路径无误后点击"**保存**"。新版 Cockpit Tools 已适配官方重命名后的 Windows 主程序 `Antigravity IDE.exe`。如果自动识别失败，请手动选择 **Antigravity IDE** 的安装目录，例如 `E:\Antigravity`，并确认主程序是 `Antigravity IDE.exe`。此时 Antigravity IDE 会被自动唤醒或重启。

   * *关键排错：如果您电脑上同时安装了 Antigravity IDE 和 Antigravity 2.0，而路径却指向 `C:\Users\你的用户名\AppData\Local\Programs\antigravity`，这通常是 2.0 路径。若您的目标是旧版 VS Code 风格界面，请手动切回 Antigravity IDE 的路径。*

   ![点击刷新图标自动检测路径](/articles/antigravity/image23.png)

   ![路径已填入，点击保存](/articles/antigravity/image24.png)

8. 观察客户端界面：Antigravity IDE 通常会在编辑器右侧或顶部加载出**模型选择下拉框**；Antigravity 2.0 则可能表现为项目/对话界面可以正常创建 Agent、加载模型或发送消息。只要账号状态能被识别并进入可对话状态，即代表本地授权状态写入成功。若仍提示没资格或认证错误，请按 FAQ 里的三类报错继续判断，不要反复强行注入。

   ![成功加载模型下拉框](/articles/antigravity/image25.png)

---

## 五、 防机器人人机验证（必做） {#human-verify}

为对抗机器批量滥用，系统会进行二次核验。**现在的验证流程已经改变：您不需要等进入软件发消息才验证，而是在登录授权阶段就会直接弹出验证要求。**

1. 登录时，如果网页直接弹出提示 `Further action is required to use Antigravity`，请点击界面上的 `Verify` 或 `Sign in again` 按钮。
   
   ![验证完成后需要重新登录 Antigravity 的界面](/articles/antigravity/fatmouse/verify-sign-in-again.jpg)

2. 页面通常会直接出现一个**二维码扫码界面**。（注：由于政策收紧，以前那种输入 +86 手机号收短信的方式已基本失效，请直接准备扫码验证）。
3. **扫码验证核心操作步骤**：
   * 准备一台**安卓手机**，**强烈推荐使用 Google Pixel、三星、小米等自带原生 Google 框架的手机**进行扫码，直接验证成功的概率极高！
   * **环境一致性（关键）**：手机和电脑必须保持网络环境一致。建议手机和电脑连接**同一个美国节点（同一个 US IP）**，确保底层网络环境干净一致。
   * 手机上安装并登录 **Google App**。建议使用 Google App 自带的 **Google 智能镜头（Google Lens）**，不要直接使用微信或普通相机扫码。
   * 部分国产安卓系统还需要在系统设置中搜索并开启“Google 基础服务”或“谷歌基础服务管理”，否则 Google App / Google Play 可能无法正常完成验证。

   ![安卓手机开启 Google 基础服务](/articles/antigravity/fatmouse/android-google-services.jpg)

   * 打开 Google App，点击搜索框右侧的智能镜头图标，对准电脑验证页面上的二维码进行扫描。

   ![Google App 搜索框右侧的 Google 智能镜头入口](/articles/antigravity/fatmouse/android-google-lens.jpg)

   * 识别后点击二维码对应的链接。页面通常会跳转到 Google Play 商店或 Google 的验证页面，按照提示继续并确认验证。

   ![安卓手机确认由本人发起验证并继续](/articles/antigravity/fatmouse/android-google-confirm.jpg)

   * 首次扫码通常即可通过；完成后回到电脑上的 Antigravity，等待页面自动刷新，必要时重新发送一次测试消息。
   * ⚠️ **【严重风控警告】**：如果扫码后没有反应或失败，**千万不要连续扫码超过十几次**！频繁扫码极易触发 Google 的风控机制，导致账号被锁定大约**七天甚至一个月**。在这期间“绝对没救”，只能耐心等待风控解除。
7. **扫码后没有反应或反复出现二维码**：先确认安卓手机的 Google App 已登录正确的 Google 账号、Google Play 商店可以正常打开，并检查手机代理是否确实生效。二维码可能会自动刷新或过期，请扫描电脑页面上当前最新的二维码，不要继续扫描旧截图。
8. 如果点击蓝色验证按钮后直接报 `400` 或 `500`，通常说明弹出的默认浏览器没有登录当前这个 Google 账号。请把系统默认浏览器临时改成已登录该账号的 Chrome/Edge，或在弹出的浏览器里重新登录对应账号后再试。
9. **最终确认**：验证通过后，如果 AI 能够正常回复您的消息，恭喜您，所有配置已大功告成！Antigravity 2.0 的按钮位置和提示样式可能不同，但核心判断不变：能正常发送、能收到回复、模型或 Agent 状态不再报错。

> 如果提示“验证次数达上限”，说明该号码已被风控，请更换亲友手机号。该手机号只用于一次性风控验证，不等于绑定账号。

---

## 六、 附加功能：SSH 远程连接配置

> ⚠️ **排雷提示**：本节主要面向 Antigravity IDE。Antigravity 2.0 已经是新的独立 Agent 桌面应用，不再是传统 VS Code 风格 IDE；如果您使用的是 2.0，请优先使用其项目/权限/终端相关新功能，不要强行套用旧版扩展面板截图。如果不是刚需，建议直接忽略此步骤。

如必须使用，遇到连接异常时请按以下步骤适配：

1. 下载专用扩展包：[Antigravity SSH Proxy](https://open-vsx.org/extension/dinobot22/antigravity-ssh-proxy)（点击页面右下角紫色 Download 下载）。
2. 打开 Antigravity 侧边栏的"扩展"面板，将下载好的文件直接拖拽进去完成安装。
3. 安装后，点击界面底部的绿色 **ATP** 标识，在输入框填入您的代理软件端口号，滑到最下方保存，然后尝试连接服务器。
   * *关键机制：此功能目前**仅兼容系统代理模式**。如果您前面采用的是首选方案（Tun 模式），在连接 SSH 时，必须**同时打开"系统代理"**开关（即 Tun + 系统代理双开）。连接成功后再将系统代理关掉即可。*
4. 处于 SSH 连接状态后，再次进入侧边栏"扩展"面板，找到类似 `在 SSH:XXX 中安装扩展` 的板块，点击对应的安装按钮将扩展同步至远程服务器终端。
5. 彻底关闭并重启当前窗口，即可完成通道连通。

### 扩展市场加载慢 / 搜不到插件怎么办？

> 💡 **适用范围：** 这一段只针对 **Antigravity IDE** 的扩展面板。Antigravity 2.0 不是传统 VS Code 风格 IDE，请不要强行套用。

如果扩展面板默认提示正在使用 **Open VSX**，可能会出现插件搜索不全、下载很慢、甚至加载失败的情况。可以把扩展市场源切换为 VS Code 官方源。

![扩展面板提示当前使用 Open VSX](/articles/antigravity/marketplace-open-vsx-notice.png)

操作方法：

1. 打开左侧 **扩展（Extensions）** 面板。
2. 如果页面提示 `By default, Antigravity uses Open VSX as a marketplace. This can be changed in Antigravity settings.`，点击里面的 **Antigravity settings**。

   ![点击 Antigravity settings 进入扩展市场设置](/articles/antigravity/marketplace-settings-link.png)

3. 在 `Editor -> Marketplace` 设置里，把下面两个地址分别填入对应输入框。

   ![Marketplace 设置里的 Item URL 与 Gallery URL 输入框](/articles/antigravity/marketplace-url-settings-empty.png)

```copy-dashboard
Marketplace Item URL: https://marketplace.visualstudio.com/items
Marketplace Gallery URL: https://marketplace.visualstudio.com/_apis/public/gallery
```

   ![填入 VS Code 官方扩展市场地址后的效果](/articles/antigravity/marketplace-url-settings-filled.png)

填完后，**彻底关闭并重新打开 Antigravity IDE**，再回到扩展面板搜索 `ssh`、`Remote - SSH` 等插件。正常情况下，搜索结果会切到 VS Code 官方插件市场，插件会更全，加载也更稳定。

---

## 七、遇到问题先看这里：常见故障排查 (FAQ)

| 你看到的情况 | 优先判断 | 先看哪一段 |
| --- | --- | --- |
| 打开后不是 VS Code 那种界面 | 装成了 Antigravity 2.0，或旧版更新到了 2.0 | Q0 |
| `Sorry, this account is ineligible to use Antigravity` | 账号地区/资格/年龄/订阅问题 | Q0.5 的账号没资格 |
| `oauth2.googleapis.com/token`、`connectex`、连接超时 | 网络没真正走代理 | Q0.5 的 OAuth 网络失败 |
| `There was an error with your authentication` | 本地授权状态或 Token 状态异常 | Q0.5 的认证错误 |
| 点击登录后接近 1 分钟没反应 | 客户端请求超时，网络没接管 | Q1 |
| 发消息一直转圈、按钮一直灰 | 网络未接管或节点不可用 | Q1 |
| 模型列表/模型名称刷不出来 | 节点异常或多套网络方案冲突 | Q2 |
| ProxyBridge 不知道选哪个文件 | IDE 和 2.0 的 `language_server` 路径不同 | Q2.5 |
| 蓝色 `Retry`，同时有 `400` | 节点/地区/登录状态被拒绝 | Q3 |
| 验证成功后仍反复出现 `Verify / Sign in again` | 年龄验证或客户端登录状态未刷新 | Q4 |
| 出现 There was an unexpected issue setting up your account. | 节点质量、OAuth 过期或请求超时 | Q5 |
| 扩展市场搜不到插件 | 默认 Open VSX 源不稳定 | 第六章扩展市场 |

### Q0：打开后不是 VS Code 界面，为什么和教程截图不一样？

* **原因**：Google 已经把产品拆分为 Antigravity 2.0、Antigravity IDE、CLI、SDK 等不同形态。2.0 是新的独立桌面应用，官方定位是 Agent 编排平台；原教程截图更接近 Antigravity IDE。
* **解决**：网络和登录思路仍可参考本教程，但涉及扩展面板、SSH、VS Code 风格界面、旧版语言服务路径时，请确认自己是否需要改用 Antigravity IDE。若只使用 2.0，请重点参考 Tun 模式、ProxyBridge 的新版路径、账号登录与手机验证部分。

### Q0.5：登录报错先按这三类判断 {#faq-auth-triage}

现在 Antigravity 的登录校验比旧版更严格，不建议一看到失败就反复用 Cockpit Tools 注入。请先按截图判断类型：

<a id="faq-auth-ineligible"></a>

1. **提示账号没资格：优先处理地区/账号资格**

   如果看到 `Sorry, this account is ineligible to use Antigravity`，这通常不是普通 Token 写入问题，而是账号资格、地区、年龄认证或官方准入校验没有通过。

   ![账号无资格使用 Antigravity 的提示](/articles/antigravity/auth-ineligible-account.png)

   **处理建议 1：检查年龄认证**
   有时候即使账号看似正常，也可能因为未完成年龄认证而报错。请优先访问 [https://myaccount.google.com/age-verification](https://myaccount.google.com/age-verification) 检查并完成年龄验证。
   * **验证方式推荐**：强烈建议优先使用**人脸验证**。您可以直接使用电脑摄像头完成；如果电脑没有摄像头，请选择手机扫码验证（页面会出现一个二维码），然后使用**已开启代理（梯子）的手机**扫码并按提示完成验证。
   * **备选验证方式**：您也可以选择上传**身份证/护照照片**进行验证。
   * **避坑指南**：**不建议**使用银行卡/信用卡进行验证，因为部分国内卡片可能无法通过预授权，容易导致验证失败。

   **处理建议 2：检查地区与资格**
   先检查 Google 账号地区、付款资料地区、订阅状态和当前代理节点地区是否一致。此类问题目前不能再简单理解为“Cockpit 强制注入即可解决”；必要时只能调整地区环境或更换符合资格的账号。

   如果页面提示 `Sorry, this account is ineligible to use Antigravity`，并且下方显示 `Authentication failed`，可以按下面方式尝试修改 Google 账号注册地：

   1. 先打开 Google 条款页查看当前账号关联地区：https://policies.google.com/terms。页面底部通常会显示当前账号对应的国家/地区；如果显示的是中国大陆、中国香港、中国澳门等受限地区，就需要继续处理。
   2. 打开 Google 账号地区修改申请页：https://policies.google.com/country-association-form。
   3. 将账号地区申请修改为 Antigravity 支持的地区，例如日本、新加坡、英国、加拿大等。**不建议一上来申请美国**，美国地区审核通常更严格；除非您确实长期使用美国节点并有明确美国地址，否则优先选择平时最稳定、最常用的代理节点所在地区。

   ![Antigravity 支持地区参考](/articles/antigravity/supported-regions.jpg)

   4. 理由选择“其他”，说明自己因工作需要使用 Gemini / Antigravity，需要更新账号地区。
   5. 提交后等待邮件通知，通常需要约 24 小时。地区生效后再重新打开 Antigravity 测试登录。

   如果您确实因长期在美国居住、工作，并使用美国本地设备和付款方式，可以参考下面的英文说明。请按真实情况填写，不要提交虚假的居住、付款或地址信息：

```text
Due to work arrangements, I am currently residing and working in the United States for an extended period. In order to better access local services (including payment methods, app downloads, and region-specific content), I would like to change my account region to the United States.

I have stable internet access and regularly use devices within the U.S., and I also use local payment methods for transactions. Therefore, I kindly request to update my account region to the United States to ensure a smooth user experience.

Thank you for your understanding and support.
```

   注意：Google 账号地区修改通常一年只能申请一次，提交前请确认目标地区和你长期使用的代理节点地区尽量一致，不要频繁乱改。

<a id="faq-oauth-network"></a>

2. **提示 `oauth2.googleapis.com/token` 连接失败：优先修网络**

   如果报错里出现 `Post "https://oauth2.googleapis.com/token"`、`connectex`、`failed to respond`、`connection attempt failed`，说明客户端请求 Google OAuth token 接口时没有走通网络。

   ![OAuth token 接口连接失败，通常是网络未接管](/articles/antigravity/auth-oauth-network-timeout.jpeg)

   处理建议：回到第三章检查 Tun 是否真的开启、代理节点是否可用、ProxyBridge 是否把主程序和对应 `language_server` 都加入规则。这个问题的重点是“网络没走上代理”，不是账号没资格。

   如果表现为点击登录后等待接近 1 分钟仍没有任何反应，也按网络问题处理：先不要继续重试，优先回查第三章网络配置、端口号、代理软件开关和分流规则。

3. **提示认证错误：再考虑 Cockpit 本地授权辅助**

   如果客户端里显示 `There was an error with your authentication. To log in, click here`，更像是本地授权状态、Token 写入或客户端认证状态异常。

   ![客户端提示 authentication 认证错误](/articles/antigravity/auth-token-injection-error.png)

   处理建议：可以使用 Cockpit Tools 重新完成 OAuth 并写入本地状态。但新版官方仍可能继续检测账号资格、地区和 Token 状态，所以 Cockpit 只能作为本地授权辅助，不保证绕过官方服务端校验。

### Q1：登录无反应 / 消息发送后一直转圈

* **现象**：等了很久右下角的发送按钮还是灰色，无法接收回复。
* **诊断**：100% 是网络配置问题，Antigravity 的流量没有走代理。
* **解决**：请按顺序处理：
  1. 先切换一个干净稳定的代理节点，优先选择日本、新加坡等常用地区。
  2. 返回"第三章"，从头检查 Tun 模式是否真实生效，或改用 ProxyBridge 重新接管主程序与 `language_server`。
  3. 如果您当前使用的是 Antigravity 2.0，且反复无回复，可以换成 **Antigravity IDE** 试一次常规登录和对话。

正常情况下，发送消息后几秒钟内，发送按钮应变为"带有红色方块的停止键"或进入生成状态，代表网络已连通并在请求数据。

### Q2：模型刷不出来 / 对话框能加载但无法选择模型

* **诊断**：多为多种网络方案混用导致的底层冲突。
* **解决**：
  1. 先切换代理节点，确认不是当前节点质量差或被服务端拒绝。
  2. 如果节点没问题，再换一种网络方案，例如从 Tun 切到 ProxyBridge，或从旧 `version.dll` 插件方案切回 Tun。
  3. 换方案前必须清除历史配置残留：比如您之前尝试过进阶备选二，现在想换 Tun 模式，必须先进入根目录**删掉** `version.dll`。Antigravity 2.0 用户尤其不建议保留旧版补丁文件。
  4. 重启电脑：释放被占用的虚拟网卡或代理端口，然后认准一种方案重新配置。

### Q2.5：ProxyBridge 应该添加哪个 `language_server`？

* **Antigravity IDE**：添加 `resources\app\extensions\antigravity\bin\language_server_windows_x64.exe`。
* **Antigravity 2.0**：添加 `resources\bin\language_server.exe`。
* **判断方法**：右键桌面或开始菜单快捷方式，选择"打开文件所在位置"，从当前实际安装目录往下找。不要把 IDE 的路径填给 2.0，也不要把 2.0 的路径填给 IDE。
* **不要误选**：如果您在 Antigravity 2.0 的 `resources\bin` 里看到 `webm_encoder.exe`，一般不要把它当作 ProxyBridge 代理目标。它不是语言服务进程，优先选 `language_server.exe`。

### Q2.6：Cockpit Tools 更新后，路径应该怎么选？

* **先下载最新版**：请从 [Cockpit Tools Releases](https://github.com/jlcodes99/cockpit-tools/releases) 下载最新安装包。v0.24.0 起，Cockpit Tools 已将 Antigravity 集成对齐到官方 **Antigravity IDE**。
* **新版改善**：新版会识别 Windows `Antigravity IDE.exe`，并读写官方 `antigravityUnifiedStateSync.oauthToken` 状态，切号/导入比旧版更贴近官方客户端。
* **排错重点**：需要旧版 VS Code 风格界面的用户，请确认路径指向 **Antigravity IDE**。如果路径是 `C:\Users\你的用户名\AppData\Local\Programs\antigravity`，这通常是 Antigravity 2.0，不适合按旧 IDE 教程截图操作。
* **2FA 提示**：v0.24.0 也给 Codex OAuth 授权加入了 2FA 快速取码入口，但这是 Codex 相关能力；Antigravity 登录仍以本节的 Google OAuth 和客户端注入流程为准。

### Q3：蓝色 `Retry` / 一发消息就报错

此报错较为综合，请按以下六大方向逐一排查：

1. **Google 账号年龄限制（常见于新号）**：
   * 观察 Cockpit Tools，如果该账号右上角显示红色的 `unknown`，说明需验证年龄。
   * 解决：浏览器访问 Google 账号年龄验证页面 https://myaccount.google.com/age-verification?utm_source=p0。页面可能提供证件、自拍或信用卡等验证方式，请根据页面当前提供的选项及自己的真实情况完成验证。

   ![Google 账号年龄验证方式选择页面](/articles/antigravity/fatmouse/google-age-verification-options.jpg)

   * 验证完成后等待几分钟，再刷新 Cockpit 或重新登录 Antigravity。不要提交虚假身份信息，也不要反复高频尝试。
2. **多开/历史账号冲突**：
   * 之前如果用过其他辅助脚本登录，容易残留死链。请一律规范使用 Cockpit Tools 重新覆盖登录。
3. **Gmail 邮箱服务冲突**：
   * 现象：您之前的主账号可能不带 Gmail，后来误点一键开通了 Gmail 邮箱，导致关联错乱。
   * 解决：进入"管理您的 Google 账号" -> "数据和隐私设置" -> 下滑找到"移除不再使用的服务" -> 删掉关联的 Gmail。
4. **Retry 同时伴随 400 报错（节点或登录状态异常）**：
   * 这通常代表当前代理节点被拒绝，或登录状态与网络状态不稳定。
   * 先切换到其他可用地区节点（如日本、新加坡等），彻底退出 Antigravity 后重新登录，多试几次。
   * 如果一直不行，通常说明订阅节点或代理软件质量不佳，建议更换订阅源或代理工具。
5. **Tun 模式底层冲突**：
   * 如果您当前使用 Tun，且模型加载、Retry、对话卡死反复出现，可以临时关闭 Tun，改用 ProxyBridge 或系统代理相关方案重新测试。
   * 切换方案前请清理旧方案残留，尤其不要让 `version.dll`、Tun、ProxyBridge 多套方案同时叠加。
6. **触发最严风控**：
   * 如果以上均排查无果，极大概率是该账号已被 Google AI 团队列入黑名单封禁。建议更换干净的新账号测试。

### Q4：验证成功后仍反复出现 `Verify / Sign in again`

如果浏览器已经显示身份验证成功，但返回 Antigravity 后仍提示 `Further action is required`，或者点击 `Sign in again` 后再次回到 Verify 页面，请按下面顺序处理：

![验证完成后需要重新登录 Antigravity 的界面](/articles/antigravity/fatmouse/verify-sign-in-again.jpg)

1. 先确认 Google 账号的年龄验证已经真正完成，而不是只完成了二维码设备确认。
2. 完全退出 Antigravity，包括任务管理器中的后台进程，再重新打开。
3. 点击 `Sign in again` 或 `Continue with Google`，使用刚刚完成验证的同一个 Google 账号重新授权。
4. 如果仍然循环，清理浏览器中错误账号的登录状态，确认默认浏览器登录的是目标账号，并等待几分钟后再试。
5. 仍无法通过时，再使用 Cockpit Tools 重新完成一次 OAuth；Cockpit 只能刷新本地授权状态，不能替代官方年龄和地区资格校验。

### Q5：出现 There was an unexpected issue setting up your account.

![daily-cloudcode 接口返回 EOF 的报错示例](/articles/antigravity/fatmouse/daily-cloudcode-eof.jpg)

* **`EOF`**：通常是请求中途断开，优先更换稳定节点，并确认 Tun / ProxyBridge 已真正接管客户端流量。
* **`invalid_grant`**：通常表示 OAuth 授权已过期、被撤销或登录状态不一致。选择 `Continue with different account`，再用目标账号重新完成 Google OAuth。
* **`context deadline exceeded`**：表示请求超时。先检查节点延迟和网络接管；不要只连续点击重试。
* **其他 `daily-cloudcode` Unexpected issue**：先按网络问题处理，依次尝试更换节点、彻底退出客户端、确认只启用一套网络方案，再重新登录。

---

## 加入交流群

遇到问题欢迎扫码加入 AI IDE 交流群，与更多用户一起探讨：

![AI IDE 交流群二维码](https://sxxxxxxxxxxxxxxxxxxxxx.github.io/picx-images-hosting/售后群二维码.webp)
