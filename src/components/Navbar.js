import React from "react";
import { AiOutlineBank } from "react-icons/ai";

function Navbar() {
  return (
    <>
      <div className="w-screen h-[90px] bg-green-200 drop-shadlow-lg">
        <nav className="flex px-2 justify-center w-full h-full">
          <div className="flex items-center">
            <h1 className="uppercase flex text-center font-bold sm:text-4xl text-3xl text-zinc-800">
              <AiOutlineBank className="mx-2 my-0.5" /> Find your bank
            </h1>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
