<template>
  <div>
    <UPageSection
      title="Blog"
      description="Latest news and updates from the DeepGHS team"
    >
      <DSearchArea />
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          v-bind="post"
          :to="post.path"
        />
      </UBlogPosts>
      <!-- <UPagination v-model:page="page" :total="100" /> -->
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog').all()
)
// const { data: sections } = await useAsyncData('search-sections', () => {
//   return queryCollectionSearchSections('blog')
// })
</script>

<style lang="scss" scoped>

</style>
