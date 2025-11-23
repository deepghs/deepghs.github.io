import type { DeepGHSProject } from './projects'

export type WorkModule = {
  id: string
  title: string
  description: string
  cta: {
    label: string
    to: string
    disabled?: boolean
  }
  repos?: DeepGHSProject[]
  emptyMessage?: string
}
