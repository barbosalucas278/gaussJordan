import FraccionMixta from "./FraccionMixta.js";
class Fraccion {
  constructor(numerador, denominador) {
    this.setNumerador(numerador);
    this.setDenominador(denominador);
  }

  setNumerador(numerador) {
    this.numerador = numerador;
  }
  setDenominador(denominador) {
    if (denominador === 0) {
      throw "El denominador debe ser distinto de 0";
    }
    this.denominador = denominador;
  }
  // Ayudantes

  maximoComunDivisor(a, b) {
    let temporal; //Para no perder b
    while (b != 0) {
      temporal = b;
      b = a % b;
      a = temporal;
    }
    return a;
  }

  minimoComunMultiplo(a, b) {
    return (a * b) / this.maximoComunDivisor(a, b);
  }
  // Operaciones

  suma(otra) {
    const mcm = this.minimoComunMultiplo(this.denominador, otra.denominador);
    const diferenciaFraccionActual = mcm / this.denominador;
    const diferenciaOtraFraccion = mcm / otra.denominador;
    const resultado = new Fraccion();
    resultado.setNumerador(
      diferenciaFraccionActual * this.numerador +
        diferenciaOtraFraccion * otra.numerador
    );
    resultado.setDenominador(mcm);
    return resultado;
  }

  resta(otra) {
    const mcm = this.minimoComunMultiplo(this.denominador, otra.denominador);
    const diferenciaFraccionActual = mcm / this.denominador;
    const diferenciaOtraFraccion = mcm / otra.denominador;
    const resultado = new Fraccion();
    resultado.setNumerador(
      diferenciaFraccionActual * this.numerador -
        diferenciaOtraFraccion * otra.numerador
    );
    resultado.setDenominador(mcm);
    return resultado;
  }

  producto(otra) {
    if (typeof otra == typeof this) {
      return new Fraccion(
        this.numerador * otra.numerador,
        this.denominador * otra.denominador
      ).simplifica();
    } else {
      if (otra == 0) {
        return 0;
      }
      return new Fraccion(this.numerador, this.denominador * otra).simplifica();
    }
  }

  cociente(otra) {
    if (typeof otra == typeof this) {
      return new Fraccion(
        this.numerador * otra.denominador,
        this.denominador * otra.numerador
      ).simplifica();
    } else {
      if (otra == 0) {
        return 0;
      }
      return new Fraccion(this.denominador, this.numerador * otra).simplifica();
    }
  }

  inversa() {
    return new Fraccion(this.denominador, this.numerador);
  }

  potencia(exponente) {
    return new Fraccion(
      Math.pow(this.numerador, exponente),
      Math.pow(this.denominador, exponente)
    );
  }

  simplifica() {
    const mcd = this.maximoComunDivisor(this.numerador, this.denominador);
    let newFraccion = new Fraccion(
      this.numerador / mcd,
      this.denominador / mcd
    );
    if (newFraccion.equals(new Fraccion(1, 1))) {
      return 1;
    }
    return newFraccion;
  }

  aMixta() {
    return FraccionMixta.desdeImpropia(this);
  }

  toString() {
    if (this.numerador == 0) {
      return `0`;
    } else {
      return `${this.numerador}/${this.denominador}`;
    }
  }

  equals(otra) {
    return (
      this.numerador === otra.numerador && this.denominador === otra.denominador
    );
  }
}

export default Fraccion;
