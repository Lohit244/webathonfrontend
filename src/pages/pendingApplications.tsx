import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function MyPosts() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [applications, setApplications] = useState<any[]>([])
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/applied`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': localStorage.getItem('token') || ''
      },
    })
    console.log(res)
    const data = await res.json()
    setApplications(data.events)
    console.log(data.events)
    setLoading(false)
  }

  useEffect(() => {
    if (loggedIn) getPosts();
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
      <h1 className="font-bold text-3xl mx-2">Pending application requests</h1>
      <div className="flex flex-row flex-wrap p-2 gap-2 md:justify-evenly justify-center">
        {loading ? <div>Loading...<Spinner /></div> : applications.map((application) => {
          return <Card post={application} key={application._id} />
        })} 
      </div>
    </div>
  )

}

const Card = ({ post }: any) => {
  return (
    <>
      <div key={post._id} className="flex flex-col w-96 mx-auto gap-4 md:justify-between border-neutral-500 border-2 rounded-md sm:p-4 sm:m-4 p-2">
        <div className="flex flex-col items-center">
          <div className="font-black text-4xl">
            <h2>{post.eventName}</h2>
          </div>
          <div className="flex w-full flex-col">
          <div className="bg-blue-600 m-2 rounded-sm px-[2ch]">Required: {post.usersRequired}</div>
            {/* <div className="bg-green-600 m-2 rounded-sm px-[2ch]">Event id : {post.applications.event}</div> */}
          </div>
        {post.description}
        </div>
        <div className="text-justify m-2 font-light h-full">
        </div>
      </div>
    </>
  )
}
