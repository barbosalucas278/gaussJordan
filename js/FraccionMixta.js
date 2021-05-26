class FraccionMixta {
  constructor(entero, fraccion) {
    this.entero = entero;
    this.fraccion = fraccion;
  }
  aImpropia() {
    let numerador = this.fraccion.numerador;
    if (this.entero) {
      numerador = numerador + this.fraccion.denominador * this.entero;
    }
    return new Fraccion(numerador, this.fraccion.denominador);
  }

  static desdeImpropia(fraccion) {
    let entero = 0;
    if (fraccion.numerador >= fraccion.denominador) {
      entero = Math.floor(fraccion.numerador / fraccion.denominador);
      const residuo = fraccion.numerador % fraccion.denominador;
      if (residuo > 0) {
        fraccion = new Fraccion(residuo, fraccion.denominador);
      } else {
        fraccion = null;
      }
    }
    return new FraccionMixta(entero, fraccion);
  }

  toString() {
    let resultado = "";
    if (this.entero) {
      resultado = resultado.concat(this.entero);
      if (this.fraccion) {
        resultado = resultado.concat(" + ");
      }
    }
    if (this.fraccion) {
      resultado = resultado.concat(this.fraccion.toString());
    }
    return resultado;
  }
}

export default FraccionMixta;
