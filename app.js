function cambiarPantalla(id) {

    document.querySelectorAll("main section").forEach(sec => {
        sec.classList.add("oculto");
    });

    document.getElementById(id).classList.remove("oculto");

    actualizarProgresoSegunPantalla(id);
}


function actualizarProgreso(valor) {
    document.getElementById("progreso").style.width = valor + "%";
}


function actualizarProgresoSegunPantalla(id) {

    const progreso = {
        inicio: 0,
        modulo1: 15,
        modulo2: 30,
        modulo3: 45,
        modulo4: 60,
        recomendacion: 75,
        isr: 90,
        final: 100
    };

    if (progreso[id] !== undefined) {
        actualizarProgreso(progreso[id]);
    }
}


function iniciarGuia() {
    cambiarPantalla("modulo1");
}


/* ---------- CHECKLISTS (ya no bloquean botones) ---------- */

function verificarModulo1() {}
function verificarModulo2() {}
function verificarModulo3() {}
function verificarModulo4() {}


/* ---------- NAVEGACIÓN ---------- */

function irModulo2() {
    cambiarPantalla("modulo2");
}

function irModulo3() {
    cambiarPantalla("modulo3");
}

function irModulo4() {
    cambiarPantalla("modulo4");
}

function irRecomendacion() {
    cambiarPantalla("recomendacion");
}

function irISR() {
    cambiarPantalla("isr");
}

function irFinal() {
    cambiarPantalla("final");
}


/* ---------- RECOMENDACIÓN ---------- */

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

    if (p1 === "no") {
        resultado = "🔴 Recomendación: Es mejor contratar un contador para evitar errores fiscales.";
    } 
    else {
        if (contadorNo >= 2) {
            resultado = "🟠 Recomendación: Considera contratar un contador para mayor seguridad.";
        } 
        else {
            resultado = "🟢 Recomendación: Puedes utilizar el sistema gratuito del SAT sin problema.";
        }
    }

    document.getElementById("resultadoRecomendacion").innerHTML = resultado;

    document.getElementById("btnISR").classList.remove("oculto");
}


/* ---------- ISR ---------- */

function calcularISR1() {

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

    document.getElementById("resultadoISR1").innerHTML =
        `Tasa aplicada: ${(tasa * 100).toFixed(2)}% <br>
         ISR a pagar: $${isr.toFixed(2)}`;

    document.getElementById("btnFinal").classList.remove("oculto");
}


/* ---------- IVA ---------- */

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

    document.getElementById("btnFinal").classList.remove("oculto");
}


/* ---------- EXPERIENCIA ---------- */

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


/* ---------- REINICIAR ---------- */

function reiniciarGuia() {

    actualizarProgreso(0);

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
        if (input.type === "checkbox") input.checked = false;
    });

    document.querySelectorAll("select").forEach(select => {
        select.selectedIndex = 0;
    });

    document.getElementById("resultadoISR").innerHTML = "";
    document.getElementById("resultadoIVA").innerHTML = "";
    document.getElementById("resultadoRecomendacion").innerHTML = "";
    document.getElementById("mensajeExperiencia").innerText = "";

    document.querySelectorAll(".estrellas span").forEach(e => {
        e.classList.remove("activa");
    });

    document.getElementById("btnReiniciar").classList.add("oculto");
    document.getElementById("btnFinal").classList.add("oculto");

    cambiarPantalla("inicio");
}
function mostrarInfo(){

document.getElementById("infoEmpresa").scrollIntoView({
behavior: "smooth"
});

}
function calcularISR(){

let ingresos = parseFloat(document.getElementById("ingresosAnuales").value) || 0;
let exentos = parseFloat(document.getElementById("ingresosExentos").value) || 0;
let deducciones = parseFloat(document.getElementById("deducciones").value) || 0;
let retenido = parseFloat(document.getElementById("isrRetenido").value) || 0;

let baseGravable = ingresos - exentos - deducciones;

let limiteInferior = 185852.58;
let porcentaje = 0.2136;
let cuotaFija = 19682.13;

let excedente = baseGravable - limiteInferior;

if(excedente < 0){
excedente = 0;
}

let impuestoMarginal = excedente * porcentaje;

let isrTotal = impuestoMarginal + cuotaFija;

let resultadoFinal = isrTotal - retenido;

document.getElementById("baseGravable").innerText = baseGravable.toFixed(2);
document.getElementById("isrTotal").innerText = isrTotal.toFixed(2);
document.getElementById("isrFinal").innerText = resultadoFinal.toFixed(2);

}

function calcularTablaISR(){

let ingreso = parseFloat(document.getElementById("baseISR").value);

if(isNaN(ingreso)){
alert("Ingrese una base gravable");
return;
}

let tabla = [

{li:0.01, ls:8952.49, cuota:0, porcentaje:0.0192},
{li:8952.50, ls:75984.55, cuota:171.88, porcentaje:0.064},
{li:75984.56, ls:133536.07, cuota:4461.94, porcentaje:0.1088},
{li:133536.08, ls:155229.80, cuota:10723.55, porcentaje:0.16},
{li:155229.81, ls:185852.57, cuota:14194.54, porcentaje:0.1792},
{li:185852.58, ls:374837.88, cuota:19682.13, porcentaje:0.2136},
{li:374837.89, ls:590795.99, cuota:60049.40, porcentaje:0.2352},
{li:590796.00, ls:1127926.84, cuota:110842.74, porcentaje:0.30},
{li:1127926.85, ls:1503902.46, cuota:271981.99, porcentaje:0.32},
{li:1503902.47, ls:4511707.37, cuota:392294.17, porcentaje:0.34},
{li:4511707.38, ls:999999999, cuota:1414947.85, porcentaje:0.35}

];

for(let rango of tabla){

if(ingreso >= rango.li && ingreso <= rango.ls){

let excedente = ingreso - rango.li;

let impuesto = excedente * rango.porcentaje + rango.cuota;

document.getElementById("limiteInferior").innerText = rango.li.toFixed(2);
document.getElementById("cuotaFija").innerText = rango.cuota.toFixed(2);
document.getElementById("porcentaje").innerText = (rango.porcentaje*100).toFixed(2)+"%";
document.getElementById("resultadoISR2").innerText = impuesto.toFixed(2);

return;

}

}

}