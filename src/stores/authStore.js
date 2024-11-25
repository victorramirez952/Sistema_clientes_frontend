// src/stores/authStore.js
import { writable } from "svelte/store";

// Crear el store de autenticación
export const authStore = writable({
  isAuthenticated: false,
  token: null
});

// Función para actualizar el estado de autenticación
export const login = (token) => {
  authStore.set({
    isAuthenticated: true,
    token
  });
};

// Función para cerrar sesión
export const logout = () => {
  authStore.set({
    isAuthenticated: false,
    token: null
  });
};
