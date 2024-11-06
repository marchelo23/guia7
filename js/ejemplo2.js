// Referencias al formulario y al modal
const formulario = document.forms["frmRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), { keyboard: false }); // No cerrar al presionar ESC
const bodyModal = document.getElementById("idBodyModal");

// Evento submit del formulario
formulario.addEventListener("submit", function (event) {
    if (!validarFormulario()) {
        event.preventDefault(); // Evitar el envío si hay errores
    }
});

// Función de validación principal
function validarFormulario() {
    const nombre = document.getElementById("idNombre");
    const apellidos = document.getElementById("idApellidos");
    const fechaNac = document.getElementById("idFechaNac");
    const correo = document.getElementById("idCorreo");
    const password = document.getElementById("idPassword");
    const passwordRepetir = document.getElementById("idPasswordRepetir");
    const intereses = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];
    const carreras = document.getElementsByName("idRdCarrera");
    const pais = document.getElementById("idCmPais");

    let errores = [];

    // a. Validar que los campos no estén vacíos
    if (!nombre.value.trim()) errores.push("El campo de nombres está vacío.");
    if (!apellidos.value.trim()) errores.push("El campo de apellidos está vacío.");

    // b. Validar que la fecha de nacimiento no supere la fecha actual
    const hoy = new Date();
    const fechaUsuario = new Date(fechaNac.value);
    if (!fechaNac.value || fechaUsuario > hoy) errores.push("Fecha de nacimiento inválida.");

    // c. Validar correo electrónico con expresión regular
    const correoRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!correoRegEx.test(correo.value)) errores.push("El correo electrónico no es válido.");

    // d. Validar que las contraseñas coincidan
    if (password.value !== passwordRepetir.value) errores.push("Las contraseñas no coinciden.");

    // e. Verificar que se seleccione al menos un interés
    const interesSeleccionado = intereses.some(interes => interes.checked);
    if (!interesSeleccionado) errores.push("Seleccione al menos un interés.");

    // f. Verificar que el usuario seleccione una carrera
    const carreraSeleccionada = Array.from(carreras).some(carrera => carrera.checked);
    if (!carreraSeleccionada) errores.push("Seleccione una carrera.");

    // g. Verificar que sea seleccionado un país de origen
    if (pais.value === "Seleccione una opcion") errores.push("Seleccione un país de origen.");

    // Mostrar errores o proceder a mostrar datos en el modal
    if (errores.length > 0) {
        alert("Errores:\n" + errores.join("\n"));
        return false;
    }
    mostrarEnModal();
    return true;
}

// Función para mostrar la información en el modal en forma de tabla, sin innerHTML
function mostrarEnModal() {
    // Eliminar todos los nodos hijos previos en el modal
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-striped";
    const tbody = document.createElement("tbody");

    // Función para agregar filas a la tabla
    function agregarFila(campo, valor) {
        const fila = document.createElement("tr");
        const celdaCampo = document.createElement("td");
        celdaCampo.textContent = campo;
        const celdaValor = document.createElement("td");
        celdaValor.textContent = valor;
        fila.appendChild(celdaCampo);
        fila.appendChild(celdaValor);
        tbody.appendChild(fila);
    }

    // Agregar datos del formulario a la tabla
    agregarFila("Nombres", document.getElementById("idNombre").value);
    agregarFila("Apellidos", document.getElementById("idApellidos").value);
    agregarFila("Fecha de Nacimiento", document.getElementById("idFechaNac").value);
    agregarFila("Correo Electrónico", document.getElementById("idCorreo").value);
    agregarFila("Intereses", obtenerIntereses());
    agregarFila("Carrera", obtenerCarrera());
    agregarFila("País de Origen", pais.options[pais.selectedIndex].text);

    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
    modal.show(); // Mostrar el modal
}

// Función para obtener intereses seleccionados
function obtenerIntereses() {
    const intereses = ["Programación", "Base de Datos", "Inteligencia Artificial", "Seguridad Informática"];
    return intereses.filter((_, i) => document.getElementById(`idCk${intereses[i].replace(" ", "")}`).checked).join(", ");
}

// Función para obtener la carrera seleccionada
function obtenerCarrera() {
    const carreras = document.getElementsByName("idRdCarrera");
    return Array.from(carreras).find(carrera => carrera.checked)?.nextSibling.textContent.trim() || "";
}