// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Auth from "../Context/context";
// import { FiPlusCircle, FiLayout, FiBell, FiCalendar } from "react-icons/fi";
// import { useContext } from "react";

// const Home = () => {
//   const { user } = useContext(Auth);
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 space-y-6 max-w-6xl mx-auto mt-8">
//       {/* Welcome Section */}
//       <div className="bg-orange-200 p-8 rounded-lg text-center shadow-md">
//         <h1 className="text-3xl font-bold text-orange-700">
//           Welcome back, {user ? user.name : "My Friend"}
//         </h1>
//         <p className="text-gray-600 mt-2">
//           "Your time is limited, so don’t waste it living someone else’s life."
//         </p>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <button className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl hover:bg-orange-200 transition w-full" onClick={() => navigate("/dashboard/boards")}>
//           <FiPlusCircle size={32} className="text-orange-700" />
//           <span className="mt-2 font-medium">Create Task</span>
//         </button>

//         <button className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl hover:bg-orange-200 transition w-full" onClick={() => navigate("/dashboard/boards")}> 
//           <FiLayout size={32} className="text-orange-700" />
//           <span className="mt-2 font-medium">View Tasks</span>
//         </button>

//         <button className="flex flex-col items-center bg-white p-4 rounded-lg shadow-xl hover:bg-orange-200 transition w-full" onClick={() => navigate("/dashboard/notifications")}>
//           <FiBell size={32} className="text-orange-700" />
//           <span className="mt-2 font-medium">Recent Notifications</span>
//         </button>

//         <button className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl hover:bg-orange-200 transition w-full" onClick={() => navigate("/dashboard/workflows")}>
//           <FiCalendar size={32} className="text-orange-700" />
//           <span className="mt-2 font-medium">Upcoming Deadlines</span>
//         </button>
//       </div>

//       {/* Image Section */}
//       <div className="mt-10 flex justify-center gap-10">
//         {/* <img 
//           src="https://images.unsplash.com/photo-1529651737248-dad5e287768e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3Rpdml0eXxlbnwwfHwwfHx8MA%3D%3D"  
//           alt="Productivity" 
//           className="w-full max-w-4xl h-64 rounded-lg shadow-md object-cover" 
//         /> */}
// {/* 
//         <img src={Img1} alt=""  className="w-70 rounded-2xl"/>
//         <img src={Img2} alt="" className="w-70 rounded-2xl" />
//         <img src={Img3} alt=""className="w-70 rounded-2xl" /> */}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Context/context";
import { FiPlusCircle, FiLayout, FiBell, FiCalendar } from "react-icons/fi";
import img1 from "../assets/task.jpg"

const Home = () => {
  const { user } = useContext(Auth);
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto mt-8">
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 p-12 rounded-3xl text-center shadow-xl text-white">
        <h1 className="text-4xl font-extrabold drop-shadow-lg animate-fadeIn">
          Welcome Back, {user ? user.name : "My Friend"} 🎉
        </h1>
        <p className="mt-3 text-lg opacity-90 italic">
          "Your time is limited, so don’t waste it living someone else’s life."
        </p>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-white opacity-10 rounded-3xl blur-lg"></div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: FiPlusCircle, text: "Create Task", route: "/dashboard/boards" },
          { icon: FiLayout, text: "View Tasks", route: "/dashboard/boards" },
          { icon: FiBell, text: "Recent Notifications", route: "/dashboard/notifications" },
          { icon: FiCalendar, text: "Upcoming Deadlines", route: "/dashboard/workflows" },
        ].map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 hover:bg-orange-600/70 text-orange-900 hover:text-white"
            onClick={() => navigate(item.route)}
          >
            <item.icon size={36} className="text-orange-700 group-hover:text-white" />
            <span className="mt-3 text-lg font-semibold">{item.text}</span>
          </button>
        ))}
      </div>

      {/* Image Section - Stunning Layout */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <div className="w-1/3 bg-orange-200 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-orange-700 text-center">Your Productivity at a Glance</h3>
          <p className="text-gray-700 mt-2 text-center">Track your progress with insightful analytics.</p>
        </div>
        <div className="w-1/3">
          <img
            src={img1}
            alt="Productivity"
            className="w-full h-52 rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
