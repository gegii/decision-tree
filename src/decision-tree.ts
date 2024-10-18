import { DecisionTreeNode } from './types';
import { SMSAction } from './actions/sms-action';
import { EmailAction } from './actions/email-action';
import { ConditionNode } from './nodes/condition-node';
import { LoopNode } from './nodes/loop-node';

export class DecisionTree {
  constructor(private rootNode: DecisionTreeNode) {}

  execute(): void {
    this.rootNode.execute();
  }

  static fromJSON(json: any): DecisionTree {
    const rootNode = DecisionTree.deserializeNode(json);
    return new DecisionTree(rootNode);
  }

  private static deserializeNode(json: any): DecisionTreeNode {
    switch (json.type) {
      case 'SMS':
        return new SMSAction(json.phoneNumber);
      case 'Email':
        return new EmailAction(json.sender, json.receiver);
      case 'Condition':
        return new ConditionNode(
          json.condition,
          this.deserializeNode(json.trueAction),
          json.falseAction ? this.deserializeNode(json.falseAction) : null // Handle null for falseAction
        );
      case 'Loop':
        return new LoopNode(json.iterations, this.deserializeNode(json.subtree));
      default:
        throw new Error(`Unknown node type: ${json.type}`);
    }
  }

  toJSON(): any {
    return DecisionTree.serializeNode(this.rootNode);
  }

  private static serializeNode(node: DecisionTreeNode): any {
    if (node instanceof SMSAction) {
      return { type: 'SMS', phoneNumber: node.phoneNumber };
    } else if (node instanceof EmailAction) {
      return { type: 'Email', sender: node.sender, receiver: node.receiver };
    } else if (node instanceof ConditionNode) {
      return {
        type: 'Condition',
        condition: node.condition,
        trueAction: this.serializeNode(node.trueAction),
        falseAction: node.falseAction ? this.serializeNode(node.falseAction) : null 
      };
    } else if (node instanceof LoopNode) {
      return {
        type: 'Loop',
        iterations: node.iterations,
        subtree: this.serializeNode(node.subtree)
      };
    }
    throw new Error('Unsupported node');
  }
}