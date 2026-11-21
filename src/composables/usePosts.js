// 文件路径：src/composables/usePosts.js
//usePosts — 封装文章数据逻辑,这个 Composable 负责：加载数据 + 分类筛选 + 搜索过滤。
import { ref, computed, onMounted } from 'vue'

export function usePosts() {
  const articles = ref([])           // 所有文章数据
  const isLoading = ref(true)        // 加载状态
  const error = ref(null)            // 错误信息
  const activeCategory = ref('全部') // 当前选中的分类
  const keyword = ref('')            // 搜索关键词

  // 提取所有分类（去重）
  const categories = computed(() => {
    const cats = articles.value.map(a => a.category)
    return ['全部', ...new Set(cats)]
  })

  // 过滤后的文章：先按分类，再按关键词
  const filteredArticles = computed(() => {
    let result = articles.value

    // 按分类过滤
    if (activeCategory.value !== '全部') {
      result = result.filter(a => a.category === activeCategory.value)
    }

    // 按关键词过滤（匹配标题或摘要）
    if (keyword.value.trim()) {
      const kw = keyword.value.trim().toLowerCase()
      result = result.filter(a =>
        a.title.toLowerCase().includes(kw) ||
        a.summary.toLowerCase().includes(kw)
      )
    }

    return result
  })

  // 根据 ID 查找单篇文章
  function getArticleById(id) {
    return articles.value.find(a => a.id === id)
  }

  // 切换分类
  function setCategory(cat) {
    activeCategory.value = cat
  }

  // 加载数据
  async function fetchPosts() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('/posts.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      articles.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  // 组件挂载时自动加载
  onMounted(() => {
    fetchPosts()
  })

  // 返回给组件使用的数据和方法
  return {
    articles,
    isLoading,
    error,
    activeCategory,
    keyword,
    categories,
    filteredArticles,
    getArticleById,
    setCategory,
    fetchPosts
  }
}