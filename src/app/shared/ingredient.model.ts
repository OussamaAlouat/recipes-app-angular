export class Ingredient {
  public name: string;
  public amount: number;
  public id?: number;

  constructor(name: string, amount: number) {
    this.amount = amount;
    this.name = name;
  }
}
