<template>
  <div class="home">
    <h1>🎉 欢迎, {{ user }}!</h1>
    <p>你已成功登录</p>
    <button @click="handleLogout">退出登录</button>
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
  text-align: center;
  padding: 50px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

button {
  padding: 10px 30px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #c53030;
}
</style>
