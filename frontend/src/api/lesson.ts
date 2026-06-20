import api from "./index"

type Lesson = {
  id: number
  title?: string
  course_id?: number
  completed?: boolean
  createdAt?: string
  updatedAt?: string
}

type Endpoints = {
  getLessons: () => Promise<Lesson[]>
  getLesson: (idLesson: number) => Promise<Lesson>  
  createLesson: (lesson: Partial<Lesson>) => Promise<Lesson>
  updateLesson: (lesson: Partial<Lesson>) => Promise<Lesson>
  deleteLesson: (idLesson: number) => Promise<Lesson>
}

const endpoints: Endpoints = {
  getLessons: async () => {
    return await api("lessons")
  },

  getLesson: async (idLesson) => {
    return await api(`lessons/${idLesson}`)
  },

  createLesson: async (lesson: Partial<Lesson>) => {
    return await api("lessons", {
      method: "post",
      data: {
        lesson,
      },
    })
  },

  updateLesson: async (lesson: Partial<Lesson>) => {
    return await api(`lessons/${lesson.id}`, {
      method: "put",
      data: {
        lesson,
      },
    })
  },

  deleteLesson: async (idLesson: number) => {
    return await api(`lessons/${idLesson}`, {
      method: "delete",
    })
  },
}

export default endpoints