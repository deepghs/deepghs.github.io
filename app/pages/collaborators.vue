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
          v-for="(collaborator, index) in fullCollaborators"
          :key="`avatar-${index}`"
          :src="collaborator.logoUrl"
          :alt="collaborator.name"
        />
      </UAvatarGroup>
    </UPageSection>
    <UPageSection id="collaborators">
      <template #body>
        <!-- Collaborators -->
        <div class="mt-8">
          <div class="mb-4">
            <div class="mb-4">
              <span class="font-bold text-3xl">Collaborators</span>
            </div>
            <UPageGrid>
              <CollaboratorCard
                v-for="(collaborator, index) in collaborators"
                :key="index"
                :collaborator="collaborator"
              />
            </UPageGrid>
          </div>
        </div>
        <!-- Sponsors -->
        <div class="mt-8">
          <div class="mb-4">
            <div class="mb-4">
              <span class="font-bold text-3xl">Sponsors</span>
            </div>
            <UPageGrid>
              <CollaboratorCard
                v-for="(collaborator, index) in sponsors"
                :key="index"
                :collaborator="collaborator"
              />
            </UPageGrid>
          </div>
        </div>
      </template>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import collaborators from '@/json/collaborators/collaborators.json'
import sponsors from '@/json/collaborators/sponsors.json'
import type { Collaborator } from '@/types/collaborators'
import textConfig from '@/json/collaborators/text.json'

const fullCollaborators: Collaborator[] = [...collaborators, ...sponsors]
</script>
