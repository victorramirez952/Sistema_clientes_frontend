<script>
    import Header from './components/Header.svelte'
    let isOpen = false
    function toggleMenu() {
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main");
        sidebar.classList.toggle("open");
        main.classList.toggle("open");
        // toggle isOpen
        isOpen = !isOpen;
    }
</script>

<svelte:head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Dev</title>
</svelte:head>

<Header/>

<div class="main" id="main" style="left: {isOpen ? '0' : '150px'}">
    <div class="dashboard-header">
        <h2>Bienvenido al Dashboard</h2>
    </div>

    <div class="content">
        <div class="tables-container">
            <div class="card">
                <h3>Resumen Financiero</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Indicador</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Clientes Activos</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Créditos Otorgados</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Pagos en Proceso</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3>Gráficos de Créditos y Pagos</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo de Crédito</th>
                                <th>Monto Total</th>
                                <th>Pagos Pendientes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Créditos Hipotecarios</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Créditos Personales</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3>Alertas y Notificaciones</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Alerta</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <h3>Indicadores de Impacto Económico</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Impacto</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
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

@media (max-width: 768px) {
    .tables-container {
        grid-template-columns: 1fr;
    }
}
</style>