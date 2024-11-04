import { MissionUtils } from '@woowacourse/mission-utils';
const { Console, Random } = MissionUtils;

class App {
  async run() {
    try {
      const purchaseAmount = Number(
        await Console.readLineAsync(
          '구입 금액을 입력해 주세요.'
        )
      );
      if (!purchaseAmount) {
        throw Error('숫자로 입력해주세요');
      }
      if (purchaseAmount % 1000 !== 0) {
        throw Error('1,000원 단위로 입력해주세요');
      }
      Console.print(purchaseAmount);
    } catch (error) {
      throw Error(`[ERROR] ${error.message}`);
    }
  }
}

export default App;
