import Board from './Board.js';
import Player from './Player.js';
import prompt from 'prompt-sync';

const getPrompt = prompt();

export default class Game {
  board: Board;
  playerRed?: Player;
  playerYellow?: Player;

  constructor() {
    this.createPlayers();
    this.board = new Board();
    this.startGameLoop();
  }

  createPlayers(): void {
    console.clear();
    console.log('Välkommen till FYRA-I-RAD!\n');
    const nameRed = getPrompt('Spelare Röd:s namn: ');
    const nameYellow = getPrompt('Spelare Gul:s namn: ');
    this.playerRed = new Player(nameRed, 'Red');
    this.playerYellow = new Player(nameYellow, 'Yellow');
  }

  getPlayersName(): string | undefined {
    return this.board.currentPlayer === 'Red' ? this.playerRed?.name : this.playerYellow?.name;
  }

  startGameLoop(): void {
    const gameLoop = () => {
      this.board.render();

      console.log(`Det är ${this.getPlayersName()}'s tur att spela.`);
      const column = parseInt(getPrompt('Ange kolumn (1-7): '), 10) - 1;

      if (column < 0 || column >= 7) {
        console.log('Ogiltigt kolumnnummer, försök igen.');
        setTimeout(gameLoop, 2000);
        return;
      }

      if (!this.board.makeMove(column)) {
        console.log('Kolumnen är full eller ogiltigt drag, försök igen.');
        setTimeout(gameLoop, 2000);
        return;
      }

      if (this.board.checkForWin()) {
        this.board.render();
        const winningPlayer = this.board.currentPlayer === 'Red' ? this.playerYellow : this.playerRed;
        console.log(`Grattis ${winningPlayer?.name}! Du vann!`);
        return;
      }

      setTimeout(gameLoop, 100);
    };

    gameLoop();
  }
}
