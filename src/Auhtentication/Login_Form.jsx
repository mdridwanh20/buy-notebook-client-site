import React, { useContext } from "react";
import { Link } from "react-router";
import { MyContext } from "../AuthProver/AuthProver";
import { TbFidgetSpinner } from "react-icons/tb";

export default function Login_Form({ handlerLogin }) {
  const { loading } = useContext(MyContext);

  return (
    <div className="py-5  px-5">
      <form onSubmit={handlerLogin}>
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
            className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-gray-400 placeholder-[#7f8c8d] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-2">
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
            className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="text-center mb-5 text-gray-700">
          <p>
            Don't have any account{" "}
            <Link
              to={"/account/register"}
              className="text-[var(--primaryColor)] font-bold"
            >
              Login{" "}
            </Link>
            please
          </p>
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
              Login
            </button>
          </>
        )}
      </form>
    </div>
  );
}
