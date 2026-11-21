<!-- 文件路径：src/App.vue -->
<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main>
    <!-- RouterView 是魔法位置：当前路由匹配到的组件会在这里渲染 -->
    <RouterView />
  </main>
</template>