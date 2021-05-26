import { Matriz } from "./Matriz.js";

document.addEventListener("DOMContentLoaded", function () {
  const btnArmarMatriz = document.getElementById("btnArmarMatriz");
  const btnCalcular = document.getElementById("btnCalcular");
  const campoRestriccion = document.getElementById("restricciones");
  const campoVariables = document.getElementById("variables");
  const contenedor = document.getElementById("container");
  const tabla = document.getElementById("tabla");
  const matriz = new Matriz();
  const indicesPibot = {};
  let matrizIngresada = [];
  btnArmarMatriz.addEventListener("click", function () {
    matriz.setVariables(campoVariables.value);
    matriz.setRestricciones(campoRestriccion.value);
    tabla.appendChild(matriz.dibujarTabla());
    btnArmarMatriz.style.display = "none";
  });
  //////////////////////////////////////////////////////////////////////////////////////
  //Selecciono el pibot lo guardo en indices pibot
  tabla.addEventListener("dblclick", function (e) {
    let variable = e.target.id.slice(-1);
    let restriccion = e.path[1].id.slice(-1);
    indicesPibot.variable = variable;
    indicesPibot.restriccion = restriccion;
  });
  // guarda los valores cargados en matrizIngresada
  btnCalcular.addEventListener("click", function () {
    const filas = tabla.querySelectorAll("tr");
    let valoresDeFila = [];
    matrizIngresada = [];
    filas.forEach((fila) => {
      const columna = fila.querySelectorAll("td");
      valoresDeFila = []; // vacio el array para poder cargar los valroes de cada fila
      columna.forEach((columna) => {
        valoresDeFila.push(columna.innerHTML); // cargo los valores de una fila por columna
      });
      matrizIngresada.push(valoresDeFila);
    });
    matriz.setMatrizACalcular(matrizIngresada);
    console.log(matriz.matriz);
    matriz.setPibot(indicesPibot.restriccion, indicesPibot.variable);
    console.log(matriz.posicionPibot);
    matriz.setMatrizACalcular(matriz.CalcularNuevaMatriz());
    console.log(matriz);
    tabla.innerHTML = "";
    tabla.appendChild(matriz.dibujarTablaCargada(matriz.getMatriz()));
  });
});
