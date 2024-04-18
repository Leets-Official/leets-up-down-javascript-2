const MyUtils = require("../Utils/MyUtils");

class App {
  constructor() {
    this.answer = null;
    this.attempts = 0;
  }

  async getGameMode() {
    MyUtils.Console.print("게임 모드를 선택하세요: 1. 숫자 모드, 2. 영어 모드 ");
    const input = await MyUtils.Console.readLineAsync("게임 모드를 선택하세요: 1. 숫자 모드, 2. 영어 모드 ");
    while (true) {
      if (input === '1' || input === '2') {
        return input;
      } else {
        MyUtils.Console.print("[오류] 1 또는 2를 입력하세요.");
        break;
      }
    }
 }

  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.");
    const gameMode = await this.getGameMode();

    if (gameMode === '1') {
      await this.playNumberMode();
    } else if (gameMode === '2') {
      await this.playEnglishMode();
    } else {
      MyUtils.Console.print("[오류] 잘못된 입력입니다.");
    }
  }

  async playNumberMode() {
    this.answer = Math.floor(Math.random() * 100) + 1;

    while (true) {
      MyUtils.Console.print("숫자를 입력하세요(1 ~ 100): ");
      const guessString = parseInt(await MyUtils.Console.readLineAsync("숫자를 입력하세요(1 ~ 100): "));
      const guess = parseInt(guessString);

      if (!isNaN(guess) && guess >= 1 && guess <= 100) {
        this.attempts++;
        if (guess < this.answer) {
          MyUtils.Console.print("UP");
        } else if (guess > this.answer) {
          MyUtils.Console.print("DOWN");
        } else {
          MyUtils.Console.print(`정답! ${this.attempts}번 만에 맞추셨습니다.`);
          break;
        }
      } else {
        MyUtils.Console.print("[오류] 1부터 100까지의 숫자를 입력하세요.");
      }
    }

    MyUtils.Console.print(`\n시도한 횟수 : ${this.attempts}회`);
    }


    async playEnglishMode() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.answer = MyUtils.getRandomLetter();
     
      while (true) {
        MyUtils.Console.print("알파벳을 입력하세요(A ~ Z): ");
         const guess = (await MyUtils.Console.readLineAsync("알파벳을 입력하세요(A ~ Z): ")).toUpperCase();
         this.attempts++;
     
         if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
           MyUtils.Console.print(`[오류] A ~ Z 사이의 알파벳을 입력하세요.`);
           continue;
         }
     
         if (guess < this.answer) {
           MyUtils.Console.print("UP");
         } else if (guess > this.answer) {
           MyUtils.Console.print("DOWN");
         } else {
           MyUtils.Console.print(`정답! ${this.attempts}번 만에 맞추셨습니다.`);
           break;
         }
      }
     
      MyUtils.Console.print(`\n시도한 횟수 : ${this.attempts}회`);
     }

}

module.exports = App;
