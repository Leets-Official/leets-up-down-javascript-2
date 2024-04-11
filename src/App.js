const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    const version = MyUtils.Console.readLineAsync();
    switch(version) {
      case '1':
        caseNumber();
        break;
      case '2':
        caseAlpha();
        break;
      default:
        throw Error("[ERROR] 존재하지 않는 버전입니다.");
    }
  }
    
  async caseNumber() {
    MyUtils.Console.print("숫자를 입력해주세요(1 ~ 100) : ");      
  }

  async caseAlpha() {
    MyUtils.Console.print("영어를 입력해주세요(A ~ z) : " );
  }
}

module.exports = App;
