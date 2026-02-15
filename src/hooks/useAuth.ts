import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { registerUser } from "../services/authService";
import { logoutUser } from "../services/authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);

      if (response.status === 200) {
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(name: string, email: string, password: string) {
    setError(null);
    setLoading(true);

    if (password.length < 6 || password.length > 14) {
      setError("A senha deve ter entre 6 e 14 dígitos.");
      setLoading(false);
      return;
    }

    if (name.length < 3 || name.length > 40) {
      setError("O nome deve ter entre 3 e 40 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(name, email, password);

      if (response.status === 201) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogoutUser() {
    setLoading(true);
    setError(null);

    try {
      const response = await logoutUser();

      if (response.status === 200 || response.status === 204) {
        localStorage.removeItem("username");
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    handleLogoutUser,
    handleRegister,
    login,
    loading,
    error,
  };
}
