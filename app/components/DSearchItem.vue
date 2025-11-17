<template>
  <NuxtLink :to="id" class="search-item block select-none m-4 p-4 rounded-lg cursor-pointer">
    <div class="title flex items-center">
      <UBadge round :class="{ primary: level === 1 }">
        {{ level === 1 ? "Post" : `H${level}` }}
      </UBadge>
      <span class="text-lg font-bold ml-2">
        <template v-for="(seg, i) in highlightTitleSegments" :key="i">
          <span v-if="seg.highlight" class="highlight">{{ seg.text }}</span>
          <template v-else>{{ seg.text }}</template>
        </template>
      </span>
    </div>
    <p class="content mt-1 text-sm">
      <template v-for="(seg, i) in highlightContentSegments" :key="i">
        <span v-if="seg.highlight" class="highlight">{{ seg.text }}</span>
        <template v-else>
          {{ seg.text }}
        </template>
      </template>
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { SearchResult } from 'minisearch'

interface SearchItem extends SearchResult {
  title: string
  content: string
  titles: string[]
  level: number
}

const props = defineProps<Partial<SearchItem>>()

const title = computed(() =>
  [...(props.titles ?? []), props.title].join(' > ')
)
const word = computed(() => props.queryTerms?.[0] ?? '')

function getHighlightSegments(text: string, word: string) {
  if (!word) return [{ text, highlight: false }]
  const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  let lastIndex = 0
  const segments: { text: string, highlight?: boolean }[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex)
      segments.push({ text: text.slice(lastIndex, match.index), highlight: false })
    segments.push({ text: match[0], highlight: true })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length)
    segments.push({ text: text.slice(lastIndex), highlight: false })
  return segments
}

const highlightTitleSegments = computed(() =>
  getHighlightSegments(title.value, word.value)
)
const highlightContentSegments = computed(() =>
  getHighlightSegments(props.content ?? '', word.value)
)
</script>

<style lang="scss" scoped>
.search-item {
  transition: background-color 0.2s;
}

.search-item:hover {
  background-color: var(--ui-bg-elevated);
}

:deep(.highlight) {
  color: var(--ui-primary);
}
</style>
