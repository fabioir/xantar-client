// const tilesPalette: string[] = ['#B5EAEA', '#EDF6E5', '#FFBCBC', '#F38BA0'];
export const tilesPalette: string[] = [
  '#f44336',
  '#e91e63',
  '#ba68c8',
  '#7e57c2',
  '#7986cb',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#a1887f',
  '#9e9e9e',
  '#607d8b'
];

/**
 * Shuffles array in place. Fisher-Yates shuffle algorithm.
 * @param {Array} array items An array containing the items.
 */
export function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getColors(colorNr: number): string[] {
  const colors: string[] = [];
  const shuffledPalette = shuffle([...tilesPalette]);

  const randStartIndex = Math.floor(Math.random() * shuffledPalette.length);

  for (let i = 0; i < colorNr; i++) {
    const index = (i + randStartIndex) % shuffledPalette.length;
    colors.push(shuffledPalette[index]);
  }
  return colors;
}
