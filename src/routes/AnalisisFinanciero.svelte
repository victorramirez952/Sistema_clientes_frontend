<script>
    import { checkAuth, getIsLoggedIn, getToken } from "../utils/authUtils";
    checkAuth();
    let isLoggedIn = getIsLoggedIn();
    const token = getToken()

    import Header from './components/Header.svelte'
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    onMount(() => {
        // SOMETHING
        let ctx = document.getElementById('chart1').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Dato1', 'Dato2', 'Dato3', 'Dato4', 'Dato5', 'Dato6'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 91, 91, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
</script>

<svelte:head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Analisis Financiero</title>
</svelte:head>

{#if isLoggedIn}
<Header/>

<div class="main" id="main">
    <div class="dashboard-header">
        <h2>Análisis Financiero</h2>
    </div>

    <div class="content">
        <p>
            Nuestra plataforma ofrece soluciones integrales para la gestión de clientes y créditos, incluyendo el
            monitoreo del historial crediticio, análisis detallado de pagos y un sistema automatizado para la
            aprobación de créditos. Optimiza la toma de decisiones y reduce riesgos financieros de manera eficiente.
        </p>
        <div class="flex-container">
            <div class="canvas-container">
                <canvas id="chart1" class="cv"></canvas>
            </div>
            <div class="table-container">
                <table id="tablaAnalisis">
                    <thead>
                        <tr>
                            <th>Dato1</th>
                            <th>Dato2</th>
                            <th>Dato3</th>
                            <th>Dato4</th>
                            <th>Dato5</th>
                            <th>Dato6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <span>
            <h2>Última actualizacón: </h2>
            <p style="color: #e04f4f;">16:44</p>
        </span>
    </div>
</div>
{/if}

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
        padding: 20px;
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

    span {
        display: inline-flex;
        align-items: center;
        gap: 10px;
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

    span {
        display: inline-flex;
        align-items: center;
        gap: 10px;
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
</style>