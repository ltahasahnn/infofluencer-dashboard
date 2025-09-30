'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [passwordType, setPasswordType] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem("isLogged") === "true") {
      router.push("/dashboard")
    }
  }, [router])

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    const hardEmail = "test@test.com";
    const hardPassword = "1234";

    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields", { className: "!text-red-600" });
      setLoading(false);
      return;
    }

    if (email.trim() === hardEmail && password === hardPassword) {
      setTimeout(() => {
        localStorage.setItem("isLogged", "true");
        toast.success("Login successful", { className: "!text-green-600" });
        router.push("/dashboard");
      }, 500);
    } else {
      toast.error("Incorrect email or password", { className: "!text-red-600" });
      setLoading(false);
    }
  }

  return (
    <main className="flex h-dvh items-center justify-center relative p-4">
      <div className="absolute size-full inset-0 bg-[url('/assets/images/background.webp')] bg-cover bg-center brightness-60"></div>
      <form onSubmit={handleForm} className="backdrop-blur-xl rounded-2xl border border-white/25 px-8 pb-8 pt-12 w-full max-w-md flex flex-col gap-6 text-white max-sm:text-sm">
        <span className="font-bold text-4xl text-center text-white">Login</span>

        <div className="relative">
          <Input placeholder="Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} className="pr-10 !border-white/50 focus-visible:!border-white" />
          <User className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-white" />
        </div>

        <div className="relative">
          <Input type={passwordType ? 'text' : 'password'} placeholder="Password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} className="pr-10 !border-white/50 focus-visible:!border-white" />
          {password.length > 0 ?
            <div onClick={() => setPasswordType(!passwordType)} className="*:size-5 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white">
              {passwordType ? <Eye /> : <EyeOff />}
            </div>
            :
            <Lock className="size-5 absolute right-4 top-1/2 -translate-y-1/2 text-white" />
          }
        </div>

        <div className="flex items-center justify-between sm:text-sm text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <Checkbox id="toggle" />
            <Label htmlFor="toggle">Remember Me</Label>
          </div>

          <a href="#" className="font-semibold">Forgot your password?</a>
        </div>

        <div className="space-y-3">
          <Button className="w-full !rounded-full text-black" variant="white" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </main>
  );
}
