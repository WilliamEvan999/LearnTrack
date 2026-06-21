import api from "./index"

type Task = {
  id: number
  title: string
  category: string
  due_date: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

type Endpoints = {
  getTasks: () => Promise<Task[]>
  getTask: (idTask: number) => Promise<Task>
  createTask: (task: Partial<Task>) => Promise<Task>
  updateTask: (task: Partial<Task>) => Promise<Task>
  deleteTask: (idTask: number) => Promise<Task>
}

const endpoints: Endpoints = {
  getTasks: async () => {
    return await api("tasks")
  },

  getTask: async (idTask) => {
    return await api(`tasks/${idTask}`)
  },

  createTask: async (task) => {
    return await api("tasks", {
      method: "post",
      data: {
        task,
      },
    })
  },

  updateTask: async (task) => {
    return await api(`tasks/${task.id}`, {
      method: "put",
      data: {
        task,
      },
    })
  },

  deleteTask: async (idTask) => {
    return await api(`tasks/${idTask}`, {
      method: "delete",
    })
  },
}

export default endpoints