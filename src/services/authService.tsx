import axios from "axios";
import http from "./http";

export async function loginUser(email: string, password: string) {
  try {
    const response = await http.post(
      "/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  try {
    const response = await http.post(
      "/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}

export async function logoutUser() {
  try {
    const response = await http.post("/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro de comunicação com o servidor.");
  }
}
