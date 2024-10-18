import { DecisionTreeNode } from '../types';

export class LoopNode implements DecisionTreeNode {
  constructor(public iterations: number, public subtree: DecisionTreeNode) {} 

  execute() {
    console.log(`Executing loop ${this.iterations} times.`);
    for (let i = 0; i < this.iterations; i++) {
      console.log(`Iteration ${i + 1}:`);
      this.subtree.execute();
    }
  }
}
