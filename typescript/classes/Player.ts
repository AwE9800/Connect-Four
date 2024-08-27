export default class Player {
  name: string;
  color: string;
  isAI: boolean;

  constructor(name: string, color: string, isAI: boolean = false) {
    this.name = name;
    this.color = color;
    this.isAI = isAI;
  }
}
