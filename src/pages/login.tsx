import autoAnimate from "@formkit/auto-animate"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const login = async () => {
    setLoading(true)
    setError("")
    // console.log(username, password)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await res.json()
    if (!data || !data.token) {
      setError("Invalid username or password")
      setLoading(false)
      return;
    }
    localStorage.setItem("token", data.token)
    setLoading(false)
    router.push("/")
  }

  const signUp = async () => {
    setLoading(true)
    setError("")
    // console.log(username, password)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await res.json()
    if (data?.message) {
      setError(data.message)
      setLoading(false)
      return;
    }
    if (!data || !data.token) {
      setError("Invalid username or password")
      setLoading(false)
      return;
    }
    localStorage.setItem("token", data.token)
    setLoading(false)
    router.push("/")
  }

  const Spinner = () => {
    return (
      <div className="animate-spin flex flex-row justify-center items-center">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); login(); }} className="flex flex-col justify-center items-center h-screen">
        <div className="font-bold text-2xl mb-4">Login</div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex flex-col justify-center items-center bg-gray-900 rounded-lg shadow-lg p-8">
          {loading ? (<div className="text-white">Loading...<Spinner /></div>) : (
            <div className="flex flex-col items-center">
              <div className="flex flex-row justify-center items-center">
                <div className="mr-2">Username:</div>
                <input type="text" value={username} onChange={(e) => { setUsername(e.currentTarget.value) }} className="border-2 border-gray-300 bg-slate-800 outline-none rounded-lg px-2 py-1" />
              </div>
              <div className="flex flex-row justify-center items-center mt-2">
                <div className="mr-2">Password:</div>
                <input type="password" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }} className="border-2 border-gray-300 bg-slate-800 outline-none rounded-lg px-2 py-1" />
              </div>
              <div className="flex flex-row w-full items-center justify-evenly mt-4">
                <button className="bg-blue-500 p-2 hover:bg-blue-600 transition-colors duration-300 rounded-sm px-[2ch]" onClick={(e) => { e.preventDefault(); login(); }}>Login</button>
                <button className="bg-violet-500 p-2 hover:bg-violet-600 transition-colors duration-300 rounded-sm px-[2ch]" onClick={(e) => { e.preventDefault(); signUp() }} >SignUp</button>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  )

}
