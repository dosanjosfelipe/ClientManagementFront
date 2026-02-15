import "./GeneralModal.scss";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import type { User } from "../../types/User";

interface EditUsernameModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (id: number, username: string) => Promise<boolean>;
}

export function EditUsernameModal({
  isOpen,
  user,
  onClose,
  onSubmit,
}: EditUsernameModalProps) {
  const [username, setUsername] = useState(user?.username ?? "");

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await onSubmit(user.id, username);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose} type="button">
          <FaTimes />
        </button>

        <h3>Editar nome de usuário</h3>

        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário"
          />

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
