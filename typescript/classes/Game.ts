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
    this.showBoard();
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
  //change later in to a gameloop
  showBoard(): void {
    this.board.render();
  }
}
