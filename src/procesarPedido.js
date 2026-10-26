// Función asíncrona que depende de un servicio externo (inyectado por parámetro).
// Recibir la dependencia por parámetro facilita reemplazarla por un mock en los tests.

async function procesarPedido(carrito, servicioPagos) {
  if (carrito.estaVacio()) {
    throw new Error('El carrito está vacío');
  }

  const total = carrito.total();
  const resultado = await servicioPagos.cobrar(total);

  if (resultado.aprobado) {
    return { estado: 'confirmado', total, idTransaccion: resultado.id };
  }
  return { estado: 'rechazado', total };
}

module.exports = procesarPedido;
