<template>
  <ul class="list-none m-0 p-0 space-y-1">
    <li v-for="item in normalizedItems" :key="getKey(item)">
      <UButton
        block
        variant="soft"
        class="flex items-center gap-2 w-full text-left px-2 py-1 rounded-lg border transition-colors"
        :class="[
          selectedSet.has(getKey(item)) && !isDisabled(item)
            ? 'border-primary-400 ring-2 ring-primary-300 dark:ring-primary-500'
            : 'border-gray-200 hover:border-primary-300',
          isDisabled(item) ? 'opacity-50 cursor-not-allowed hover:border-gray-200 ring-0' : ''
        ]"
        :color="selectedSet.has(getKey(item)) ? 'primary' : 'neutral'"
        :disabled="isDisabled(item)"
        :aria-disabled="isDisabled(item)"
        @click="toggle(item)"
      >
        <template v-if="hasLeftSlot || getLeftText(item)">
          <span class="flex-shrink-0">
            <slot v-if="hasLeftSlot" name="left" :item="item" />
            <span v-else class="text-sm text-gray-500">{{ getLeftText(item) }}</span>
          </span>
        </template>
        <span class="flex-1 min-w-0">
          <slot :item="item">
            <span class="text-xs">{{ item.label ?? getKey(item) }}</span>
          </slot>
        </span>
        <template v-if="hasRightSlot || getRightText(item)">
          <span class="flex-shrink-0">
            <slot v-if="hasRightSlot" name="right" :item="item" />
            <span v-else class="text-sm text-gray-400">{{ getRightText(item) }}</span>
          </span>
        </template>
      </UButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

type Key = string | number
interface ListItem {
  id?: Key
  label?: string
  leftText?: string
  rightText?: string
  [key: string]: unknown
}

const props = defineProps({
  items: {
    type: Array as () => Array<ListItem | string>,
    default: () => []
  },
  modelValue: {
    type: Array as () => Array<Key>,
    default: () => []
  },
  disabledKeys: {
    type: Array as () => Array<Key>,
    default: () => []
  },
  itemKey: {
    type: String,
    default: 'id'
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Key[]): void
}>()

const slots = useSlots()
const hasLeftSlot = !!slots.left
const hasRightSlot = !!slots.right

const getLeftText = (item: ListItem | string): string =>
  typeof item === 'object' && 'leftText' in item && typeof (item as any).leftText === 'string'
    ? (item as any).leftText
    : ''

const getRightText = (item: ListItem | string): string =>
  typeof item === 'object' && 'rightText' in item && typeof (item as any).rightText === 'string'
    ? (item as any).rightText
    : ''

const normalizedItems = computed<ListItem[]>(() => {
  return props.items.map((it) => {
    if (typeof it === 'string' || typeof it === 'number') {
      return { id: it, label: String(it) }
    }
    return it as ListItem
  })
})

const getKey = (item: ListItem): Key => {
  const key = props.itemKey ? (item as Record<string, unknown>)[props.itemKey] : item.id
  if (key === undefined || key === null) throw new Error('List item key is missing')
  return key as Key
}

const selectedSet = computed(() => new Set(props.modelValue))
const disabledSet = computed(() => new Set(props.disabledKeys))

const isDisabled = (item: ListItem) => disabledSet.value.has(getKey(item))

const toggle = (item: ListItem) => {
  if (isDisabled(item)) return
  const key = getKey(item)
  const next = selectedSet.value.has(key)
    ? props.modelValue.filter(k => k !== key)
    : [...props.modelValue, key]

  emit('update:modelValue', next)
}
</script>
