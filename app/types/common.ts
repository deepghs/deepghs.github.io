export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

export interface Avatar {
  src: string | null | undefined
  name: string
}

const defaultSocialIcon = 'solar:global-outline'

export const getCommonSocialIcon: Record<string, string> = {
  'default': defaultSocialIcon,
  'Github': 'logos:github-icon',
  'HuggingFace': 'logos:hugging-face-icon',
  'X': 'li-simple-icons-x',
  'LinkedIn': 'logos:linkedin-icon',
  'Ko-fi': 'simple-icons:kofi'
}
