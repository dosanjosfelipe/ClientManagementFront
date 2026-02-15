import "./GeneralModal.scss";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, phone: string) => Promise<boolean>;
}

export function CreateClientModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateClientModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(name, email, phone);
    if (success) {
      // Limpa os campos e fecha
      setName("");
      setEmail("");
      setPhone("");
      onClose();
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
          <FaTimes />
        </button>
        <h3>Novo Cliente</h3>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone (apenas números)"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
