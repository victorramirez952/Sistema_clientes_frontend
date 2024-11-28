<script>
    import { checkAuth, handleLogout } from "../../utils/authUtils";
    
    // checkAuth();
    let isOpen = false
    function toggleMenu() {
        // const sidebar = document.getElementById("sidebar");
        // const main = document.getElementById("main");
        // sidebar.classList.toggle("open");
        // main.classList.toggle("open");
        // toggle isOpen
        isOpen = !isOpen;
    }
</script>

<div class="header">
    <div class="logo">
        <img src="logo.png" alt="Logo" onclick={() => window.location.href = '/'}>
        <h1>Plataforma de Gestión de Clientes y Créditos</h1>
    </div>
    <div class="menu-icon" onclick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<div class="sidebar" id="sidebar" style="left: {isOpen ? '0' : '-150px'}">
    <a href="/clientes">Clientes</a>
    <a href="/historialesCreditos">Historial Crediticio</a>
    <a href="/creditos">Créditos y Pagos</a>
    <a href="/analisisFinanciero">Análisis Financiero</a>
    <a href="#" onclick={handleLogout}>Logout</a>
</div>

<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
}

.header {
    background-color: #ff5b5b;
    color: #fff;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.header .logo {
    display: flex;
    align-items: center;
}

.header .logo img {
    max-width: 50px;
    margin-right: 10px;
    cursor: pointer;
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
    margin: 5px 0;
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

.main {
    padding: 80px 20px 20px;
    margin-left: 0;
    transition: margin-left 0.3s;
}

.main.open {
    margin-left: 150px;
}

.content {
    margin-top: 20px;
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

.download-btn:hover {
    background-color: #e04f4f;
}

@media (max-width: 768px) {
    .tables-container {
        grid-template-columns: 1fr;
    }
}

.modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #f4f4f9;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 20px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #e04f4f;
    color: white;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    padding: 2px 16px;
}

.modal-footer {
    padding: 2px 16px;
    background-color: #e04f4f;
    color: white;
    text-align: center;
    font-size: 14px;
}

.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 50%;
    max-width: 800px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;
    border-radius: 8px;
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
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

.form-group {
    margin-bottom: 15px;
    text-align: left;
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
</style>
