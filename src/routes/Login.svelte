<script>
  import { authStore, login_user } from '../stores/authStore';
  import { get } from 'svelte/store';

  let user;
  let isLoggedIn;

  // Immediately check authentication state and redirect if not authenticated
  (() => {
    user = get(authStore);
    isLoggedIn = user.isAuthenticated;
    if (isLoggedIn){
      window.location.href = '/dashboard';
    }
  })();

  let nombreUsuario = '';
  let password = '';
  let currentError = null;

  const ip_hostname = import.meta.env.VITE_IP_HOSTNAME

  // const login_test = async () => {
  //   // window.location.href = 'ignore_dashboard.html'; 
  //   window.location.href = '/dashboard';
  // }
  
  const login = async () => {
    try {
      const response = await fetch(`http://${ip_hostname}:5001/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreUsuario, password }),
      });

      if (!response.ok) {
      currentError = '';
      
      const data = await response.json();
      
        if (data && data.message) {
        currentError = data.message;
      } else {
        currentError = 'Something went wrong';
      }
      
      console.error('Login failed with status:', response.status);
      alert(currentError);
      return;
    }

      const data = await response.json();

      // Ensure `data` is in the correct format before updating the store
      if (data) {
        console.log('API Response:', data);
        login_user(data); // Update the store
      } else {
        currentError = 'Invalid response data';
        console.error('Response data invalid or null:', data);
      }

      // Redirect to the profile page after a delay
      window.location.href = '/dashboard';
      
    } catch (error) {
      currentError = `Error logging in: ${error.message}`;
      console.error('Error logging in:', error);
    }
  };
</script>


<svelte:head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión</title>
</svelte:head>

{#if !isLoggedIn}
<div class="container">
  <header>
    <div class="logo">
      <img src="logo.png" alt="Logo Colfecar" />
    </div>
  </header>
  <h1 class="title">Iniciar Sesión v0.0</h1>
  <form on:submit|preventDefault={login}>
    <div class="form-group">
      <label for="nombreUsuario">Usuario</label>
      <input
        type="text"
        id="nombreUsuario"
        bind:value={nombreUsuario}
        placeholder="Ingresa tu usuario"
        required={false}
      />
    </div>
    <div class="form-group">
      <label for="password">Contraseña</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        placeholder="Ingresa tu contraseña"
        required={false}
      />
    </div>
    <button type="submit" class="btn">Iniciar Sesion</button>
  </form>
</div>
{/if}


<style>
  header{
    justify-content: center;
  }
  main {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
  }
  .container {
      background-color: #fff;
      /* padding: 20px 40px; */
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      text-align: center;
      margin: 0 auto;
  }
  .logo img {
      max-width: 150px;
      margin: 0 auto 20px;
      display: block;
      position: relative;
  }
  .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #333;
  }
  .form-group {
      margin-bottom: 15px;
      text-align: left;
  }
  .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #555;
  }
  .form-group input {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
  }
  .btn {
      background-color: #ff5b5b;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      margin-top: 20px;
  }

</style>