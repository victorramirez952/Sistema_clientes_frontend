import { writable } from "svelte/store";
export const token = writable(localStorage.getItem("jwt") || null);

token.subscribe((value) => {
    if (value) {
        localStorage.setItem("jwt", value);
        } else {
    localStorage.removeItem("jwt");
  }
});
