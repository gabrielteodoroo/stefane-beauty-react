interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ 
  isOpen, 
  message, 
  onConfirm, 
  onCancel
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex gap-4">
          <button 
            onClick={onConfirm} 
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded transition-colors"
          >
            Confirmar
          </button>
          <button 
            onClick={onCancel} 
            className="bg-gray-300 cursor-pointer hover:bg-gray-400 px-4 py-2 rounded transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
} 