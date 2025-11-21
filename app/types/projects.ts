export interface DeepGHSProject {
  repo_id: string
  repo_type: 'space' | 'dataset' | 'model' | 'tool'
  id?: number
  name?: string
  abstract?: string
  bio?: string
  likes?: number
  downloads?: number | null
  keywords?: string[]
  task_types?: string[]
  modality?: string[]
  libraries?: string[]
  created_at?: number
}
export interface DeepGHSSpace extends DeepGHSProject {
  repo_type: 'space'
  downloads?: number | null
}

export interface DeepGHSDataset extends DeepGHSProject {
  repo_type: 'dataset'
  downloads?: number
}

export interface DeepGHSModel extends DeepGHSProject {
  repo_type: 'model'
  downloads?: number
}
