const Carrito = require('../src/carrito');
const procesarPedido = require('../src/procesarPedido');

describe('procesarPedido', () => {
  let carrito;
  let servicioPagosMock;

  beforeEach(() => {
    carrito = new Carrito();
    carrito.agregar('mouse', 500, 2); // total = 1000

    // MOCK: reemplaza al servicio real de pagos. Controlamos qué responde.
    servicioPagosMock = { cobrar: jest.fn() };
  });

  it('should confirm the order when the payment is approved', async () => {
    servicioPagosMock.cobrar.mockResolvedValue({ aprobado: true, id: 'TX-123' });

    const resultado = await procesarPedido(carrito, servicioPagosMock);

    expect(resultado).toEqual({ estado: 'confirmado', total: 1000, idTransaccion: 'TX-123' });
    expect(servicioPagosMock.cobrar).toHaveBeenCalledTimes(1);
    expect(servicioPagosMock.cobrar).toHaveBeenCalledWith(1000);
  });

  it('should reject the order when the payment is declined', async () => {
    servicioPagosMock.cobrar.mockResolvedValue({ aprobado: false });

    const resultado = await procesarPedido(carrito, servicioPagosMock);

    expect(resultado).toEqual({ estado: 'rechazado', total: 1000 });
  });

  it('should not call the payment service when the cart is empty', async () => {
    const carritoVacio = new Carrito();

    await expect(procesarPedido(carritoVacio, servicioPagosMock)).rejects.toThrow(
      'El carrito está vacío'
    );
    expect(servicioPagosMock.cobrar).not.toHaveBeenCalled();
  });
});
