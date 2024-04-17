const MyUtils = require("../Utils/MyUtils");

class App {
  async play() {
    try {
      MyUtils.Console.print("업다운 게임을 시작합니다.\n");
      const version = await this.versionChoice(); 

      if (version === '1') {
        await this.numberVersion();
      } else if (version === '2') {
        await this.alphabetVersion();
      } else {
        MyUtils.Console.print("에러났음");
      }
    } catch (error) {
      throw new Error(`[ERROR] ${error.message}`);
    }
  }


  async versionChoice() {
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    const version = await MyUtils.Console.readLineAsync();
    return version;
  }

    async numberVersion() {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      let isCorrect = false;

      while (!isCorrect) {
          MyUtils.Console.print("숫자를 입력해주세요(1 ~ 100) : ");
          const userInput = await MyUtils.Console.readLineAsync();
          
          if (userInput >= 1 || userInput <= 100) {
              
              if (parseInt(userInput) === randomNumber) {
                  MyUtils.Console.print("정답!\n");
                  isCorrect = true;
              } else if (parseInt(userInput) > randomNumber) {
                  MyUtils.Console.print("down\n");
              } else {
                  MyUtils.Console.print("up\n");
              }

          } else {
              MyUtils.Console.print("입력한 숫자가 유효하지 않습니다.\n");
          }
      }
    }

    async alphabetVersion() {
      const alphabetList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const randomAlphabet = alphabetList.charAt(Math.floor(Math.random() * alphabetList.length));
      let isCorrect = false;
  
      MyUtils.Console.print(`영어를 입력해주세요(A~z) : `);
  
      while (!isCorrect) {
          const userInput = await MyUtils.Console.readLineAsync();
          
          const parsedInput = userInput.trim();
  
          if (parsedInput.length === 1 && alphabetList.includes(parsedInput)) {
              if (parsedInput === randomAlphabet) {
                  MyUtils.Console.print("정답!\n");
                  isCorrect = true;
              } else if (parsedInput > randomAlphabet) {
                  MyUtils.Console.print("DOWN\n");
              } else {
                  MyUtils.Console.print("UP\n");
              }
          } else {
              MyUtils.Console.print("[ERROR] 범위 내의 알파벳을 입력하세요.\n");
          }
      }
    }
  
}

module.exports = App;
