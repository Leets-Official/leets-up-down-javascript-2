const readline = require("readline");

const MyUtils = {
  version: '',
  userInput: "",
  count: 0,
  alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",

  setUserInput: (input) => {
    MyUtils.userInput = input;
  },
  setVersion: (input) => {
    MyUtils.version = input;
  },

  Console: {
    print: (message) => {
      console.log(message);
    },

    readLineAsync: () => {
      return new Promise((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question("", (input) => {
          rl.close();
          resolve(input);
        });
      });
    },
  },
};

module.exports = MyUtils;
