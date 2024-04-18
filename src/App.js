const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.\n");
    MyUtils.Console.print(
      "버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : "
    );
    try {
      const version = await this.chooseVersion();
      const answer = this.generateAnswer(version);
      await this.startGame(version, answer);
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }

  async chooseVersion() {
    const version = await MyUtils.Console.readLineAsync();
    if (version !== "1" && version !== "2") {
      throw new Error("존재하지 않는 버전입니다.");
    }
    return version;
  }

  generateAnswer(version) {
    if (version === "1") {
      return Math.floor(Math.random() * 100) + 1;
    } else {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const randomIndex = Math.floor(Math.random() * letters.length);
      return letters[randomIndex];
    }
  }

  async startGame(version, answer) {
    let guessCount = 0;
    let range;
    if (version === "1") {
      range = "1 ~ 100";
    } else {
      range = "A ~ z";
    }

    while (true) {
      let guess;
      try {
        if (version === "1") {
          MyUtils.Console.print(`숫자를 입력해주세요(${range}) : `);
          guessCount++;
          guess = await MyUtils.Console.readLineAsync();
          if (!guess.match(/^[0-9]+$/)) {
            throw new Error("입력 문자의 타입이 맞지 않습니다.");
          }
          if (
            isNaN(guess) ||
            guess < parseInt(range.split(" ~ ")[0]) ||
            guess > parseInt(range.split(" ~ ")[1])
          ) {
            throw new Error("범위 내의 숫자를 입력하세요.");
          }
        } else {
          MyUtils.Console.print(`영어를 입력해주세요(${range}) : `);
          guessCount++;
          guess = await MyUtils.Console.readLineAsync();
          if (!guess.match(/^[A-Za-z]+$/) || guess.length > 1) {
            throw new Error("입력 문자의 타입이 맞지 않습니다.");
          }
          if (
            guess.charCodeAt(0) < range.charCodeAt(0) ||
            guess.charCodeAt(0) > range.charCodeAt(4)
          ) {
            throw new Error("범위 내의 알파벳을 입력하세요.");
          }
        }

        if (guess === answer.toString() || guess === answer) {
          MyUtils.Console.print("정답!\n");
          break;
        } else {
          if (guess < answer) {
            MyUtils.Console.print("UP");
            range =
              version === "1"
                ? `${parseInt(guess) + 1} ~ ${range.split(" ~ ")[1]}`
                : `${String.fromCharCode(guess.charCodeAt(0) + 1)} ~ ${
                    range.split(" ~ ")[1]
                  }`;
          } else {
            MyUtils.Console.print("DOWN");
            range =
              version === "1"
                ? `${range.split(" ~ ")[0]} ~ ${parseInt(guess) - 1}`
                : `${range.split(" ~ ")[0]} ~ ${String.fromCharCode(
                    guess.charCodeAt(0) - 1
                  )}`;
          }
        }
      } catch (error) {
        MyUtils.Console.print(`[ERROR] ${error.message}`);
      }
    }

    MyUtils.Console.print(`시도한 횟수 : ${guessCount}회`);
  }
}

module.exports = App;
