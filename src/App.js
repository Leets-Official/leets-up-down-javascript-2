const MyUtils = require("../Utils/MyUtils");

let answer;
let input;
let count;

class App {

  constructor() {
    this.version;
  }
  async play() {
 
     MyUtils.Console.print(`업다운 게임을 시작합니다.\n`);
     MyUtils.Console.print(`버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : `);
     this.version = await MyUtils.Console.readLineAsync();
     try {
      
       if(isNaN(this.version)) {
         MyUtils.Console.print(`입력 문자의 타입이 맞지 않습니다.`);
       }
       if(this.version == 1){
         answer = this.generateAnswer(this.version);
         await this.version1();
       }
       else if(this.version == 2){
         answer = this.generateAnswer(this.version);
         await this.version2();
       }
       else {
         throw `존재하지 않는 버전입니다.`;
       }
     } catch(error){
       throw new Error(`[ERROR] ${error}`);
     }
   }

  //-------------난수 생성
  generateAnswer(version) {
    if (version == 1) {
      let randomNum = Math.floor(Math.random() * 100) + 1;
      return randomNum;
    }
  
    if (version == 2) {
      let randomEng = Math.floor(Math.random() * 26) + (Math.random() > 0.5 ? 65 : 97);
      randomEng = String.fromCharCode(randomEng);
      return randomEng;
    }
  }
  
  //-------------version1(숫자)
  async version1(){

    let isAnswer = false;
    let minRange = 1;
    let maxRange = 100;
    count = 0;

    while (!isAnswer){
      try{

        MyUtils.Console.print(`숫자를 입력해주세요(${minRange} ~ ${maxRange}) : `);
        input = await MyUtils.Console.readLineAsync();

        count++;

        if(isNaN(input)) {
          throw `입력 문자의 타입이 맞지 않습니다.`;
        }

        else{
          if(input < minRange || input > maxRange){
            throw `범위 내의 숫자를 입력하세요.`;
          }
          
          else{
            if (input == answer){
              isAnswer = true;
            }
            else{
              if(input < answer){
                MyUtils.Console.print("UP");
                minRange = parseInt(input) + 1;
              }
              else{
                MyUtils.Console.print("DOWN");
                maxRange = parseInt(input) - 1;
              }
            }
          }
        }  
          }catch(error){
          MyUtils.Console.print(`[ERROR] ${error}`);
          }
    }
      MyUtils.Console.print(`정답!`);
      MyUtils.Console.print(`시도한 횟수 : ${count}회`);
  }

  //-------------version2(영어)
  async version2(){

    let isAnswer = false;
    let minRange = 'A';
    let maxRange = 'z';
    count = 0;

    while (!isAnswer){
        try{
            MyUtils.Console.print(`영어를 입력해주세요(${minRange} ~ ${maxRange}) : `);
            input = await MyUtils.Console.readLineAsync();
            count++;

            if(!isNaN(input)) {
              throw `입력 문자의 타입이 맞지 않습니다.`;
            }

            else{
              if(input < minRange || input > maxRange){
                throw `범위 내의 알파벳을 입력하세요.`;
              }

              if (input == answer){
                isAnswer = true;
              }
              else{
                if (input < answer){
                    MyUtils.Console.print(`UP`);
                    minRange = String.fromCharCode(input.charCodeAt(0) + 1);
                }
                else{
                    MyUtils.Console.print(`DOWN`);
                    maxRange = String.fromCharCode(input.charCodeAt(0) - 1);
                }
              }
            }} catch(error){
            MyUtils.Console.print(`[ERROR] ${error}`);
            }
    }

    MyUtils.Console.print(`정답!`);
    MyUtils.Console.print(`시도한 횟수 : ${count}회`);
}

}

module.exports = App;