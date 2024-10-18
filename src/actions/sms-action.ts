import { DecisionTreeNode } from '../types';

export class SMSAction implements DecisionTreeNode {
  constructor(public phoneNumber: string) {}

  execute(): void {
    console.log(`Sending SMS to: ${this.phoneNumber}`);
  }
}