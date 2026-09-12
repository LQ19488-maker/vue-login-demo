# 第2步：上传代码到 GitHub

---

## 在 CMD 中执行以下命令

### 1️⃣ 进入项目目录
```bash
cd C:\Users\LTQ\work\vue-login-demo
```

### 2️⃣ 初始化 Git 仓库
```bash
git init
```

### 3️⃣ 添加所有文件
```bash
git add .
```

### 4️⃣ 提交代码
```bash
git commit -m "Initial commit"
```

### 5️⃣ 设置主分支名称
```bash
git branch -M main
```

### 6️⃣ 关联 GitHub 远程仓库
> ⚠️ 把 `你的用户名` 换成你的 GitHub 用户名

```bash
git remote add origin https://github.com/你的用户名/vue-login-demo.git
```

**示例**（如果你的用户名是 `zhangsan`）：
```bash
git remote add origin https://github.com/zhangsan/vue-login-demo.git
```

### 7️⃣ 推送到 GitHub
```bash
git push -u origin main
```

> 💡 如果提示输入用户名和密码：
> - 用户名：你的 GitHub 用户名
> - 密码：你的 GitHub 密码（或 Personal Access Token）

---

## 验证是否成功

推送完成后，去 GitHub 网页刷新仓库，应该能看到你的代码文件！

---

如果遇到问题，把错误信息发给我！
