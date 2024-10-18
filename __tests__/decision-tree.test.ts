import { DecisionTree } from '../src/decision-tree';
import { SMSAction } from '../src/actions/sms-action';
import { EmailAction } from '../src/actions/email-action';
import { ConditionNode } from '../src/nodes/condition-node';
import { LoopNode } from '../src/nodes/loop-node';

describe('DecisionTree', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test('should serialize and deserialize a decision tree with SMS action', () => {
    const smsAction = new SMSAction('1234567890');
    const decisionTree = new DecisionTree(smsAction);
    
    const json = decisionTree.toJSON();
    const deserializedTree = DecisionTree.fromJSON(json);

    deserializedTree.execute();

    expect(logSpy).toHaveBeenCalledWith('Sending SMS to: 1234567890');
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test('should serialize and deserialize a decision tree with Email action', () => {
    const emailAction = new EmailAction('sender@example.com', 'receiver@example.com');
    const decisionTree = new DecisionTree(emailAction);
    
    const json = decisionTree.toJSON();
    const deserializedTree = DecisionTree.fromJSON(json);

    deserializedTree.execute();

    expect(logSpy).toHaveBeenCalledWith('Sending email from sender@example.com to receiver@example.com');
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test('should serialize and deserialize a decision tree with Condition node', () => {
    const trueAction = new SMSAction('1234567890');
    const falseAction = new SMSAction('0987654321'); 
    const conditionNode = new ConditionNode('true', trueAction, falseAction);
    const decisionTree = new DecisionTree(conditionNode);
    
    const json = decisionTree.toJSON();
    const deserializedTree = DecisionTree.fromJSON(json);
  
    deserializedTree.execute();
  
    expect(logSpy).toHaveBeenCalledWith('Condition "true" is true');
    expect(logSpy).toHaveBeenCalledWith('Sending SMS to: 1234567890');
    expect(logSpy).toHaveBeenCalledTimes(2);
  });

  test('should serialize and deserialize a decision tree with Loop node', () => {
    const emailAction = new EmailAction('sender@example.com', 'receiver@example.com');
    const loopNode = new LoopNode(10, emailAction);
    const decisionTree = new DecisionTree(loopNode);
    
    const json = decisionTree.toJSON();
    const deserializedTree = DecisionTree.fromJSON(json);

    deserializedTree.execute();

    // expect 10 calls
    expect(logSpy).toHaveBeenCalledTimes(21); // 21 logs: 10 for the loop, 10 for the email, 1 for the loop condition
    expect(logSpy).toHaveBeenCalledWith('Sending email from sender@example.com to receiver@example.com');
  });

  test('should execute SMS action on December 25th', () => {
   
    const OriginalDate = global.Date; 
    const mockDate = new OriginalDate('2025-12-25T00:00:00Z');
  
    global.Date = class extends OriginalDate {
      constructor(date?: string | number) {
          super();
        if (date) {
          return new OriginalDate(date);
        }
        return mockDate; 
      }
    } as unknown as DateConstructor; 
  
    const trueAction = new SMSAction('1234567890');
    const conditionNode = new ConditionNode(
      '(() => { const now = new Date(); return now.getDate() === 25 && now.getMonth() === 11; })()',
      trueAction,
      null
    );
    const decisionTree = new DecisionTree(conditionNode);
    
    decisionTree.execute();

    expect(logSpy).toHaveBeenCalledWith('Condition "(() => { const now = new Date(); return now.getDate() === 25 && now.getMonth() === 11; })()" is true');
    expect(logSpy).toHaveBeenCalledWith('Sending SMS to: 1234567890');
    expect(logSpy).toHaveBeenCalledTimes(2);
    global.Date = OriginalDate;
  });

  test('should send an email action on October 18th', () => {
    const OriginalDate = global.Date; 
    const mockDate = new OriginalDate('2025-10-18T00:00:00Z');
  
    global.Date = class extends OriginalDate {
      constructor(date?: string | number) {
        super();
        if (date) {
          return new OriginalDate(date);
        }
        return mockDate; 
      }
    } as unknown as DateConstructor; 
  
    const emailAction = new EmailAction('sender@example.com', 'receiver@example.com');
    const trueAction = new SMSAction('1234567890'); 
    const conditionNode = new ConditionNode(
      '(() => { const now = new Date(); return now.getDate() === 25 && now.getMonth() === 11; })()',
      trueAction,
      emailAction 
    );
  
    const decisionTree = new DecisionTree(conditionNode);
    
    decisionTree.execute();
  
    expect(logSpy).toHaveBeenCalledWith('Sending email from sender@example.com to receiver@example.com');
    expect(logSpy).toHaveBeenCalledTimes(2);
    
    global.Date = OriginalDate; 
  });
});