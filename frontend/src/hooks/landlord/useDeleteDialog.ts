import { useState } from 'react';

interface DeleteDialogState {
  isOpen: boolean;
  propertySlug: string | null;
  propertyTitle: string;
}

export const useDeleteDialog = () => {
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    isOpen: false,
    propertySlug: null,
    propertyTitle: '',
  });

  const openDeleteDialog = (slug: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      propertySlug: slug,
      propertyTitle: title,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      propertySlug: null,
      propertyTitle: '',
    });
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
  };
};
