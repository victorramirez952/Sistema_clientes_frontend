<script>
  let username = '';
  let password = '';

  const login = async () => {
    const data = {
      nombreUsuario: username,
      password: password,
    };

    const url = 'http://3.139.55.118:5001/api/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.message === 'Ingreso correcto de credenciales') {
        console.log('Login exitoso:', result);
        alert(`Bienvenido, Usuario: ${result.username}`);
        window.localStorage.setItem('token', result.token);
        window.location.href = 'dashboard.html';
      } else {
        alert('Usuario o contrasenia incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un problema al iniciar sesión. Intente más tarde.');
    }
  };
</script>

<style>
  .container {
    background-color: #fff;
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    text-align: center;
    width: 90%;
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

<div class="container">
  <header>
    <div class="logo">
      <img src="logo.png" alt="Logo Colfecar" />
    </div>
  </header>
  <h1 class="title">Iniciar Sesion</h1>
  <form on:submit|preventDefault={login}>
    <div class="form-group">
      <label for="username">Usuario</label>
      <input
        type="text"
        id="username"
        bind:value={username}
        placeholder="Ingresa tu usuario"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Contraseña</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        placeholder="Ingresa tu contraseña"
        required
      />
    </div>
    <button type="submit" class="btn">Iniciar Sesion</button>
  </form>
</div>
