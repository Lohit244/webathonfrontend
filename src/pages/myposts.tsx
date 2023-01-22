import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyPosts() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState<any[]>([])
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage) {
      const localtoken = localStorage.getItem("token")
      if (!localtoken) {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        setToken(localtoken);
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
    console.log(data.userEvents)
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
      <h1 className="font-bold text-3xl mx-2">My Posts</h1>
      <div className="flex flex-row flex-wrap p-2 gap-2 md:justify-evenly justify-center">
        {loading ? <div>Loading...<Spinner /></div> : posts.map((post) => {
          return <Card post={post} key={post._id} token={token} />
        })}
      </div>
    </div>
  )

}

const Card = ({ post, token }: any) => {
  const [postData, setPostData] = useState<any[]>();
  const [dataMap, setDataMap] = useState<any>({})
  useEffect(() => {
    const headers = new Headers;
    headers.set('x-auth-token', token);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/application/${post._id}`, {
      headers: headers
    }).then(res => res.json()).then(data => {
      setPostData(data.applications)
      setDataMap(data.dataMap)
    })
  }, [post]);

  const [done, setDone] = useState<any>({});

  const acceptPost = (id: string) => {
    const headers = new Headers;
    headers.set('x-auth-token', token);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/application/accept/${id}`, {
      method: "POST",
      headers: headers
    }).then(() => {
      window.location.reload()
    }
    )
  }

  const rejectPost = (id: string) => {
    const headers = new Headers;
    headers.set('x-auth-token', token);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/application/reject/${id}`, {
      method: "POST",
      headers: headers
    }).then(() => {
      window.location.reload()
    }
    )
  }

  return (
    <>
      <div key={post._id} className="flex flex-col w-96 mx-auto gap-4 md:justify-between border-slate-900 border-2 rounded-md sm:p-4 sm:m-4 p-2">
        <div className="flex flex-col items-center">
          <div className="font-black text-4xl">
            <h2>{post.eventName}</h2>
          </div>
          <div className="flex w-full flex-col">
            <div className="bg-blue-600 m-2 rounded-sm px-[2ch]">Accepted: {post.usersAccepted.length}</div>
            <div className="bg-green-600 m-2 rounded-sm px-[2ch]">Required: {post.usersRequired}</div>
          </div>
        </div>
        <div className="text-justify m-2 font-light h-full">
          {post.description}
        </div>
        <div>
          {postData && postData.map((data: any) => {
            if (done[data._id]) return <div key={data._id} className="bg-green-600 m-2 rounded-sm px-[2ch]">Accepted</div>
            else return (
              <div
                key={data._id}
                className="px-2 py-1 border border-slate-800 rounded-sm my-2">
                <div className="flex font-bold items-center justify-center text-xl flex-row ">
                  {dataMap[data.applicant]}
                </div>
                <div className="text-justify">
                  {data.message}
                </div>
                <div className="flex justify-evenly">
                  <button className="text-xl" onClick={() => { acceptPost(data._id) }}>✅</button>
                  <button className="text-xl" onClick={() => { rejectPost(data._id) }}>❌</button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}
