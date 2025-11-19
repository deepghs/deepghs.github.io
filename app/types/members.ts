import type { SocialLink } from './common'

export interface Member {
  name: string
  role?: string | null
  type?: string | null
  location?: string | null
  avatar?: string | null
  detail?: MemberDetail | null
  num_papers?: number | null
  num_followers?: number | null
}

export interface MemberDetail {
  social?: SocialLink[]
  expertise?: string[]
  sign?: string | null
  bio?: string | null
}
