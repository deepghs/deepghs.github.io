import type { SocialLink } from './common'

export interface Member {
  name: string
  role?: string
  type?: string
  location?: string
  avatar?: string
  detail?: MemberDetail
}

export interface MemberDetail {
  social?: SocialLink[]
  expertise?: string[]
  sign?: string
  bio?: string
}
