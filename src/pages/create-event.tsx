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

  let handleSubmit:any = async (e: Event) => {
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
    <div style={{background: 'grey', color: 'black'}}>
      <h1>New Event</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="event-title">Event Title</label>
        <input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} id="event-title"/>
        <label htmlFor="event-description">Event Description</label>
        <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} id="event-description"/>
        <label htmlFor="users-required">Number of Team-Mates Required</label>
        <input value={usersRequired} onChange={(e) => setUsersRequired(e.target.value)} id="users-required"/>
    
        <button>Create!</button> 
      </form>
    </div>
  )

}
