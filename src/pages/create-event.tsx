import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router"

export default function CreateEvent() {
  const router = useRouter()

  const [loggedIn, setLoggedIn] = useState(false);
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [usersRequired, setUsersRequired] = useState("")

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

  if (!loggedIn) {
    return <Link href="/login"> Please Login To Continue</Link>
  }

  let handleSubmit: any = async (e: Event) => {
    e.preventDefault();
    console.log(eventTitle, eventDescription, usersRequired);


    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': localStorage.getItem('token') || ''
      },
      body: JSON.stringify({
        title: eventTitle,
        desc: eventDescription,
        target: usersRequired
      })
    })


    router.push("/")
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mx-4 my-2">New Event</h1>
      <form onSubmit={handleSubmit} className="bg-black flex flex-col mx-4 gap-2">
        <label htmlFor="event-title">Event Title</label>
        <input className="outline-none bg-slate-800 px-2 py-1 rounded-sm" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} id="event-title" />
        <label htmlFor="event-description">Event Description</label>
        <textarea className="outline-none bg-slate-800 px-2 py-1 rounded-sm" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} id="event-description" />
        <label htmlFor="users-required">Number of Team-Mates Required</label>
        <input className="outline-none bg-slate-800 px-2 py-1 rounded-sm" value={usersRequired} onChange={(e) => setUsersRequired(e.target.value)} id="users-required" />

        <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors duration-200 w-max px-2 py-1 mx-auto my-2 rounded-sm">Create!</button>
      </form>
    </div>
  )

}
