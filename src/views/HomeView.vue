<template>
  <div class="home">
    <div class="card">
      <h1>🎉 欢迎, {{ user }}!</h1>
      <p class="sub">你已成功登录</p>

      <!-- 功能入口 -->
      <div class="entries">
        <div class="entry" @click="router.push('/assistant')">
          <div class="icon">🤖</div>
          <div class="info">
            <div class="name">AI 助手</div>
            <div class="desc">校园问题智能问答</div>
          </div>
          <div class="arrow">→</div>
        </div>
      </div>

      <button class="logout" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    router.push('/login')
  } else {
    user.value = storedUser
  }
})

function handleLogout() {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 380px;
  text-align: center;
}

h1 {
  color: #333;
  margin: 0 0 8px;
  font-size: 24px;
}

.sub {
  color: #999;
  font-size: 14px;
  margin: 0 0 28px;
}

/* ---------- 功能入口 ---------- */
.entries {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.entry {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid #e6e8ee;
  border-radius: 11px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.entry:hover {
  border-color: #667eea;
  background: #f8f9ff;
  transform: translateY(-1px);
}

.icon {
  font-size: 26px;
  line-height: 1;
}

.info {
  flex: 1;
}

.name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.desc {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.arrow {
  color: #c5c9d6;
  font-size: 18px;
}

.entry:hover .arrow {
  color: #667eea;
}

/* ---------- 退出按钮 ---------- */
.logout {
  width: 100%;
  padding: 11px;
  background: #fff;
  color: #e53e3e;
  border: 1px solid #ffd7d7;
  border-radius: 9px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.logout:hover {
  background: #e53e3e;
  color: #fff;
  border-color: #e53e3e;
}
</style>
