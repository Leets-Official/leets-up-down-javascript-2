const MyUtils = require("../Utils/MyUtils");

let version;
let answer;
let input;
let count=0;

class App {
  async play() {

    MyUtils.Console.print(`업다운 게임을 시작합니다.\n`);
    MyUtils.Console.print(`버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2): `);
    version = await MyUtils.Console.readLineAsync();

    try {
      
      console.log("version: ", version);

      if(version == 1){
        answer = await this.getRandomNum();
        this.version1();
      }

      else if(version == 2){
        answer = await this.getRandomEng();
        this.version2();
      }

      /*
      else() {
        //ERROR
      }
      */
    } catch(error){

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
    MyUtils.Console.print(`숫자를 입력해주세요(1 ~ 100) : `);
    input = await MyUtils.Console.readLineAsync();
    count++;

    while (input != answer){
      if(input < answer){
        MyUtils.Console.print(`UP`);
        MyUtils.Console.print(`숫자를 입력해주세요(1 ~ 100) : `);
        input = await MyUtils.Console.readLineAsync();
      }
      else if(input > answer){
        MyUtils.Console.print(`DOWN`);
        MyUtils.Console.print(`숫자를 입력해주세요(1 ~ 100) : `);
        input = await MyUtils.Console.readLineAsync();
      }
      count++;
    }
    MyUtils.Console.print(`정답!`);
    MyUtils.Console.print(`시도한 횟수 : ${count}회`)
  }


  //-------------version2(영어)
  async version2(){
    MyUtils.Console.print(`영어를 입력해주세요(A ~ z) : `);
    input = await MyUtils.Console.readLineAsync();
    count++;

    while (input != answer){
      if(input < answer){
        MyUtils.Console.print(`UP`);
        MyUtils.Console.print(`영어를 입력해주세요(A ~ z) : `);
        input = await MyUtils.Console.readLineAsync();
      }
      else if(input > answer){
        MyUtils.Console.print(`DOWN`);
        MyUtils.Console.print(`영어를 입력해주세요(A ~ z) : `);
        input = await MyUtils.Console.readLineAsync();
      }
      count++;
    }
    MyUtils.Console.print(`정답!`);
    MyUtils.Console.print(`시도한 횟수 : ${count}회`)
  }
}

module.exports = App;