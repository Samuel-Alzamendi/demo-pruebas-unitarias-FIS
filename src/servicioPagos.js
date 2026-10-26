// Simula una dependencia EXTERNA (una pasarela de pagos real).
// En una prueba unitaria NO queremos llamarla: por eso la reemplazamos con un mock.

const servicioPagos = {
  async cobrar(monto) {
    throw new Error('El servicio real de pagos no está disponible en las pruebas');
  },
};

module.exports = servicioPagos;
