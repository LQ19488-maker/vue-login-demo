<template>
  <div class="page">
    <!-- 顶部栏 -->
    <header class="topbar">
      <button class="back" @click="router.push('/')">← 返回</button>
      <div class="title">
        <span class="logo">🤖</span>
        <span>校园通识AI智慧体</span>
      </div>
      <span class="status" :class="connected ? 'ok' : 'pending'">
        {{ connected ? '● 已连接' : '○ 等待接入' }}
      </span>
    </header>

    <!-- 消息区 -->
    <main ref="chatRef" class="chat">
      <div v-for="(msg, i) in messages" :key="i" class="row" :class="msg.role">
        <div class="bubble" :class="msg.role">
          <div class="text">{{ msg.text }}</div>

          <!-- 出处引用 -->
          <div v-if="msg.citations && msg.citations.length" class="cites">
            <div class="cites-title">📖 出处</div>
            <div v-for="(c, j) in msg.citations" :key="j" class="cite-item">
              [{{ j + 1 }}] 《{{ c.title }}》{{ c.section ? ' · ' + c.section : '' }}
              <span v-if="c.score" class="score">相似度 {{ Math.round(c.score * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 快捷问题 -->
    <div class="chips">
      <span v-for="q in quickQuestions" :key="q" class="chip" @click="send(q)">{{ q }}</span>
    </div>

    <!-- 输入区 -->
    <footer class="composer">
      <textarea
        v-model="draft"
        rows="1"
        placeholder="输入你的问题，Enter 发送"
        @keydown.enter.prevent="send()"
      ></textarea>
      <button :disabled="sending" @click="send()">
        {{ sending ? '···' : '发送' }}
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ═══════════════════════════════════════════════════════════
//  ⚙️  AI 后端接入配置  —— 以后只需要改这两个常量！
// ═══════════════════════════════════════════════════════════
const AI_ENABLED = true          // 接入时改成 true
const AI_API_BASE = 'https://kinsman-possibly-refinery.ngrok-free.dev'            // 例如 'https://ai.example.com'
const AI_CHAT_PATH = '/api/v1/chat/completions'
// ═══════════════════════════════════════════════════════════

const connected = ref(false)
const sending = ref(false)
const draft = ref('')
const chatRef = ref(null)
const sessionId = ref('')

const quickQuestions = [
  '怎么申请国家励志奖学金？',
  '图书馆几点关门？',
  '宿舍报修怎么处理？',
  '转专业需要什么条件？'
]

const messages = ref([
  {
    role: 'ai',
    text: '👋 你好，我是校园通识AI智慧体。\n接口对接完成后，我就能回答报到、军训、宿舍、奖学金、图书馆、教务等校园问题，并且会标注答案出处。'
  }
])

onMounted(() => {
  // 预留：接入后这里会先探测后端健康状态
  // checkHealth()
  scrollToBottom()
})

function scrollToBottom() {
  nextTick(() => {
    if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight
  })
}

function pushMessage(role, text, citations = null) {
  messages.value.push({ role, text, citations })
  scrollToBottom()
}

async function send(preset) {
  const question = (preset ?? draft.value).trim()
  if (!question || sending.value) return

  pushMessage('user', question)
  draft.value = ''
  sending.value = true

  try {
    if (!AI_ENABLED) {
      // ── 还没接入后端：显示占位提示 ──
      await new Promise((r) => setTimeout(r, 400))
      pushMessage(
        'ai',
        '⏳ AI 助手正在接入中，暂时还无法回答问题。\n\n届时将支持：\n· 基于校园知识库的准确问答\n· 每条回答标注出处\n· 多轮对话记忆\n\n敬请期待！'
      )
      return
    }

    // ── 已接入：调用真实接口 ──
    const res = await fetch(AI_API_BASE + AI_CHAT_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        session_id: sessionId.value || null
      })
    })

    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()

    if (data.session_id) sessionId.value = data.session_id
    connected.value = true

    if (data.answered === false) {
      pushMessage('ai', '抱歉，知识库中暂时没有找到相关内容。')
    } else {
      pushMessage('ai', data.answer, data.citations || [])
    }
  } catch (err) {
    connected.value = false
    pushMessage('ai', '⚠️ 无法连接 AI 服务，请稍后再试。\n(' + err.message + ')')
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f6fa;
}

/* ---------- 顶部栏 ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  flex-shrink: 0;
}

.back {
  background: rgba(255, 255, 255, 0.18);
  border: none;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.back:hover {
  background: rgba(255, 255, 255, 0.3);
}

.title {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.logo {
  font-size: 20px;
}

.status {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.18);
}

.status.pending {
  color: #ffe08a;
}

.status.ok {
  color: #b9f6ca;
}

/* ---------- 消息区 ---------- */
.chat {
  flex: 1;
  overflow-y: auto;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: flex;
}

.row.user {
  justify-content: flex-end;
}

.row.ai {
  justify-content: flex-start;
}

.bubble {
  max-width: 78%;
  padding: 11px 15px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.7;
  word-break: break-word;
}

.bubble.ai {
  background: #fff;
  color: #333;
  border: 1px solid #e6e8ee;
  border-bottom-left-radius: 4px;
}

.bubble.user {
  background: #667eea;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.text {
  white-space: pre-wrap;
}

/* ---------- 出处 ---------- */
.cites {
  margin-top: 10px;
  padding-top: 9px;
  border-top: 1px dashed #e6e8ee;
  font-size: 13px;
  color: #888;
}

.cites-title {
  font-weight: 600;
  color: #667eea;
  margin-bottom: 4px;
}

.cite-item {
  margin-top: 3px;
}

.score {
  color: #aaa;
  margin-left: 6px;
}

/* ---------- 快捷问题 ---------- */
.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0 18px 10px;
  flex-shrink: 0;
}

.chip {
  padding: 5px 12px;
  border: 1px solid #dfe3ec;
  background: #fff;
  color: #777;
  border-radius: 99px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.chip:hover {
  color: #667eea;
  border-color: #667eea;
}

/* ---------- 输入区 ---------- */
.composer {
  display: flex;
  gap: 9px;
  padding: 12px 18px 16px;
  background: #fff;
  border-top: 1px solid #e6e8ee;
  flex-shrink: 0;
}

.composer textarea {
  flex: 1;
  resize: none;
  height: 44px;
  padding: 11px 13px;
  border: 1px solid #dfe3ec;
  border-radius: 11px;
  font: inherit;
  font-size: 14px;
  outline: none;
  background: #fafbfd;
}

.composer textarea:focus {
  border-color: #667eea;
  background: #fff;
}

.composer button {
  border: none;
  border-radius: 11px;
  padding: 0 22px;
  background: #667eea;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.composer button:hover:not(:disabled) {
  background: #5a67d8;
}

.composer button:disabled {
  background: #c5c9d6;
  cursor: not-allowed;
}
</style>
