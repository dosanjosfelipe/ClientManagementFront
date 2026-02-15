import "./DeleteModal.scss";
import { FaTimes } from "react-icons/fa";
import type { Client } from "../../types/Client";

interface DeleteClientModalProps {
  isOpen: boolean;
  client: Client | null;
  onClose: () => void;
  onConfirm: (id: number) => Promise<boolean>;
}

export function DeleteClientModal({
  isOpen,
  client,
  onClose,
  onConfirm,
}: DeleteClientModalProps) {
  if (!isOpen || !client) return null;

  const handleConfirm = async () => {
    const success = await onConfirm(client.id);
    if (success) onClose();
  };

  return (
    <div className="delete-modal__overlay">
      <div className="delete-modal">
        <button className="delete-modal__close" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Deletar Cliente</h3>
        <p>Tem certeza que deseja deletar o cliente {client.name}?</p>
        <div className="delete-modal__buttons">
          <button className="delete-modal__confirm" onClick={handleConfirm}>
            Sim
          </button>
          <button className="delete-modal__cancel" onClick={onClose}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
