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
      <div className="flex flex-row justify-end md:mx-16 py-2 sm:mx-8">
        <div>
        </div>
        {loggedIn && (
          <Link
            href="/myposts"
            className="justify-center flex bg-blue-500 mx-3  hover:bg-blue-600 transition-colors duration-300 rounded-sm px-[2ch] items-center">
            My Postings
          </Link>
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
