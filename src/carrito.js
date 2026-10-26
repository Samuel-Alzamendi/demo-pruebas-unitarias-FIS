// Clase con estado: sirve para mostrar beforeEach, toContain, toBeCloseTo, etc.

class Carrito {
  constructor() {
    this.items = [];
  }

  agregar(nombre, precio, cantidad = 1) {
    if (precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    if (cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a cero');
    }
    const existente = this.items.find((item) => item.nombre === nombre);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({ nombre, precio, cantidad });
    }
  }

  quitar(nombre) {
    this.items = this.items.filter((item) => item.nombre !== nombre);
  }

  nombres() {
    return this.items.map((item) => item.nombre);
  }

  estaVacio() {
    return this.items.length === 0;
  }

  total() {
    return this.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  }
}

module.exports = Carrito;
