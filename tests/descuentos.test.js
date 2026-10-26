const { aplicarDescuento } = require('../src/descuentos');

describe('aplicarDescuento', () => {
  it('should return the discounted price when the percentage is valid', () => {
    // Arrange
    const precio = 200;
    const porcentaje = 10;

    // Act
    const resultado = aplicarDescuento(precio, porcentaje);

    // Assert
    expect(resultado).toBe(180);
  });

  it('should throw an error when the price is negative', () => {
    expect(() => aplicarDescuento(-5, 10)).toThrow('El precio no puede ser negativo');
  });

  it('should throw an error when the percentage is out of range', () => {
    expect(() => aplicarDescuento(100, 101)).toThrow('Porcentaje inválido');
    expect(() => aplicarDescuento(100, -1)).toThrow('Porcentaje inválido');
  });

  // Valores límite con test.each: precio, porcentaje, resultado esperado
  test.each([
    [100, 0, 100],
    [100, 100, 0],
    [50, 50, 25],
    [0, 30, 0],
  ])('precio %i con %i%% de descuento da %i', (precio, porcentaje, esperado) => {
    expect(aplicarDescuento(precio, porcentaje)).toBe(esperado);
  });
});
