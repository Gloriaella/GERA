
import {Formik, Form, Field, ErrorMessage } from 'formik';
import React , {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../Context/context';
import * as Yup from "yup";
import { toast } from 'react-toastify';
// import { RiEyeOffLine } from 'react-icons/ri';

const SignUpForm = () => {
  const { signup } = useContext(Auth);
  const navigate = useNavigate();

// Yup validation
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .required("Password is required"),
});

const initialvalues = {
  name: "",
  email: "",
  password: "",
};

const handlesubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    await signup(values);
    toast.success("Signup successful!");
    resetForm();
    setTimeout(() => {
      navigate("/signin");
    }, 3000);
  } catch (err) {
    console.log(err);
    toast.error(err.message || "Signup failed, please try again");
  }
  setSubmitting(false);
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-3 ">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">Sign Up</h2>

        <Formik  initialValues={initialvalues} validationSchema={SignupSchema} onSubmit={handlesubmit}>

          {({isSubmitting}) => (
              <Form className='flex flex-col gap-y-5 text-sm'>
              <div>
                <label htmlFor="Name" className="block text-orange-600 font-medium">Name</label>
                <Field type = "text" name="name" id ="name" placeholder="Enter your Name"  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600" />
               <div>
                 <ErrorMessage name="name" component="div" className='text-red-600 text-sm'/>
               </div>
              </div>
 
              <div>
                <label htmlFor="Email" className="block text-orange-600 font-medium">Email</label>
                <Field type = "email" name="email" id ="email" placeholder="Enter your Email"  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"/>
                <ErrorMessage name="email" component="div" className='text-red-600 text-sm'/>
              </div>
 
              <div>
               <label htmlFor="Password" className="block text-orange-600 font-medium">Password</label>
               <Field type= "password" name="password" id="password" placeholder="Enter Password"  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"/>
               <ErrorMessage name='password' component="div" className='text-red-600 text-sm'/>
              </div>
               
              <button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full bg-orange-600 text-white py-2 rounded-md font-medium hover:bg-orange-500 transition"
               >
                 {isSubmitting ? <span class="loader"></span> : "Sign Up"}
               </button>
           </Form>
          )} 
        </Formik>

        <p className="text-center font-bold text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-orange-600 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpForm
