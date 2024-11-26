<script>
  import { authStore, logout_user } from '../stores/authStore';  
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let user;
  let isLoggedIn;

  // Immediately check authentication state and redirect if not authenticated
  (() => {
    user = get(authStore);
    isLoggedIn = user.isAuthenticated;
    if (!isLoggedIn){
      window.location.href = '/login';
    }
  })();

  onMount(() => {
    console.log(user);
  });

  const handleLogout = () => {
    logout_user();
    window.location.href = '/login';
  };
</script>

{#if isLoggedIn}
<div class="container">
  <h1>Welcome to my-svelte-app</h1>
    <h2>Hi user with ID: {user.user_id}, thanks for logging in</h2>
    <input type="button" value="Logout" on:click={handleLogout} />
  <!-- {:else} -->
    <!-- <h2>Would you like to login?</h2> -->
    <!-- <Login /> -->
  </div>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
  }
</style>
