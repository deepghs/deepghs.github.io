<template>
  <div id="z-search">
    <UInput
      ref="searchInput"
      v-model="word"
      :loading="inSearching"
      class="w-full py-[1em]"
      size="xl"
      variant="none"
      icon="i-lucide-search"
      type="search"
      placeholder="Start Searching"
    />

    <TransitionGroup name="expand">
      <div v-if="status === 'success' && isNoResult" class="no-result">
        无结果
      </div>

      <ol
        v-if="!isNoResult"
        ref="list-result"
        class="scrollcheck-y search-result"
      >
        <slot :items="result">
          <DSearchItem
            v-for="(item) in result"
            :key="item.id"
            v-bind="item"
          />
        </slot>
      </ol>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import MiniSearch from 'minisearch'

const { data, status, fields, storeFields, showResult } = defineProps({
  status: {
    type: String,
    default: 'success'
  },
  data: {
    type: Array as () => Array<any>,
    default: () => []
  },
  fields: {
    type: Array as () => Array<string>,
    default: () => []
  },
  storeFields: {
    type: Array as () => Array<string>,
    default: () => []
  },
  showResult: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['after-search'])

const miniSearch = new MiniSearch({
  fields,
  storeFields,
  searchOptions: {
    prefix: true,
    fuzzy: 0.2
  }
})

const isNoResult = computed(() => {
  if (!showResult) return false
  return word.value && result.value.length === 0
})

const inSearching = computed(() => {
  return status === 'pending'
})

const searchInput = ref<HTMLInputElement>()

const word = ref<string>('')
// const { word } = storeToRefs(searchStore)

const result = computed(() => {
  void data
  const searchResult = miniSearch.search(toValue(word.value))

  if (word.value && word.value !== '') {
    emit('after-search', searchResult)
  } else {
    emit('after-search', null)
  }

  if (showResult) {
    return searchResult
  } else {
    return []
  }
})

miniSearch.addAll(toValue(data || []))
</script>

<style lang="scss" scoped>
.z-search {
  --float-distance: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
}

@keyframes scan {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}

#z-search {
  overflow: hidden;
  width: 95%;
  border: 1px solid var(--ui-primary);
  border-radius: 1em;
  box-shadow: 0 0.5em 1em var(--ld-shadow);
  background-color: var(--ld-bg-card);
  transition: all var(--delay, 200);
  z-index: 1000;
}

#z-search-bgmask {
  position: fixed;
  inset: 0;
  background-color: #0003;
  backdrop-filter: blur(0.2em);
  transition: backdrop-filter 1s;
  transition: opacity var(--delay, 200);
  z-index: 100;

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}

.search-input {
  width: 100%;
  outline: none;
}

.no-result {
  // 设置 max-height 时不要设置 padding
  max-height: 5em;
  padding: 1em 1em 2em;
  text-align: center;
  color: var(--c-text-3);
  transition: all 0.5s;
}

.search-result {
  max-height: 75vh;
  max-height: 75dvh;
  transition: all 0.5s;
  scroll-padding: 2rem;
}

.search-item {
  transition:
    background-color 0.1s,
    opacity 0.2s;
}

.tip {
  max-height: 1rem;
  margin: 0 1em 0.5rem;
  font-size: 0.8em;
  text-align: center;
  color: var(--c-text-3);
  transition: all 0.5s;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
