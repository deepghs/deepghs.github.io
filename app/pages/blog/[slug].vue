<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})
</script>

<template>
  <!-- Render the blog post as Prose & Vue components -->
  <div>
    <div v-if="post">
      <ContentRenderer :value="post" />
    </div>
    <div v-else>
      <div class="empty-page">
        <h1>页面未找到</h1>
        <p>抱歉！您查找的内容不存在。</p>
        <NuxtLink to="/">返回首页</NuxtLink>
      </div>
    </div>
  </div>
</template>
