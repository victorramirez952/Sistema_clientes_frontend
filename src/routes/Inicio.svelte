<script>
    function handleSubmit(event){
        event.preventDefault();
        window.location.href = '/login';
    }
</script>

<svelte:head>
  <title>Plataforma de Gestión de Clientes y Créditos</title>
</svelte:head>

<div class="header">
  <div class="logo">
      <img src="logo.png" alt="Logo">
      <h1>Plataforma de Gestión de Clientes y Créditos</h1>
  </div>
</div>

<hr/>

<div class="container_inicio">
  <div class="content">
    <div class="card">
        <h2>Beneficios</h2>
        <p>
            Optimiza la gestión financiera con herramientas que evalúan riesgos crediticios, analizan
            indicadores clave y automatizan flujos de pago. Reduce incumplimientos, mejora la planificación
            estratégica y asegura un flujo de efectivo constante para fortalecer la estabilidad de tu negocio.
        </p>
    </div>
    <div class="img">
        <img src="foto1.png" alt="Gestion de Clientes y Créditos">
    </div>
    <div class="btn_login">
        <form method="POST" class="login-form" on:submit={handleSubmit}>
            <button type="submit" class="btn">Iniciar Sesión</button>
        </form>
    </div>
  </div>
</div>

<style>
    .header {
    background-color: #ff5b5b;
    color: #fff;
    padding: 20px 30px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
    position: fixed;
    top: 0;
    width: 100%;
    /* z-index: 1000; */
}

.header .logo {
    display: flex;
    align-items: center;
}

.header .logo img {
    max-width: 50px;
    /* margin-right: 10px; */
}

.header h1 {
    font-size: 20px;
    margin: 0;
}

.menu-icon {
    width: 30px;
    height: 25px;
    position: relative;
    cursor: pointer;
}

.menu-icon span {
    display: block;
    height: 5px;
    width: 100%;
    background-color: white;
    /* margin: 5px 0; */
}

.sidebar {
    position: fixed;
    top: 0;
    left: -150px;
    width: 50;
    height: 1000px;
    background-color: #ff5b5b;
    color: #ecf0f1;
    padding-top: 300px;
    box-shadow: 2px 0 5px rgba(255, 34, 34, 0.1);
    transition: left 0.3s ease-in-out;
}

.sidebar.open {
    left: 0;
}

.sidebar a {
    display: block;
    color: #ecf0f1;
    padding: 12px 15px;
    text-decoration: none;
    font-size: 14px;
    transition: background-color 0.3s;
}

.sidebar a:hover {
    background-color: #502c2c;
}

.container_inicio {
    /* margin-top: 90px; */
    width: 100%;
    display: flex;
    /* padding: 80px 20px 20px; */
    margin-left: 0;
    transition: margin-left 0.3s;
    box-sizing: border-box;
    margin-top: 75px;
}

.content {
    /* margin-top: 20px; */
    box-sizing: border-box;
    /* padding: 20px; */
    display: grid;
    grid-template-columns: auto auto;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #f7f7f7;
}

.card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.card h3 {
    margin-top: 0;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.dashboard-header h2 {
    margin: 0;
}

.tables-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.tables-container .card {
    margin-bottom: 0;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.buttons button {
    background-color: #ff5b5b;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
}

.buttons button:hover {
    background-color: #e04f4f;
}

.buttons button:last-child {
    margin-right: 0;
}

.download-btn {
    background-color: #ff5b5b;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
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
    transition: background-color 0.3s;
    width: 50%;
}

.btn-registro {
    background-color: white;
    color: #ff5b5b;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 50%;
}

.download-btn:hover {
    background-color: #e04f4f;
}

@media (max-width: 768px) {
    .tables-container {
        grid-template-columns: 1fr;
    }
}
input[type="text"] {
    padding: 10px 15px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.canvas-container {
    width: 45%;
}

.cv {
    width: 100%;
    height: auto;
}
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
}

.table-container {
    width: 45%;
}

span {
    display: flex;
    align-items: stretch;
    gap: 30px;
}

.card {
    background-color: #ff5b5b;
}

.card h2 {
    color: white;
}

.card,
.img {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.card h2,
.card h3 {
    text-align: center;
}

.img img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn_login {
    grid-column: 1 / span 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
}

.introduction {
    text-align: center;
}
</style>
