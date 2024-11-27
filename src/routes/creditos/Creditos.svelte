<script>
  import { on } from 'svelte/events';
    import Header from '../components/Header.svelte'
    import { onMount } from 'svelte';

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    onMount(() => {
        // cargarCreditos();
        var modalAdd = document.getElementById("modalAdd");
        var modalEdit = document.getElementById("modalEdit");

        var btnAdd = document.getElementById("addCredito");
        var btnEdit = document.getElementById("editCredito");

        var closeButtons = document.querySelectorAll(".close");

        btnAdd.onclick = function() {
            modalAdd.style.display = "block";
        }

        btnEdit.onclick = function() {
            modalEdit.style.display = "block";
        }

        closeButtons.forEach((button) => {
            button.onclick = closeAllModals
        });

        window.onclick = function (event) {
            if (event.target.classList.contains("modal")) {
                event.target.style.display = "none";
            }
        };
    });

    function downloadData() {
        const table = document.getElementById("creditosPagosTable");
        const rows = table.rows;
        const creditos = [];

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            const credito = {
                IDCREDITO: cells[0].innerText,
                IDCLIENTE: cells[1].innerText,
                LIMITECREDITO: cells[2].innerText,
                FECHAVENCIMIENTO: cells[3].innerText,
                STATUS: cells[4].innerText
            };
            creditos.push(credito);
        }

        const jsonData = JSON.stringify(creditos);

        const blob = new Blob([jsonData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'creditos.json';
        link.click();
    }

    function addCredito(event) {
        event.preventDefault();
        closeAllModals()
        const form = document.getElementById('form_crear_credito');

        const credito = {
            IDCLIENTE: form.querySelector('[name="IDCLIENTE"]').value,
            LIMITECREDITO: form.querySelector('[name="LIMITECREDITO"]').value,
            FECHAVENCIMIENTO: form.querySelector('[name="FECHAVENCIMIENTO"]').value
        };

        console.log(credito);

        // REST OF THE CODE
    }

    function updateCredito(event) {
        event.preventDefault();
        closeAllModals();
        const form = document.getElementById('form_editar_credito');
        const credito = {
            IDCREDITO: form.querySelector('[name="IDCREDITO"]').value,
            LIMITECREDITO: form.querySelector('[name="LIMITECREDITO"]').value,
            FECHAVENCIMIENTO: form.querySelector('[name="FECHAVENCIMIENTO"]').value,
            STATUS: form.querySelector('[name="STATUS"]').value
        };
        console.log(credito);
        
        // REST OF THE CODE
    }


</script>

<svelte:head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Créditos</title>
</svelte:head>

<Header/>

<div class="main" id="main">
    <div class="dashboard-header">
        <h2>Créditos</h2>
    </div>

    <div class="content">
        <span>
            <div class="buttons">
                <input type="text" id="idCliente" name="idCliente" placeholder="Buscar por ID Cliente"/>
                <button>Buscar</button>
            </div>
        </span>
        <br>
        <table id="creditosPagos">
            <thead>
                <tr>
                    <th>IDCREDITO</th>
                    <th>IDCLIENTE</th>
                    <th>LIMITECREDITO</th>
                    <th>FECHAVENCIMIENTO</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <br>

        <div class="modal" id="modalAdd">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>AÑADIR CRÉDITO</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form onsubmit={addCredito} class="login-form" id="form_crear_credito">
                        <div class="form-group">
                            <label for="IDCLIENTE">IDCLIENTE</label>
                            <input type="number" name="IDCLIENTE" placeholder="Ingresa ID del cliente" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="LIMITECREDITO">LIMITECREDITO</label>
                            <input type="number" name="LIMITECREDITO" placeholder="Ingresa Nombre del Cliente" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="FECHAVENCIMIENTO">FECHAVENCIMIENTO</label>
                            <input type="text" name="FECHAVENCIMIENTO" placeholder="Ingresa la fecha" required={false} />
                        </div>
                        <br>
                        <button type="submit" class="btn">AÑADIR CRÉDITO</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <h3> </h3>
                </div>
            </div>
        </div>
        
        <div class="modal" id="modalEdit">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>EDITAR CRÉDITO</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form onsubmit={updateCredito} class="login-form" id="form_editar_credito">
                        <div class="form-group">
                            <label for="IDCREDITO">IDCREDITO</label>
                            <input type="number" id="IDCREDITO" name="IDCREDITO" placeholder="Ingresa ID del Credito" required={false}  />
                        </div>
                        <div class="form-group">
                            <label for="IDCLIENTE">IDCLIENTE</label>
                            <input type="text" id="IDCLIENTE" name="IDCLIENTE" placeholder="Ingresa ID del Cliente" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="LIMITECREDITO">LIMITECREDITO</label>
                            <input type="number" id="LIMITECREDITO" name="LIMITECREDITO" placeholder="Ingresa Nombre del Cliente" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="FECHAVENCIMIENTO">FECHAVENCIMIENTO</label>
                            <input type="text" id="FECHAVENCIMIENTO" name="FECHAVENCIMIENTO" placeholder="Ingresa Status del Cliente" required={false} />
                        </div>
                        <select name="STATUS" id="STATUS">
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                        <br>
                        <button type="submit" class="btn">EDITAR CRÉDITO</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <h3> </h3>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button id="addCredito">AGREGAR CRÉDITO</button>
            <button id="editCredito">EDITAR CRÉDITO</button>
        </div>
        <br>
        <button class="download-btn" onclick={downloadData}>DESCARGAR DATOS</button>
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
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        animation-name: animatetop;
        animation-duration: 0.4s;
        border-radius: 8px;
    }

    @keyframes animatetop {
        from {top: -300px; opacity: 0}
        to {top: 0; opacity: 1}
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