import "./DeleteModal.scss";
import { FaTimes } from "react-icons/fa";
import type { User } from "../../types/User";

interface DeleteUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: (id: number) => Promise<boolean>;
}

export function DeleteUserModal({
  isOpen,
  user,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  if (!isOpen || !user) return null;

  const handleConfirm = async () => {
    const success = await onConfirm(user.id);
    if (success) onClose();
  };

  return (
    <div className="delete-modal__overlay">
      <div className="delete-modal">
        <button className="delete-modal__close" onClick={onClose} type="button">
          <FaTimes />
        </button>

        <h3>Excluir conta</h3>

        <p>
          Tem certeza que deseja excluir a conta do usuário{" "}
          <strong>{user.username}</strong>?
        </p>

        <div className="delete-modal__buttons">
          <button
            className="delete-modal__confirm"
            onClick={handleConfirm}
            type="button"
          >
            Sim
          </button>

          <button
            className="delete-modal__cancel"
            onClick={onClose}
            type="button"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
