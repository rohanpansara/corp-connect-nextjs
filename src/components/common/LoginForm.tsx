"use client";

import { checkSession } from "@/app/api/checkSession";
import { handleLoginSubmit } from "@/app/api/handlers/Login";
import illustration from "@/assets/illustration.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => router.push(path);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const validateSession = async () => {
      const isLoggedIn = await checkSession();
      if (isLoggedIn) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    validateSession();
  }, [router]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid format").required("*Email is required"),
    password: Yup.string().required("*Password is required"),
  });

  return (
    <main className="flex w-[90%] h-screen min-h-screen bg-[#0940AE] gap-x-10">
      {/* First Section: Office Illustration Image */}
      <section className="flex w-1/2 bg-cover bg-center xl:display-none">
        <Image src={illustration} alt="Illustration" objectFit="cover" />
      </section>

      {/* Second Section: Login Form */}
      <section className="flex w-1/2 justify-center items-center">
        <div className="w-full max-w-md p-6 bg-[#ECF1FE] shadow-lg rounded-[12px] items-center">
          <h2 className="flex justify-center items-center text-2xl font-bold text-center text-gray-700 mb-[1px] bg-cover">
            Welcome To&nbsp;<span className="text-[#407BFD]">CorpConnect</span>
          </h2>
          <span className="flex justify-center items-center text-[10px] text-center text-gray-400 mb-6">
            Use credentials provided to you by the HR team
          </span>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleLoginSubmit(values, setLoading, handleNavigation);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              isSubmitting,
              setFieldTouched,
              setFieldError,
              errors,
              touched,
            }) => (
              <Form className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="flex flex-row justify-start items-center text-sm font-medium text-[#444e60d2] my-2"
                  >
                    Email{" "}
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[#ff0800] text-xs ml-auto"
                    />
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`mt-1 block w-full p-2 border ${
                      errors.email && touched.email
                        ? "border-[#ff0800] placeholder:text-[#caadad]"
                        : "border-gray-300"
                    } rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
                    placeholder="Enter your email"
                    onFocus={() => {
                      setFieldTouched("email", false); // Clear "touched" status
                      setFieldError("email", ""); // Clear error message on focus
                    }}
                  />
                </div>

                {/* Password Input */}
                {/* <div>
                  <label
                    htmlFor="password"
                    className="flex flex-row justify-start items-center text-sm font-medium text-[#444e60d2] my-2"
                  >
                    Password{" "}
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[#ff0800] text-xs ml-auto "
                    />
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={`mt-1 block w-full p-2 border ${
                      errors.password && touched.password
                        ? "border-[#ff0800] placeholder:text-[#caadad]"
                        : "border-gray-300"
                    } rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
                    placeholder="Enter your password"
                    onFocus={() => {
                      setFieldTouched("password", false); // Clear "touched" status
                      setFieldError("password", ""); // Clear error message on focus
                    }}
                  />
                </div> */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="flex flex-row justify-start items-center text-sm font-medium text-[#444e60d2] my-2"
                  >
                    Password{" "}
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[#ff0800] text-xs ml-auto"
                    />
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                    className={`mt-1 block w-full p-2 border ${
                      errors.password && touched.password
                        ? "border-[#ff0800] placeholder:text-[#caadad]"
                        : "border-gray-300"
                    } rounded-md shadow-sm text-[#444E60] sm:text-sm placeholder:text-[#babdc2]`}
                    placeholder="Enter your password"
                    onFocus={() => {
                      setFieldTouched("password", false); // Clear "touched" status
                      setFieldError("password", ""); // Clear error message on focus
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform translate-y-[36%] text-xl"
                    onClick={() => setShowPassword((prev) => !prev)} // Toggle the visibility
                  >
                    {showPassword ? <BsEyeFill className="h-4 w-4 fill-[#384150]"/> : <BsEyeSlashFill className="h-4 w-4 fill-[#444E60]"/>}
                  </button>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#407BFD] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#4a76d4] focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition delay-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging In..." : "Log In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-2 text-center">
            <button
              type="button"
              className="text-xs text-[#407BFD] hover:text-[#4a76d4]"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
