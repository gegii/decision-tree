import { DecisionTreeNode } from '../types';

export class EmailAction implements DecisionTreeNode {
  constructor(public sender: string, public receiver: string) {}

  execute(): void {
    console.log(`Sending email from ${this.sender} to ${this.receiver}`);
  }
}