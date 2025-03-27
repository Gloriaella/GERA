import React, { useContext, useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Auth from '../Context/context'
import { toast } from 'react-toastify' 

const Navbar = () => {
  const {logout} = useContext(Auth);
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = sessionStorage.getItem("currentUser");
    setCurrentUser(loggedUser);
  }, [currentUser]);

  const handleClick = async () => {
    if (currentUser) {
      await logout();
      setCurrentUser("");
      toast.success("Logout successful!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <div>
      <nav className="flex justify-between items-center w-full px-8 bg-gray-900 pt-5 ">
         <div className='md:text-5xl text-3xl text-orange-600 font-bold font-[arial] '>
            <h2>GELLA</h2>
         </div>
          <div>
             <Link to={"/signup"} className=" bg-orange-600 py-2 px-5 text-sm hover:bg-orange-700 rounded-md text-white font-bold  text-center ">
               Sign up 
             </Link>

             {currentUser ? (
                 <Link
                 to={"/"}
                 className={`text-orange-600 p-1.5 font-bold ml-5 `}
                 onClick={handleClick}
               >
                 Logout
               </Link>
               ) : (
              
               <Link to={"/signin"} className="text-white py-2 px-5 ml-5  rounded-md bg-orange-600 text-center hover:bg-orange-700 text-sm font-bold " >
                Sign in
               </Link>
             )}

             
          </div>
      </nav>
      
    </div>
  )
}

export default Navbar
