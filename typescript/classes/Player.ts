import Board from './Board.js';
import prompt from 'prompt-sync';
import WinCheck from './WinCheck.js';
import MakeMoveCheck from './MakeMoveCheck.js';

const getPrompt = prompt();

export default class Player {
  name: string;
  color: string;
  isAI: boolean;
  isSmart: boolean;

  constructor(name: string, color: string, isAI: boolean = false, isSmart: boolean = false) {
    this.name = name;
    this.color = color;
    this.isAI = isAI;
    this.isSmart = isSmart;
  }

  makeAIMove(board: Board): void {
    let column: number;

    if (!this.isSmart) {
      this.makeRandomMove(board);
      return;
    }
    column = this.findBestMove(board);

    if (column === -1) {
      this.makeRandomMove(board);
    } else {
      board.makeMove(column);
    }
  }

  makeRandomMove(board: Board): void {
    let column: number;
    do {
      column = Math.floor(Math.random() * 7);
    } while (!board.makeMove(column));
  }

  findBestMove(board: Board): number {
    for (let column = 0; column < 7; column++) {
      const simulatedMatrix = board.matrix.map(row => [...row]);
      const moveChecker = new MakeMoveCheck(simulatedMatrix, this.color);

      if (moveChecker.makeMoveCheck(column)) {
        const winValidator = new WinCheck(simulatedMatrix, this.color);
        if (winValidator.checkForWin()) {
          return column;
        }
      }
    }
    return -1;
  }

  makePlayerMove(board: Board): boolean {
    console.log(`Det är ${this.name}'s tur att spela.`);
    const column = parseInt(getPrompt('Ange kolumn (1-7): '), 10) - 1;

    if (column < 0 || column >= 7) {
      console.log('Ogiltigt kolumnnummer, försök igen.');
      return false;
    }

    if (!board.makeMove(column)) {
      console.log('Kolumnen är full eller ogiltigt drag, försök igen.');
      return false;
    }

    return true;
  }
}
