import { Trash } from "lucide-react"

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ 
  onClick
}: DeleteButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 rounded cursor-pointer flex items-center justify-center"
      title="Excluir"
    >
      <Trash size={20} className="text-red-500" />
    </button>
  )
}