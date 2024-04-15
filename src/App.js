const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    const version = await MyUtils.Console.readLineAsync();
    switch(version) {
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
    
  async caseNumber() {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    let min = 1, max = 100;

    while (true) {
      MyUtils.Console.print("숫자를 입력해주세요(" + min + " ~ " + max + ") : ");
      MyUtils.setUserInput(await MyUtils.Console.readLineAsync());
      if (MyUtils.userInput < min || MyUtils.userInput > max) {
        MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
        continue;
      }
      MyUtils.count++;
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
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomAlpha = alpha[Math.floor(Math.random() * 52) + 1];
    let min = 'A', max = 'z';

    while (true) {
      MyUtils.Console.print("영어를 입력해주세요(" + min + " ~ " + max + ") : ");
      MyUtils.setUserInput(await MyUtils.Console.readLineAsync());
      // if (!MyUtils.userInput.includes(alpha)) {
      //   MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
      //   continue;
      // }
      if (MyUtils.userInput < min || MyUtils.userInput > max) {
        MyUtils.Console.print("[ERROR] 범위 내의 알파벳을 입력하세요.");
        continue;
      }
      MyUtils.count++;
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
