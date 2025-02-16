import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DeleteDialogProps } from '@/types/DeleteDialogProps'

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, entity, entitySize, onDelete, all }) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        {all === false ? (
          <p>
            Are you sure you want to delete the{' '}
            <span className='font-bold'>{entitySize > 1 ? `${entitySize} ${entity}s` : `${entity}`}?</span>
          </p>
        ) : (
          <p>
            Are you sure you want to <span className='font-semibold'>all the {entity}s?</span>
          </p>
        )}
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>
            No
          </Button>
          <Button
            variant='destructive'
            onClick={() => {
              onDelete()
              onClose()
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
