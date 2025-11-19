<template>
  <div class="inline-flex flex-row justify-start">
    <UAvatar
      v-for="(avatar, index) in renderAvatar"
      :key="`avatar-${index}`"
      class="relative ring-bg ring-3 -me-2"
      :src="avatar.src || ''"
      :alt="avatar.name"
      :size="size"
    />
    <UAvatar
      v-if="renderMoreUsers"
      class="relative ring-bg ring-3 -me-2"
      :text="`+${exceedingNumber}`"
      :size="size"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Avatar } from '~/types/common'

type Size = '3xl' | 'md' | '3xs' | '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl'

const { max, size, avatars } = defineProps({
  max: {
    type: Number,
    default: 5
  },
  size: {
    type: String as () => Size,
    default: '3xl'
  },
  avatars: {
    type: Array as () => Array<Avatar>,
    default: () => []
  }
})

const renderMoreUsers = computed(() => avatars.length > max)

const exceedingNumber = computed(() => avatars.length - max)

const renderAvatar = computed<Array<Avatar>>(() => {
  if (!avatars || avatars.length === 0) {
    return []
  }

  if (avatars.length <= max) {
    return avatars.map((avatar) => {
      return {
        src: preprocessAvatar(avatar.src),
        name: avatar.name
      }
    })
  }

  return avatars.slice(0, max).map((avatar) => {
    return {
      src: preprocessAvatar(avatar.src),
      name: avatar.name
    }
  })
})

function preprocessAvatar(avatarPath: string | null | undefined) {
  if (!avatarPath) {
    return ''
  }

  if (avatarPath.startsWith('/')) {
    return `https://huggingface.co${avatarPath}`
  }

  return avatarPath
}
</script>
