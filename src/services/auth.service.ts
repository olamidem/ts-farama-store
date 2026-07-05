import axiosClient from "../api/axios";
import type { LoginRequest, LoginResponse } from "../features/auth/types/auth";
import type { User } from "../types/user";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosClient.post("/auth/logout");
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosClient.get("/auth/profile");
  return response.data;
};
