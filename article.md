---
title: Antigravity (Windows) 终极网络配置与登录排障指南
date: 2026-04-21
tags:
  - 工具
  - 教程
  - 网络配置
  - Antigravity
image: /articles/antigravity/cover.png
---

## 一、 环境配置与准备工作

在正式使用 Antigravity 前，请务必完成以下自检，这是保证软件正常运行的基石：

1. **基础网络通畅**：请确保您的设备已开启有效的代理工具，且能够顺畅访问 Google 等海外服务。（注：本指南不包含基础代理节点的搭建教学）。
2. **账号状态健康**：准备一个状态正常的 Gemini Pro/Ultra 账号。
   * *注：免费账号可作为测试使用，但存在较高的不可用率。如果您的账号已出现 `403 Forbidden` 报错或已被 Google 封禁，将无法登入。*

> ⚠️ **【风控与防封号指南】**
> 如果您的 Gemini Pro/Ultra 订阅是通过非官方常规渠道（大幅低于官方 $20/月 售价）获取的，请注意随时可能面临被取消订阅的风险。
> 此外，在日常使用中，**切忌频繁切换跨国节点 IP**。频繁的地理位置跳跃极易触发 Google 的安全风控机制，导致账号掉权。建议固定使用长期稳定的优质节点。

---

## 二、 核心网络配置（必做，三选一）

**📌 为什么必须要单独配置网络？**
Antigravity 的底层架构默认不会遵循 Windows 的系统代理规则（常规代理软件无法接管它的流量）。如果不进行额外配置，软件将一直处于"无网络"状态，导致模型无法加载。

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

### 🔧 进阶备选一：Antigravity-Proxy 插件（局部代理）

**适用场景**：由于电脑环境复杂（如存在安全软件拦截、企业内网限制）导致 Tun 模式无法使用时，可采用此插件方案。

> 💡 **提示：** 如果未来 Antigravity 更新导致此方案失效或启动极慢，请进入软件根目录删除 `vension.dll` 文件，并切回其他方案。

