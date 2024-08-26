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

    console.log(
      this.matrix.map(row => '|' + row.map(cell => colorSymbols[cell] || '  ').join('|') + '|').join('\n' + '-'.repeat(22) + '\n')
    );
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
  checkForWin(): boolean {
    const currentPlayer = this.currentPlayer === 'Red' ? 'Yellow' : 'Red';

    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        if (this.matrix[row][col] === currentPlayer) {
          if (
            col + 3 < this.matrix[row].length &&
            this.matrix[row][col + 1] === currentPlayer &&
            this.matrix[row][col + 2] === currentPlayer &&
            this.matrix[row][col + 3] === currentPlayer
          ) {
            return true;
          }
          if (
            row + 3 < this.matrix.length &&
            this.matrix[row + 1][col] === currentPlayer &&
            this.matrix[row + 2][col] === currentPlayer &&
            this.matrix[row + 3][col] === currentPlayer
          ) {
            return true;
          }

          if (
            row - 3 >= 0 &&
            col + 3 < this.matrix[row].length &&
            this.matrix[row - 1][col + 1] === currentPlayer &&
            this.matrix[row - 2][col + 2] === currentPlayer &&
            this.matrix[row - 3][col + 3] === currentPlayer
          ) {
            return true;
          }

          if (
            row + 3 < this.matrix.length &&
            col + 3 < this.matrix[row].length &&
            this.matrix[row + 1][col + 1] === currentPlayer &&
            this.matrix[row + 2][col + 2] === currentPlayer &&
            this.matrix[row + 3][col + 3] === currentPlayer
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  draw(): boolean {
    return this.matrix[0].every(cell => cell !== ' ');
  }
}
