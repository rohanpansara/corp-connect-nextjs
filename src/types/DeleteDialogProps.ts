export interface DeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  entity: string
  entitySize: number
  all: boolean
  onDelete: () => void
}
