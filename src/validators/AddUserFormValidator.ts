import * as Yup from "yup";

export const addUserValidationSchema = Yup.object({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  password: Yup.string()
    .min(6, "*Password must be at least 8 characters")
    .required("*Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), ""],
    "*Passwords must match"
  ),
  userStatus: Yup.string().required("*User status is required"),
  roles: Yup.string().required("*Role is required"),
});
