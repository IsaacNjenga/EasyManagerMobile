import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  login: async (number, password) => {
    set({ isLoading: true });
    try {
      const result = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, password }),
      });

      const json = await result.json();

      if (!result.ok) {
        return { success: false, error: json };
      }
      await AsyncStorage.setItem("token", json.token);
      await AsyncStorage.setItem("user", JSON.stringify(json.user));

      set({
        token: json.token,
        user: json.user,
        isLoading: false,
        //isCheckingAuth: false,
      });

      return { success: true };
    } catch (error) {
      console.log("Login error:", error);
      set({ isLoading: false });
      return { success: false, message: error.message || "Login failed" };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.error("Error checking auth:", error);
      return { success: false, message: error.message || "Auth check failed" };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, user: null });
    } catch (error) {
      console.log("Error on logout:", error);
    }
  },
}));
