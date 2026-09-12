# 🚀 Vue 登录网站 - 一键部署到公网

你的项目已准备好！按以下步骤部署，**5 分钟搞定**。

---

## 步骤 1：上传代码到 GitHub

### 1.1 注册/登录 GitHub
访问 https://github.com 注册账号

### 1.2 创建新仓库
- 点击右上角 **+** → **New repository**
- Repository name：`vue-login-demo`
- 不要勾选 Initialize this repository with a README
- 点击 **Create repository**

### 1.3 执行命令上传代码
打开 CMD（命令提示符），依次输入：

```bash
cd C:\Users\LTQ\work\vue-login-demo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/vue-login-demo.git
git push -u origin main
```

> 💡 如果提示输入用户名/密码，输入你的 GitHub 邮箱和密码（或 Personal Access Token）

---

## 步骤 2：部署到 Vercel

### 2.1 登录 Vercel
访问 https://vercel.com，点击 **Log In**，用 GitHub 账号一键登录

### 2.2 导入项目
1. 点击 **Add New...** → **Project**
2. 找到 `vue-login-demo` 仓库，点击 **Import**
3. 点击 **Deploy**，等待 1-2 分钟

### 2.3 获取链接
部署成功后，你会看到：
```
✅ Ready in 45s
https://vue-login-demo-xxx.vercel.app
```

把这个链接发给其他人，他们就能访问了！🎉

---

## 测试账号

| 用户名 | 密码 |
|--------|------|
| admin  | 123456 |

---

## 常见问题

**Q：修改代码后怎么更新？**
```bash
# 修改代码后，重新推送
git add .
git commit -m "Update login page"
git push
# Vercel 会自动重新部署
```

**Q：能自定义域名吗？**
可以！在 Vercel Dashboard → Settings → Domains 添加你的域名

**Q：其他免费部署平台？**
- [Netlify](https://netlify.com)：同样免费，拖拽 `dist` 文件夹即可部署
- [Cloudflare Pages](https://pages.cloudflare.com)：免费快速

---

需要帮助？随时问我！
