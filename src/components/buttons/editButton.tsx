import { Pencil } from '@phosphor-icons/react';

export const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded cursor-pointer flex items-center justify-center"
      title="Editar"
    >
      <Pencil size={20} />
    </button>
  )
  }