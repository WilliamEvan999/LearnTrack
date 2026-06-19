import api from "./index"

type User = {
  id: number
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

type RegisterPayload = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

type LoginPayload = {
  email: string
  password: string
}

type AuthResponse = {
  message: string
  token: string
  user: User
}

type MeResponse = {
  user: User
}

type LogoutResponse = {
  message: string
}

type Endpoints = {
  register: (user: RegisterPayload) => Promise<AuthResponse>
  login: (credentials: LoginPayload) => Promise<AuthResponse>
  logout: () => Promise<LogoutResponse>
  me: () => Promise<MeResponse>
}

const endpoints: Endpoints = {
  register: async (user) => {
    return await api("users", {
      method: "post",
      data: {
        user,
      },
    })
  },

  login: async (credentials) => {
    return await api("sessions", {
      method: "post",
      data: credentials,
    })
  },

  logout: async () => {
    return await api("sessions", {
      method: "delete",
    })
  },

  me: async () => {
    return await api("me")
  },
}

export default endpoints