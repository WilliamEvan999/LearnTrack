import api from "./index"

type Progress = {
  total_courses: number
  completed_courses: number
  total_tasks: number
  completed_tasks: number
  study_seconds: number
  today_seconds: number
  best_streak: number
  current_streak: number

  study_performance: {
    date: string
    seconds: number
  }[]
}

type Endpoints = {
  getProgress: () => Promise<Progress>
}

const endpoints: Endpoints = {
  getProgress: async () => {
    return await api("progress")
  },
}

export default endpoints