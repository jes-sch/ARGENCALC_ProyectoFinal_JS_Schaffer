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

/* Luego de adquirir el TOKEN agregue el siguiente Header a sus requests:
Authorization: BEARER {TOKEN} */

const APITOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE1NDIxNTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqZXNpY2Euc2NoYWZmZXJAZ21haWwuY29tIn0.DsWImkUNEBqsXLyUT2cShXDnnzbfb84ljKoO8gH8UTkYX-QXjEuPGK0nlTq_Utecv-FOFLJvb7EoA3UMDpZyrA';

const urlDolarSi = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
const url = 'https://api.estadisticasbcra.com/inflacion_mensual_oficial';

/* fetch("https://pokeapi.co/api/v2/pokemon/ditto")
.then(response=>response.json())
.then(data=>console.log(data)) */
/* 
var xmlHttpRequest1 = new XMLHttpRequest();
xmlHttpRequest1.open("GET", url, true);
xmlHttpRequest1.setRequestHeader('Access-Control-Allow-Origin', 'https://estadisticasbcra.com');
xmlHttpRequest1.setRequestHeader('Access-Control-Allow-Headers', 'application/json; charset=UTF-8');
xmlHttpRequest1.setRequestHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET');
xmlHttpRequest1.setRequestHeader('Authorization', 'Bearer ' + APITOKEN);

console.log(xmlHttpRequest1.send()); */
document.onreadystatechange = async function()
{
    if (document.readyState === 'complete')
    {
        //dom is ready, window.onload fires later
        let inflacionData = await fetch ('./JS/data.json')
        let d = new Date();
        d.setDate(0); //sets d to the last day of the previous month

        //let resultObject = ObtenerUltimo(await inflacionData.json()) //search(formatDate(d), await inflacionData.json());

        inputValorInflacion.value = ObtenerUltimo(await inflacionData.json());

    }
};

function ObtenerUltimo(myArray){
    let ordenado = myArray.sort((a,b) => a.d > b.d )

    return ordenado.at(-1).v;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function search(nameKey, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].d === nameKey) {
            return myArray[i].v;
        }
    }
}

/* const usarJson = async function () {
    let response = await fetch('./js/data.json');
    let productos = await response.json();
} */

/* fetch(urlDolarSi)
		.then(response => response.text())
		.then(response => console.log(response)); */
/* fetch('https://api.estadisticasbcra.com/inflacion_mensual_oficial')
.then(response=>response.json())
.then(data=>console.log(data)) */

// headers you pass to a http request
/* let header = 'Authorization: BEARER {eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE1NDIxNTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqZXNpY2Euc2NoYWZmZXJAZ21haWwuY29tIn0.DsWImkUNEBqsXLyUT2cShXDnnzbfb84ljKoO8gH8UTkYX-QXjEuPGK0nlTq_Utecv-FOFLJvb7EoA3UMDpZyrA}'; */

/* fetch(url, {
  method: 'GET',
  body: JSON.stringify(data),
  header:{
    Authorization: BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE1NDIxNTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqZXNpY2Euc2NoYWZmZXJAZ21haWwuY29tIn0.DsWImkUNEBqsXLyUT2cShXDnnzbfb84ljKoO8gH8UTkYX-QXjEuPGK0nlTq_Utecv-FOFLJvb7EoA3UMDpZyrA
  }
})
.then(response=>response.json())
.then(data=>console.log(data)) */


/* fetch("https://api.estadisticasbcra.com/inflacion_mensual_oficial",
{
   "method":"GET",
   "body":"JSON.stringify(data)",
   "header":{
      "Authorization: BEARER {APITOKEN}"
   }
}).then(response=>response.json())
.then(data=>console.log(data)) */

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
            //imageHeigth: 200,
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