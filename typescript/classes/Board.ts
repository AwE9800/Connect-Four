export default class Board {
  matrix: string[][];
  currentPlayer: string;

  constructor() {
    this.matrix = Array.from({ length: 6 }, () => Array(7).fill(' '));
    this.currentPlayer = 'Red';
  }

  render(): void {
    console.clear();
    const colorSymbols: { [key: string]: string } = {
      Red: '🔴',
      Yellow: '🟡',
    };

    console.log(this.matrix.map(row => row.map(cell => colorSymbols[cell] || '  ').join('|')).join('\n' + '-'.repeat(15) + '\n'));
  }
}
