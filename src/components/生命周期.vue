<!--onMounted的基本使用-->
<script setup>
import { ref, onMounted } from 'vue'

const message = ref('加载中...')

// onMounted 在组件挂载到页面后执行
onMounted(() => {
  // 此时 DOM 已经渲染完成，可以安全地操作 DOM 或发请求
  console.log('组件已挂载，可以开始加载数据了')
  message.value = '数据加载完成！'
})
</script>

<template>
  <p>{{ message }}</p>
</template>