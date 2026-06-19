'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import apiRouter from "@/api/router"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      window.location.href = "/dashboard"
    }
  }, [])

  const loginMutation = useMutation({
    mutationFn: apiRouter.users.login,
  })

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    try {
      const data = await loginMutation.mutateAsync({
        email,
        password,
      })

      localStorage.setItem("token", data.token)

      alert("Login berhasil!")

      window.location.href = "/dashboard"
    } catch (error) {
      console.error(error)
      alert("Email atau password salah")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-16">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
            📚
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Learnify
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Continue your learning journey.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
            />

          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">

          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="font-semibold text-sky-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </main>
  )
}