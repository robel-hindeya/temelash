import { isGuessablePin, isWellFormedPin } from './card-pin';

describe('card PIN', () => {
  it('is exactly six digits', () => {
    expect(isWellFormedPin('482915')).toBe(true);
    for (const p of ['', '12345', '1234567', '12a456', ' 482915', '４８２９１５']) {
      expect(isWellFormedPin(p)).toBe(false);
    }
  });

  it('rejects repeated digits and straight runs', () => {
    for (const p of ['000000', '111111', '123456', '234567', '654321', '987654']) {
      expect(isGuessablePin(p)).toBe(true);
    }
  });

  it('accepts ordinary PINs', () => {
    for (const p of ['482915', '135790', '112233', '120120', '102938']) {
      expect(isGuessablePin(p)).toBe(false);
    }
  });
});
