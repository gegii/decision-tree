# Decision Tree Implementation

This project implements a decision tree to evaluate conditions and execute actions based on those conditions. It supports various actions such as sending SMS and email, with the ability to loop through actions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Features

- **Condition Evaluation**: Evaluate conditions dynamically using string representations of functions.
- **Action Handling**: Execute different actions based on the outcome of conditions (e.g., sending SMS or email).
- **Looping**: Execute actions multiple times using a loop node.
- **Serialization**: Serialize and deserialize decision trees to and from JSON format.

## Installation

```bash
npm install
```

## Usage

In the `src/main.ts` file, you can specify the current date by modifying the `decisionTreeJson` based on the commented condition. If you change the condition to match today's date, the application will send an SMS. Conversely, if you specify any other date, it will send emails. This behavior is determined by the entire structure of the `decisionTreeJson`.

and run:

```bash
npx ts-node src/main.ts
```

## Testing

To run the tests for this project, you can use the following command:

```bash
npx jest
```
