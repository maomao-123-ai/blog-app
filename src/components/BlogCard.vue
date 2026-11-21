<!-- 文件路径：src/components/BlogCard.vue -->
<script setup>
import { useFavoriteStore } from '../stores/useFavoriteStore.js'

const props = defineProps({
  id: Number,
  title: String,
  summary: String,
  date: String,
  category: String
})

const favoriteStore = useFavoriteStore()

// 点击收藏按钮时调用
function handleFavorite(e) {
  e.preventDefault()   // 阻止 RouterLink 的跳转
  favoriteStore.toggleFavorite(props.id)
}
</script>

<template>
  <RouterLink :to="{ name: 'post', params: { id } }" class="card-link">
    <div class="card">
      <span class="tag">{{ category }}</span>
      <h3>{{ title }}</h3>
      <p>{{ summary }}</p>
      <div class="card-footer">
        <span class="date">{{ date }}</span>
        <!-- 收藏按钮：已收藏显示实心，未收藏显示空心 -->
        <button class="fav-btn" @click="handleFavorite">
          {{ favoriteStore.isFavorite(id) ? '&#x2665;' : '♡' }}
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.fav-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #e74c3c;
  padding: 4px 8px;
}
.fav-btn:hover {
  transform: scale(1.2);
}
</style>