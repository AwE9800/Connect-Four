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

    const isRedAI = getPrompt('Ska spelare Röd vara AI? (ja/nej): ').toLowerCase() === 'ja';
    const isYellowAI = getPrompt('Ska spelare Gul vara AI? (ja/nej): ').toLowerCase() === 'ja';

    const nameRed = isRedAI ? 'AI-Röd' : getPrompt('Spelare Röd:s namn: ');
    const nameYellow = isYellowAI ? 'AI-Gul' : getPrompt('Spelare Gul:s namn: ');

    this.playerRed = new Player(nameRed, 'Red', isRedAI);
    this.playerYellow = new Player(nameYellow, 'Yellow', isYellowAI);
  }

  getPlayersName(): string | undefined {
    return this.board.currentPlayer === 'Red' ? this.playerRed?.name : this.playerYellow?.name;
  }

  playAgain(): void {
    const playAgain = getPrompt('Spela igen? (ja/nej):').toLowerCase();
    if (playAgain === 'ja') {
      this.board = new Board();
      this.startGameLoop();
    }
  }

  aiMove(): number {
    const column = Math.floor(Math.random() * 7);

    if (!this.board.makeMove(column)) {
      return this.aiMove();
    }

    return column;
  }

  startGameLoop(): void {
    const gameLoop = () => {
      this.board.render();
      // AI move
      if (this.board.currentPlayer === 'Red' && this.playerRed?.isAI) {
        console.log(`AI (${this.playerRed.name}) spelar...`);
        this.aiMove();
        this.checkGameState();
      } else if (this.board.currentPlayer === 'Yellow' && this.playerYellow?.isAI) {
        console.log(`AI (${this.playerYellow.name}) spelar...`);
        this.aiMove();
        this.checkGameState();
      } else {
        //player move
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

        this.checkGameState();
      }
    };

    gameLoop();
  }

  checkGameState(): void {
    if (this.board.checkForWin()) {
      this.board.render();
      const winningPlayer = this.board.currentPlayer === 'Red' ? this.playerYellow : this.playerRed;
      console.log(`Grattis ${winningPlayer?.name}! Du vann!`);
      this.playAgain();
      return;
    }
    if (this.board.draw()) {
      this.board.render();
      console.log('Spelet är oavgjort!');
      this.playAgain();
      return;
    }
    setTimeout(() => this.startGameLoop(), 100);
  }
}
