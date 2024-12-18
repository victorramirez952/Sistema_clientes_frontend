// src/utils/authUtils.js
import { authStore, logout_user } from '../stores/authStore';  
import { get } from 'svelte/store';

export function checkAuth() {
    const user = get(authStore);
    const isLoggedIn = user.isAuthenticated;
    if (!isLoggedIn) {
        window.location.href = '/login';
    }
}

export function handleLogout() {
    logout_user();
    window.location.href = '/login';
}

export function getIsLoggedIn() {
    const user = get(authStore);
    return user.isAuthenticated;
    // return true
}

export function getToken() {
    const user = get(authStore);
    return user.token;
}