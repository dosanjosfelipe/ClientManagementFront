import axios from "axios";
import http from "./http";

export async function deleteUser(id: number) {
  try {
    const response = await http.delete(`/auth/user/${id}`);

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function getCurrentUser() {
  try {
    const response = await http.get("/auth/user");

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function updateUsername(id: number, username: string) {
  try {
    const response = await http.patch(`/auth/user/${id}`, {
      username,
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
