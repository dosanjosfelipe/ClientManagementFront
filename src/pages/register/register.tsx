import "./register.scss";
import { RegisterForm } from "../../components/forms/RegisterForm";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const { handleRegister, loading, error } = useAuth();

  return (
    <div className="register">
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
    </div>
  );
}

export default Register;
