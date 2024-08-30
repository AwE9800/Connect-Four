export default class WinCheck {
  matrix: string[][];
  currentPlayer: string;

  constructor(matrix: string[][], currentPlayer: string) {
    this.matrix = matrix;
    this.currentPlayer = currentPlayer;
  }

  checkForWin(): boolean {
    const playerToCheck = this.currentPlayer === 'Red' ? 'Yellow' : 'Red';

    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        if (this.matrix[row][col] === playerToCheck) {
          if (
            col + 3 < this.matrix[row].length &&
            this.matrix[row][col + 1] === playerToCheck &&
            this.matrix[row][col + 2] === playerToCheck &&
            this.matrix[row][col + 3] === playerToCheck
          ) {
            return true;
          }
          if (
            row + 3 < this.matrix.length &&
            this.matrix[row + 1][col] === playerToCheck &&
            this.matrix[row + 2][col] === playerToCheck &&
            this.matrix[row + 3][col] === playerToCheck
          ) {
            return true;
          }
          if (
            row - 3 >= 0 &&
            col + 3 < this.matrix[row].length &&
            this.matrix[row - 1][col + 1] === playerToCheck &&
            this.matrix[row - 2][col + 2] === playerToCheck &&
            this.matrix[row - 3][col + 3] === playerToCheck
          ) {
            return true;
          }
          if (
            row + 3 < this.matrix.length &&
            col + 3 < this.matrix[row].length &&
            this.matrix[row + 1][col + 1] === playerToCheck &&
            this.matrix[row + 2][col + 2] === playerToCheck &&
            this.matrix[row + 3][col + 3] === playerToCheck
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
