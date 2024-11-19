import { UserFormValues } from "@/app/api/interfaces/AddUserFormValues";  // Adjust the import according to your file structure
import { FormikHelpers } from "formik";
import { apiClient } from "@/app/api/apiClient"; // Ensure this is correctly imported
import { toast } from "react-hot-toast";

export const handleAddUserSubmit = async (
  values: UserFormValues,
  { resetForm, setSubmitting }: FormikHelpers<UserFormValues>
) => {
  try {
    const response = await apiClient.post("/hr/access-control/new-user", values);
    // Show success message from the response (if available)
    toast.success(response?.data?.message || "User added successfully");
    resetForm();
  } catch (error: any) {
    // Show error message from the response or fallback to a default message
    const errorMessage =
      error?.response?.data?.message || "Failed to add user";
    toast.error(errorMessage);
  } finally {
    setSubmitting(false);
  }
};
