export interface TodoData {
  id: string
  text: string
  completed: boolean
}

export type TodoStore = TodoData[];
