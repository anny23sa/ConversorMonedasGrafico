/* DECLARAR VARIABLES */
let monedaOrigen = document.getElementById("monedaOrigen");
let monedaSeleccionada = document.getElementById("monedaSeleccionada");
const botonConvertir = document.getElementById("btnConvertir");
const pResultado = document.getElementById("pResultado");
const urlApi = 'https://mindicador.cl/api/';
let resultado;
let chartDOM = "";
let grafico = "";

/* FUNCIONES */

// FUNCION ASINCRONA PARA SOLICITAR UN REQUEST A LA API de MONEDAS
async function getMonedasAPI(monedaSeleted = "") {
  try {
    const res = await fetch(urlApi + monedaSeleted);
    const monedas = await res.json();
    //console.log("Objeto Original de Api: ", monedas);
    return monedas;
  } catch (error) {
    console.log("Error en la llamada a la API" + error);
  }
}

// FUNCION PARA PROCESAR LA DATA OBTENIDA EN LA LLAMADA DE API Y AGREGARLO EN EL INPUT DE SELECCION
async function llenarInputMonedas(dataJson) {
  let template = `<option value="" >Seleccione indicador</option>`;
  Object.keys(dataJson).forEach(item => {
    if (dataJson[item].codigo) {
      template += `<option value=${dataJson[item].codigo} >${dataJson[item].nombre}</option>`;
    }
  });
  monedaSeleccionada.innerHTML = template;
}

// FUNCION PARA CONVERTIR LOS PESOS EN LA MONEDA SELECCIONADA/ CONDICIONANTES
function convertirMonedas(monedasJSON) {
  monedaSeleccionada = document.getElementById("monedaSeleccionada");
  monedaOrigen = document.getElementById("monedaOrigen");
  let resultado = 0;
  if (monedaSeleccionada.value != "0" && monedaSeleccionada.value != "") {
    if (monedaOrigen.value >= 1) {
      Object.keys(monedasJSON).forEach(item => {
        if (monedasJSON[item].codigo == monedaSeleccionada.value) {
          resultado = monedaOrigen.value / monedasJSON[item].valor;
        }
      });
      pResultado.innerHTML = resultado.toFixed(2);
    } else {
      alert("El valor en pesos no debe ser menor a 1");
    }
  } else {
    alert("Debe seleccionar una moneda");
  }
}

//LLAMADA A LA API PAR OBTENER DATA DEL GRAFICO Y DESPLIEGUE DE GRAFICO
async function obtenerDatosGrafico() {
  monedaSeleccionada = document.getElementById("monedaSeleccionada");
  let monedas = await getMonedasAPI(monedaSeleccionada.value);
  const titulo = monedas.nombre;
  const colorDeLinea = "red";

 // SE CORTA DATA PARA PROCESAR LOS 10 ULTIMOS CON EL METODO SLICE
  monedas = monedas.serie.slice(0, 10);
  
  // OBTIENES LAS FECHAS EN BASE AL JSON OBTENIDO
  const fechaValores = monedas.map((moneda) => {
    return moneda.fecha.split("T")[0]; 
  });

  // OBTIENES LOS VALORES EN BASE AL JSON OBTENIDO
  const valores = monedas.map((moneda) => {
    return Number(moneda.valor);
  });
  console.log("Valores parseados del Objeto Original de Api: ", valores);
  console.log("Valores parseados del Objeto Original de Api: ", fechaValores);

  //ELEMENTOS BASICOS PARA LA CONFIGURACION
    const labels = fechaValores;
  const datasets = [
    {
      label: titulo,
      borderColor: colorDeLinea,
      data: valores
    }];
  return { labels, datasets };
}

//DATOS Y LO BASICO PARA LA CONFIGURACION DEL GRAFICO
async function renderGrafico() {
  const data = await obtenerDatosGrafico();
  const config = {
    type: "line",
    data
  };

  //SE VALIDA SI YA FUE RENDERIZADO, EN CASO AFIRMACION SE BORRA
  if (grafico) {
    grafico.destroy();
  }

  //SE RENDERIZA
  chartDOM = document.getElementById("myChart");
  chartDOM.style.backgroundColor = "white";
  grafico = new Chart(chartDOM, config);
}

// FUNCION PARA RENDERIZAR LOS TIPOS DE MONEDAS EN EL INPUT DE LA SELECCION
async function renderInputMonedas() {
  monedasJSON = await getMonedasAPI(); 
  llenarInputMonedas(monedasJSON);
  botonConvertir.addEventListener("click", () => {
    convertirMonedas(monedasJSON);
    const config = renderGrafico();
  }
  );
}

/* LLAMADA A METODOS */
renderInputMonedas()






