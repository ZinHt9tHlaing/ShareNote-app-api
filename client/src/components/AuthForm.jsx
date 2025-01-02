import { Field, Form, Formik } from "formik";
import { LoaderCircle } from "lucide-react";
import * as yup from "yup";

// formik custom error message
import StyledFormError from "./StyledFormError";
import { useState } from "react";

const AuthForm = ({ isLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const authFormSchema = yup.object({
    username: yup
      .string()
      .min(3, "Username is too short!")
      .max(15, "Username is too long!")
      .required("Username is required!"),
    email: yup
      .string()
      .required("Email is required!")
      .email("Please enter a valid email format!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(4, "Password is too short!"),
  });

  const submitHandler = (values) => {
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  };

  return (
    <section className="w-2/3 md:w-1/2 mx-auto">
      <h1 className="text-center text-teal-600 font-semibold text-3xl my-4">
        {isLogin ? "Login" : "Register"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={authFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form>
            {/* username */}
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className="font-medium block">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
                />
                <StyledFormError name={"username"} />
              </div>
            )}

            {/* email */}
            <div className="mb-3">
              <label htmlFor="email" className="font-medium block">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
              />
              <StyledFormError name={"email"} />
            </div>

            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="font-medium block">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="text-lg py-1 px-2 w-full rounded-lg border-2 border-teal-600 caret-teal-600 focus-visible:border-2 focus-visible:border-teal-600 outline-none"
              />
              <StyledFormError name={"password"} />
            </div>
            <button
              type="submit"
              className=" w-full bg-teal-600 rounded-lg text-white py-2 px-3 font-medium active:scale-95 duration-200"
            >
              <div className="flex justify-center items-center gap-2">
                {isLoading && (
                  <LoaderCircle className="animate-spin text-white" size={25} />
                )}
                {isLogin ? "Login" : "Register"}
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AuthForm;