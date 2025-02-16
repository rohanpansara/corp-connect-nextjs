import { UserDTO } from '@/types/User'
import { UserEditDTO } from '@/types/EditUser'

export interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: UserDTO | null
  onSubmit: (values: UserEditDTO) => void
}
