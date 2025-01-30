import { apiClient } from "@/app/api/apiClient";
import ToastManager from "@/utils/toastManager";
import { FormikHelpers } from "formik";
import { EditUserFormValues } from "../interfaces/EditUserFormValues";

export const handleEditUserSubmit = async (
  values: EditUserFormValues,
  { resetForm, setSubmitting }: FormikHelpers<EditUserFormValues>
) => {
  try {
    const response = await apiClient.put(
      `/user/${values?.id}`,
      values
    );
    
    ToastManager.toast({
      title: "Success",
      description: response?.data?.message || "User addedd successfully",
      variant: "success"
    });
    
    resetForm();
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || "Failed to add user";
    
    ToastManager.toast({
      title: "Something went wrong",
      description: "Something went wrong",
      variant: "error"
    });
  } finally {
    setSubmitting(false);
  }
};
