import * as SecureStore from 'expo-secure-store';
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const Storage = {
  getItem(key: string): string | null {
    return isWeb ? localStorage.getItem(key) : SecureStore.getItem(key);
  },

  setItem(key: string, value: string): void {
    return isWeb
      ? localStorage.setItem(key, value)
      : SecureStore.setItem(key, value);
  },

  async deleteItemAsync(key: string): Promise<void> {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};