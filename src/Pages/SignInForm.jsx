import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Auth from "../Context/context";
import { toast } from "react-toastify";

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(Auth);
  // Yup validation
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await signIn(values);
      toast.success("SignIn was successful ");
      resetForm();
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Sign in failed, Please try again");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-3 ">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-orange-600 font-medium"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your Email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-orange-600 font-medium"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your Password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 text-white py-2 rounded-md font-medium hover:bg-orange-500 transition"
            >
              {isSubmitting ? <span class="loader"></span> : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-5 text-center font-bold text-sm">
        Dont have an account? <Link to={"/signup"} className="text-orange-600">Sign Up</Link>
      </p>
      </div>
    </div>
  );
};

export default SignInForm;

