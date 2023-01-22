import Head from 'next/head'
import { GetStaticProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import autoAnimate from '@formkit/auto-animate'
type apiResponse = {
  _id: string,
  eventName: string,
  description: string,
  usersAccepted: number,
  usersRequired: number,
}
export default function Home({ data }: {
  data: apiResponse[],
}) {
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (localStorage) {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        setLoggedIn(true);
        setToken(localToken)
      } else {
        setLoggedIn(false);
        setToken("")
      }
    }
  })

  if (!data || !data.length || data.length < 1) {
    return (
      <>
        <Head>
          <title>TeamFind</title>
          <meta name="description" content="Events and team management" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="text-xl font-bold text-center my-4">
          Nothing Found 😕
        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>TeamFind</title>
        <meta name="description" content="Events and team management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div ref={parent} className="flex flex-row flex-wrap p-2 gap-2 md:justify-evenly justify-center">
          {data.map((event) => {
            return <Card key={event._id} token={token} event={event._id} numTarget={event.usersRequired} numAccpt={event.usersAccepted} name={event.eventName} desc={event.description} />
          })}
        </div>
      </main>
    </>
  )
}


const Card = ({ token, name, numTarget, numAccpt, event, desc }: { token: string, event: string, name: string, numTarget: number, numAccpt: number, desc: string }) => {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const sendReq = async () => {
    setLoading(true);
    const headers = new Headers;
    headers.set('x-auth-token', token);
    headers.set('Content-Type', 'application/json');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/application/${event}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        message: message
      })
    })
    const data = await res.json();
    if (res.status != 201) {
      console.log(data)
      setError(data.error)
    }
    setLoading(false)

  }
  if (loading) {
    return <div className="flex flex-col w-96 mx-auto gap-4 md:justify-between border-neutral-500 border-2 rounded-md sm:p-4 sm:m-4 p-2">
      <div className="flex flex-col items-center">
        <div className="font-black text-4xl">
          <h2>{name}</h2>
        </div>
        <div className="flex w-full flex-col">
          <div className="bg-blue-600 m-2 rounded-sm px-[2ch]">Accepted: {numAccpt}</div>
          <div className="bg-green-600 m-2 rounded-sm px-[2ch]">Required: {numTarget}</div>
        </div>
      </div>
      <div className="text-justify m-2 font-light h-full">
        {desc}
      </div>
    </div>
  }

  return (
    <div className="flex flex-col w-96 mx-auto gap-4 md:justify-between border-neutral-500 border-2 rounded-md sm:p-4 sm:m-4 p-2">
      <div className="flex flex-col items-center">
        <div className="font-black text-4xl">
          <h2>{name}</h2>
        </div>
        <div className="flex w-full flex-col">
          <div className="bg-blue-600 m-2 rounded-sm px-[2ch]">Accepted: {numAccpt}</div>
          <div className="bg-green-600 m-2 rounded-sm px-[2ch]">Required: {numTarget}</div>
        </div>
      </div>
      <div className="text-justify m-2 font-light h-full">
        {desc}
      </div>
      {error && error != "" && <div className="text-center m-2 font-light text-rose-500">
        {error}
      </div>

      }
      {token && token != "" && (<>
        <input
          value={message}
          onChange={(e) => { setMessage(e.target.value); }}
          placeholder="Say something to the host"
          className="bg-slate-700 rounded-sm px-2 py-1 outline-none border-transparent border active:border-blue-600"
        />
        <button onClick={sendReq} className="bg-blue-500 font-bold rounded-sm items-center flex font-white w-full px-4 py-2 hover:bg-blue-600 transition-colors duration-300 h-max my-auto">
          Apply
        </button>
      </>
      )}
    </div>
  )
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


export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.API_BASE}/event`)
  const data = await res.json()
  return {
    props: { data },
  }
}
