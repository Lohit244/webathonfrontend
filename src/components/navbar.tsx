import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Navbar = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("token")
      if (token) {
        setLoggedIn(true)
      }
    }
  })



  return (
    <>
      <div className="flex flex-row-reverse justify-between md:mx-16 py-2 sm:mx-8">
        {loggedIn && (
          <Link href="/myposts" className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-sm px-[2ch]">
            My Postings
          </Link>
        )}
        <div className={`${loggedIn ? "bg-red-500" : "bg-blue-500"} ${loggedIn ? "hover:bg-red-600" : "hover:bg-blue-600"} transition-colors duration-300 rounded-sm px-[2ch]`} onClick={
          () => {
            if (loggedIn) {
              setLoggedIn(false)
              localStorage.removeItem("token")
              router.push("/")
            }
          }}>
          {loggedIn ? "Logout" : <Link href="/login">Login</Link>}
        </div>
      </div>
    </>
  )
}

export default Navbar
