import Board from './Board.js';
import Player from './Player.js';
import prompt from 'prompt-sync';

const getPrompt = prompt();

export default class Game {
  board: Board;
  players: { [key: string]: Player } = {};

  constructor() {
    this.createPlayers();
    this.board = new Board();
    this.startGameLoop();
  }

  createPlayers(): void {
    console.clear();
    console.log('Välkommen till FYRA-I-RAD!\n');

    const isRedAI = getPrompt('Ska spelare Röd vara AI? (ja/nej): ').toLowerCase() === 'ja';
    let isRedSmartAI = false;
    if (isRedAI) {
      isRedSmartAI = getPrompt('Ska AI-Röd vara smart? (ja/nej): ').toLowerCase() === 'ja';
    }

    const isYellowAI = getPrompt('Ska spelare Gul vara AI? (ja/nej): ').toLowerCase() === 'ja';
    let isYellowSmartAI = false;
    if (isYellowAI) {
      isYellowSmartAI = getPrompt('Ska AI-Gul vara smart? (ja/nej): ').toLowerCase() === 'ja';
    }
    let nameRed = '';

    while (!isRedAI && nameRed.trim() === '') {
      nameRed = getPrompt('Spelare Röd:s namn: ');
    }
    if (isRedAI) {
      nameRed = 'AI-Röd';
    }

    let nameYellow = '';

    while (!isYellowAI && nameYellow.trim() === '') {
      nameYellow = getPrompt('Spelare Gul:s namn: ');
    }
    if (isYellowAI) {
      nameYellow = 'AI-Gul';
    }

    this.players = {
      Red: new Player(nameRed, 'Red', isRedAI, isRedSmartAI),
      Yellow: new Player(nameYellow, 'Yellow', isYellowAI, isYellowSmartAI),
    };
  }
  getCurrentPlayer(): Player {
    return this.players[this.board.currentPlayer];
  }

  playAgain(): void {
    const playAgain = getPrompt('Spela igen? (ja/nej):').toLowerCase();
    if (playAgain === 'ja') {
      this.board = new Board();
      this.startGameLoop();
    }
  }

  startGameLoop(): void {
    this.board.render();
    const currentPlayer = this.board.currentPlayer;
    const player = this.players[currentPlayer];

    if (player.isAI) {
      console.log(`AI (${player.name}) spelar...`);
      setTimeout(() => {
        player.makeAIMove(this.board);
        this.checkGameState();
      }, 800);
    } else {
      if (!player.makePlayerMove(this.board)) {
        setTimeout(() => this.startGameLoop(), 1000);
        return;
      }
      this.checkGameState();
    }
  }

  checkGameState(): void {
    const winningPlayer = this.getCurrentPlayer();
    if (this.board.checkForWin()) {
      this.board.render();
      console.log(`Grattis ${winningPlayer.name}! Du vann!`);
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
