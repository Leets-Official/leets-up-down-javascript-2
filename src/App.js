const MyUtils = require("../Utils/MyUtils");
let version;
class App {
  async play() {
    
    MyUtils.Console.print("업다운 게임을 시작합니다.\n");
    version = await this.userInput();
    await this.upDownGame(version);

  }

  async userInput(){
    try{
     
      MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
      version = await MyUtils.Console.readLineAsync();
      if(version !== "1" && version !== "2") {
        throw new Error("존재하지 않는 버전입니다.");
    }
      MyUtils.Console.print("");

    }catch(error){
      throw new Error(`[ERROR] ${error.message}`);
    }
    return version;
  }

  generateAnswer(version) {
    if (version === "1") { // 숫자 버전
      return Math.floor(Math.random() * 100) + 1;
    } 
    else  { // 영어 버전 
      // A~Z (65~90), a~z (97~122)
      //소문자 대문자 시작 랜덤하게 결정
      let engStart = Math.random() < 0.5 ? 65 : 97; 
      return String.fromCharCode(engStart + Math.floor(Math.random() * 26));
    }
  }


  async upDownGame(version) {
    let userInput;
    let count = 0;
    let min = 1;
    let max = 100;
    let minEng = 'A';
    let maxEng = 'z';
    if (version === "1") { //숫자 버전
      const correctNum = this.generateAnswer(version);
      do {
          try {
              MyUtils.Console.print(`숫자를 입력해주세요(${min} ~ ${max}) : `);
              userInput = await MyUtils.Console.readLineAsync();
              count+=1;
              userInput = Number(userInput);
              if (isNaN(userInput) || isNaN(parseFloat(userInput))){
                throw new Error("입력 문자의 타입이 맞지 않습니다.");
              }
              if((userInput > max) || (userInput < min)) {
                throw new Error("범위 내의 숫자를 입력하세요.");
              }
              if (userInput > correctNum) {
                  MyUtils.Console.print("DOWN");
                  max = userInput-1;
              } else if (userInput < correctNum) {
                  MyUtils.Console.print("UP");
                  min = userInput+1;
              } else {
                  MyUtils.Console.print("정답!");
                  MyUtils.Console.print(`시도한 횟수 : ${count}회`);
                  break;
              }
          } catch (error) {
              MyUtils.Console.print(`[ERROR] ${error.message}`);
          }
      } while (true);
  } else { //영어 버전
    const correctEng = this.generateAnswer(version);
    const eng = /^[a-zA-Z]+$/;
    do {
        try {
          MyUtils.Console.print(`영어를 입력해주세요(${minEng} ~ ${maxEng}) : `);
             
            userInput = await MyUtils.Console.readLineAsync();
            count+=1;
            if (!eng.test(userInput)) {
                throw new Error("입력 문자의 타입이 맞지 않습니다.");
            }
            if((userInput > maxEng) || (userInput < minEng)) {
              throw new Error("범위 내의 알파벳을 입력하세요.");
            }
            if (userInput > correctEng) {
                MyUtils.Console.print("DOWN");
                maxEng = String.fromCharCode(userInput.charCodeAt(0) - 1);
            } else if (userInput < correctEng) {
                MyUtils.Console.print("UP");
                minEng = String.fromCharCode(userInput.charCodeAt(0) + 1);
            } else {
                MyUtils.Console.print("정답!");
                MyUtils.Console.print("시도한 횟수 : " + count + "회");
                break;
            }
        } catch (error) {
            MyUtils.Console.print(`[ERROR] ${error.message}`);
        }
    } while (true);

  }
}

    
}

module.exports = App;
