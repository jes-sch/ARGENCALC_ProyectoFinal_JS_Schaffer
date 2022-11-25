const btnCalcular = document.getElementById("btnCalcular"),
resultadosFinales1Element = document.getElementById("ResultadosFinales1"),
resultadosFinales2Element = document.getElementById("ResultadosFinales2"),
resultadosFinales3Element = document.getElementById("ResultadosFinales3"),
resultadosFinales4Element = document.getElementById("ResultadosFinales4"),
resultadosFinales5Element = document.getElementById("ResultadosFinales5"),
resultadosFinales6Element = document.getElementById("ResultadosFinales6"),
btnRecuperarUltimo = document.getElementById("btnCalcular"),
inputPrecioContado = document.getElementById("inputPrecioContado");

const modal = () => {
    let exampleModal = document.getElementById("exampleModal");
    btnCalcular.addEventListener("click", () => {
    exampleModal.classList.add("show");
    })
    const cerrar = document.getElementById("close");
    cerrar.addEventListener("click", () => {
    exampleModal.classList.remove("show");
    })
    const cerrarCruz = document.getElementById("cerrarCruz");
    cerrarCruz.addEventListener("click", () => {
    exampleModal.classList.remove("show");
    })
}

function calcular() {

    let precioContado = document.getElementById("inputPrecioContado").value;
    let precioCuotas = document.getElementById("inputPrecioCuotas").value;
    let inflacion = document.getElementById("inputValorInflacion").value;
    let cantidadCuotas = document.getElementById("inputCantidadCuotas").value;

    guardarEnStorage("precioContado",precioContado);
    guardarEnStorage("precioCuotas",precioCuotas);
    guardarEnStorage("inflacion",inflacion);
    guardarEnStorage("cantidadCuotas",cantidadCuotas);

    const arrayCuotas = [];

    let precioCuotasAjustado = 0;

    for (let index = 0; index < cantidadCuotas; index++) {
        let cuota = index + 1;
        arrayCuotas[index] = ((precioCuotas / cantidadCuotas) / ((1+(inflacion/100)) ** cuota));
        precioCuotasAjustado+=arrayCuotas[index];
    }

    let mejorOpcion;

    if (precioContado>precioCuotasAjustado) {
        mejorOpcion = "Te conviene comprar EN CUOTAS";
    }else{
        mejorOpcion = "Te conviene comprar AL CONTADO";
    }

    // Creo mi OBJETO resultadosFinales:

    const resultadosFinales = {
        mejorOpcion: mejorOpcion,
        cuotaAjustadaHoy: precioCuotasAjustado,
        precioContado: precioContado,
        precioCuotas: precioCuotas,
        valorCadaCuota: precioContado / cantidadCuotas,
        inflacion: inflacion,
        cuotas: arrayCuotas,
    };

    // MODAL: muestro los resultadosFinales mediante un modal:

    resultadosFinales1Element.innerHTML = resultadosFinales.mejorOpcion;
    resultadosFinales2Element.innerHTML = "Sumatoria de las cuotas ajustadas a valor de hoy: " +resultadosFinales.cuotaAjustadaHoy.toFixed(2);
    resultadosFinales3Element.innerHTML = "Precio contado: " + resultadosFinales.precioContado;
    resultadosFinales4Element.innerHTML = "Precio cuotas: " + resultadosFinales.precioCuotas;
    resultadosFinales5Element.innerHTML = "Monto de cada cuota: " + (precioContado / cantidadCuotas).toFixed(2);
    resultadosFinales6Element.innerHTML = "<h5>Cuotas ajustadas por la inflación acumulada mes a mes:</h5>"
    for (let i = 0; i < resultadosFinales.cuotas.length; i++) {
    resultadosFinales6Element.innerHTML += `<br> Cuota N° ${i + 1} : $ ${resultadosFinales.cuotas[i].toFixed(2)}`;
    }

    // VALIDACIÓN:

    if (precioContado == "" || precioCuotas == "" || inflacion == "" || cantidadCuotas == "") {

        Swal.fire({
            icon: "warning",
            title: 'Oops...',
            text: "Debés cargar todos los datos para poder CALCULAR los resultados"
        })

    } else {
        
        modal();
        guardarEnStorage("precioContado", precioContado);
        guardarEnStorage("precioCuotas", precioCuotas);
        guardarEnStorage("inflacion", inflacion);
        guardarEnStorage("cantidadCuotas", cantidadCuotas);
        }

}

    // Guardo en Storage:

    function guardarEnStorage(key, value) {
        localStorage.setItem(key, value);
        sessionStorage.setItem(key,value);
}

    // Recupero del Storage:

    function recuperareStorage(key) {
        return localStorage.getItem(key);
    //return sessionStorage.getItem(key); ESTA LÍNEA LA COMENTO PORQUE NO QUIERO RECUPERAR DEL SESSION
}

    btnCalcular.addEventListener('click', (e) => {
        e.preventDefault();
        resultadosFinales6Element.innerHTML = ""
        calcular();
    });