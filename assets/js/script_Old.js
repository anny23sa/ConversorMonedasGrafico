/*const monedaOrigen = document.getElementById("monedaOrigen");
const monedaSeleccionada = document.getElementById("monedaSeleccionada");
const botonConvertir = document.getElementById("btnConvertir");
const pResultado = document.getElementById("pResultado");
let resultado 
const urlApi = 'https://mindicador.cl/api/';

// intento agregar valor de texto al select
async function getDatos() {
  try {
    //console.log("ruta de la api: ", urlApi)
    const res = await fetch(urlApi);
    const data = await res.json();
    console.log("resultado Api:", data);
    /*console.log("resultado Api:", data);
    console.log("resultado Api:", data.dolar.nombre);
    console.log("resultado Api:", data.dolar.codigo);
    console.log("resultado Api:", data.euro.nombre);
    console.log("resultado Api:", data.euro.codigo);*/
    //pregunta para definir cual convercion a realizar, si se seleccion dara un alert
   /* if (monedaSeleccionada.value == "uf") {
      //alert("seleccionado Uf")
      resultado = monedaOrigen.value/data.uf.valor
      pResultado.innerHTML= resultado.toFixed(2)

    } else if (monedaSeleccionada.value == "dolar") {
      //alert("seleccionado dolar")
      resultado = monedaOrigen.value/data.dolar.valor
      pResultado.innerHTML= resultado.toFixed(2)
    } else if (monedaSeleccionada.value == "euro") {
     // alert("seleccionado euro")
      resultado = monedaOrigen.value/data.euro.valor
      pResultado.innerHTML= resultado.toFixed(2)
    } else {
      alert("Debe seleccionar una moneda")
    }
    // mensaje de error si no se selcciona una moneda
  } catch (error) {
    console.log("error: ", error)
    alert('No se pueden obtener los datos de la URL');
  }
}


// funcion que se ejecutara al hacer click en el boton convertir
botonConvertir.addEventListener("click", () => {
 if (monedaOrigen.value < 1) {
  alert("Monto indicado no puede ser menor que 1")
 } else {
  //llamado a la funcion que va a leer la api
  getDatos()
 }
})

//

let myChart;

// FUNCION ASINCRONA PARA SOLICITAR UN REQUEST A LA API de MONEDAS
async function getMonedas() {
  const endpoint = "https://mindicador.cl/api/";
  const res = await fetch(endpoint);
  const monedas = await res.json();
  console.log("Objeto Original de Api: ", monedas);
  return monedas;
}

// function para preparar el objeto de configuracion que requiere la libreria Chart Js
function prepararConfiguracionParaLaGrafica(monedas) {  
  console.log("Moneda");
  console.log(monedas);
  // Creamos las variables necesarias para el objeto de configuración
  const tipoDeGrafica = "line";
  // OBTIENES LOS CODIGOS DE CADA MONEDA
  const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
  const titulo = "monedas";
  const colorDeLinea = "red";

// En la creación de la variable valores es necesario cambiar las comas(“,”) por puntos (“.”) para
    // poder ocupar el Number() y parsear el valor que originalmente viene en String.
    const valores = monedas.map((moneda) => {
      const valor = moneda.Valor.replace(",", ".");
      return Number(valor);
  });
  console.log("Valores parseados del Objeto Original de Api: ", valores);

  // Creamos el objeto de configuración usando las variables anteriores
  const config = {
      type: "line",
      data: {
          labels: "dolar",
          datasets: [
              {
                  label: "monedas",
                  backgroundColor: "red",
                  data: "valor",
              }
          ]
      }
  };

  return config;
}

// funcion para renderizar los tipos de monedas en el input de seleccion
async function renderInputMonedas() {
  const monedas = await getMonedas();  // llama a funcion getMonedas devuelve monedas
}

// funcion para renderizar la grafica 
async function renderGrafica() {
  const config = prepararConfiguracionParaLaGrafica(monedas); 
  const chartDOM = document.getElementById("myChart");
  
  // aqui se manda a graficar pasando el html y el objeto a graficar recibido en la linea 53
  if (myChart) {
    myChart.destroy(); //FUNCION PARA ACTUALIZAR EL GRAFICO SI SE CAMBIA EL TIPO DE MONEDA
}
myChart = new Chart(chartDOM, config)

}

// primera funcion a ejecutarse al cargar el programa 
renderInputMonedas();










//metodo guia
/*2. Crear una función para obtener y retornar la Data preparada que vamos a ocupar en
//nuestra gráfica
async function getAndCreateDataToChart() {
const res = await
fetch("https://mindicador.cl/api/");
const monedas = await res.json();
const labels = monedas.map((moneda) => {
return moneda.Fecha;
});
const data = monedas.map((moneda) => {
const magnitud = moneda.valor.split(" ")[0];
return Number(valor);
});
const datasets = [
{
label: "Moneda",
borderColor: "rgb(255, 99, 132)",
data
}
];
return { labels, datasets };
}

//3. Crear una función para renderizar la gráfica utilizando los datos que retorna la
//función anterior
async function renderGrafica() {
const data = await getAndCreateDataToChart();
const config = {
type: "line",
data
};
const myChart = document.getElementById("myChart");
myChart.style.backgroundColor = "white";
new Chart(myChart, config);
}
renderGrafica();*/

/*function formatearFecha(fechaSinFormato) {
  /****PENDIENTE 
  let dia = "";
  let mes = "";
  let anio = "";
  return dia + mes + anio;
}

 respuesta chat jpt
function formatearFecha(fechaSinFormato) {
  const fecha = new Date(fechaSinFormato);
  const opcionesDeFormato = { day: 'numeric', month: 'long', year: 'numeric' };
  return fecha.toLocaleDateString(undefined, opcionesDeFormato);
}

const fechaSinFormato = "2023-08-29T10:30:00";
const fechaFormateada = formatearFecha(fechaSinFormato);
console.log(fechaFormateada);*/ // Salida: "29 de agosto de 2023"