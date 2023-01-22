import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
      }
    }
  });
  return (
    <>
      <div className="flex flex-col-reverse justify-end md:mx-16 py-2 sm:mx-8 sm:flex-row gap-2">
        <div>
        </div>
        {loggedIn && (
          <>
            <Link
              href="/myposts"
              className="justify-center flex bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-sm px-[2ch] py-1 items-center">
              My Postings
            </Link>

            <Link
              href="/partof"
              className="justify-center flex bg-violet-500 hover:bg-violet-600 transition-colors duration-300 rounded-sm px-[2ch] py-1 items-center">
              Accepted Applications
            </Link>

            <Link
              href="/create-event"
              className="justify-center flex bg-green-700 hover:bg-green-800 transition-colors duration-300 rounded-sm px-[2ch] py-1 items-center">
              Post an event
            </Link>

            <Link
              href="/pendingApplications"
              className="justify-center flex bg-green-700 hover:bg-green-800 transition-colors duration-300 rounded-sm px-[2ch] py-1 items-center">
              Pending applications
            </Link>
          </>
        )}
        <button
          className={`${loggedIn ? "bg-red-500" : "bg-blue-500"} ${loggedIn ? "hover:bg-red-600" : "hover:bg-blue-600"
            } transition-colors duration-300 rounded-sm px-[2ch] py-2`}
          onClick={() => {
            if (loggedIn) {
              setLoggedIn(false);
              localStorage.removeItem("token");
              router.push("/");
            }
          }}
        >
          {loggedIn ? "Logout" : <Link href="/login">Login</Link>}
        </button>
      </div>
    </>
  );
};

export default Navbar;
