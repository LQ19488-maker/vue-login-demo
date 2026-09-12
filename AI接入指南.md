# 如何查看 AI 后端的接口文档

---

## 方法一：直接访问（最快）

如果你朋友已经部署了，问他要这个地址：
```
http://服务器地址:端口/docs
```
比如 `http://localhost:8000/docs` 或 `http://xxx.xxx.xxx.xxx:8000/docs`

打开后你会看到 Swagger UI，里面有所有接口和参数说明。

---

## 方法二：看项目代码

### 1. 找到 app/api.py 或类似文件
里面会有类似这样的代码：
```python
@app.post("/chat")
async def chat(request: ChatRequest):
    ...
```

### 2. 看 requirements.txt 或 pyproject.toml
确认用了什么框架（FastAPI / Flask / Django）

---

## 方法三：问他要的 5 个关键信息

复制这段话发给他：

```
我前端 Vue 项目要接入你的 AI 后端，帮我提供以下信息：

1. API 基础地址（Base URL）是什么？
   例如：http://192.168.x.x:8000  或  https://xxx.com

2. 发送消息的接口地址是？
   例如：POST /api/chat  或  POST /v1/chat

3. 请求格式是什么样的？
   我需要发什么 JSON？

4. 返回格式是什么样的？
   我怎么拿到 AI 的回答？

5. 有鉴权吗？需要带什么 Token/Header？

如果有现成的 OpenAPI/Swagger 文档链接就更好了：
https://xxx/docs
```

---

## 🎯 常见 FastAPI 项目接口猜测

根据这类项目的惯例，最可能是：

| 接口 | 方式 | 说明 |
|------|------|------|
| `/chat` 或 `/ask` | POST | 发送消息 |
| `/knowledge` | POST/GET | 知识库管理 |
| `/models` | GET | 获取模型列表 |

**请求示例（猜测）：**
```json
POST http://xxx:8000/chat
{
  "message": "你好",
  "session_id": "xxx"
}
```

**响应示例（猜测）：**
```json
{
  "reply": "你好！有什么可以帮你的？",
  "source": "知识库文件1.pdf"
}
```

⚠️ **这只是猜测，一定要问清楚！**

---

## ⚠️ 注意事项

1. **CORS 要开** — 前端跨域调用需要后端允许
2. **本地开发** — 建议让你朋友在本地先跑起来，你测试通了再部署
3. **大模型配置** — 问清楚用的是哪个模型（ChatGPT / 通义千问 / 本地模型）
4. **知识库怎么传** — 是上传文件还是直接给文本

---

拿到接口信息后告诉我，我帮你写前端对接代码！
