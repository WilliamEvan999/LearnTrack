import api from "./index"

type StudySession = {
  id: number
  description: string
  started_at: string
  ended_at: string
  duration_seconds: number
  user_id: number
  createdAt?: string
  updatedAt?: string
}

type Endpoints = {
  getStudySessions: () => Promise<StudySession[]>
  getStudySession: (idStudySession: number) => Promise<StudySession>
  createStudySession: (studySession: Partial<StudySession>) => Promise<StudySession>
  updateStudySession: (studySession: Partial<StudySession>) => Promise<StudySession>
  deleteStudySession: (idStudySession: number) => Promise<StudySession>
}

const endpoints: Endpoints = {
  getStudySessions: async () => {
    return await api("study_sessions")
  },

  getStudySession: async (idStudySession) => {
    return await api(`study_sessions/${idStudySession}`)
  },

  createStudySession: async (studySession) => {
    return await api("study_sessions", {
      method: "post",
      data: {
        study_session: studySession,
      },
    })
  },

  updateStudySession: async (studySession) => {
    return await api(`study_sessions/${studySession.id}`, {
      method: "put",
      data: {
        study_session: studySession,
      },
    })
  },

  deleteStudySession: async (idStudySession) => {
    return await api(`study_sessions/${idStudySession}`, {
      method: "delete",
    })
  },
}

export default endpoints