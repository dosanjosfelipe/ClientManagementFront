import "../../pages/login/login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export function LoginForm({ onSubmit, loading, error }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="login__form"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(email, password);
      }}
    >
      <h2 className="login__title">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />

      {error && <p className="login__error">{error}</p>}

      <button type="submit" className="login__button" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <div className="login__link">
        Quer sua própria conta? <Link to="/signup">Criar Conta</Link>
      </div>
    </form>
  );
}
