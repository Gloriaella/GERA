import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Layout1 from "./Layouts/Layout1";
import Layout2 from "./Layouts/Layout2"
import LandingPage from './Pages/LandingPage';
import Home from "./Pages/Home";
import Analytics from "./Pages/Analytics"
import Notifications from "./Pages/Notifications"
import WorkFlows from "./pages/WorkFlows"
import SignUpForm from "./Pages/SignUpForm";
import SignInForm from "./Pages/SignInForm";
import Error from "./Pages/Error"
import AuthContext from "./Context/AuthContext"
import Boards from './Pages/Boards';
import EditProfile from './Pages/EditProfile';
import Profile from './Pages/Profile';
import NewsLetter from './Pages/NewsLetter';
const App = () => {
   return (
      
         <AuthContext>
             <BrowserRouter>
            <ToastContainer />
            <Routes>

               <Route path="/" element={<Layout1 />}>
                  <Route index element={<LandingPage />} />
               </Route>
               <Route path="/signup" element={<SignUpForm />} />
               <Route path="/signin" element={<SignInForm />} />
               
               <Route path='/dashboard' element={<Layout2 />}>
                  <Route index element={<Home />} />
                  <Route path='Boards' element={<Boards />} />
                  <Route path='Analytics' element={<Analytics />} />
                  <Route path='WorkFlows' element={<WorkFlows />} />
                  <Route path='Notifications' element={<Notifications />} />
                  <Route path='EditProfile' element={<EditProfile />} />
                  <Route path='Profile' element={<Profile />} />
                  <Route path='NewsLetter' element={<NewsLetter />} />
               </Route>

               <Route path="*" element={<Error />} />
            </Routes>

         </BrowserRouter>

         </AuthContext>      

   )
}

export default App
