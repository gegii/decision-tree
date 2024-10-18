import { DecisionTree } from './decision-tree';

// * Example condition property => October 18th
// "new Date().getDate() === 18 && new Date().getMonth() === 9" 

const decisionTreeJson = {
  type: "Condition",
  condition: "new Date().getDate() === 25 && new Date().getMonth() === 11", // * December 25th
  trueAction: {
    type: "SMS",
    phoneNumber: "1234567890"
  },
  falseAction: {
    type: "Loop",
    iterations: 10,
    subtree: {
      type: "Email",
      sender: "example@example.com",
      receiver: "user@example.com"
    }
  }
};

// Deserialize the JSON into a decision tree object
const decisionTree = DecisionTree.fromJSON(decisionTreeJson);

// Execute the decision tree
decisionTree.execute();

// Serialize back to JSON
console.log(JSON.stringify(decisionTree.toJSON(), null, 2));