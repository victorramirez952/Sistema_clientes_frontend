<script>
    import { checkAuth, getIsLoggedIn, getToken } from "../../utils/authUtils";
    checkAuth();
    let isLoggedIn = getIsLoggedIn();
    const token = getToken()

    import Header from "../components/Header.svelte";
    import { onMount } from "svelte";
    const ip_hostname = import.meta.env.VITE_IP_HOSTNAME;

    function closeAllModals() {
        document.querySelectorAll(".modal").forEach((modal) => {
            modal.style.display = "none";
        });
    }

    function cargarHistorialCrediticios() {
        fetch(`http://${ip_hostname}:5008/api/historial-credito`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const tableBody = document.querySelector(
                    "#historialCrediticioTable tbody",
                
                );
                console.log(data);
                tableBody.innerHTML = "";

                if (data && Array.isArray(data.historial)) {
                    data.historial.forEach((historialCredito) => {
                        const row = document.createElement("tr");
                        row.setAttribute("data-id", historialCredito.IDCLIENTE);

                        const valorSeguro = (dato) =>
                            dato !== null && dato !== undefined ? dato : "N/A";

                        row.innerHTML = `
                    <td>${valorSeguro(historialCredito.IDHISTORIAL)}</td>
                    <td>${valorSeguro(historialCredito.IDCLIENTE)}</td>
                    <td>${valorSeguro(historialCredito.FECHACONSULTA)}</td>
                    <td>${valorSeguro(historialCredito.FECHAINICIO)}</td>
                    <td>${valorSeguro(historialCredito.FECHAFIN)}</td>
                    <td>${valorSeguro(historialCredito.NUMEROCREDITOSPAGADOS)}</td>
                    <td>${valorSeguro(historialCredito.NUMEROCREDITOSATRASADOS)}</td>`;
                    
                        tableBody.appendChild(row);
                    });
                } else {
                    console.error(
                        "La estructura de los datos no es la esperada.",
                    );
                }
            })
            .catch((error) =>
                console.error("Error al cargar los datos:", error),
            );
    }

    function agregarHistorialInicioTabla(historialCredito) {
        const tableBody = document.querySelector(
            "#historialCrediticioTable tbody",
        );

        const row = document.createElement("tr");
        row.setAttribute("data-id", historialCredito.IDCLIENTE);

        const valorSeguro = (dato) =>
            dato !== null && dato !== undefined ? dato : "N/A";

        row.innerHTML = `
            <td>${valorSeguro(historialCredito.IDHISTORIAL)}</td>
            <td>${valorSeguro(historialCredito.IDCLIENTE)}</td>
            <td>${valorSeguro(historialCredito.FECHACONSULTA)}</td>
            <td>${valorSeguro(historialCredito.FECHAINICIO)}</td>
            <td>${valorSeguro(historialCredito.FECHAFIN)}</td>
            <td>${valorSeguro(historialCredito.NUMEROCREDITOSPAGADOS)}</td>
            <td>${valorSeguro(historialCredito.NUMEROCREDITOSATRASADOS)}</td>`;
        tableBody.insertBefore(row, tableBody.firstChild);
    }
    function actualizarHistorialCreditoEnTabla(historialCredito) {
        const tableBody = document.querySelector(
            "#historialCrediticioTable tbody",
        );

        const row = document.querySelector(
            `#historialCrediticioTable tbody tr[data-id="${historialCredito.IDCLIENTE}"]`,
        );

        if (row) {
            const valorSeguro = (dato) =>
                dato !== null && dato !== undefined ? dato : "N/A";

            row.innerHTML = `
                <td>${valorSeguro(historialCredito.IDHISTORIAL)}</td>
                <td>${valorSeguro(historialCredito.IDCLIENTE)}</td>
                <td>${valorSeguro(historialCredito.FECHACONSULTA)}</td>
                <td>${valorSeguro(historialCredito.FECHAINICIO)}</td>
                <td>${valorSeguro(historialCredito.FECHAFIN)}</td>
                <td>${valorSeguro(historialCredito.NUMEROCREDITOSPAGADOS)}</td>
                <td>${valorSeguro(historialCredito.NUMEROCREDITOSATRASADOS)}</td>`;
        } else {
            console.error("No credit history found");
        }
    }

    function eliminarHistorialCrediticioDeTabla(idCliente) {
        const table = document.getElementById("historialCrediticioTable");
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row) => {
            if (row.getAttribute("data-id") === idCliente) {
                row.remove();
            }
        });
    }
    function getHistorial(idCliente) {
        return fetch(
            `http://${ip_hostname}:5009/api/historial-credito/${idCliente}`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            },
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (
                    data &&
                    data.historial &&
                    data.historial.length > 0
                ) {
                    return data.historial[0];
                } else {
                    console.error("No historial crediticio found");
                    return null;
                }
            })
            .catch((error) => {
                console.error("Error al cargar los datos:", error);
                return null;
            });
    }
    onMount(() => {
        cargarHistorialCrediticios();

        var modalAdd = document.getElementById("modalAdd");
        var modalEdit = document.getElementById("modalEdit");
        var modalRmv = document.getElementById("modalRmv");

        var btnAdd = document.getElementById("addCredito");
        var btnEdit = document.getElementById("editCredito");
        var btnRmv = document.getElementById("rmvCredito");

        var closeButtons = document.querySelectorAll(".close");

        btnAdd.onclick = function () {
            modalAdd.style.display = "block";
        };

        btnEdit.onclick = function () {
            modalEdit.style.display = "block";
        };

        btnRmv.onclick = function () {
            modalRmv.style.display = "block";
        };

        closeButtons.forEach((button) => {
            button.onclick = closeAllModals;
        });

        window.onclick = function (event) {
            if (event.target.classList.contains("modal")) {
                event.target.style.display = "block";
            }
        };
    });
    
    function addHistorial(event) {
        event.preventDefault();

        closeAllModals();

        const historialCredito = {
            IDCLIENTE: document.getElementById('idClienteAdd').value,
            FECHAINICIO: document.getElementById('fechaInicioAdd').value,
            FECHAFIN: document.getElementById('fechaFinAdd').value,
        };
        console.log(historialCredito);

        fetch(`http://${ip_hostname}:5010/api/historial-credito`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(historialCredito),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Historial crediticio added:", data);
                let id_historial_credito_registrado = data.IDHISTORIAL;
                cargarHistorialCrediticios();
            })
            .catch((error) =>
                console.error(
                    "Hubo un error al agregar el historial crediticio:",
                    error.message,
                ),
            );
    }

    function updateHistorial(event) {
        event.preventDefault();
        closeAllModals();

        const historialCredito = {
            IDHISTORIAL: document.getElementById('idHistorialEdit').value,
            IDCLIENTE: document.getElementById('idClienteEdit').value,
            FECHAINICIO: document.getElementById('fechaInicioEdit').value,
            FECHAFIN: document.getElementById('fechaFinEdit').value,
        };
        console.log(historialCredito);
        fetch(
            `http://${ip_hostname}:5011/api/historial-credito/${historialCredito.IDHISTORIAL}`,
            {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(historialCredito)
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Historial crediticio updated:", data);
                cargarHistorialCrediticios();
            })
            .catch((error) =>
                console.error(
                    "Hubo un error al actualizar el historial crediticio:",
                    error.message,
                ),
            );
    }

    function deleteHistorial(event) {
        event.preventDefault();
        closeAllModals();
        const historialCredito = {
            IDCLIENTE: document.getElementById("idHistorialDelete").value,
        };
        console.log(historialCredito);
        fetch(
            `http://${ip_hostname}:5012/api/historial-credito/${historialCredito.IDCLIENTE}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`, 
                },
            },
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Error al eliminar el historial crediticio: ${response.statusText}`,
                    );
                }
                return response.json();
            })
            .then((data) => {
                console.log("Historial Crediticio eliminado:", data);
                cargarHistorialCrediticios();
            })
            .catch((error) =>
                console.error(
                    "Hubo un error al eliminar el historial crediticio:",
                    error.message,
                ),
            );
    }

    function downloadData() {
        const table = document.getElementById("historialCrediticioTable");
        const rows = table.rows;
        const historialesCreditos = [];

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            const historialCredito = {
                IDHISTORIAL: cells[0].innerText,
                IDCLIENTE: cells[1].innerText,
                FECHACONSULTA: cells[2].innerText,
                FECHAINICIO: cells[3].innerText,
                FECHAFIN: cells[4].innerText,
                NUMEROCREDITOSPAGADOS: cells[5].innerText,
                NUMEROCREDITOSATRASADOS: cells[6].innerText,
            };
            historialesCreditos.push(historialCredito);
        }

        const jsonData = JSON.stringify(historialesCreditos);

        const blob = new Blob([jsonData], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "historial_crediticio.json";
        link.click();
    }
</script>

<svelte:head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Historiales Crediticios</title>
</svelte:head>

{#if isLoggedIn}
    <Header />

    <div class="main" id="main">
        <div class="dashboard-header">
            <h2>Gestión de Historial Crediticio</h2>
        </div>

        <div class="content">
            <table id="historialCrediticioTable">
                <thead>
                    <tr>
                        <th>IDHISTORIAL</th>
                        <th>IDCLIENTE</th>
                        <th>FECHACONSULTA</th>
                        <th>FECHAINICIO</th>
                        <th>FECHAFIN</th>
                        <th>NUMEROCREDITOSPAGADOS</th>
                        <th>NUMEROCREDITOSATRASADOS</th>
                    </tr>
                </thead>
                <tbody> </tbody>
            </table>
            <br />

            <div class="modal" id="modalAdd">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>AÑADIR CRÉDITO</h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form
                            onsubmit={addHistorial}
                            class="login-form"
                            id="form_crear_historialCredito"
                        >
                            <div class="form-group">
                                <label for="IDCLIENTE">IDCLIENTE</label>
                                <input
                                    id = "idClienteAdd"
                                    type="number"
                                    name="IDCLIENTE"
                                    placeholder="Ingresa el ID del cliente"
                                    required={false}
                                />
                            </div>
                            <div class="form-group">
                                <label for="FECHAINICIO">FECHAINICIO</label>
                                <input
                                    id = "fechaInicioAdd"
                                    type="text"
                                    name="FECHAINICIO"
                                    placeholder="Ingresa la fecha de inicio"
                                    required={false}
                                />
                            </div>
                            <div class="form-group">
                                <label for="FECHAFIN">FECHAFIN</label>
                                <input
                                    id = "fechaFinAdd"
                                    type="text"
                                    name="FECHAFIN"
                                    placeholder="Ingresa la fecha de fin"
                                    required={false}
                                />
                            </div>
                            <br />
                            <button type="submit" class="btn"
                                >AÑADIR HISTORIAL CREDITO</button
                            >
                        </form>
                    </div>
                    <div class="modal-footer">
                        <h3></h3>
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
                        <form
                            onsubmit={updateHistorial}
                            class="login-form"
                            id="form_editar_historialCredito"
                        >
                            <div class="form-group">
                                <label for="IDHISTORIAL">IDHISTORIAL</label>
                                <input
                                    type="number"
                                    id="idHistorialEdit"
                                    name="IDHISTORIAL"
                                    placeholder="Ingresa el ID del historial"
                                    required={false}
                                />
                            </div>
                            <div class="form-group">
                                <label for="idClienteEdit">IDCLIENTE</label>
                                <input
                                    type="number"
                                    id="idClienteEdit"
                                    name="IDCLIENTE"
                                    placeholder="Ingresa ID del cliente"
                                    required={false}
                                />
                            </div>
                            <div class="form-group">
                                <label for="fechaInicioEdit">FECHAINICIO</label>
                                <input
                                    type="text"
                                    id="fechaInicioEdit"
                                    name="FECHAINICIO"
                                    placeholder="Ingresa la fecha del inicio"
                                    required={false}
                                />
                            </div>
                            <div class="form-group">
                                <label for="fechaFinEdit">FECHAFIN</label>
                                <input
                                    type="text"
                                    id="fechaFinEdit"
                                    name="FECHAFIN"
                                    placeholder="Ingresa la fecha del fin"
                                    required={false}
                                />
                            </div>
                            <br />
                            <button type="submit" class="btn"
                                >EDITAR CRÉDITO</button
                            >
                        </form>
                    </div>
                    <div class="modal-footer">
                        <h3></h3>
                    </div>
                </div>
            </div>

            <div class="modal" id="modalRmv">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>ELIMINAR CRÉDITO</h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form
                            onsubmit={deleteHistorial}
                            class="login-form"
                            id="form_rmv_historialCredito"
                        >
                            <div class="form-group">
                                <label for="IDHISTORIAL">IDHISTORIAL</label>
                                <input
                                    type="number"
                                    id="idHistorialDelete"
                                    name="IDHISTORIAL"
                                    placeholder="Ingresa el ID del historial"
                                    required={true}
                                />
                            </div>
                            <br />
                            <button type="submit" class="btn"
                                >ELIMINAR CRÉDITO</button
                            >
                        </form>
                    </div>
                    <div class="modal-footer">
                        <h3></h3>
                    </div>
                </div>
            </div>

            <div class="buttons">
                <button id="addCredito">Agregar Entrada de Credito</button>
                <button id="editCredito">Editar Entrada de Credito</button>
                <button id="rmvCredito">Eliminar Entrada de Credito</button>
            </div>

            <br />

            <button class="download-btn" onclick={downloadData}
                >Descargar Datos</button
            >
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
        box-shadow:
            0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        animation-name: animatetop;
        animation-duration: 0.4s;
        border-radius: 8px;
    }
    @keyframes animatetop {
        from {
            top: -300px;
            opacity: 0;
        }
        to {
            top: 0;
            opacity: 1;
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
