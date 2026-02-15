import { useState, useEffect, useCallback } from "react";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  shareClients,
} from "../services/clientService";
import { exportClient, importClient } from "../services/clientFileService";
import type { Client } from "../types/Client";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function useClient() {
  const [clients, setClients] = useState<Client[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  // Compartilhar Clintes
  const shareClientsTable = async () => {
    try {
      const response = await shareClients();

      if (response.status === 200) {
        navigator.clipboard.writeText(response.data.shareLink);

        setLinkCopied(true);

        setTimeout(() => {
          setLinkCopied(false);
        }, 3000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Tratar Erros
  const handleError = useCallback(
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 401:
            alert("Sessão expirada ou não autenticado. Refaça o login.");
            navigate("/", { replace: true });
            return;
          case 404:
            alert("Recurso não encontrado.");
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

  // Ler Clientes
  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllClients(page, token, search);

      if (response.status === 200) {
        setClients(response.data.clients);
        setTotal(response.data.total);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, token, handleError]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Criar Cliente
  const addClient = async (name: string, email: string, phone: string) => {
    try {
      const response = await createClient(name, email, phone);
      if (response.status === 201) {
        alert(response.data.message);
        fetchClients();
        return true;
      }
    } catch (error) {
      handleError(error);
    }
    return false;
  };

  // Editar Cliente
  const editClientData = async (client: Client) => {
    try {
      const response = await updateClient(
        client.id.toString(),
        client.name,
        client.email,
        client.phone,
      );

      if (response.status === 200) {
        alert("Cliente atualizado com sucesso");
        await fetchClients();
        return true;
      }
    } catch (error) {
      handleError(error);
    }
    return false;
  };

  // Deletar Cliente
  const removeClient = async (id: number) => {
    try {
      const response = await deleteClient(id.toString());

      if (response.status === 200) {
        setClients((prev) => prev.filter((c) => c.id !== id));
        setTotal((prev) => prev - 1);

        alert("Cliente deletado com sucesso");
        return true;
      }
    } catch (error) {
      handleError(error);
    }
    return false;
  };

  const exportClientsTable = async () => {
    try {
      const response = await exportClient();

      if (response.status === 200) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement("a");

        a.href = url;
        a.download = "clients.csv";
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);

        return true;
      }
    } catch (error) {
      handleError(error);
    }
    return false;
  };

  const importClientsTable = async (csvFile: File) => {
    try {
      const response = await importClient(csvFile);

      if (response.status === 200) {
        fetchClients();

        return true;
      }
    } catch (error) {
      handleError(error);
    }
    return false;
  };

  return {
    clients,
    total,
    isLoading,
    page,
    search,
    linkCopied,
    importClientsTable,
    exportClientsTable,
    setSearch,
    addClient,
    editClientData,
    removeClient,
    refresh: fetchClients,
    setPage,
    shareClientsTable,
  };
}
