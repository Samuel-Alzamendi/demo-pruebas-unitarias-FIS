const Carrito = require('../src/carrito');

describe('Carrito', () => {
  let carrito;

  // Cada test arranca con un carrito nuevo: así son independientes entre sí (la "I" de ATRIP)
  beforeEach(() => {
    carrito = new Carrito();
  });

  it('should start empty', () => {
    expect(carrito.estaVacio()).toBeTruthy();
    expect(carrito.total()).toBe(0);
  });

  it('should contain the product after adding it', () => {
    carrito.agregar('mouse', 500);

    expect(carrito.nombres()).toContain('mouse');
    expect(carrito.estaVacio()).toBeFalsy();
  });

  it('should add quantities when the same product is added twice', () => {
    carrito.agregar('teclado', 1000, 1);
    carrito.agregar('teclado', 1000, 2);

    expect(carrito.items).toHaveLength(1);
    expect(carrito.total()).toBe(3000);
  });

  it('should remove a product', () => {
    carrito.agregar('mouse', 500);
    carrito.agregar('teclado', 1000);

    carrito.quitar('mouse');

    expect(carrito.nombres()).not.toContain('mouse');
    expect(carrito.nombres()).toContain('teclado');
  });

  it('should handle decimal prices with toBeCloseTo', () => {
    carrito.agregar('A', 0.1);
    carrito.agregar('B', 0.2);

    // 0.1 + 0.2 en punto flotante NO es exactamente 0.3:
    // expect(carrito.total()).toBe(0.3) fallaría
    expect(carrito.total()).toBeCloseTo(0.3);
  });

  it('should throw when the quantity is zero or negative', () => {
    expect(() => carrito.agregar('mouse', 500, 0)).toThrow('La cantidad debe ser mayor a cero');
  });

  it('should throw when the price is negative', () => {
    expect(() => carrito.agregar('mouse', -1)).toThrow('El precio no puede ser negativo');
  });
});
