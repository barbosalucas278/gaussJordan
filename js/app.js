import { Matriz } from "./Matriz.js";

document.addEventListener("DOMContentLoaded", function () {
  const btnArmarMatriz = document.getElementById("btnArmarMatriz");
  const btnCalcular = document.getElementById("btnCalcular");
  const campoRestriccion = document.getElementById("restricciones");
  const campoVariables = document.getElementById("variables");
  const tabla = document.getElementById("tabla");
  const matriz = new Matriz();
  const indicesPibot = {};
  let selectorPibot;
  let matrizIngresada = [];
  btnArmarMatriz.addEventListener("click", function () {
    matriz.setVariables(campoVariables.value);
    matriz.setRestricciones(campoRestriccion.value);
    tabla.appendChild(matriz.dibujarTabla());
    btnArmarMatriz.style.display = "none";
    btnCalcular.classList.remove("visually-hidden");
  });
  //////////////////////////////////////////////////////////////////////////////////////
  //Selecciono el pibot lo guardo en indices pibot
  tabla.addEventListener("dblclick", function (e) {
    if (selectorPibot) {
      selectorPibot.style.color = "black";
      selectorPibot.style.fontWeight = "";
      e.target.style.color = "red";
      e.target.style.fontWeight = "bold";
    } else {
      selectorPibot = e.target;
      selectorPibot.style.color = "red";
      selectorPibot.style.fontWeight = "bold";
      e.target.style.color = "black";
      e.target.style.fontWeight = "";
    }
    selectorPibot = e.target;
    let variable = selectorPibot.id.slice(-1);
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
    console.log(indicesPibot.restriccion);
    console.log(indicesPibot.variable);
    matriz.setPibot(indicesPibot.restriccion, indicesPibot.variable);
    matriz.setMatrizACalcular(matriz.CalcularNuevaMatriz());
    tabla.innerHTML = "";
    tabla.appendChild(matriz.dibujarTablaCargada(matriz.getMatriz()));
  });
});
