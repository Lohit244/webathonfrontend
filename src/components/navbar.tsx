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
      <Link href="/" className="text-5xl">
        TeamFind
      </Link>

      <div className="flex flex-row justify-end md:mx-16 py-2 sm:mx-8">
        <div>
          <button className="relative group">
            <div className="relative flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
                <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-right delay-75 group-focus:-translate-y-[1px]"></div>
                <div className="bg-white h-[1px] rounded"></div>
                <div className="bg-white h-[2px] w-1/2 rounded self-end transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-left delay-75 group-focus:translate-y-[1px]"></div>
              </div>
            </div>
          </button>
        </div>
        {loggedIn && (
          <Link
            href="/myposts"
            className="bg-blue-500 mx-3  hover:bg-blue-600 transition-colors duration-300 rounded-sm px-[2ch]">
            My Postings
          </Link>
        )}
        <button
          className={`${loggedIn ? "bg-red-500" : "bg-blue-500"} ${
            loggedIn ? "hover:bg-red-600" : "hover:bg-blue-600"
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

const NavbarPage = (loggedIn:boolean) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row justify-end md:mx-16 py-2 sm:mx-8">
        {loggedIn && (
          <Link
            href="/myposts"
            className="bg-blue-500 mx-3  hover:bg-blue-600 transition-colors duration-300 rounded-sm px-[2ch]"
          >
            My Postings
          </Link>
        )}
        <button
          className={`${loggedIn ? "bg-red-500" : "bg-blue-500"} ${
            loggedIn ? "hover:bg-red-600" : "hover:bg-blue-600"
          } transition-colors duration-300 rounded-sm px-[2ch] py-2`}
          onClick={() => {
            if (loggedIn) {
              // setLoggedIn(false);
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
