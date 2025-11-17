import type { SocialLink } from './common'

export interface Collaborator {
  name: string
  description?: string
  logoUrl?: string
  social?: SocialLink[]
  tags?: string[]
}
