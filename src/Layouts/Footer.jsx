import React from 'react';
import { RiCopyrightFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div>
       <footer className="w-full bg-orange-700  py-2  ">
          <p className="text-white flex items-center justify-center gap-2 w-full">
          Copy right
         <RiCopyrightFill className="text-white" />{" "}
      </p>
    </footer>
    </div>
  )
}

export default Footer
