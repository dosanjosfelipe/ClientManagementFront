import "./GeneralModal.scss";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import type { Client } from "../../types/Client";

interface EditClientModalProps {
  isOpen: boolean;
  client: Client | null;
  onClose: () => void;
  onSubmit: (client: Client) => Promise<boolean>;
}

export function EditClientModal({
  isOpen,
  client,
  onClose,
  onSubmit,
}: EditClientModalProps) {
  const [formData, setFormData] = useState<Client | null>(null);

  useEffect(() => {
    setFormData(client);
  }, [client]);

  if (!isOpen || !formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) onClose();
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Editar Cliente</h3>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
