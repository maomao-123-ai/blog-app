<!-- 文件路径：src/views/PostView.vue -->
<script setup>
import { useFavoriteStore } from '../stores/useFavoriteStore.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../composables/usePosts.js'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const id = Number(route.params.id)

const { isLoading, error, getArticleById } = usePosts()

// articles 是响应式数据，fetch 完成后 computed 会自动重新计算
const article = computed(() => getArticleById(id))
</script>

<template>
  <div>
    <article v-if="article">
    <div class="post-header">
      <h1>{{ article.title }}</h1>
      <!-- 详情页的收藏按钮：状态与首页完全同步 -->
      <button class="fav-btn" @click="favoriteStore.toggleFavorite(article.id)">
        {{ favoriteStore.isFavorite(article.id) ? '&#x2665; 已收藏' : '♡ 收藏' }}
      </button>
    </div>
    <!-- ... -->
     </article>
    <p v-if="isLoading">加载中...</p>
    <p v-else-if="error">加载失败：{{ error }}</p>
    <div v-else-if="!article">文章不存在</div>
    <article v-else>
      <h1>{{ article.title }}</h1>
      <div v-html="article.content"></div>
      
    </article>
  </div>
</template>