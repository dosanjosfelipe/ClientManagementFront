import { LoginForm } from "../../components/forms/LoginForm";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login, loading, error } = useAuth();

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__welcome">
          <div>
            <h1>
              Sistema de <span>Gestão</span>
            </h1>
            <p>Explore todas as funcionalidades com um perfil completo.</p>
          </div>

          <div>
            <div className="login__credentials">
              <div className="cred-item">
                <label>E-mail de acesso</label>
                <div className="value-box">admin@email.com</div>
              </div>

              <div className="cred-item">
                <label>Senha padrão</label>
                <div className="value-box">123456</div>
              </div>
            </div>

            <p className="login__note">
              Ambiente de demonstração com vários clientes.
            </p>
          </div>
        </div>

        <LoginForm onSubmit={login} loading={loading} error={error} />
      </div>
    </div>
  );
}
