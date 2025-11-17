<template>
  <div>
    <UPageSection orientation="horizontal">
      <template #title>
        <span>{{ textConfig.title }}</span>
      </template>
      <template #description>
        <span>{{ textConfig.description }}</span>
      </template>
      <UAvatarGroup size="3xl">
        <UAvatar
          v-for="(member, index) in fullMembers"
          :key="`avatar-${index}`"
          :src="member.avatar"
          :alt="member.name"
        />
      </UAvatarGroup>
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

const founder: Member[] = coreMembers.filter(member => member.type === 'founder')
const core: Member[] = coreMembers.filter(member => member.type === 'core')
const fullMembers: Member[] = [...founder, ...core, ...partners, ...normalMembers]
</script>
