import { getColors, shuffle, tilesPalette } from './color.utils';

describe('Color Utils', () => {
  describe('shuffle', () => {
    it('shoud shuffle an array', () => {
      const shuffledPalette = shuffle([...tilesPalette]);

      let changed = shuffledPalette.some(
        (color, index) => color !== tilesPalette[index]
      );

      if (changed) {
        expect(changed).toBe(true);
      } else {
        changed = shuffledPalette.some(
          (color, index) => color !== tilesPalette[index]
        );
        expect(changed).toBe(true);
      }
    });
  });

  describe('getColors', () => {
    it('should return a random list of colors of a given length', () => {
      const colors = getColors(2);
      expect(colors.length).toBe(2);
      for (const color of colors) {
        expect(tilesPalette).toContain(color);
      }
    });

    it('should return a random list of colors of a given length greater than the original list', () => {
      const colors = getColors(25);
      expect(colors.length).toBe(25);
    });
  });
});
