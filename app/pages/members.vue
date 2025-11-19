<template>
  <div>
    <UPageSection orientation="horizontal">
      <template #title>
        <span>{{ textConfig.title }}</span>
      </template>
      <template #description>
        <span>{{ textConfig.description }}</span>
      </template>
      <DAvatarGroup class="flex flex-wrap gap-2" :max="47" size="3xl" :avatars="fullMemberAvatars" />
    </UPageSection>
    <UPageSection id="members">
      <template #body>
        <!-- Founder -->
        <div class="mt-8">
          <div class="mb-4">
            <div class="mb-4">
              <span class="font-bold text-3xl">Founder</span>
            </div>
            <UPageGrid>
              <MemberCard
                v-for="(member, index) in founder"
                :key="index"
                :member="member"
              />
            </UPageGrid>
          </div>
        </div>
        <!-- Core Members -->
        <div class="mt-8">
          <div class="mb-4">
            <div class="mb-4">
              <span class="font-bold text-3xl">Core Team</span>
            </div>
            <UPageGrid>
              <MemberCard
                v-for="(member, index) in core"
                :key="index"
                :member="member"
              />
            </UPageGrid>
          </div>
        </div>
        <!-- Partners -->
        <div class="mt-8">
          <div class="mb-4">
            <div class="mb-4">
              <span class="font-bold text-3xl">Partners</span>
            </div>
            <UPageGrid>
              <MemberCard
                v-for="(partner, index) in partners"
                :key="index"
                :member="partner"
              />
            </UPageGrid>
          </div>
        </div>
        <!-- Normal Members -->
        <div class="mt-8">
          <div class="mb-4">
            <div class="mb-4">
              <span class="font-bold text-3xl">Normal Members</span>
            </div>
            <UPageGrid>
              <MemberCard
                v-for="(member, index) in normalMembers"
                :key="index"
                :member="member"
              />
            </UPageGrid>
          </div>
        </div>
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import coreMembers from '@/json/members/core.json'
import partners from '@/json/members/partner.json'
import normalMembers from '@/json/members/normal.json'
import type { Member } from '@/types/members'
import textConfig from '@/json/members/text.json'
import type { Avatar } from '~/types/common'

const founder: Member[] = coreMembers.filter(member => member.type === 'founder')
const core: Member[] = coreMembers.filter(member => member.type === 'core')

const sortedNormalMembers = normalMembers.sort((a, b) => {
  if (a.num_papers === b.num_papers) {
    return b.num_followers - a.num_followers
  } else {
    return b.num_papers - a.num_papers
  }
})

const fullMembers: Member[] = [...founder, ...core, ...partners, ...sortedNormalMembers]

const fullMemberAvatars = computed<Avatar[]>(() => {
  return fullMembers.map(member => ({
    src: member.avatar || '',
    name: member.name || 'Avatar'
  }))
})
</script>
