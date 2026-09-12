# Git 安装教程（Windows）

## 第一步：下载安装包

1. 访问 https://git-scm.com/download/win
2. 页面会自动下载 `Git-2.xx.x-64-bit.exe`（或 32 位版本）
3. 保存到桌面或下载文件夹

---

## 第二步：开始安装

1. 双击下载好的 `.exe` 文件
2. 如果出现"用户账户控制"提示，点击**是**

---

## 第三步：安装设置（按顺序选择）

### 第1屏：License Agreement
- 勾选 **I accept the agreement**
- 点击 **Next**

### 第2屏：Destination Location
- 默认路径即可
- 点击 **Next**

### 第3屏：Select Components
- **全部勾选**（推荐）
- 点击 **Next**

### 第4屏：Choosing the default editor
- 选择 **Use Vim or Nano** 或 **Use Notepad**（随便选一个）
- 点击 **Next**

### 第5屏：Adjusting your PATH environment
- 选择 **Git from the command line and also from 3rd-party software**（推荐）
- 点击 **Next**

### 第6屏：Configuring the line ending conversions
- 选择 **Checkout Windows-style, commit Unix-style line endings**
- 点击 **Next**

### 第7屏：Configuring extra options
- 选择 **Use the OpenSSL library**
- 点击 **Next**

### 第8屏：Configuring the terminal emulator to use with Git Bash
- 选择 **Use MinTTY**（默认）
- 点击 **Next**

### 第9屏：Configuring extra options (最后一步)
- 点击 **Install**

---

## 第四步：完成安装

- 等待安装进度条完成
- 点击 **Finish**
- 可能会弹出另一个窗口问是否关闭所有 Git 窗口，点击 **OK**

---

## 第五步：验证安装

### 方法1：打开 CMD
1. 按 `Win + R`，输入 `cmd`，回车
2. 输入以下命令：
```bash
git --version
```
3. 如果显示类似 `git version 2.xx.x`，说明安装成功！

### 方法2：打开 Git Bash
1. 右键点击桌面或任意文件夹
2. 选择 **Git Bash Here**
3. 如果弹出命令行窗口，说明安装成功

---

## 第六步：配置 Git 账号

在 CMD 或 Git Bash 中依次执行：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

> 💡 邮箱填你注册 GitHub 用的邮箱

验证配置：
```bash
git config --global --list
```

---

## 安装完成！

现在可以回到部署步骤，继续上传代码到 GitHub 了。
