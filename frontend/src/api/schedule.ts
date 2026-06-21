import api from "./index"

type Schedule = {
  id: number
  title: string
  schedule_date: string
  createdAt?: string
  updatedAt?: string
}

type Endpoints = {
  getSchedules: () => Promise<Schedule[]>
  getSchedule: (idSchedule: number) => Promise<Schedule>
  createSchedule: (schedule: Partial<Schedule>) => Promise<Schedule>
  updateSchedule: (schedule: Partial<Schedule>) => Promise<Schedule>
  deleteSchedule: (idSchedule: number) => Promise<Schedule>
}

const endpoints: Endpoints = {
  getSchedules: async () => {
    return await api("schedules")
  },

  getSchedule: async (idSchedule) => {
    return await api(`schedules/${idSchedule}`)
  },

  createSchedule: async (schedule) => {
    return await api("schedules", {
      method: "post",
      data: {
        schedule,
      },
    })
  },

  updateSchedule: async (schedule) => {
    return await api(`schedules/${schedule.id}`, {
      method: "put",
      data: {
        schedule,
      },
    })
  },

  deleteSchedule: async (idSchedule) => {
    return await api(`schedules/${idSchedule}`, {
      method: "delete",
    })
  },
}

export default endpoints