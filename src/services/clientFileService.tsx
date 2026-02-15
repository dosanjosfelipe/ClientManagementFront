import axios from "axios";
import http from "./http";

export async function exportClient() {
  try {
    const response = await http.get("/auth/clients/files/export", {
      responseType: "blob",
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function importClient(csvFile: File) {
  try {
    const formData = new FormData();
    formData.append("file", csvFile);

    const response = await http.post("/auth/clients/files/import", formData);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}
