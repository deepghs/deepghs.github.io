<template>
  <UCard class="select-none">
    <div class="flex items-center">
      <div class="mr-2">
        <UAvatar
          :src="collaborator.logoUrl"
          :alt="collaborator.name"
          size="3xl"
        />
      </div>
      <div class="flex-1 ml-2">
        <!-- collaborator name -->
        <div>
          <span class="text-lg font-bold">
            {{ collaborator.name }}
          </span>
        </div>
        <div>
          <!-- 只显示两行，超出部分省略 -->
          <span class="text-slate-400 text-sm mb-2 line-clamp-2">
            {{ collaborator.description }}
          </span>
        </div>
        <!-- collaborator location with icon -->
        <div class="flex items-center">
          <div class="flex flex-wrap gap-1">
            <UButton
              v-for="(item, index) in tags"
              :key="'exp-' + index"
              color="primary"
              variant="subtle"
              class="text-xs rounded-full px-2 py-0.5"
            >
              {{ item }}
            </UButton>
          </div>
        </div>
      </div>
      <!-- extra actions -->
      <div>
        <UButton
          class="rounded-full"
          label="Detail"
          color="neutral"
          variant="subtle"
          @click="openCollapse"
        />
      </div>
    </div>
    <UCollapsible v-model:open="open">
      <template #content>
        <div class="max-w-md rounded-md p-4 select-none">
          <div v-if="collaborator.description" class="mb-4">
            <span class="text-sm text-gray-500">
              {{ collaborator.description }}
            </span>
          </div>
          <div
            v-if="collaborator.tags && collaborator.tags.length > 0"
            class="mb-4"
          >
            <span class="text-sm font-bold"> Collaboration Areas</span>
            <div class="flex flex-wrap gap-2 mt-2">
              <!-- outline round border tag for each expertise -->
              <UButton
                v-for="(item, index) in collaborator.tags"
                :key="'exp-' + index"
                color="primary"
                variant="subtle"
                class="text-xs rounded-full px-2 py-1"
              >
                {{ item }}
              </UButton>
            </div>
          </div>
          <div v-if="collaborator.social && collaborator.social.length > 0">
            <span class="text-sm font-bold"> Social Links </span>
            <div class="flex gap-2">
              <UButton
                v-for="social in collaborator.social"
                :key="social.name"
                target="_blank"
                :to="social.url"
                :icon="social.icon"
                color="primary"
                variant="ghost"
              >
                {{ social.platform }}
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UCollapsible>
  </UCard>
</template>

<script setup lang="ts">
const { collaborator } = defineProps({
  collaborator: {
    type: Object,
    required: true
  }
})

const tags = collaborator.tags.slice(0, 2)

const open = ref(false)

function openCollapse() {
  console.log('open')
  open.value = !open.value
}
</script>
