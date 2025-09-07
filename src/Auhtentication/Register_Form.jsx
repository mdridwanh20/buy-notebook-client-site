import { useContext } from "react";
import { BsGoogle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { MyContext } from "../AuthProver/AuthProver";
import { TbFidgetSpinner } from "react-icons/tb";

export default function Register_Form({ handlerRegister }) {
  const { loading } = useContext(MyContext);

  return (
    <div className="rounded-lg border border-gray-200 p-4 mx-2">
      <form onSubmit={handlerRegister}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-gray-400 placeholder-[#7f8c8d] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Name@example.com"
            autoComplete="email"
            required
            className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-gray-400 placeholder-[#7f8c8d] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block text-sm text-gray-400"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {loading ? (
          <>
            {" "}
            <div className="">
              <button className="font-medium flex items-center justify-center border cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full">
                {" "}
                <TbFidgetSpinner className="animate-spin" />{" "}
              </button>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <button
              type="submit"
              className="font-medium cursor-pointer bg-gradient-to-r from-cyan-700 to-blue-400 px-5 rounded text-white py-2 w-full"
            >
              Create account
            </button>
          </>
        )}

        <div className="text-center py-1 text-gray-700">
          <p>
            I have already account{" "}
            <Link
              to={"/account/login"}
              className="text-[var(--primaryColor)] font-bold"
            >
              Login{" "}
            </Link>
            please
          </p>
        </div>
      </form>

      <div className="relative my-4 text-center">
        <span className="relative z-10 bg-gray-100 px-3 text-gray-400">
          Or continue with
        </span>
        <div className="absolute top-1/2 left-0 h-px w-2/5 -translate-y-1/2 transform bg-gray-300"></div>
        <div className="absolute top-1/2 right-0 h-px w-2/5 -translate-y-1/2 transform bg-gray-300"></div>
      </div>

      {/* GitHub Button */}
      <div className="flex items-center justify-center gap-5 ">
        <button
          type="button"
          className="font-medium cursor-pointer bg-gradient-to-r from-gray-900 to-gray-600 px-5 rounded text-white py-2 w-full flex items-center justify-center gap-2"
        >
          <FaGithub size={20} />
          Github
        </button>

        {/* Google Button */}

        <button
          type="button"
          className=" font-medium cursor-pointer bg-gradient-to-r from-gray-900 to-gray-600 px-5 rounded text-white py-2 w-full flex items-center justify-center gap-2"
        >
          <BsGoogle />
          Google
        </button>
      </div>
    </div>
  );
}
