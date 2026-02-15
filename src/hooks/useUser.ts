// hooks/useUser.ts
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  getCurrentUser,
  deleteUser,
  updateUsername,
} from "../services/userService";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 401:
            navigate("/", { replace: true });
            return;
          case 500:
            alert("Erro interno do servidor.");
            return;
          default:
            alert(
              error.response?.data?.message || "Erro inesperado do servidor.",
            );
            return;
        }
      }

      alert("Erro de comunicação com o servidor.");
    },
    [navigate],
  );

  // ===== FETCH USER (REUTILIZÁVEL) =====
  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await getCurrentUser();
      const { userId, userName } = response.data;

      const mappedUser: User = {
        id: userId,
        username: userName,
      };

      setUser(mappedUser);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ===== DELETE USER =====
  const removeUser = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await deleteUser(id);
        setUser(null);
        navigate("/", { replace: true });
        return true;
      } catch (error) {
        handleError(error);
        return false;
      }
    },
    [handleError, navigate],
  );

  // ===== EDIT USERNAME =====
  const editUsername = useCallback(
    async (id: number, username: string): Promise<boolean> => {
      try {
        await updateUsername(id, username);
        setUser((prevUser) => (prevUser ? { ...prevUser, username } : null));

        return true;
      } catch (error) {
        handleError(error);
        return false;
      }
    },
    [handleError],
  );

  return {
    user,
    loading,
    removeUser,
    editUsername,
  };
}
