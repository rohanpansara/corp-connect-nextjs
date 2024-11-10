import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Formik, FormikHelpers, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiClient } from "@/utils/apiClient";
import toast from "react-hot-toast";
import { TbUserPlus } from "react-icons/tb";

const AddUserDialog = () => {
  interface UserFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    userStatus: string;
    roles: string;
  }
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userStatus: "",
    roles: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Password doesn't match"),
    userStatus: Yup.string().required("User status is required"),
    roles: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (
    values: UserFormValues,
    { resetForm, setSubmitting }: FormikHelpers<UserFormValues>
  ) => {
    try {
      await apiClient.post("/user", values);
      toast.success("User added successfully");
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 text-xs">
          <TbUserPlus className="h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] md:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Fill User Details</DialogTitle>
          <DialogDescription className="text-[12px]">
            Ensure all fields are completed correctly.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 sm:space-y-2">
              <div className="grid grid-cols-4 grid-rows-3 gap-4 sm:gap-2">
                {/* Name */}
                <div className="col-span-4 sm:col-span-2 lg:col-span-4">
                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="name" className="text-right text-sm text-muted-foreground">
                      Name
                    </label>
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Field
                    id="name"
                    name="name"
                    className="input border-[1px] rounded-sm border-gray-300 w-full h-8 max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-600' : ''} "/>
                </div>

                {/* Email */}
                <div className="col-span-4 sm:col-span-2 lg:row-start-2 lg:col-span-4 sm:row-start-1 row-start-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="text-right text-sm text-muted-foreground">
                      Email
                    </label>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    className="input border-[1px] rounded-sm border-gray-300 w-full h-8 max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500
        ${errors.email ? 'border-red-600' : ''}"
                  />
                </div>

                {/* Password */}
                <div className="col-span-2 lg:row-start-3 md:row-start-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-right text-sm text-muted-foreground">
                      Password
                    </label>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    className="input border-[1px] rounded-sm border-gray-300 w-full h-8 max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500
        ${errors.password ? 'border-red-600' : ''}"
                  />
                </div>

                {/* Confirm Password */}
                <div className="col-span-2 col-start-3 lg:row-start-3 md:row-start-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmPassword" className="text-right text-sm text-muted-foreground">
                      Confirm Password
                    </label>
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="input border-[1px] rounded-sm border-gray-300 w-full h-8 max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500
        ${errors.confirmPassword ? 'border-red-600' : ''}"
                  />
                </div>

                {/* Status (Dropdown) */}
                <div className="col-span-2 lg:row-start-4 md:row-start-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="userStatus" className="text-right text-sm text-muted-foreground">
                      User Status
                    </label>
                    <ErrorMessage
                      name="userStatus"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Field
                    as="select"
                    id="userStatus"
                    name="userStatus"
                    className="input border-[1px] rounded-sm border-gray-300 w-full h-8 max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.userStatus ? 'border-red-600' : ''}"
                  >
                    <option value="">Select Status</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                  </Field>
                </div>

                {/* Roles (Dropdown) */}
                <div className="col-span-2 col-start-3 lg:row-start-4 md:row-start-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="roles" className="text-right text-sm text-muted-foreground">
                      Role
                    </label>
                    <ErrorMessage
                      name="roles"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Field
                    id="roles"
                    name="roles"
                    className="input border-[1px] rounded-md border-gray-300 w-full h-8 max-w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.roles ? 'border-red-600' : ''}"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting} variant="default">
                  {isSubmitting ? "Adding..." : "Add User"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