1. **前置网络设置**：打开您的代理软件，**关闭** Tun 模式，**开启**"系统代理"，路由同样选择"**规则**"。
2. **下载核心插件**：访问开源仓库 [Antigravity-Proxy Releases](https://github.com/yuaotian/antigravity-proxy/releases)。
3. 在页面的 **Assets** 区域，下载最新的压缩包（如 `antigravity-proxy-v1.8-win-x64.zip`）。

   ![GitHub Assets 下载区域](/articles/antigravity/image1.png)

4. **放置补丁文件**：解压后，将 `config.json` 和 `vension.dll` 两个文件移动到 Antigravity 的安装根目录。
   * *定位根目录捷径：在开始菜单或桌面上找到 Antigravity 快捷方式 -> 右键选择"打开文件所在位置"。*

   ![解压出的 config.json 和 vension.dll](/articles/antigravity/image2.png)

   ![右键"打开文件所在位置"](/articles/antigravity/image3.png)

   ![根目录下 config.json 所在位置](/articles/antigravity/image4.png)

5. **修改代理端口**：用记事本打开刚放进去的 `config.json` 文件，定位到最下方的端口号（默认可能是 `7890`）。

   ![config.json 内部 type/host/port 字段](/articles/antigravity/image5.png)

   * **获取端口号方法**：右键点击 Windows 任务栏空白处 -> `任务栏设置` -> 搜索并进入 `代理服务器设置` -> 找到 `手动设置代理`，点击右侧的 `编辑`。弹窗中显示的端口数字即为您当前软件的代理端口。

   ![Windows 系统代理设置查看端口](/articles/antigravity/image6.png)

   * 将获取到的端口号填入 `config.json` 并保存。**注意：不要改动系统自身的代理设置，只改 json 文件。**
   * *（如遇协议不兼容，可尝试将 `type` 后的 `socks5` 更改为 `http` 或 `https`）。*

---

### 🔧 进阶备选二：ProxyBridge 桥接（底层系统代理）

**适用场景**：作为最后防线的备用方案。需注意该方案可能会被"火绒"等安全杀毒软件误拦截。

1. **前置网络设置**：同样需**关闭** Tun 模式，**开启**"系统代理"及"**规则**"模式。
2. **下载桥接软件**：前往 [ProxyBridge Releases](https://github.com/InterceptSuite/ProxyBridge/releases)，在 Assets 处下载 `.exe` 结尾的安装包并完成安装。

   ![ProxyBridge Assets 下载截图](/articles/antigravity/image7.png)

3. **软件汉化**：打开 ProxyBridge，点击上方菜单栏的 **Settings**，将 Language 修改为中文。

   ![ProxyBridge 语言设置](/articles/antigravity/image8.png)

4. **配置代理信息**：
   * 点击左上角"代理" -> "代理设置"。

   ![代理菜单（汉化后）](/articles/antigravity/image9.png)

   * IP 地址固定填写：`127.0.0.1`。
   * 端口号：填写您代理软件的实际端口（获取方法参考备选方案一的步骤5）。

   ![填写 127.0.0.1 及对应端口](/articles/antigravity/image10.png)

   * *（如果后续连接失败，可在此处的 http 和 socks5 协议之间来回切换排查）。*
5. 点击下方"测试代理连接"，日志出现 `SUCCESS` 提示后保存。

   ![测试连接提示 SUCCESS](/articles/antigravity/image11.png)

6. **添加路由规则**：
   * 回到主界面，点击"代理" -> "代理规则" -> 点击右上角"添加" -> "浏览"。

   ![代理规则页面](/articles/antigravity/image12.png)

   ![点击"添加"按钮](/articles/antigravity/image13.png)

   ![点击"浏览"选择程序](/articles/antigravity/image14.png)

   * 第一次添加：选择 Antigravity 根目录下的主程序 `Antigravity.exe`。

   ![选中 Antigravity.exe](/articles/antigravity/image15.png)

   * 第二次添加：再次点击"添加"和"浏览"，深入根目录文件夹，选中语言服务进程：`Antigravity\resources\app\extensions\antigravity\bin\language_server_windows_x64.exe`。

   ![选中 language_server_windows_x64.exe](/articles/antigravity/image16.png)

   * 滑动到页面底部点击**保存**，配置即刻生效。

   ![点击"保存规则"](/articles/antigravity/image17.png)

---

## 三、 账号登录与授权流程

网络打通后，即可启动 Antigravity 进行授权。

### 3.1 标准网页登录

1. 直接运行 Antigravity 客户端。
2. 按照界面提示，软件会拉起您的默认浏览器。使用已开通服务的 Google 账号完成 OAuth 授权。
3. 若跳转后提示成功，说明授权完毕，可直接跳至第四步。

*如果在此步骤页面无响应、反复报错，说明您的账号环境存在风控拦截，请立刻停止尝试，转用下方的 Cockpit Tools 辅助注入登录。*

### 3.2 强制数据注入登录（Cockpit Tools 辅助方案）

> 🛡️ **【技术原理解析：安全吗？会封号吗？】**
> 当遇到地区限制或严苛的设备风控时，常规网页授权会被 Google 阻断。Cockpit Tools 的核心作用是在您的本地环境中提取合法的 Token（身份令牌）并直接注入到客户端中，跳过浏览器的跳转拦截。
> 只要您是亲自在本地客户端正常使用，**这属于绝对安全的操作**，不会导致封禁。（真正导致封禁的行为通常是恶意"反代"——即将额度通过脚本高频转移给第三方工具使用）。

1. **下载工具**：前往 [Cockpit Tools 开源页面](https://github.com/jlcodes99/cockpit-tools/releases)，点击 **Show all assets**，下载最新的 `.exe` 安装包。
2. **安装说明**：因开源软件缺乏微软签名，浏览器或 Windows Defender 可能会提示"未知风险"。请在弹窗中点击"**更多信息**" -> "**仍要运行**"，一路 Next 完成安装。
3. **基础设置**：打开 Cockpit Tools，点击左下角的齿轮/设置图标，将语言切换为**中文**。

   ![Cockpit Tools 设置图标](/articles/antigravity/image18.png)

4. **绑定账号**：在左侧导航栏找到 `Antigravity` 图标并点击，点击页面中央的"**添加账号**"按钮（或蓝色加号）。

   ![点击左侧 Antigravity 图标](/articles/antigravity/image19.png)

   ![点击蓝色加号添加账号](/articles/antigravity/image20.png)

5. 点击"**开始 OAuth 授权**"，在弹出的浏览器沙盒中登录您的 Google 账号。

   ![点击"开始 OAuth 授权"](/articles/antigravity/image21.png)

6. **一键注入**：登录成功后返回软件，会显示已绑定的账号卡片。点击账号卡片下方的"**▶ 播放**"按钮。

   ![点击账号卡片下方的播放按钮](/articles/antigravity/image22.png)

7. 在弹出的路径确认窗口中，点击路径框右侧的"**刷新/选择**"图标，确认路径无误后点击"**保存**"。此时 Antigravity 会被自动唤醒或重启。

   ![点击刷新图标自动检测路径](/articles/antigravity/image23.png)

   ![路径已填入，点击保存](/articles/antigravity/image24.png)

8. 观察 Antigravity 界面右侧，如果成功加载出了**模型选择下拉框**，即代表底层数据注入成功。

   ![成功加载模型下拉框](/articles/antigravity/image25.png)

---

## 四、 验证与开启对话

为防止机器人滥用，首次使用模型时系统可能会要求过一次手机验证。

1. 在对话框中随意输入一条测试消息并发送。
2. 观察界面右下角，直到弹出一个带有蓝色按钮的提示框（**Complete verification**）。

   ![弹出 Complete verification 提示框](/articles/antigravity/image26.png)

3. 点击该蓝色按钮，在弹出的页面中选择**第二个选项**。
4. 国家代码下拉选择 `+86`，输入您的国内手机号接收短信验证码。
5. 填入验证码后即可解锁全部功能。
   * *排错：如果提示"验证次数达上限"，说明该号码已被风控，请更换亲友号码。如果点击蓝色按钮直接报 `400` 错误，说明默认浏览器环境异常，请在电脑设置中临时将默认浏览器更改为您平时常用的 Chrome/Edge，并确保该浏览器处于登录该 Google 账号的状态。*
6. **最终确认**：验证通过后，如果 AI 能够正常回复您的消息，恭喜您，所有配置已大功告成！

---

## 五、 附加功能：SSH 远程连接配置

> ⚠️ **排雷提示**：Antigravity 内部的 SSH 功能目前处于早期阶段，极其不稳定，体验较差。如果不是刚需，建议直接忽略此步骤。

如必须使用，遇到连接异常时请按以下步骤适配：

1. 下载专用扩展包：[Antigravity SSH Proxy](https://open-vsx.org/extension/dinobot22/antigravity-ssh-proxy)（点击页面右下角紫色 Download 下载）。
2. 打开 Antigravity 侧边栏的"扩展"面板，将下载好的文件直接拖拽进去完成安装。
3. 安装后，点击界面底部的绿色 **ATP** 标识，在输入框填入您的代理软件端口号，滑到最下方保存，然后尝试连接服务器。
   * *关键机制：此功能目前**仅兼容系统代理模式**。如果您前面采用的是首选方案（Tun 模式），在连接 SSH 时，必须**同时打开"系统代理"**开关（即 Tun + 系统代理双开）。连接成功后再将系统代理关掉即可。*
4. 处于 SSH 连接状态后，再次进入侧边栏"扩展"面板，找到类似 `在 SSH:XXX 中安装扩展` 的板块，点击对应的安装按钮将扩展同步至远程服务器终端。
5. 彻底关闭并重启当前窗口，即可完成通道连通。

---

## 六、 常见故障排查 (FAQ)

### Q1：消息发送后一直没反应，一直转圈？

* **现象**：等了很久右下角的发送按钮还是灰色，无法接收回复。
* **诊断**：100% 是网络配置问题，Antigravity 的流量没有走代理。
* **解决**：请返回"第二章"，从头检查您的 Tun 模式是否真实生效，或者更换备选的插件/桥接方案。正常情况下，发送消息后几秒钟内，发送按钮应变为"带有红色方块的停止键"，代表网络已连通并在请求数据。

### Q2：对话框能加载，但顶部一直显示不了模型？

* **诊断**：多为多种网络方案混用导致的底层冲突。
* **解决**：
  1. 清除历史配置残留：比如您之前尝试过备选方案一，现在想换 Tun 模式，必须先进入根目录**删掉** `vension.dll`。
  2. 重启电脑：释放被占用的虚拟网卡或代理端口，然后认准一种方案重新配置。

### Q3：一发消息就报错，右下角弹出蓝色的 Retry 按钮？

此报错较为综合，请按以下四大方向逐一排查：

1. **Google 账号年龄限制（常见于新号）**：
   * 观察 Cockpit Tools，如果该账号右上角显示红色的 `unknown`，说明需验证年龄。
   * 解决：浏览器访问 [Google 年龄认证](https://myaccount.google.com/age-verification) 页面完成认证。等待 5 分钟后刷新 Cockpit，变为 `free/pro/ultra` 后重新注入即可。
2. **多开/历史账号冲突**：
   * 之前如果用过其他辅助脚本登录，容易残留死链。请一律规范使用 Cockpit Tools 重新覆盖登录。
3. **Gmail 邮箱服务冲突**：
   * 现象：您之前的主账号可能不带 Gmail，后来误点一键开通了 Gmail 邮箱，导致关联错乱。
   * 解决：进入"管理您的 Google 账号" -> "数据和隐私设置" -> 下滑找到"移除不再使用的服务" -> 删掉关联的 Gmail。
4. **触发最严风控**：
   * 如果以上均排查无果，极大概率是该账号已被 Google AI 团队列入黑名单封禁。建议更换干净的新账号测试。

---

## 加入交流群

遇到问题欢迎扫码加入 AI IDE 交流群，与更多用户一起探讨：

![AI IDE 交流群二维码](https://sxxxxxxxxxxxxxxxxxxxxx.github.io/picx-images-hosting/售后群二维码.webp)
