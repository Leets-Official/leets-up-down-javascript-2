const MyUtils = require("../Utils/MyUtils");

let version;
let answer;
let input;
let count=0;
let errorMessage;

class App {
  async play() {

    let isVersionexist = false;

    while (!isVersionexist){
      MyUtils.Console.print(`업다운 게임을 시작합니다.\n`);
      MyUtils.Console.print(`버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2): `);
      version = await MyUtils.Console.readLineAsync();
      
      try {
        if(version == 1){
          answer = await this.getRandomNum();
          this.version1();
          isVersionexist = true;
        }

        else if(version == 2){
          answer = await this.getRandomEng();
          this.version2();
          isVersionexist = true;
        }

        else {
          throw `존재하지 않는 버전입니다.`;
        }
      } catch(error){
        MyUtils.Console.print(`[ERROR] ${error}`);
      }
    }
  }


  //-------------난수 생성
  async getRandomNum(){
    let randomNum = Math.floor(Math.random()*101);
    return randomNum;
  }

  async getRandomEng(){
    let randomEng = Math.random().toString(36).substring(2, 3);
    return randomEng;
  }


  //-------------version1(숫자)
  async version1(){

    let isAnswer = false;
    let minRange = 1;
    let maxRange = 100;

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
                MyUtils.Console.print(`UP`);
                minRange = input;
              }
              else{
                MyUtils.Console.print(`DOWN`);
                maxRange = input;
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
                    minRange = input;
                }
                else{
                    MyUtils.Console.print(`DOWN`);
                    maxRange = input;
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