<!-- 文件路径：src/views/HomeView.vue -->
<script setup>
import { usePosts } from '../composables/usePosts.js'
import BlogCard from '../components/BlogCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'

// 一行代码获取所有文章相关的数据和方法
const {
  isLoading,
  error,
  activeCategory,
  keyword,
  categories,
  filteredArticles,
  setCategory,
  fetchPosts
} = usePosts()
</script>

<template>
  <div class="home">
    <div class="search-bar">
      <input
        v-model="keyword"
        type="text"
        placeholder="搜索文章标题或摘要..."
      />
    </div>

    <CategoryFilter
      :categories="categories"
      :active-category="activeCategory"
      @update-category="setCategory"
    />

    <p v-if="isLoading">加载中...</p>
    <p v-else-if="error">加载失败：{{ error }}
      <button @click="fetchPosts">重试</button>
    </p>
    <p v-else-if="filteredArticles.length === 0">没有匹配的文章</p>
    <div v-else class="article-grid">
      <BlogCard
        v-for="article in filteredArticles"
        :key="article.id"
        :id="article.id"
        :title="article.title"
        :summary="article.summary"
        :date="article.date"
        :category="article.category"
      />
    </div>
  </div>
</template>