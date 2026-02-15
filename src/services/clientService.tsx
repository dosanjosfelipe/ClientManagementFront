import axios from "axios";
import http from "./http";

export async function shareClients() {
  try {
    const response = await http.get("/auth/clients/share", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function createClient(name: string, email: string, phone: string) {
  try {
    const response = await http.post(
      "/auth/clients",
      {
        name,
        email,
        phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function getAllClients(
  page: number,
  token?: string | null,
  search?: string,
) {
  try {
    const response = await http.get("/auth/clients", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        search,
      },
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function updateClient(
  id: string,
  name: string,
  email: string,
  phone: string,
) {
  try {
    const response = await http.patch(
      `/auth/clients/${id}`,
      {
        name,
        email,
        phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function deleteClient(id: string) {
  try {
    const response = await http.delete(`/auth/clients/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}
