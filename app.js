function cambiarPantalla(id) {
    document.querySelectorAll("main section").forEach(sec => {
        sec.classList.add("oculto");
    });

    document.getElementById(id).classList.remove("oculto");
}

function actualizarProgreso(valor) {
    document.getElementById("progreso").style.width = valor + "%";
}

function iniciarGuia() {
    cambiarPantalla("modulo1");
    actualizarProgreso(15);
}

function verificarModulo1() {
    const checks = document.querySelectorAll("#modulo1 input[type='checkbox']");
    const boton = document.getElementById("btnModulo1");

    const todosMarcados = [...checks].every(check => check.checked);

    boton.disabled = !todosMarcados;
}

function irModulo2() {
    cambiarPantalla("modulo2");
    actualizarProgreso(30);
}
function verificarModulo2() {
    const checks = document.querySelectorAll("#modulo2 input[type='checkbox']");
    const boton = document.getElementById("btnModulo2");

    const todosMarcados = [...checks].every(check => check.checked);

    boton.disabled = !todosMarcados;
}

function irModulo3() {
    cambiarPantalla("modulo3");
    actualizarProgreso(45);
}
function verificarModulo3() {
    const checks = document.querySelectorAll("#modulo3 input[type='checkbox']");
    const boton = document.getElementById("btnModulo3");

    const todosMarcados = [...checks].every(check => check.checked);

    boton.disabled = !todosMarcados;
}

function irModulo4() {
    cambiarPantalla("modulo4");
    actualizarProgreso(60);
}
function verificarModulo4() {
    const checks = document.querySelectorAll("#modulo4 input[type='checkbox']");
    const boton = document.getElementById("btnModulo4");

    const todosMarcados = [...checks].every(check => check.checked);

    boton.disabled = !todosMarcados;
}

function irRecomendacion() {
    cambiarPantalla("recomendacion");
    actualizarProgreso(75);
}

function evaluarRecomendacion() {

    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;
    const p3 = document.getElementById("p3").value;
    const p4 = document.getElementById("p4").value;

    if (!p1 || !p2 || !p3 || !p4) {
        alert("Responde todas las preguntas.");
        return;
    }

    let resultado = "";
    let contadorNo = 0;

    if (p2 === "no") contadorNo++;
    if (p3 === "no") contadorNo++;
    if (p4 === "no") contadorNo++;

    // Regla principal
    if (p1 === "no") {
        resultado = "🔴 Recomendación: Es mejor contratar un contador para evitar errores fiscales.";
    } 
    else {
        if (contadorNo >= 2) {
            resultado = "🟠 Recomendación: Considera contratar un contador para mayor seguridad.";
        } else {
            resultado = "🟢 Recomendación: Puedes utilizar el sistema gratuito del SAT sin problema.";
        }
    }

    document.getElementById("resultadoRecomendacion").innerHTML = resultado;

    document.getElementById("btnISR").classList.remove("oculto");
}
function irISR() {
    cambiarPantalla("isr");
    actualizarProgreso(90);
}


function calcularISR() {

    let ingresos = parseFloat(document.getElementById("ingresosMes").value);

    if (!ingresos || ingresos <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Dato inválido',
            text: 'Ingresa un monto válido.'
        });
        return;
    }

    let tasa = 0;

    if (ingresos <= 25000) tasa = 0.01;
    else if (ingresos <= 50000) tasa = 0.011;
    else if (ingresos <= 83333) tasa = 0.015;
    else if (ingresos <= 208333) tasa = 0.02;
    else tasa = 0.025;

    let isr = ingresos * tasa;

    document.getElementById("resultadoISR").innerHTML =
        `Tasa aplicada: ${(tasa * 100).toFixed(2)}% <br>
         ISR a pagar: $${isr.toFixed(2)}`;

    // Mostrar botón siguiente
    document.getElementById("btnFinal").classList.remove("oculto");
}
function calcularIVA() {

    let ventas = parseFloat(document.getElementById("ventasIVA").value);
    let compras = parseFloat(document.getElementById("comprasIVA").value);

    if (!ventas || ventas < 0 || compras < 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos inválidos',
            text: 'Ingresa montos correctos.'
        });
        return;
    }

    let ivaTrasladado = ventas * 0.16;
    let ivaAcreditable = compras * 0.16;
    let ivaPagar = ivaTrasladado - ivaAcreditable;

    document.getElementById("resultadoIVA").innerHTML =
        `IVA trasladado: $${ivaTrasladado.toFixed(2)} <br>
         IVA acreditable: $${ivaAcreditable.toFixed(2)} <br>
         <strong>IVA a pagar: $${ivaPagar.toFixed(2)}</strong>`;

    // Mostrar botón siguiente
    document.getElementById("btnFinal").classList.remove("oculto");
}

function irFinal() {
    cambiarPantalla("final");
    actualizarProgreso(100);
}
function calificar(valor) {

    const estrellas = document.querySelectorAll(".estrellas span");

    estrellas.forEach((estrella, index) => {
        if (index < valor) {
            estrella.classList.add("activa");
        } else {
            estrella.classList.remove("activa");
        }
    });

    let mensaje = "";

    if (valor <= 2) {
        mensaje = "Gracias por tu opinión. Seguiremos mejorando.";
    } 
    else if (valor === 3) {
        mensaje = "¡Gracias! Esperamos que haya sido útil.";
    } 
    else {
        mensaje = "¡Excelente! Nos alegra que la guía haya sido útil.";
    }

    document.getElementById("mensajeExperiencia").innerText = mensaje;

    document.getElementById("btnReiniciar").classList.remove("oculto");
}
function reiniciarGuia() {

    // Reset progreso
    actualizarProgreso(0);

    // Reset inputs
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
        if (input.type === "checkbox") input.checked = false;
    });

    document.querySelectorAll("select").forEach(select => {
        select.selectedIndex = 0;
    });

    // Reset resultados
    document.getElementById("resultadoISR").innerHTML = "";
    document.getElementById("resultadoIVA").innerHTML = "";
    document.getElementById("resultadoRecomendacion").innerHTML = "";
    document.getElementById("mensajeExperiencia").innerText = "";

    // Reset estrellas
    document.querySelectorAll(".estrellas span").forEach(e => {
        e.classList.remove("activa");
    });

    // Ocultar botones finales
    document.getElementById("btnReiniciar").classList.add("oculto");
    document.getElementById("btnFinal").classList.add("oculto");

    // Volver al inicio
    cambiarPantalla("inicio");
}
