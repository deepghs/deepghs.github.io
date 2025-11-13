<template>
  <UCard class="select-none">
    <div class="flex items-center">
      <div class="mr-2">
        <UAvatar :src="member.avatar" :alt="member.name" size="3xl" />
      </div>
      <div class="flex-1 ml-2">
        <!-- member name -->
        <div>
          <span class="text-lg font-bold">
            {{ member.name }}
          </span>
        </div>
        <!-- member role -->
        <div>
          <span class="text-sm text-blue-500">
            {{ member.role }}
          </span>
        </div>
        <!-- member location with icon -->
        <div class="flex items-center">
          <UIcon name="mingcute:location-line"/>
          <div class="ml-1">
            <span class="text-sm text-gray-500">
              {{ member.location }}
            </span>
          </div>
        </div>
      </div>
      <!-- extra actions -->
      <div v-if="member.detail">
        <UPopover>
          <UButton class="rounded-full" label="Detail" color="neutral" variant="subtle" />
          <template #content>
            <div class="max-w-md rounded-md p-4 select-none">
              <div v-if="member.detail.sign" class="mb-2">
                 <span class="text-sm font-bold">
                   "{{ member.detail.sign }}"
                 </span>
              </div>
              <div v-if="member.detail.bio" class="mb-4">
                <span class="text-sm text-gray-500">
                  {{ member.detail.bio }}
                </span>
              </div>
              <div v-if="member.detail.expertise && member.detail.expertise.length > 0" class="mb-4">
                <span class="text-sm font-bold">
                  Expertise
                </span>
                <div class="flex flex-wrap gap-2 mt-2">
                  <!-- outline round border tag for each expertise -->
                  <UButton
                    v-for="(item, index) in member.detail.expertise"
                    :key="'exp-' + index"
                    color="primary"
                    variant="subtle"
                    class="text-xs rounded-full px-2 py-1 mr-2 mb-2"
                  >
                    {{ item }}
                  </UButton>
                </div>
              </div>
              <div v-if="member.detail.social && member.detail.social.length > 0">
                <span class="text-sm font-bold">
                  Social Links
                </span>
                <div class="flex gap-2">
                  <UButton
                    v-for="social in member.detail.social"
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
        </UPopover>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { member } = defineProps({
  member: {
    type: Object,
    required: true
  }
})
</script>
