<template>
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="footerLinks">
          <template #left>
            <AppLogo class="w-auto h-9 shrink-0" />
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} DeepGHS • Built with Nuxt
      </p>
    </template>

    <template #right>
      <UButton
        to="https://x.com/DeepGHS"
        target="_blank"
        icon="line-md:twitter-x"
        aria-label="X"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://huggingface.co/deepghs"
        target="_blank"
        icon="logos:hugging-face-icon"
        aria-label="Hugging Face"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://github.com/deepghs"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const footerLinks = [{
  label: 'Quick Links',
  children: [{
    label: 'Blog',
    to: '/blog'
  }]
}, {
  label: 'Hugging Face',
  children: [{
    label: 'Sapces',
    to: 'https://huggingface.co/deepghs/spaces',
    target: '_blank'
  }, {
    label: 'Models',
    to: 'https://huggingface.co/deepghs/models',
    target: '_blank'
  }, {
    label: 'Datasets',
    to: 'https://huggingface.co/deepghs/datasets',
    target: '_blank'
  }]
}, {
  label: 'About Us',
  children: [{
    label: 'Members',
    to: '/members'
  }, {
    label: 'Collaborators',
    to: '/collaborators'
  }, {
    label: 'About',
    to: '/about'
  }]
}]
</script>
