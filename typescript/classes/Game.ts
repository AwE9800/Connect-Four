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
    this.showPlayers();
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

  showPlayers(): void {
    if (this.playerRed && this.playerYellow) {
      console.log(`\nSpelare Röd: ${this.playerRed.name}`);
      console.log(`Spelare Gul: ${this.playerYellow.name}`);
    }
  }

  startGameLoop(): void {
    const gameLoop = () => {
      this.board.render();
      const column = parseInt(getPrompt('Ange kolumn (1-7): '), 10) - 1;
      if (this.board.makeMove(column)) {
        setTimeout(gameLoop, 100);
      }
    };

    gameLoop();
  }
}
