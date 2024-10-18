import { DecisionTreeNode } from '../types';

export class ConditionNode implements DecisionTreeNode {
  constructor(
    public condition: string,
    public trueAction: DecisionTreeNode,
    public falseAction: DecisionTreeNode | null 
  ) {}

  execute() {
    const result = eval(this.condition); 
    if (result) {
      console.log(`Condition "${this.condition}" is true`);
      this.trueAction.execute();
    } else {
      console.log(`Condition "${this.condition}" is false`);
      if (this.falseAction) {
        this.falseAction.execute(); 
      }
    }
  }
}


