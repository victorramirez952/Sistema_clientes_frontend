<script>
  import { get } from "svelte/store";
    import { checkAuth, getIsLoggedIn, getToken } from "../../utils/authUtils";
    checkAuth();
    let isLoggedIn = getIsLoggedIn();

    import Header from '../components/Header.svelte'
    import { onMount } from 'svelte';
    const ip_hostname = import.meta.env.VITE_IP_HOSTNAME
    const token = getToken()

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    function cargarClientes() {
        fetch(`http://${ip_hostname}:5002/api/clientes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                const tableBody = document.querySelector("#clientesTable tbody");
                tableBody.innerHTML = '';

                if (data && Array.isArray(data.clientes)) {
                    data.clientes.forEach(cliente => {
                        const row = document.createElement("tr");
                        row.setAttribute("data-id", cliente.IDCLIENTE);

                        const valorSeguro = (dato) => dato !== null && dato !== undefined ? dato : "N/A";

                        row.innerHTML = `
                    <td>${valorSeguro(cliente.IDCLIENTE)}</td>
                    <td>${valorSeguro(cliente.FECHA)}</td>
                    <td>${valorSeguro(cliente.IDENTIFICACIONFISCAL)}</td>
                    <td>${valorSeguro(cliente.NOMBRE1)}</td>
                    <td>${valorSeguro(cliente.NOMBRE2)}</td>
                    <td>${valorSeguro(cliente.NUMEROCLIENTE)}</td>
                    <td>${valorSeguro(cliente.TELEFONO)}</td>`;
                        tableBody.appendChild(row);
                    });
                } else {
                    console.error("La estructura de los datos no es la esperada.");
                }
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    function agregarClienteInicioTabla(cliente) {
        const tableBody = document.querySelector("#clientesTable tbody");

        const row = document.createElement("tr");
        row.setAttribute("data-id", cliente.IDCLIENTE);

        const valorSeguro = (dato) => dato !== null && dato !== undefined ? dato : "N/A";

        row.innerHTML = `
            <td>${valorSeguro(cliente.IDCLIENTE)}</td>
            <td>${valorSeguro(cliente.FECHA)}</td>
            <td>${valorSeguro(cliente.IDENTIFICACIONFISCAL)}</td>
            <td>${valorSeguro(cliente.NOMBRE1)}</td>
            <td>${valorSeguro(cliente.NOMBRE2)}</td>
            <td>${valorSeguro(cliente.NUMEROCLIENTE)}</td>
            <td>${valorSeguro(cliente.TELEFONO)}</td>`;

        tableBody.insertBefore(row, tableBody.firstChild);
    }

    function actualizarClienteEnTabla(cliente) {
        const tableBody = document.querySelector("#clientesTable tbody");

        const row = document.querySelector(`#clientesTable tbody tr[data-id="${cliente.IDCLIENTE}"]`);

        if (row) {
            const valorSeguro = (dato) => dato !== null && dato !== undefined ? dato : "N/A";

            row.innerHTML = `
                <td>${valorSeguro(cliente.IDCLIENTE)}</td>
                <td>${valorSeguro(cliente.FECHA)}</td>
                <td>${valorSeguro(cliente.IDENTIFICACIONFISCAL)}</td>
                <td>${valorSeguro(cliente.NOMBRE1)}</td>
                <td>${valorSeguro(cliente.NOMBRE2)}</td>
                <td>${valorSeguro(cliente.NUMEROCLIENTE)}</td>                
                <td>${valorSeguro(cliente.TELEFONO)}</td>`;
        } else {
            console.error('No client found');
        }
    }

    function eliminarClienteDeTabla(idCliente) {
        const table = document.getElementById("clientesTable");
        const rows = table.querySelectorAll("tbody tr"); // Select only rows inside the tbody

        rows.forEach(row => {
            if (row.getAttribute("data-id") === idCliente) {
                row.remove();
            }
        });
    }

    function getCliente(idCliente) {
        return fetch(`http://${ip_hostname}:5003/api/clientes/${idCliente}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.clients && data.clients.length > 0) {
                return data.clients[0];
            } else {
                console.error('No client found');
                return null;
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            return null;
        });
    }

    onMount(() => {
        cargarClientes();
        // getCliente(126948).then(cliente => {
        //     agregarClienteInicioTabla(cliente);
        // }).catch(error => {
        //     console.error('Error fetching client:', error);
        // });

        var modalAdd = document.getElementById("modalAdd");
        var modalEdit = document.getElementById("modalEdit");
        var modalRmv = document.getElementById("modalRmv");
    
        var btnAdd = document.getElementById("addClientes");
        var btnEdit = document.getElementById("editClientes");
        var btnRmv = document.getElementById("rmvClientes");
    
        var closeButtons = document.querySelectorAll(".close");
        
        btnAdd.onclick = function () {
            modalAdd.style.display = "block";
        }

        btnEdit.onclick = function () {
            modalEdit.style.display = "block";
        }
    
        btnRmv.onclick = function () {
            modalRmv.style.display = "block";
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

    function addCliente(event) {
        event.preventDefault();
        
        closeAllModals()
        // const cliente = {
        //     FECHA: document.getElementById('fechaAdd').value,
        //     IDENTIFICACIONFISCAL: document.getElementById('idFiscalAdd').value,
        //     NOMBRE1: document.getElementById('nombre1Add').value,
        //     NOMBRE2: document.getElementById('nombre2Add').value,
        //     NUMEROCLIENTE: document.getElementById('numeroClienteAdd').value,
        //     TELEFONO: document.getElementById('telefonoAdd').value
        // };
        const cliente = {
                "FECHA": "2099-01-04",
                "IDENTIFICACIONFISCAL": "44444444441.0",
                "NOMBRE1": "Barry Allen",
                "NOMBRE2": "EL VELOCISTA",
                "NUMEROCLIENTE": 916620,
                "TELEFONO": "81-4444444"
            };
        console.log(cliente);
        
        fetch(`http://${ip_hostname}:5005/api/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cliente)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Cliente added:', data);
            let id_cliente_registrado = data.IDCLIENTE;
            getCliente(id_cliente_registrado).then(cliente => {
                agregarClienteInicioTabla(cliente);
            }).catch(error => {
                console.error('Error fetching client:', error);
            });
        })
        .catch(error => console.error('Hubo un error al agregar el cliente:', error.message));
    }

    function updateCliente(event) {
        event.preventDefault();
        closeAllModals()

        // const cliente = {
        //     IDCLIENTE: 120132,
        //     FECHA: '2023-11-26',
        //     IDENTIFICACIONFISCAL: '44444444441.0',
        //     NOMBRE1: 'Wally West',
        //     NOMBRE2: 'EL VELOCISTA',
        //     NUMEROCLIENTE: 916619,
        //     TELEFONO: '81-2222-4444'
        // };

        const cliente = {
            IDCLIENTE: document.getElementById('idClienteEdit').value,
            FECHA: document.getElementById('fechaEdit').value,
            IDENTIFICACIONFISCAL: document.getElementById('idFiscalEdit').value,
            NOMBRE1: document.getElementById('nombre1Edit').value,
            NOMBRE2: document.getElementById('nombre2Edit').value,
            NUMEROCLIENTE: document.getElementById('numeroClienteEdit').value,
            TELEFONO: document.getElementById('telefonoEdit').value
        };
        console.log(cliente);
        fetch(`http://${ip_hostname}:5006/api/clientes/${cliente.IDCLIENTE}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cliente)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Cliente updated:', data);
            actualizarClienteEnTabla(cliente)
        })
        .catch(error => console.error('Hubo un error al actualizar el cliente:', error.message));
    }

    function deleteCliente(event) {
        event.preventDefault();
        closeAllModals()
        const cliente = {
            IDCLIENTE: document.getElementById('idClienteDelete').value,
        }
        console.log(cliente);
        fetch(`http://${ip_hostname}:5007/api/clientes/${cliente.IDCLIENTE}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar el cliente: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Cliente eliminado:', data);
            eliminarClienteDeTabla(cliente.IDCLIENTE)
        })
        .catch(error => console.error('Hubo un error al eliminar el cliente:', error.message));
    }

    function downloadData() {
        const table = document.getElementById("clientesTable");
        const rows = table.rows;
        const clients = [];

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            const client = {
                IDCLIENTE: cells[0].innerText,
                FECHA: cells[1].innerText,
                IDENTIFICACIONFISCAL: cells[2].innerText,
                NOMBRE1: cells[3].innerText,
                NOMBRE2: cells[4].innerText,
                NUMEROCLIENTE: cells[5].innerText,
                TELEFONO: cells[6].innerText
            };
            clients.push(client);
        }

        const jsonData = JSON.stringify(clients);

        const blob = new Blob([jsonData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'clientes.json';
        link.click();
    }
</script>

<svelte:head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión</title>
</svelte:head>

{#if isLoggedIn}
<Header/>

<div class="main" id="main">
    <div class="dashboard-header">
        <h2>Gestión de Clientes</h2>
    </div>

    <div class="content">
        <table id="clientesTable">
            <thead>
                <tr>
                    <th>IDCLIENTE</th>
                    <th>FECHA</th>
                    <th>IDENTIFICACIONFISCAL</th>
                    <th>NOMBRE1</th>
                    <th>NOMBRE2</th>
                    <th>NUMEROCLIENTE</th>
                    <th>TELEFONO</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <br>

        <div class="modal" id="modalAdd">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Agregar Cliente</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form class="login-form" onsubmit={addCliente}>
                        <div class="form-group">
                            <label for="fechaAdd">FECHA</label>
                            <input type="text" id="fechaAdd" name="fechaAdd" placeholder="Ingresa la Fecha"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="idFiscalAdd">IDENTIFICACIONFISCAL</label>
                            <input type="text" id="idFiscalAdd" name="idFiscalAdd"
                                placeholder="Ingresa Identificación Fiscal" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="nombre1Add">NOMBRE1</label>
                            <input type="text" id="nombre1Add" name="nombre1Add" placeholder="Ingresa Nombre1"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="nombre2Add">NOMBRE2</label>
                            <input type="text" id="nombre2Add" name="nombre2Add" placeholder="Ingresa Nombre2"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="numeroClienteAdd">NUMEROCLIENTE</label>
                            <input type="text" id="numeroClienteAdd" name="numeroClienteAdd"
                                placeholder="Ingresa Numero Cliente" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="telefonoAdd">TELEFONO</label>
                            <input type="text" id="telefonoAdd" name="telefonoAdd" placeholder="Ingresa Telefono"
                                required={false} />
                        </div>

                        <br>
                        <button type="submit" class="btn">AGREGAR CLIENTE</button>
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
                    <h2>Editar Cliente</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form class="login-form" onsubmit={updateCliente}>
                        <div class="form-group">
                            <label for="idClienteEdit">IDCLIENTE</label>
                            <input type="text" id="idClienteEdit" name="idClienteEdit"
                                placeholder="Ingresa ID del Cliente" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="fechaEdit">FECHA</label>
                            <input type="text" id="fechaEdit" name="fechaEdit" placeholder="Ingresa la fecha"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="idFiscalEdit">IDENTIFICACIONFISCAL</label>
                            <input type="text" id="idFiscalEdit" name="idFiscalEdit"
                                placeholder="Ingresa Identificación Fiscal" required={false} />
                        </div>
                        <div class="form-group">
                            <label for="nombre1Edit">NOMBRE1</label>
                            <input type="text" id="nombre1Edit" name="nombre1Edit" placeholder="Ingresa Nombre1"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="nombre2Edit">NOMBRE2</label>
                            <input type="text" id="nombre2Edit" name="nombre2Edit" placeholder="Ingresa Nombre2"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="numeroClienteEdit">NUMEROCLIENTE</label>
                            <input type="text" id="numeroClienteEdit" name="numeroClienteEdit" placeholder="Ingresa Nombre2"
                                required={false} />
                        </div>
                        <div class="form-group">
                            <label for="telefonoEdit">TELEFONO</label>
                            <input type="text" id="telefonoEdit" name="telefonoEdit" placeholder="Ingresa Telefono"
                                required={false} />
                        </div>

                        <br>
                        <button type="submit" class="btn">EDITAR CLIENTE</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <h3> </h3>
                </div>
            </div>
        </div>

        <div class="modal" id="modalRmv">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Eliminar Cliente</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form class="login-form" onsubmit={deleteCliente}>
                        <div class="form-group">
                            <label for="idClienteDelete">IDCLIENTE</label>
                            <input type="text" id="idClienteDelete" name="idClienteDelete"
                                placeholder="Ingresa ID del Cliente" required={true} />
                        </div>
                        <br>
                        <button type="submit" class="btn">ELIMINAR CLIENTE</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <h3> </h3>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button id="addClientes">AGREGAR CLIENTE</button>
            <button id="editClientes">EDITAR CLIENTE</button>
            <button id="rmvClientes">ELIMINAR CLIENTE</button>
        </div>

        <br>

        <button class="download-btn" onclick={downloadData}>Descargar Datos</button>
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