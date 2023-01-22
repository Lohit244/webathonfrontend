import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function MyPosts() {

  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoggedIn(false)
      }
    }
  })

  if (!loggedIn) {
    router.push("/login");
  }


  return (
    <div>
      <h1>My Posts</h1>
    </div>
  )

}
