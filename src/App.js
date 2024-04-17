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
}

module.exports = App;
