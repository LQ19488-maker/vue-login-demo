# Vue 登录网站 - 前后端接口文档

> 本文档定义前端需要的 API 接口，后端按此实现即可对接。

---

## 基本信息

| 项目 | 值 |
|------|-----|
| 前端仓库 | https://github.com/LQ19488-maker/vue-login-demo |
| 前端技术栈 | Vue 3 + Vite + Vue Router |
| 建议后端技术栈 | Node.js/Express、Python/FastAPI、Java/Spring Boot、Go 均可 |
| 数据格式 | JSON |
| 请求头 | `Content-Type: application/json` |
| 认证方式 | 建议 JWT（Token 放 Header） |

---

## 接口列表

### 1. 用户登录

**接口地址**
```
POST /api/auth/login
```

**请求参数**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**成功响应（200）**
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "nickname": "管理员"
    }
  }
}
```

**失败响应（200，业务错误）**
```json
{
  "code": 1001,
  "message": "用户名或密码错误",
  "data": null
}
```

---

### 2. 用户注册

**接口地址**
```
POST /api/auth/register
```

**请求参数**
```json
{
  "username": "zhangsan",
  "password": "123456",
  "email": "zhangsan@example.com"
}
```

**成功响应（200）**
```json
{
  "code": 0,
  "message": "注册成功",
  "data": {
    "id": 2,
    "username": "zhangsan"
  }
}
```

**失败响应**
```json
{
  "code": 1002,
  "message": "用户名已存在",
  "data": null
}
```

---

### 3. 获取当前用户信息（可选）

**接口地址**
```
GET /api/auth/me
```

**请求头**
```
Authorization: Bearer <token>
```

**成功响应**
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员"
  }
}
```

---

### 4. 退出登录（可选）

```
POST /api/auth/logout
```

---

## 错误码约定

| code | 含义 |
|------|------|
| 0 | 成功 |
| 1001 | 用户名或密码错误 |
| 1002 | 用户名已存在 |
| 1003 | 参数格式错误 |
| 401 | Token 无效或已过期 |

---

## ⚠️ 重要：跨域配置（CORS）

前端在 `http://localhost:5173` 运行，后端如果在其他端口（如 `3000`），**必须允许跨域**，否则浏览器会拦截请求。

### Node.js / Express 示例
```javascript
const cors = require('cors')
app.use(cors({
  origin: ['http://localhost:5173', 'https://lq19488-maker.github.io'],
  credentials: true
}))
```

### Python / FastAPI 示例
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://lq19488-maker.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 数据库表设计建议

```sql
CREATE TABLE users (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  username    VARCHAR(50)  NOT NULL UNIQUE COMMENT '用户名',
  password    VARCHAR(255) NOT NULL        COMMENT '密码（务必加密存储）',
  email       VARCHAR(100)                 COMMENT '邮箱',
  nickname    VARCHAR(50)                  COMMENT '昵称',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

> 🔒 **安全提醒**：密码绝对不要明文存储！用 bcrypt / argon2 加密。

---

## 前端对接说明（后端同学可忽略）

前端会做如下改造：
1. 安装 axios：`npm install axios`
2. 把 `LoginView.vue` 里的模拟验证替换为 API 调用
3. 把返回的 token 存到 `localStorage`
4. 后续请求在 Header 带上 `Authorization: Bearer <token>`

---

## 联调步骤

1. 后端同学在本地跑起服务，例如 `http://localhost:3000`
2. 前端改 `vite.config.js` 加代理：
```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```
3. 前端用 `/api/auth/login` 调用（不用写完整地址）
4. 联调通过后，后端部署到服务器，前端改 `baseURL` 指向正式域名

---

## 待确认事项

请和后端同学确认：

- [ ] 后端用什么语言/框架？
- [ ] 接口路径是否用 `/api/auth/` 前缀？
- [ ] 认证用 JWT 还是 Session？
- [ ] 响应格式是否用 `{ code, message, data }` 结构？
- [ ] 后端部署在哪个域名/服务器？
- [ ] 是否需要邮箱验证、验证码、密码找回？

---

文档更新日期：2026-09-12
