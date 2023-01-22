import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function MyPosts() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([])
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const localtoken = localStorage.getItem("token")
      if (!localtoken) {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
      }
    }
  })

  const getPosts = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/event/user`, {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                          'x-auth-token': localStorage.getItem('token') || ''
                        },
                      })
    const data = await res.json()
    setPosts(data.userEvents)
    setLoading(false)
  }

  useEffect(() => {
    if(loggedIn) getPosts();
  }, [loggedIn])

  const [loading, setLoading] = useState(true);

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

  if (!loggedIn) {
    return <Link href="/login"> Please Login To Continue</Link>
  } 

  return (
    <div>
      <h1>My Posts</h1>
      {loading ? <div>Loading...<Spinner /></div> : posts.map((post, index) => <div>Post number{index} is</div>)}
    </div>
  )

}
