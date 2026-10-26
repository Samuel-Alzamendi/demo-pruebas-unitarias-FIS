// Funciones puras de descuentos: ideales para empezar con pruebas unitarias.

function aplicarDescuento(precio, porcentaje) {
  if (precio < 0) {
    throw new Error('El precio no puede ser negativo');
  }
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('Porcentaje inválido');
  }
  return precio - (precio * porcentaje) / 100;
}

module.exports = { aplicarDescuento };
