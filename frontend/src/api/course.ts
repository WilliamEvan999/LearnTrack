import api from "./index"

type Lesson = {
  id: number
  title: string
  completed: boolean
  course_id: number
}

type Course = {
  id: number
  title: string
  category: string
  lessons_count: number
  progress: number
  lessons: Lesson[]
  createdAt?: string
  updatedAt?: string
}

type Endpoints = {
  getCourses: () => Promise<Course[]>
  getCourse: (idCourse: number) => Promise<Course>
  createCourse: (course: Partial<Course>) => Promise<Course>
  updateCourse: (course: Partial<Course>) => Promise<Course>
  deleteCourse: (idCourse: number) => Promise<Course>
}

const endpoints: Endpoints = {
  getCourses: async () => {
    return await api("courses")
  },

  getCourse: async (idCourse) => {
    return await api(`courses/${idCourse}`)
  },

  createCourse: async (course) => {
    return await api("courses", {
      method: "post",
      data: {
        course,
      },
    })
  },

  updateCourse: async (course) => {
    return await api(`courses/${course.id}`, {
      method: "put",
      data: {
        course,
      },
    })
  },

  deleteCourse: async (idCourse) => {
    return await api(`courses/${idCourse}`, {
      method: "delete",
    })
  },
}

export default endpoints