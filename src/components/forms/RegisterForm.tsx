import "../../pages/register/register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export function RegisterForm({ onSubmit, loading, error }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="register__form"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(name, email, password);
      }}
    >
      <h2 className="register__title">Sign Up</h2>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={3}
        maxLength={40}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        maxLength={14}
      />

      {error && <p className="register__error">{error}</p>}

      <button type="submit" disabled={loading} className="login__button">
        {loading ? "Registrando..." : "Registrar"}
      </button>

      <div className="register__link">
        Já tem uma conta? <Link to="/">Entre aqui</Link>
      </div>
    </form>
  );
}
