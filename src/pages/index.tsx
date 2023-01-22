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
        <div ref={parent} className="flex flex-col md:flex-row flex-wrap p-2 gap-2 md:justify-evenly justify-center">
          {data.map((event) => {
            return <Card key={event._id} numTarget={event.usersRequired} numAccpt={event.usersAccepted} name={event.eventName} desc={event.description} />
          })}
        </div>
      </main>
    </>
  )
}

const Card = ({ name, numTarget, numAccpt, desc }: { name: string, numTarget: number, numAccpt: number, desc: string }) => {
  return (
    <div className="flex flex-col w-96 mx-auto gap-4 md:flex-row md:justify-between border-neutral-500 border-2 rounded-md sm:p-4 sm:m-4 p-2">
      <div>
        <div className="font-black text-4xl">
          <h2>{name}</h2>
        </div>
        <div>
          <div className="bg-blue-600 m-2 rounded-sm w-24">Accepted: {numAccpt}</div>
          <div className="bg-green-600 m-2 rounded-sm w-24">Required: {numTarget}</div>
        </div>
        <div className="text-justify m-2 font-light">
          {desc}
        </div>
      </div>
      <button className="bg-blue-500 font-bold rounded-sm items-center flex font-white w-max px-4 py-2 hover:bg-blue-600 transition-colors duration-300 h-max my-auto">
        Apply
      </button>
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
