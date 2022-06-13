import Fraccion from "./Fraccion.js";

class Matriz {
  constructor(variables, restricciones) {
    this.CantidadVariables = variables;
    this.CantidadRestricciones = restricciones;
  }
  getVariables() {
    return this.CantidadVariables;
  }
  getRestricciones() {
    return this.CantidadRestricciones;
  }
  getMatriz() {
    return this.matriz;
  }
  setMatrizACalcular(matriz) {
    this.matriz = null;
    this.matriz = matriz;
  }
  setPibot(fila, columna) {
    this.posicionPibot = [fila, columna];
    this.pibot = this.matriz[fila][columna];
    console.log(`El pivot en cada vuelta : ${this.pibot}`);
  }
  setVariables(value) {
    this.CantidadVariables = value;
  }
  setRestricciones(value) {
    this.CantidadRestricciones = value;
  }
  dibujarTabla() {
    let tBody = document.createElement("tbody");
    for (let i = 0; i < this.CantidadRestricciones; i++) {
      let fila = document.createElement("tr");
      fila.setAttribute("id", `i${i}`);
      for (let j = 0; j < this.CantidadVariables; j++) {
        let columna = document.createElement("td");
        columna.setAttribute("id", `j${j}`);
        columna.setAttribute("contenteditable", true);
        fila.appendChild(columna);
      }
      tBody.appendChild(fila);
    }
    return tBody;
  }
  dibujarTablaCargada(matriz) {
    let tBody = document.createElement("tbody");
    for (let i = 0; i < this.CantidadRestricciones; i++) {
      let fila = document.createElement("tr");
      fila.setAttribute("id", `i${i}`);
      for (let j = 0; j < this.CantidadVariables; j++) {
        let columna = document.createElement("td");
        columna.setAttribute("id", `j${j}`);
        columna.setAttribute("contenteditable", true);
        columna.innerHTML = matriz[i][j];
        fila.appendChild(columna);
      }
      tBody.appendChild(fila);
    }
    return tBody;
  }
  esFraccion(numero) {
    console.log(isNaN(numero), numero);
    if (isNaN(numero)) {
      return numero.includes("/") ? true : false;
    }
    return false;
  }
  crearFraccion(dato) {
    console.log(dato + "en crear fraccion" + typeof dato);
    if (dato instanceof Fraccion) {
      dato = dato.toString();
    }

    if (isNaN(dato) && dato.includes("/")) {
      let datoArray = dato.split("/");
      let fraccion = new Fraccion(datoArray[0], datoArray[1]);
      return fraccion;
    } else {
      /*if (dato == 0) {
        return 0;
      }*/
      let fraccion = new Fraccion(dato, 1);
      return fraccion;
    }
  }
  GaussJordan() {
    let matrizNueva = [];
    for (let i = 0; i < this.matriz.length; i++) {
      let fila = this.matriz[i];
      let nuevaFila = [];
      for (let j = 0; j < fila.length; j++) {
        let celda = fila[j];
        //posiciones de la columna del pivot toda la columna 0
        if (j == this.posicionPibot[1] && i != this.posicionPibot[0]) {
          celda = 0;
        } //posiciones de la fila del pivot celdas dividido por el pivot
        else if (i == this.posicionPibot[0]) {
          if (this.esFraccion(celda) || this.esFraccion(this.pibot)) {
            celda = this.crearFraccion(celda);
            let pibotFraccion = this.crearFraccion(this.pibot);
            celda = celda.cociente(pibotFraccion).toString();
          } else if (celda % this.pibot != 0) {
            celda = `${celda}/${this.pibot}`;
          } else if (celda == 0) {
            celda = 0;
          } else {
            celda = celda / this.pibot;
          }
          //Demas posiciones donde se aplica el pivoteo
        } else {
          let dividendo;
          //Verifica si hay fracciones en el primer termino del pivoteo
          if (
            this.esFraccion(this.matriz[i][j]) ||
            this.esFraccion(this.pibot)
          ) {
            let celdaIJFraccion = this.crearFraccion(this.matriz[i][j]);
            let pivotFraccion = this.crearFraccion(this.pibot);
            dividendo = pivotFraccion.producto(celdaIJFraccion);
          } else {
            dividendo = this.matriz[i][j] * this.pibot;
          }

          if (
            this.esFraccion(this.matriz[this.posicionPibot[0]][j]) ||
            this.esFraccion(this.matriz[i][this.posicionPibot[1]])
          ) {
            //console.log("segundo termino con fraccion");
            let celda0JFraccion = this.crearFraccion(
              this.matriz[this.posicionPibot[0]][j]
            );
            let celdaI1Fraccion = this.crearFraccion(
              this.matriz[i][this.posicionPibot[1]]
            );
            let dividendoSegundoTermino =
              celda0JFraccion.producto(celdaI1Fraccion);

            dividendo = this.crearFraccion(dividendo);
            console.log(dividendo);
            console.log(dividendoSegundoTermino);
            dividendo = dividendo.resta(dividendoSegundoTermino);
          } else {
            //console.log("entro al no fraccion");
            if (
              this.matriz[this.posicionPibot[0]][j] != 0 &&
              this.matriz[i][this.posicionPibot[1]] != 0
            ) {
              if (this.esFraccion(dividendo.toString())) {
                console.log(
                  this.matriz[this.posicionPibot[0]][j] *
                    this.matriz[i][this.posicionPibot[1]]
                );
                dividendo = dividendo.resta(
                  this.crearFraccion(
                    this.matriz[this.posicionPibot[0]][j] *
                      this.matriz[i][this.posicionPibot[1]]
                  )
                );
              } else {
                dividendo -=
                  this.matriz[this.posicionPibot[0]][j] *
                  this.matriz[i][this.posicionPibot[1]];
              }
            }
          }
          //console.log(dividendo);
          if (dividendo % this.pibot == 0) {
            console.log("Entro en resto 0");
            celda = `${dividendo / this.pibot}`;
          } else if (
            this.esFraccion(dividendo.toString()) ||
            this.esFraccion(this.pibot)
          ) {
            let pivotFraccion = this.crearFraccion(this.pibot);
            console.log("Entro en division");
            console.log(dividendo);
            celda = dividendo.cociente(pivotFraccion).toString();
          } else if (dividendo < this.pibot || dividendo % this.pibot != 0) {
            console.log("Entro en menor que pibot distinto de 0");
            celda = new Fraccion(dividendo, this.pibot).simplifica().toString();
          }
        }
        console.log(`Celda ${celda}`);
        nuevaFila.push(celda);
        console.log(`Pivot al terminar la fila ${this.pibot}`);
      }
      matrizNueva.push(nuevaFila);
    }
    return matrizNueva;
  }

  CalcularNuevaMatriz() {
    return this.GaussJordan();
  }
}

export { Matriz };
