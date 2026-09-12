# 🚀 完整部署步骤（请在新窗口操作）

---

## 第1步：打开 Git Bash

### 方法1（推荐）
右键点击桌面空白处 → 选择 **Git Bash Here**

### 方法2
按 `Win` 键 → 输入 `Git Bash` → 回车打开

---

## 第2步：执行 Git 命令（在 Git Bash 中逐行输入）

```bash
cd /c/Users/LTQ/work/vue-login-demo
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit"
```

```bash
git branch -M main
```

---

## 第3步：创建 GitHub 远程仓库

### 3.1 登录 GitHub
👉 https://github.com 并登录

### 3.2 创建新仓库
- 点击右上角 **+** → **New repository**
- Repository name：`vue-login-demo`
- 不要勾选 "Add a README file"
- 点击 **Create repository**

### 3.3 复制仓库地址
创建成功后，页面会显示：
```
https://github.com/你的用户名/vue-login-demo.git
```
**复制这个地址**

---

## 第4步：关联并推送代码（回到 Git Bash）

### 4.1 关联远程仓库
把下面的 `你的用户名` 替换成你的 GitHub 用户名：

```bash
git remote add origin https://github.com/你的用户名/vue-login-demo.git
```

### 4.2 推送到 GitHub
```bash
git push -u origin main
```

> 💡 首次推送会要求输入：
> - Username：你的 GitHub 用户名
> - Password：你的 GitHub 密码（或 Personal Access Token）

---

## 第5步：部署到 Vercel

### 5.1 登录 Vercel
👉 https://vercel.com → 用 GitHub 账号登录

### 5.2 导入项目
1. 点击 **Add New...** → **Project**
2. 找到 `vue-login-demo` → 点击 **Import**
3. 点击 **Deploy**
4. 等待几秒...

### 5.3 获取你的网址
部署成功后会显示类似：
```
https://vue-login-demo-xxx.vercel.app
```

---

## ✅ 完成！

把这个网址发给别人，他们就能访问你的登录网站了！

---

遇到问题随时问我！
