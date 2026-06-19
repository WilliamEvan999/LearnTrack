'use client'

import Link from "next/link"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import apiRouter from "@/api/router"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const registerMutation = useMutation({
    mutationFn: apiRouter.users.register,
  })

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    try {
      const data = await registerMutation.mutateAsync({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      localStorage.setItem("token", data.token)

      alert("Register berhasil!")

      window.location.href = "/dashboard"
    } catch (error) {
      console.error(error)
      alert("Register gagal")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-16">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
            ✨
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Start your learning journey with Learnify.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
            />

          </div>

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
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
            />

          </div>

          <div>

            <label className="text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white"
            />

          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-sky-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </main>
  )
}