/**
 * Utilidades para manejo de localStorage
 * Encapsula la lógica de persistencia para facilitar cambios futuros
 */

import { STORAGE_KEYS } from '@/constants';

/**
 * Guarda un valor en localStorage
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    // Silently fail - localStorage puede no estar disponible
  }
};

/**
 * Obtiene un valor de localStorage
 */
export const getStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    return null;
  }
};

/**
 * Elimina un valor de localStorage
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Silently fail
  }
};

/**
 * Limpia todo el localStorage
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    // Silently fail
  }
};

// ==================== HELPERS ESPECÍFICOS ====================

export const getAuthToken = (): string | null => {
  return getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN);
};

export const setAuthToken = (token: string): void => {
  setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const removeAuthToken = (): void => {
  removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
};

