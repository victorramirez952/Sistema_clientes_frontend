// src/stores/authStore.js
import { writable } from "svelte/store";

// Crear el store de autenticación
const storedAuth = JSON.parse(localStorage.getItem('auth')) || {
  isAuthenticated: false,
  token: null,
  nombreUsuario: null
};

export const authStore = writable(storedAuth);

authStore.subscribe((value) => {
  localStorage.setItem('auth', JSON.stringify(value));
});

// Función para actualizar el estado de autenticación
export const login_user = (data) => {
  console.log("Actualizando el estado de autenticación");
  
  authStore.set({
    isAuthenticated: true,
    user_id: data.user_id,
    token: data.token
  });
  // Check if the new values are setted
  // authStore.subscribe((value) => {
  //   console.log('Store updated:', value);
  // });
};

// Función para cerrar sesión
export const logout_user = () => {
  authStore.set({
    isAuthenticated: false,
    token: null,
    user_id: null
  });
};
