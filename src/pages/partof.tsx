import { useEffect, useState } from "react";

const Events = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
        setToken(token);
      } else {
        setLoggedIn(false);
      }
    }
  })

  useEffect(() => {
    if (loggedIn) {
      const headers = new Headers;
      headers.set('x-auth-token', token);
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/partof`, {
        method: "GET",
        headers: headers
      }).then(res => res.json()).then(data => {
        setEvents(data);
        console.log(data)
        setLoading(false);
      }).catch(err => {
        console.log(err);
        setLoading(false);
      })
    }

  }, [token])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="flex flex-row flex-wrap p-2 gap-2 md:justify-evenly justify-center">
            {events.map((event, index) => {
              return (
                <EventCard key={index} name={event.eventName} description={event.description} numAccpt={event.usersAccepted.length} numTarget={event.usersRequired} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

const EventCard = ({ name, description, numAccpt, numTarget }: any) => {
  return <>
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
        {description}
      </div>
    </div>
  </>
}

export default Events
