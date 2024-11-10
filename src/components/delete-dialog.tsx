import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entity: string; // name of the entity (e.g., "User", "Task")
  entityName: string | number; // entity's name or count of entities (for multiple deletion)
  onDelete: () => void; // function to call when confirming the deletion
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onClose, entity, entityName, onDelete }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <FaTrashAlt />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete {entity === "User" ? `${entityName}` : `${entityName} ${entity}s`}?
        </p>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
