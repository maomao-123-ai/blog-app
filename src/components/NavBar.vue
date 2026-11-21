<!-- 文件路径：src/components/NavBar.vue -->
<script setup>
import { useFavoriteStore } from '../stores/useFavoriteStore.js'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <header class="navbar">
    <a href="/" class="logo">RUNOOB Blog</a>
    <nav>
      <!-- 收藏数量徽标 -->
      <span class="fav-badge" v-if="favoriteStore.favoriteCount > 0">
        收藏 {{ favoriteStore.favoriteCount }}
      </span>
    </nav>
  </header>
</template>

<style scoped>
.fav-badge {
  background: #e74c3c;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
}
</style>