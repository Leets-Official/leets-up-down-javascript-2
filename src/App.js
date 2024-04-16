const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.\n");
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    MyUtils.setVersion(await MyUtils.Console.readLineAsync());
    MyUtils.count = 0;
    switch(MyUtils.version) {
      case '1':
        await this.caseNumber();
        break;
      case '2':
        await this.caseAlpha();
        break;
      default:
        throw Error("[ERROR] 존재하지 않는 버전입니다.");
    }
    return MyUtils.count
  }

  generateAnswer(version) {
      if (version == '1') {
        return Math.floor(Math.random() * 100) + 1;
      } else {
        return MyUtils.alpha[Math.floor(Math.random() * 52) + 1].toString();
      }
  }
    
  async caseNumber() {
    const randomNum = this.generateAnswer();
    let min = 1, max = 100;

    while (true) {
      MyUtils.Console.print("숫자를 입력해주세요(" + min + " ~ " + max + ") : ");
      MyUtils.setUserInput(await MyUtils.Console.readLineAsync());
      MyUtils.count++;
      if (!parseInt(MyUtils.userInput)) {
        MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
        continue;
      }
      if (MyUtils.userInput < min || MyUtils.userInput > max) {
        MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
        continue;
      }
      if (parseInt(MyUtils.userInput) == randomNum) {
        MyUtils.Console.print("정답!");
        break;
      } else if (parseInt(MyUtils.userInput) < randomNum) {
        MyUtils.Console.print("UP");
        min = parseInt(MyUtils.userInput) + 1;
      } else {
        MyUtils.Console.print("DOWN");
        max = parseInt(MyUtils.userInput) - 1;
      }
    }
    MyUtils.Console.print("시도한 횟수 : " + MyUtils.count + "회");
  }

  async caseAlpha() {
    const randomAlpha = this.generateAnswer().toString();
    let min = 'A', max = 'z';

    while (true) {
      MyUtils.Console.print("영어를 입력해주세요(" + min + " ~ " + max + ") : ");
      MyUtils.setUserInput(await MyUtils.Console.readLineAsync());
      MyUtils.count++;
      if (MyUtils.alpha.indexOf(MyUtils.userInput) == -1) {
        MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
        continue;
      }
      if (MyUtils.userInput < min || MyUtils.userInput > max) {
        MyUtils.Console.print("[ERROR] 범위 내의 알파벳을 입력하세요.");
        continue;
      }
      if (MyUtils.userInput == randomAlpha) {
        MyUtils.Console.print("정답!");
        break;
      } else if (MyUtils.userInput < randomAlpha) {
        MyUtils.Console.print("UP");
        if (MyUtils.userInput == 'Z') min = 'a';
        else min = String.fromCharCode(MyUtils.userInput.charCodeAt() + 1);
      } else {
        MyUtils.Console.print("DOWN");
        if (MyUtils.userInput == 'a') max = 'Z'
        else max = String.fromCharCode(MyUtils.userInput.charCodeAt() - 1);
      }
    }
    MyUtils.Console.print("시도한 횟수 : " + MyUtils.count + "회");
  }
}

module.exports = App;
