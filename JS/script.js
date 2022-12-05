const btnCalcular = document.getElementById("btnCalcular"),
resultadosFinales1Element = document.getElementById("ResultadosFinales1"),
resultadosFinales2Element = document.getElementById("ResultadosFinales2"),
resultadosFinales3Element = document.getElementById("ResultadosFinales3"),
resultadosFinales4Element = document.getElementById("ResultadosFinales4"),
resultadosFinales5Element = document.getElementById("ResultadosFinales5"),
resultadosFinales6Element = document.getElementById("ResultadosFinales6"),
inputValorInflacion = document.getElementById("inputValorInflacion"),
btnRecuperarUltimo = document.getElementById("btnCalcular"),
inputPrecioContado = document.getElementById("inputPrecioContado");

document.onreadystatechange = async function(){

    if (document.readyState === 'complete'){
        let inflacionData = await fetch ('./JS/data.json') // archivo json dentro de mi proyecto que me traigo de manera asíncrona
        inputValorInflacion.value = ObtenerUltimo(await inflacionData.json());
    }
};

function ObtenerUltimo(myArray){
    let ordenado = myArray.sort((a,b) => a.d > b.d )
    return ordenado.at(-1).v;
}

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

    // Cambio la esctructura condicional If... Else que tenía en mi proyecto, por un Operador Avanzado, en este caso el OPERADOR TERNARIO:

    precioContado>precioCuotasAjustado ? mejorOpcion = "Te conviene comprar EN CUOTAS" : mejorOpcion = "Te conviene comprar AL CONTADO";

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
            title: "Ayy, no!",
            text: "Tenés que cargar todos los datos para poder CALCULAR los resultados ;)",
            imageUrl: "https://www.losandes.com.ar/resizer/z3rmrT-vh1VF9hNjOzJ0-3cwS4E=/980x640/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/L4UFWTYTTZEHZBMPAVJLGKBBYA.png",
            imageWidth: 450,
            imageAlt: "Pepe Argento haciendo caras",
            width: 500,
            color: "#1124f2",
            background: "#33ef37",
            confirmButtonText: "OK",
            confirmButtonColor: "#1124f2",
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