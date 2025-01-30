import { UserDTO } from "@/contracts/types/user";
import { UserEditDTO } from "@/contracts/types/userEdit";

export interface EditUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserDTO | null;
    onSubmit: (values: UserEditDTO) => void;
  }