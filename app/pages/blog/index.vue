<template>
  <div>
    <UPageSection
      title="Blog"
      description="Latest news and updates from the DeepGHS team"
    >
      <DSearchArea
        :data="searchData"
        :status="searchDataStatus"
        :fields="['title', 'content']"
        :store-fields="['title', 'titles', 'content', 'level']"
      />
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

const { data: searchData, status: searchDataStatus } = await useAsyncData('search', () => {
  return queryCollectionSearchSections('blog', {
    ignoredTags: ['pre']
  })
})

// const { data: sections } = await useAsyncData('search-sections', () => {
//   return queryCollectionSearchSections('blog')
// })
</script>

<style lang="scss" scoped>

</style>
