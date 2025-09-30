'use client'
import React, { useState } from 'react'

// Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

// Icons
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from 'lucide-react'

export const Profile = ({ loading }: { loading: boolean }) => {
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false)
  const [repeatPassword, setRepeatPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>("")
  const [surname, setSurname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (name === "" || surname === "" || email === "" || password === "" || repeatPassword === "")
      return toast.error("Please fill in all fields", { className: "!text-red-600" })

    if (password !== repeatPassword) {
      toast.error("Passwords do not match", { className: "!text-red-600" })
      return
    }

    toast.success("Profile updated successfully", { className: "!text-green-600" })
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSave}
      className="backdrop-blur-xl rounded-2xl border border-black/25 dark:border-white/25 px-8 pb-8 pt-12 w-full max-w-xl flex flex-col gap-6
                 bg-white dark:bg-black text-black dark:text-white m-auto"
    >
      <span className="font-bold text-4xl text-center text-black dark:text-white">Profile Settings</span>

      <div className='grid grid-cols-2 gap-4'>
        <div className="relative">
          <Input
            placeholder="Name"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="pr-10 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <User className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white" />
        </div>

        <div className="relative">
          <Input
            placeholder="Surname"
            name="surname"
            id="surname"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            className="pr-10 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <UserCheck className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white" />
        </div>
      </div>

      <div className="relative">
        <Input
          placeholder="Email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="pr-10 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Mail className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white" />
      </div>

      {/* Password */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="pr-10 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        {password.length > 0 ? (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="*:size-5 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </div>
        ) : (
          <Lock className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white" />
        )}
      </div>

      {/* Repeat Password */}
      <div className="relative">
        <Input
          type={showRepeatPassword ? "text" : "password"}
          placeholder="Repeat Password"
          name="repeatPassword"
          id="repeatPassword"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          className="pr-10 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        {repeatPassword.length > 0 ? (
          <div
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            className="*:size-5 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white"
          >
            {showRepeatPassword ? <Eye /> : <EyeOff />}
          </div>
        ) : (
          <Lock className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white" />
        )}
      </div>

      {/* Buttons & Messages */}
      <div className="space-y-3">
        <Button className="w-full !rounded-full text-white dark:text-black" variant="default" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        {error && <p className="text-red-600 font-medium text-center">{error}</p>}
      </div>
    </form>
  )
}
