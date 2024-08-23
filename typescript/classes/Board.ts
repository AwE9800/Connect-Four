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

  makeMove(column: number): boolean {
    if (column < 0 || column >= 7) return false;

    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 'Red' ? 'Yellow' : 'Red';
        return true;
      }
    }
    return false;
  }
}
